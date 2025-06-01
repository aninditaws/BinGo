import React, { createContext, useContext, useState, useCallback } from "react";
import apiService, { type Bin } from "./services/apiService";

interface BinsContextType {
  bins: Bin[];
  loading: boolean;
  error: string | null;
  refreshBins: () => Promise<void>;
  searchBins: (query: string, userBinsOnly?: boolean) => Promise<void>;
  getAllBins: () => Promise<void>;
}

const BinsContext = createContext<BinsContextType | undefined>(undefined);

export const useBins = () => {
  const context = useContext(BinsContext);
  if (!context) {
    throw new Error("useBins must be used within a BinsProvider");
  }
  return context;
};

export const BinsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshBins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUserBins();

      if (response.error) {
        setError(response.error);
      } else {
        setBins(response.data?.bins || []);
      }
    } catch (error) {
      console.error("Error loading bins:", error);
      setError("Failed to load bins");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchBins = useCallback(
    async (query: string, userBinsOnly: boolean = false) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.searchBins(query, userBinsOnly);

        if (response.error) {
          setError(response.error);
        } else {
          setBins(response.data?.bins || []);
        }
      } catch (error) {
        console.error("Error searching bins:", error);
        setError("Failed to search bins");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getAllBins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getAllBins();

      if (response.error) {
        setError(response.error);
      } else {
        setBins(response.data?.bins || []);
      }
    } catch (error) {
      console.error("Error loading all bins:", error);
      setError("Failed to load all bins");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    bins,
    loading,
    error,
    refreshBins,
    searchBins,
    getAllBins,
  };

  return <BinsContext.Provider value={value}>{children}</BinsContext.Provider>;
};
