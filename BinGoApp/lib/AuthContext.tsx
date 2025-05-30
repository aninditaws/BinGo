import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "./services/apiService";

interface User {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    options: {
      data: {
        full_name: string;
      };
    }
  ) => Promise<{
    error: Error | null;
    data: { user: any } | null;
  }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
    data: { user: any } | null;
  }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const authenticated = await apiService.isAuthenticated();

      if (authenticated) {
        const response = await apiService.getProfile();
        if (response.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    options: {
      data: {
        full_name: string;
      };
    }
  ) => {
    try {
      const response = await apiService.signUp(email, password, options);

      if (response.error) {
        return { error: new Error(response.error), data: null };
      }

      if (response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { data: { user: response.data.user }, error: null };
      }

      return { error: new Error("Gagal mendaftar"), data: null };
    } catch (error) {
      console.error("Signup exception:", error);
      return { error: error as Error, data: null };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiService.signIn(email, password);

      if (response.error) {
        return { error: new Error(response.error), data: null };
      }

      if (response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { data: { user: response.data.user }, error: null };
      }

      return { error: new Error("Gagal login"), data: null };
    } catch (error) {
      console.error("Signin exception:", error);
      return { error: error as Error, data: null };
    }
  };

  const signOut = async () => {
    try {
      await apiService.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if the API call fails, we should clear local state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
