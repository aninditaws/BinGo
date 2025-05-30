const { body, validationResult } = require("express-validator");
const authService = require("../services/authService");

class AuthController {
  // Validation rules
  static signUpValidation = [
    body("email").isEmail().withMessage("Email format is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];

  static signInValidation = [
    body("email").isEmail().withMessage("Email format is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];

  async signUp(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        });
      }

      const { email, password, options } = req.body;
      const result = await authService.signUp(email, password, options);

      res.status(201).json({
        message:
          "User created successfully. Please check your email for verification.",
        user: result.user,
        session: result.session,
      });
    } catch (error) {
      console.error("SignUp controller error:", error);

      let errorMessage = "Registration failed. Please try again.";
      if (error.message.includes("already registered")) {
        errorMessage = "Email already registered. Please login instead.";
      } else if (error.message.includes("Invalid email")) {
        errorMessage = "Invalid email format.";
      } else if (error.message.includes("Password")) {
        errorMessage = "Password must be at least 6 characters long.";
      }

      res.status(400).json({ error: errorMessage });
    }
  }

  async signIn(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        });
      }

      const { email, password } = req.body;
      const result = await authService.signIn(email, password);

      res.status(200).json({
        message: "Login successful",
        user: result.user,
        session: result.session,
      });
    } catch (error) {
      console.error("SignIn controller error:", error);

      let errorMessage = "Invalid email or password. Please try again.";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage =
          "Email not verified. Please check your email for verification link.";
      } else if (error.message.includes("Invalid email")) {
        errorMessage = "Invalid email format.";
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Too many login attempts. Please try again later.";
      }

      res.status(401).json({ error: errorMessage });
    }
  }

  async signOut(req, res) {
    try {
      const accessToken = req.token; // from auth middleware
      await authService.signOut(accessToken);

      res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      console.error("SignOut controller error:", error);
      res.status(500).json({ error: "Logout failed. Please try again." });
    }
  }

  async getProfile(req, res) {
    try {
      const user = req.user; // from auth middleware

      // Get profile data from profiles table
      let profile = null;
      try {
        profile = await authService.getUserProfile(user.id);
      } catch (profileError) {
        console.log("Profile not found for user:", user.id);
        // Profile will remain null
      }

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          email_confirmed_at: user.email_confirmed_at,
          created_at: user.created_at,
          updated_at: user.updated_at,
          // Include metadata
          full_name:
            user.user_metadata?.full_name || user.user_metadata?.display_name,
          display_name: user.user_metadata?.display_name,
          first_name: user.user_metadata?.first_name,
          last_name: user.user_metadata?.last_name,
        },
        profile: profile || null,
      });
    } catch (error) {
      console.error("Get profile controller error:", error);
      res.status(500).json({ error: "Failed to get user profile." });
    }
  }

  async getProfileById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // Get profile data from profiles table
      let profile = null;
      try {
        profile = await authService.getUserProfile(id);
      } catch (profileError) {
        console.log("Profile not found for user:", id);
        return res.status(404).json({ error: "Profile not found" });
      }

      res.status(200).json({
        profile: profile,
      });
    } catch (error) {
      console.error("Get profile by ID controller error:", error);
      res.status(500).json({ error: "Failed to get user profile." });
    }
  }

  async updateProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        });
      }

      const userId = req.user.id;
      const { full_name, first_name, last_name, location, avatar_url } =
        req.body;

      // Display name automatically follows full name
      const display_name = full_name;

      // Update user metadata with both full_name and display_name
      if (full_name) {
        try {
          await authService.updateUserMetadata(userId, {
            display_name: display_name,
            full_name: full_name,
          });
        } catch (metadataError) {
          console.error("Failed to update user metadata:", metadataError);
          // Continue with profile update even if metadata update fails
        }
      }

      // Update profile in profiles table
      const updatedProfile = await authService.updateUserProfile(userId, {
        full_name: full_name,
        display_name: display_name,
        first_name,
        last_name,
        location,
        avatar_url,
      });

      // Get fresh user and profile data to return
      const user = req.user;
      let profile = null;
      try {
        profile = await authService.getUserProfile(userId);
      } catch (profileError) {
        console.log("Could not fetch updated profile");
      }

      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
          full_name: full_name,
        },
        profile: profile,
      });
    } catch (error) {
      console.error("Update profile controller error:", error);
      res.status(500).json({ error: "Failed to update profile." });
    }
  }

  async getLocation(req, res) {
    try {
      const userId = req.user.id;
      const location = await authService.getUserLocation(userId);

      res.status(200).json({
        location: location || null,
      });
    } catch (error) {
      console.error("Get location controller error:", error);
      res.status(500).json({ error: "Failed to get user location." });
    }
  }

  async updateLocation(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        });
      }

      const userId = req.user.id;
      const { location } = req.body;

      // Update location in profiles table
      const updatedProfile = await authService.updateUserLocation(
        userId,
        location
      );

      res.status(200).json({
        message: "Location updated successfully",
        location: location,
      });
    } catch (error) {
      console.error("Update location controller error:", error);
      res.status(500).json({ error: "Failed to update location." });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refresh_token } = req.body;

      if (!refresh_token) {
        return res.status(400).json({ error: "Refresh token is required" });
      }

      const result = await authService.refreshSession(refresh_token);

      res.status(200).json({
        message: "Token refreshed successfully",
        user: result.user,
        session: result.session,
      });
    } catch (error) {
      console.error("Refresh token controller error:", error);
      res.status(401).json({ error: "Invalid refresh token" });
    }
  }
}

module.exports = new AuthController();
