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
    return "http://172.16.0.247:3001/api";

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

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = await this.getStoredToken();

      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      console.log(`Making request to: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

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
}

export default new ApiService();
