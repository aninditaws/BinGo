const express = require("express");
const router = express.Router();
const {
  binsController,
  createBinValidation,
  updateBinValidation,
} = require("../controllers/binsController");
const { authMiddleware } = require("../middleware/auth");

// Get all bins for authenticated user
router.get("/", authMiddleware, binsController.getUserBins);

// Get specific bin by ID
router.get("/:id", authMiddleware, binsController.getBinById);

// Create new bin
router.post("/", authMiddleware, createBinValidation, binsController.createBin);

// Update bin
router.put(
  "/:id",
  authMiddleware,
  updateBinValidation,
  binsController.updateBin
);

// Delete bin
router.delete("/:id", authMiddleware, binsController.deleteBin);

module.exports = router;
