const { body } = require("express-validator");
const binsService = require("../services/binsService");

// Validation rules
const createBinValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("level_percentage")
    .isInt({ min: 0, max: 100 })
    .withMessage("Level percentage must be between 0 and 100"),
];

const updateBinValidation = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("location")
    .optional()
    .notEmpty()
    .withMessage("Location cannot be empty"),
  body("level_percentage")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Level percentage must be between 0 and 100"),
];

const binsController = {
  getUserBins: async (req, res) => {
    try {
      const bins = await binsService.getUserBins(req.user.id);
      res.json({ bins });
    } catch (error) {
      console.error("Get user bins error:", error);
      res.status(500).json({ error: "Failed to get bins" });
    }
  },

  getAllBins: async (req, res) => {
    try {
      const bins = await binsService.getAllBins();
      res.json({ bins });
    } catch (error) {
      console.error("Get all bins error:", error);
      res.status(500).json({ error: "Failed to get all bins" });
    }
  },

  searchBins: async (req, res) => {
    try {
      const { query, userBinsOnly } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }

      const userId = userBinsOnly === "true" ? req.user.id : null;
      const bins = await binsService.searchBins(query, userId);
      res.json({ bins });
    } catch (error) {
      console.error("Search bins error:", error);
      res.status(500).json({ error: "Failed to search bins" });
    }
  },

  getBinById: async (req, res) => {
    try {
      const { id } = req.params;

      const bin = await binsService.getBinById(id);

      if (!bin) {
        return res.status(404).json({ error: "Bin not found." });
      }

      res.status(200).json({
        bin: bin,
      });
    } catch (error) {
      console.error("Get bin by ID controller error:", error);
      res.status(500).json({ error: "Failed to get bin details." });
    }
  },

  createBin: async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        title,
        location,
        level_percentage = 0,
        status = "empty",
        organik_status = "empty",
        anorganik_status = "empty",
        b3_status = "empty",
      } = req.body;

      const newBin = await binsService.createBin({
        title,
        location,
        level_percentage,
        user_id: userId,
        status,
        organik_status,
        anorganik_status,
        b3_status,
      });

      res.status(201).json({
        message: "Bin created successfully",
        bin: newBin,
      });
    } catch (error) {
      console.error("Create bin controller error:", error);
      res.status(500).json({ error: "Failed to create bin." });
    }
  },

  updateBin: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const updateData = req.body;

      const updatedBin = await binsService.updateBin(id, userId, updateData);

      if (!updatedBin) {
        return res.status(404).json({ error: "Bin not found." });
      }

      res.status(200).json({
        message: "Bin updated successfully",
        bin: updatedBin,
      });
    } catch (error) {
      console.error("Update bin controller error:", error);
      res.status(500).json({ error: "Failed to update bin." });
    }
  },

  deleteBin: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const deleted = await binsService.deleteBin(id, userId);

      if (!deleted) {
        return res.status(404).json({ error: "Bin not found." });
      }

      res.status(200).json({
        message: "Bin deleted successfully",
      });
    } catch (error) {
      console.error("Delete bin controller error:", error);
      res.status(500).json({ error: "Failed to delete bin." });
    }
  },
};

module.exports = {
  binsController,
  createBinValidation,
  updateBinValidation,
};
