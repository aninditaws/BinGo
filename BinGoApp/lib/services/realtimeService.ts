import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type RealtimeEventType =
  | "bin_change"
  | "connection_established"
  | "subscribed"
  | "subscribe_bins"
  | "pong";

interface RealtimeMessage {
  type: RealtimeEventType;
  operation?: "INSERT" | "UPDATE" | "DELETE";
  data?: any;
  message?: string;
  userId?: string;
  timestamp?: number;
}

type RealtimeCallback = (message: RealtimeMessage) => void;

class RealtimeService {
  private ws: WebSocket | null = null;
  private listeners: Map<RealtimeEventType, RealtimeCallback[]> = new Map();
  private reconnectTimer: NodeJS.Timeout | null = null;
  private pingTimer: NodeJS.Timeout | null = null;
  private isConnecting = false;
  private maxReconnectAttempts = 5;
  private reconnectAttempt = 0;
  private reconnectDelay = 1000; // Start with 1 second

  // Get WebSocket URL based on environment
  private getWebSocketUrl(): string {
    if (__DEV__) {
      // Same IP as your API service - update this to match your backend IP
      return `ws://${process.env.EXPO_PUBLIC_IP}:3001/ws`;
    }
    console.log("Production WebSocket URL");
    // Production WebSocket URL
    return "wss://your-production-api.com/ws";
  }

  // Connect to WebSocket server
  async connect(): Promise<boolean> {
    if (
      this.isConnecting ||
      (this.ws && this.ws.readyState === WebSocket.OPEN)
    ) {
      return true;
    }

    this.isConnecting = true;

    try {
      // Get authentication token
      const token = await AsyncStorage.getItem("access_token");
      const userId = await AsyncStorage.getItem("user_id");
      if (!token || !userId) {
        console.log("No authentication token found");
        this.isConnecting = false;
        // Navigate to login page if token is not found
        router.replace("/login");
        return false;
      }

      // Create WebSocket connection with authentication
      const wsUrl = `${this.getWebSocketUrl()}?token=${encodeURIComponent(
        token
      )}&userId=${userId}`;
      console.log("Connecting to WebSocket:", wsUrl);

      this.ws = new WebSocket(wsUrl);

      return new Promise((resolve) => {
        if (!this.ws) {
          resolve(false);
          return;
        }

        this.ws.onopen = () => {
          console.log("✅ WebSocket connected");
          this.isConnecting = false;
          this.reconnectAttempt = 0;
          this.reconnectDelay = 1000;

          // Start ping/pong to keep connection alive
          this.startHeartbeat();

          // Subscribe to bin updates with the correct message type
          this.send({
            type: "subscribe_bins",
          });

          resolve(true);
        };

        this.ws.onmessage = (event) => {
          try {
            const message: RealtimeMessage = JSON.parse(event.data);
            console.log("📨 Received WebSocket message:", message);
            this.handleMessage(message);
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        this.ws.onclose = async (event) => {
          console.log("🔌 WebSocket disconnected:", event.code, event.reason);
          this.isConnecting = false;
          this.stopHeartbeat();

          // Check if the close was due to token expiry
          if (event.code === 1008 || event.reason.includes("Invalid token")) {
            console.log("WebSocket closed due to invalid token");
            // Clear token and navigate to login
            await AsyncStorage.removeItem("access_token");
            router.replace("/login");
            return;
          }

          // Attempt to reconnect unless it was a clean close
          if (event.code !== 1000) {
            this.scheduleReconnect();
          }
        };

        this.ws.onerror = async (error) => {
          console.error("❌ WebSocket error:", error);
          this.isConnecting = false;

          // Check if the error is due to token expiry
          const token = await AsyncStorage.getItem("access_token");
          if (!token) {
            console.log("WebSocket error due to missing token");
            router.replace("/login");
            return;
          }

          resolve(false);
        };

        // Timeout for connection
        setTimeout(() => {
          if (this.isConnecting) {
            console.error("WebSocket connection timeout");
            this.isConnecting = false;
            if (this.ws) {
              this.ws.close();
            }
            resolve(false);
          }
        }, 10000); // 10 second timeout
      });
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      this.isConnecting = false;
      return false;
    }
  }

  // Disconnect from WebSocket
  disconnect(): void {
    console.log("Disconnecting WebSocket...");

    // Clear timers
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // Close WebSocket connection
    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
      this.ws = null;
    }

    this.reconnectAttempt = 0;
  }

  // Send message to WebSocket server
  private send(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected, cannot send message:", message);
    }
  }

  // Handle incoming messages
  private handleMessage(message: RealtimeMessage): void {
    const listeners = this.listeners.get(message.type) || [];
    listeners.forEach((callback) => {
      try {
        callback(message);
      } catch (error) {
        console.error("Error in realtime callback:", error);
      }
    });
  }

  // Add event listener
  on(event: RealtimeEventType, callback: RealtimeCallback): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  // Remove event listener
  off(event: RealtimeEventType, callback: RealtimeCallback): void {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Remove all listeners for an event
  removeAllListeners(event?: RealtimeEventType): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  // Start heartbeat to keep connection alive
  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.pingTimer = setInterval(() => {
      this.send({ type: "ping", timestamp: Date.now() });
    }, 30000); // Ping every 30 seconds
  }

  // Stop heartbeat
  private stopHeartbeat(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  // Schedule reconnection attempt
  private scheduleReconnect(): void {
    if (this.reconnectAttempt >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectAttempt++;
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempt - 1),
      30000
    );

    console.log(
      `Scheduling reconnection attempt ${this.reconnectAttempt} in ${delay}ms`
    );

    this.reconnectTimer = setTimeout(async () => {
      console.log(
        `Attempting reconnection ${this.reconnectAttempt}/${this.maxReconnectAttempts}`
      );
      const success = await this.connect();
      if (!success) {
        this.scheduleReconnect();
      }
    }, delay);
  }

  // Get connection status
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  // Get connection state
  getConnectionState(): string {
    if (!this.ws) return "DISCONNECTED";

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "CONNECTING";
      case WebSocket.OPEN:
        return "CONNECTED";
      case WebSocket.CLOSING:
        return "CLOSING";
      case WebSocket.CLOSED:
        return "DISCONNECTED";
      default:
        return "UNKNOWN";
    }
  }
}

// Export singleton instance
export const realtimeService = new RealtimeService();

// Export types for use in components
export type { RealtimeMessage, RealtimeEventType, RealtimeCallback };
