const express = require("express");
const router = express.Router();
const {
  binsController,
  createBinValidation,
  updateBinValidation,
} = require("../controllers/binsController");
const { authMiddleware } = require("../middleware/auth");
const { validateRequest } = require("../middleware/validateRequest");

// Get all bins for authenticated user
router.get("/", authMiddleware, binsController.getUserBins);

// Search bins
router.get("/search", authMiddleware, binsController.searchBins);

// Get all bins (for search page)
router.get("/all", authMiddleware, binsController.getAllBins);

// Get specific bin by ID
router.get("/:id", authMiddleware, binsController.getBinById);

// Create new bin
router.post(
  "/",
  authMiddleware,
  createBinValidation,
  validateRequest,
  binsController.createBin
);

// Update bin
router.put(
  "/:id",
  authMiddleware,
  updateBinValidation,
  validateRequest,
  binsController.updateBin
);

// Delete bin
router.delete("/:id", authMiddleware, binsController.deleteBin);

module.exports = router;
