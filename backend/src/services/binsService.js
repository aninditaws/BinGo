const { supabase } = require("../config/supabase");

class BinsService {
  async getUserBins(userId) {
    try {
      const { data, error } = await supabase
        .from("bins")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Get user bins service error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Get user bins service error:", error);
      throw error;
    }
  }

  async getAllBins() {
    try {
      const { data, error } = await supabase
        .from("bins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Get all bins service error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Get all bins service error:", error);
      throw error;
    }
  }

  async searchBins(searchQuery, userId = null) {
    try {
      let query = supabase
        .from("bins")
        .select("*")
        .or(`title.ilike.%${searchQuery}%, location.ilike.%${searchQuery}%`)
        .order("created_at", { ascending: false });

      // If userId is provided, only search user's bins
      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Search bins service error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Search bins service error:", error);
      throw error;
    }
  }

  async getBinById(binId, userId) {
    try {
      const { data, error } = await supabase
        .from("bins")
        .select("*")
        .eq("id", binId)
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Get bin by ID service error:", error);
        if (error.code === "PGRST116") {
          // No rows returned
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Get bin by ID service error:", error);
      throw error;
    }
  }

  async createBin(binData) {
    try {
      const { data, error } = await supabase
        .from("bins")
        .insert([binData])
        .select("*")
        .single();

      if (error) {
        console.error("Create bin service error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Create bin service error:", error);
      throw error;
    }
  }

  async updateBin(binId, userId, updateData) {
    try {
      // Remove user_id from updateData to prevent overriding
      const { user_id, ...safeUpdateData } = updateData;

      const { data, error } = await supabase
        .from("bins")
        .update(safeUpdateData)
        .eq("id", binId)
        .eq("user_id", userId)
        .select("*")
        .single();

      if (error) {
        console.error("Update bin service error:", error);
        if (error.code === "PGRST116") {
          // No rows returned - bin not found or doesn't belong to user
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Update bin service error:", error);
      throw error;
    }
  }

  async deleteBin(binId, userId) {
    try {
      const { data, error } = await supabase
        .from("bins")
        .delete()
        .eq("id", binId)
        .eq("user_id", userId)
        .select("*");

      if (error) {
        console.error("Delete bin service error:", error);
        throw error;
      }

      return data.length > 0;
    } catch (error) {
      console.error("Delete bin service error:", error);
      throw error;
    }
  }
}

module.exports = new BinsService();
