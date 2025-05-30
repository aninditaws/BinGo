const { supabase, supabaseAdmin } = require("../config/supabase");

class AuthService {
  async signUp(email, password, options) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: options.data.full_name,
            full_name: options.data.full_name,
          },
        },
      });

      if (error) {
        throw error;
      }

      await this.upsertUserProfile(data.user.id, {
        full_name: options.data.full_name,
        display_name: options.data.full_name,
        email: email,
      });

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

  async createUserProfile(user) {
    try {
      const { data, error } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          full_name:
            user.user_metadata.full_name || user.user_metadata.display_name,
          avatar_url: null,
          location: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Profile creation error:", error);
        // Don't throw here as auth user was created successfully
        // Profile creation failure shouldn't block login
      }

      return data;
    } catch (error) {
      console.error("Profile creation service error:", error);
    }
  }

  async updateUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Profile update service error:", error);
      throw error;
    }
  }

  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Get user profile service error:", error);
      throw error;
    }
  }

  async upsertUserProfile(userId, profileData) {
    try {
      const profileRecord = {
        id: userId,
        ...profileData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(profileRecord, {
          onConflict: "id",
        })
        .select()
        .single();

      if (error) {
        console.error("Upsert profile error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Profile upsert service error:", error);
      throw error;
    }
  }

  async getUserLocation(userId) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("location")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      return data?.location;
    } catch (error) {
      console.error("Get user location service error:", error);
      throw error;
    }
  }

  async updateUserLocation(userId, location) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          location: location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select("location")
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Update user location service error:", error);
      throw error;
    }
  }

  async updateUserMetadata(userId, metadata) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        {
          user_metadata: {
            ...metadata,
          },
        }
      );

      if (error) {
        console.error("Update user metadata error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Update user metadata service error:", error);
      throw error;
    }
  }
}

module.exports = new AuthService();
