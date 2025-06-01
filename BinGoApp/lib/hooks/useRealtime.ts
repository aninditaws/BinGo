import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import {
  realtimeService,
  RealtimeMessage,
  RealtimeEventType,
  RealtimeCallback,
} from "../services/realtimeService";

interface UseRealtimeOptions {
  autoConnect?: boolean;
  reconnectOnAppForeground?: boolean;
}

interface UseRealtimeReturn {
  isConnected: boolean;
  connectionState: string;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  on: (event: RealtimeEventType, callback: RealtimeCallback) => void;
  off: (event: RealtimeEventType, callback: RealtimeCallback) => void;
}

export function useRealtime(
  options: UseRealtimeOptions = {}
): UseRealtimeReturn {
  const { autoConnect = true, reconnectOnAppForeground = true } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState("DISCONNECTED");
  const callbacksRef = useRef<Map<RealtimeEventType, RealtimeCallback[]>>(
    new Map()
  );
  const appStateRef = useRef(AppState.currentState);

  // Update connection status
  const updateConnectionStatus = () => {
    const connected = realtimeService.isConnected();
    const state = realtimeService.getConnectionState();
    setIsConnected(connected);
    setConnectionState(state);
  };

  // Connect to realtime service
  const connect = async (): Promise<boolean> => {
    try {
      const success = await realtimeService.connect();
      updateConnectionStatus();
      return success;
    } catch (error) {
      console.error("Error connecting to realtime service:", error);
      updateConnectionStatus();
      return false;
    }
  };

  // Disconnect from realtime service
  const disconnect = (): void => {
    realtimeService.disconnect();
    updateConnectionStatus();
  };

  // Add event listener with cleanup tracking
  const on = (event: RealtimeEventType, callback: RealtimeCallback): void => {
    realtimeService.on(event, callback);

    // Track callback for cleanup
    if (!callbacksRef.current.has(event)) {
      callbacksRef.current.set(event, []);
    }
    callbacksRef.current.get(event)?.push(callback);
  };

  // Remove event listener
  const off = (event: RealtimeEventType, callback: RealtimeCallback): void => {
    realtimeService.off(event, callback);

    // Remove from tracking
    const callbacks = callbacksRef.current.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  };

  // Handle app state changes
  useEffect(() => {
    if (!reconnectOnAppForeground) return;

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log(
          "App has come to the foreground, checking realtime connection"
        );

        // Check if we need to reconnect
        if (!realtimeService.isConnected()) {
          console.log("Realtime not connected, attempting to reconnect...");
          await connect();
        }
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription?.remove();
  }, [reconnectOnAppForeground]);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Set up connection status monitoring
    const statusInterval = setInterval(updateConnectionStatus, 1000);

    return () => {
      clearInterval(statusInterval);

      // Clean up all event listeners added through this hook
      callbacksRef.current.forEach((callbacks, event) => {
        callbacks.forEach((callback) => {
          realtimeService.off(event, callback);
        });
      });
      callbacksRef.current.clear();
    };
  }, [autoConnect]);

  return {
    isConnected,
    connectionState,
    connect,
    disconnect,
    on,
    off,
  };
}

// Specific hook for bin changes
export function useBinRealtime() {
  const { isConnected, connectionState, connect, disconnect, on, off } =
    useRealtime();
  const [binUpdates, setBinUpdates] = useState<RealtimeMessage[]>([]);

  useEffect(() => {
    const handleBinChange = (message: RealtimeMessage) => {
      console.log("Bin change received:", message);
      setBinUpdates((prev) => [message, ...prev.slice(0, 99)]); // Keep last 100 updates
    };

    // Listen for bin changes
    on("bin_change", handleBinChange);

    return () => {
      off("bin_change", handleBinChange);
    };
  }, [on, off]);

  const clearUpdates = () => setBinUpdates([]);

  return {
    isConnected,
    connectionState,
    connect,
    disconnect,
    binUpdates,
    clearUpdates,
    lastUpdate: binUpdates[0] || null,
  };
}

// Hook for debugging realtime connection
export function useRealtimeDebug() {
  const { isConnected, connectionState, connect, disconnect, on, off } =
    useRealtime({ autoConnect: false });
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);

  useEffect(() => {
    const handleMessage = (message: RealtimeMessage) => {
      console.log("Debug - Realtime message:", message);
      setMessages((prev) => [
        {
          ...message,
          timestamp: message.timestamp || Date.now(),
        },
        ...prev.slice(0, 49),
      ]); // Keep last 50 messages
    };

    // Listen to all message types
    on("connection_established", handleMessage);
    on("subscribed", handleMessage);
    on("bin_change", handleMessage);
    on("pong", handleMessage);

    return () => {
      off("connection_established", handleMessage);
      off("subscribed", handleMessage);
      off("bin_change", handleMessage);
      off("pong", handleMessage);
    };
  }, [on, off]);

  const clearMessages = () => setMessages([]);

  return {
    isConnected,
    connectionState,
    connect,
    disconnect,
    messages,
    clearMessages,
    messageCount: messages.length,
  };
}
