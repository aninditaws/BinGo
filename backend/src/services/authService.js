const { supabase } = require("../config/supabase");

class AuthService {
  async signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Signup service error:", error);
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Signin service error:", error);
      throw error;
    }
  }

  async signOut(accessToken) {
    try {
      // Set the auth token for this request
      const { error } = await supabase.auth.admin.signOut(accessToken);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error("Signout service error:", error);
      throw error;
    }
  }

  async getUser(accessToken) {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(accessToken);

      if (error) {
        throw error;
      }

      return user;
    } catch (error) {
      console.error("Get user service error:", error);
      throw error;
    }
  }

  async refreshSession(refreshToken) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) {
        throw error;
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Refresh session service error:", error);
      throw error;
    }
  }
}

module.exports = new AuthService();
