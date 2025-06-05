const { supabaseAdmin } = require("../config/supabase");

class RealtimeService {
  constructor() {
    this.activeConnections = new Map(); // Store WebSocket connections by user ID
    this.channels = new Map(); // Store Supabase channels
    this.initializeRealtimeListener();
  }

  async initializeRealtimeListener() {
    try {
      // Create a channel to listen for bins table changes
      // Using supabaseAdmin (service role) which has necessary permissions
      const binsChannel = supabaseAdmin
        .channel("bins_changes", {
          config: {
            private: true, // Still good practice, service role can access
            broadcast: { self: false }, // Backend doesn't need its own broadcasts
          },
        })
        .on("broadcast", { event: "INSERT" }, (payload) => {
          console.log("New bin created:", payload);
          this.handleBinChange("INSERT", payload);
        })
        .on("broadcast", { event: "UPDATE" }, (payload) => {
          console.log("Bin updated:", payload);
          this.handleBinChange("UPDATE", payload);
        })
        .on("broadcast", { event: "DELETE" }, (payload) => {
          console.log("Bin deleted:", payload);
          this.handleBinChange("DELETE", payload);
        })
        .subscribe((status, err) => {
          console.log("Realtime subscription status:", status);
          if (status === "SUBSCRIBED") {
            console.log("✅ Successfully subscribed to bins realtime changes");
          } else if (status === "CHANNEL_ERROR") {
            console.error("❌ Error subscribing to realtime channel:", err);
            // Retry logic could be added here
            setTimeout(() => this.initializeRealtimeListener(), 5000); // Retry after 5 seconds
          } else if (status === "TIMED_OUT") {
            console.error("❌ Realtime subscription timed out. Retrying...");
            setTimeout(() => this.initializeRealtimeListener(), 5000); // Retry after 5 seconds
          } else if (status === "CLOSED") {
            console.warn(
              "Realtime channel closed. Will attempt to resubscribe if not intentional."
            );
          }
        });

      this.channels.set("bins_changes", binsChannel);
    } catch (error) {
      console.error("Error initializing realtime listener:", error);
      // Retry after 5 seconds
      setTimeout(() => this.initializeRealtimeListener(), 5000);
    }
  }

  handleBinChange(operation, payload) {
    // Extract user_id from the payload to send updates to specific users
    const userId =
      payload.payload?.new?.user_id ||
      payload.payload?.old?.user_id ||
      payload.payload?.record?.user_id;

    if (!userId) {
      console.warn("No user_id found in realtime payload:", payload);
      return;
    }

    // Send real-time update to connected frontend clients for this user
    this.notifyFrontendClients(userId, {
      type: "subscribe_bins",
      operation,
      data: payload.payload,
    });
  }

  notifyFrontendClients(userId, message) {
    // Get all WebSocket connections for this user

    const userConnections = Array.from(this.activeConnections.entries())
      .flatMap(([_, connections]) => connections);
    
    userConnections.forEach((ws) => {
      if (ws.readyState === 1) {
        // WebSocket.OPEN
        try {
          ws.send(JSON.stringify(message));
        } catch (error) {
          console.error("Error sending message to frontend client:", error);
          // Remove dead connections
          this.removeConnection(userId, ws);
        }
      } else {
        // Remove closed connections
        this.removeConnection(userId, ws);
      }
    });
  }

  // Add WebSocket connection for a user
  addConnection(userId, ws) {
    if (!this.activeConnections.has(userId)) {
      this.activeConnections.set(userId, []);
    }
    this.activeConnections.get(userId).push(ws);

    console.log(`Added WebSocket connection for user ${userId}`);
  }

  // Remove WebSocket connection for a user
  removeConnection(userId, ws) {
    if (!this.activeConnections.has(userId)) return;

    const connections = this.activeConnections.get(userId);
    const index = connections.indexOf(ws);

    if (index !== -1) {
      connections.splice(index, 1);
      console.log(`Removed WebSocket connection for user ${userId}`);

      // Clean up empty arrays
      if (connections.length === 0) {
        this.activeConnections.delete(userId);
      }
    }
  }

  // Get connected users count
  getConnectedUsersCount() {
    return this.activeConnections.size;
  }

  // Get total connections count
  getTotalConnectionsCount() {
    let total = 0;
    this.activeConnections.forEach((connections) => {
      total += connections.length;
    });
    return total;
  }

  // Cleanup method for graceful shutdown
  cleanup() {
    // Unsubscribe from all channels
    this.channels.forEach((channel) => {
      channel.unsubscribe();
    });
    this.channels.clear();

    // Close all WebSocket connections
    this.activeConnections.forEach((connections) => {
      connections.forEach((ws) => {
        if (ws.readyState === 1) {
          ws.close();
        }
      });
    });
    this.activeConnections.clear();

    console.log("Realtime service cleaned up");
  }
}

module.exports = new RealtimeService();
