import AsyncStorage from "@react-native-async-storage/async-storage";

// Get your machine's IP address by running: ipconfig (Windows) or ifconfig (Mac/Linux)
// Example: If your IP is 192.168.1.100, use 'http://192.168.1.100:3001/api'
const getApiBaseUrl = (): string => {
  if (__DEV__) {
    // STEP 1: Find your computer's IP address
    // Windows: Run 'ipconfig' and look for IPv4 Address
    // Mac/Linux: Run 'ifconfig' and look for inet address

    // STEP 2: Replace localhost with your IP address
    // Example: return 'http://192.168.1.100:3001/api';
    return "http://192.168.0.25:3001/api";

    // For Android emulator, use this special IP:
    return "http://10.0.2.2:3001/api";

    // Current setting (change this to your IP):
    return "http://localhost:3001/api";
  }

  // Production API URL
  return "https://your-production-api.com/api";
};

const API_BASE_URL = getApiBaseUrl();

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

interface Bin {
  id: string;
  title: string;
  location: string;
  level_percentage: number;
  last_updated: string;
  created_at: string;
  user_id: string;
  status: string;
  organik_status: string;
  anorganik_status: string;
  b3_status: string;
}

class ApiService {
  private async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("access_token");
    } catch (error) {
      console.error("Error getting stored token:", error);
      return null;
    }
  }

  private async setStoredToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem("access_token", token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  }

  private async setStoredRefreshToken(refreshToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem("refresh_token", refreshToken);
    } catch (error) {
      console.error("Error storing refresh token:", error);
    }
  }

  private async getStoredRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("refresh_token");
    } catch (error) {
      console.error("Error getting stored refresh token:", error);
      return null;
    }
  }

  private async clearStoredTokens(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
    } catch (error) {
      console.error("Error clearing stored tokens:", error);
    }
  }

  private async makeRequest(
    endpoint: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: string;
    } = {}
  ): Promise<ApiResponse> {
    try {
      const token = await this.getStoredToken();
      const config: RequestInit = {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...(options.body && { body: options.body }),
      };

      console.log(`Making request to: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      // Handle token expiry
      if (
        response.status === 401 &&
        token &&
        endpoint !== "/auth/refresh-token"
      ) {
        console.log("Token expired, attempting refresh...");
        const refreshResult = await this.refreshToken();

        if (!refreshResult.error) {
          // Retry the original request with new token
          const newToken = await this.getStoredToken();
          const retryConfig: RequestInit = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newToken}`,
            },
          };

          console.log(`Retrying request to: ${API_BASE_URL}${endpoint}`);
          const retryResponse = await fetch(
            `${API_BASE_URL}${endpoint}`,
            retryConfig
          );

          if (!retryResponse.ok) {
            const errorData = await retryResponse
              .json()
              .catch(() => ({ error: "Request failed" }));
            return {
              error: errorData.error + " " + errorData.details[0].msg,
            };
          }

          const data = await retryResponse.json();
          return { data };
        } else {
          // Refresh failed, clear tokens and return error
          await this.clearStoredTokens();
          return {
            error: "Session expired. Please login again.",
          };
        }
      }

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Request failed" }));
        return {
          error: errorData.error + " " + errorData.details[0].msg,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("API request error:", error);
      if (
        error instanceof TypeError &&
        error.message.includes("Network request failed")
      ) {
        return {
          error:
            "Cannot connect to server. Please check if the backend is running and accessible.",
        };
      }
      return { error: "Network error. Please check your connection." };
    }
  }

  async signUp(
    email: string,
    password: string,
    options: {
      data: { full_name: string };
    }
  ): Promise<ApiResponse> {
    const response = await this.makeRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        options,
      }),
    });

    if (response.data?.session) {
      await this.setStoredToken(response.data.session.access_token);
      await this.setStoredRefreshToken(response.data.session.refresh_token);
    }

    return response;
  }

  async signIn(email: string, password: string): Promise<ApiResponse> {
    const response = await this.makeRequest("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.session) {
      await this.setStoredToken(response.data.session.access_token);
      await this.setStoredRefreshToken(response.data.session.refresh_token);
    }

    return response;
  }

  async signOut(): Promise<ApiResponse> {
    const response = await this.makeRequest("/auth/signout", {
      method: "POST",
    });

    await this.clearStoredTokens();
    return response;
  }

  async getProfile(): Promise<ApiResponse> {
    return this.makeRequest("/auth/profile", {
      method: "GET",
    });
  }

  async updateProfile(profileData: {
    full_name?: string;
    display_name?: string;
    first_name?: string;
    last_name?: string;
    location?: string;
    avatar_url?: string;
  }): Promise<ApiResponse> {
    return this.makeRequest("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  async getLocation(): Promise<ApiResponse> {
    return this.makeRequest("/auth/location");
  }

  async updateLocation(location: string): Promise<ApiResponse> {
    return this.makeRequest("/auth/location", {
      method: "PUT",
      body: JSON.stringify({ location }),
    });
  }

  async refreshToken(): Promise<ApiResponse> {
    const refreshToken = await this.getStoredRefreshToken();

    if (!refreshToken) {
      return { error: "No refresh token available" };
    }

    const response = await this.makeRequest("/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.data?.session) {
      await this.setStoredToken(response.data.session.access_token);
      await this.setStoredRefreshToken(response.data.session.refresh_token);
    }

    return response;
  }

  async healthCheck(): Promise<ApiResponse> {
    return this.makeRequest("/health");
  }

  // Method to check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    if (!token) return false;

    // Try to get profile to verify token validity
    const response = await this.getProfile();
    return !response.error;
  }

  async getUserProfile(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/auth/profile/${id}`);
  }

  // ========== BINS METHODS ==========

  async getUserBins(): Promise<ApiResponse<{ bins: Bin[] }>> {
    return this.makeRequest("/bins");
  }

  async getAllBins(): Promise<ApiResponse<{ bins: Bin[] }>> {
    return this.makeRequest("/bins/all");
  }

  async searchBins(
    query: string,
    userBinsOnly: boolean = false
  ): Promise<ApiResponse<{ bins: Bin[] }>> {
    return this.makeRequest(
      `/bins/search?query=${encodeURIComponent(
        query
      )}&userBinsOnly=${userBinsOnly}`
    );
  }

  async getBinById(binId: string): Promise<ApiResponse<{ bin: Bin }>> {
    return this.makeRequest(`/bins/${binId}`);
  }

  async createBin(binData: {
    title: string;
    location: string;
    level_percentage?: number;
    status?: string;
    organik_status?: string;
    anorganik_status?: string;
    b3_status?: string;
  }): Promise<ApiResponse<{ bin: Bin }>> {
    return this.makeRequest("/bins", {
      method: "POST",
      body: JSON.stringify(binData),
    });
  }

  async updateBin(
    binId: string,
    updateData: {
      title?: string;
      location?: string;
      level_percentage?: number;
      status?: string;
      organik_status?: string;
      anorganik_status?: string;
      b3_status?: string;
    }
  ): Promise<ApiResponse<{ bin: Bin }>> {
    return this.makeRequest(`/bins/${binId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  async deleteBin(binId: string): Promise<ApiResponse> {
    return this.makeRequest(`/bins/${binId}`, {
      method: "DELETE",
    });
  }
}

export { type Bin };
export default new ApiService();
