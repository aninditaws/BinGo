const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post(
  "/signup",
  authLimiter,
  authController.constructor.signUpValidation,
  authController.signUp.bind(authController)
);
router.post(
  "/signin",
  authLimiter,
  authController.constructor.signInValidation,
  authController.signIn.bind(authController)
);
router.post(
  "/refresh-token",
  authLimiter,
  authController.refreshToken.bind(authController)
);

// Protected routes
router.post(
  "/signout",
  authMiddleware,
  authController.signOut.bind(authController)
);
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile.bind(authController)
);
router.put(
  "/profile",
  authMiddleware,
  authController.updateProfile.bind(authController)
);

module.exports = router;
