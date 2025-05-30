const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "BinGo API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use("/auth", authRoutes);

module.exports = router;
