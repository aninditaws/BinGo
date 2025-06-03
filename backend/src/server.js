const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const WebSocket = require("ws");
const url = require("url");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const routes = require("./routes");
const realtimeService = require("./services/realtimeService");

const app = express();
const PORT = process.env.PORT || 3001;

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({
  server,
  path: "/ws",
  verifyClient: async (info) => {
    try {
      // Extract token from query parameters
      const query = url.parse(info.req.url, true).query;
      const token = query.token;

      if (!token) {
        console.log("WebSocket connection rejected: No token provided");
        return false;
      }

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      info.req.userId = decoded.sub; // Store user ID for later use
      return true;
    } catch (error) {
      console.log(
        "WebSocket connection rejected: Invalid token",
        error.message
      );
      return false;
    }
  },
});

// Handle WebSocket connections
wss.on("connection", (ws, req) => {
  const userId = req.userId || req.url.split("userId=")[1]?.split("&")[0];
  console.log(`New WebSocket connection for user: ${userId}`);

  // Add connection to realtime service
  realtimeService.addConnection(userId, ws);

  // Send welcome message
  ws.send(
    JSON.stringify({
      type: "connection_established",
      message: "Connected to BinGo realtime service",
      userId: userId,
    })
  );

  // Handle messages from client
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`Message from user ${userId}:`, data);

      // Handle different message types
      switch (data.type) {
        case "ping":
          ws.send(JSON.stringify({ type: "pong", timestamp: Date.now() }));
          break;
        case "subscribe_bins":
          // Client is subscribing to bin updates (already handled by user ID)
          ws.send(
            JSON.stringify({
              type: "subscribed",
              topic: "bins",
              message: "Subscribed to bin updates",
            })
          );
          break;
        default:
          console.log("Unknown message type:", data.type);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  });

  // Handle connection close
  ws.on("close", () => {
    console.log(`WebSocket connection closed for user: ${userId}`);
    realtimeService.removeConnection(userId, ws);
  });

  // Handle connection error
  ws.on("error", (error) => {
    console.error(`WebSocket error for user ${userId}:`, error);
    realtimeService.removeConnection(userId, ws);
  });
});

// Log WebSocket server stats periodically
setInterval(() => {
  const connectedUsers = realtimeService.getConnectedUsersCount();
  const totalConnections = realtimeService.getTotalConnectionsCount();
  if (totalConnections > 0) {
    console.log(
      `📊 WebSocket Stats: ${connectedUsers} users, ${totalConnections} total connections`
    );
  }
}, 30000); // Every 30 seconds

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8081",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to BinGo API",
    version: "1.0.0",
    documentation: "/api/health",
    websocket: "/ws",
  });
});

// WebSocket status endpoint
app.get("/api/realtime/status", (req, res) => {
  res.json({
    connected_users: realtimeService.getConnectedUsersCount(),
    total_connections: realtimeService.getTotalConnectionsCount(),
    channels: Array.from(realtimeService.channels.keys()),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  realtimeService.cleanup();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  realtimeService.cleanup();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 BinGo API server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}/ws`);
});
