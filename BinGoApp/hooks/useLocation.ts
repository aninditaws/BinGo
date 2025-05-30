import { useState, useCallback } from "react";
import { useAuth } from "../lib/AuthContext";
import apiService from "../lib/services/apiService";

export const useLocation = () => {
  const {
    profile,
    updateLocation: updateLocationContext,
    refreshProfile,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getLocation();

      if (response.error) {
        setError(response.error);
        return null;
      }

      return response.data?.location || null;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get location";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLocation = useCallback(
    async (location: string) => {
      setLoading(true);
      setError(null);

      try {
        const result = await updateLocationContext(location);

        if (result.error) {
          setError(result.error.message);
          return false;
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update location";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [updateLocationContext]
  );

  return {
    location: profile?.location || null,
    loading,
    error,
    getLocation,
    updateLocation,
    refreshProfile,
  };
};
