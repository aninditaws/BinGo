import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRealtime } from "./hooks/useRealtime";
import NotificationPopup from "../components/NotificationPopup";
import { useBins } from "./BinsContext";

interface NotificationContextType {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    timestamp: string;
    id: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { on, off } = useRealtime();
  const { refreshBins } = useBins();

  // Add refs for debouncing and deduplication
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const lastNotificationId = useRef<string | null>(null);

  const clearTimers = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const showNotification = useCallback(
    (message: string, eventId: string) => {
      // If this is the same notification event, don't show it again
      if (lastNotificationId.current === eventId) {
        return;
      }

      const now = new Date();
      const timestamp = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Clear any existing timers
      clearTimers();

      // Update last notification ID
      lastNotificationId.current = eventId;

      // Set the new notification
      setNotification({ message, timestamp, id: eventId });
      setIsVisible(true);

      // Set new hide timer
      hideTimer.current = setTimeout(() => {
        setIsVisible(false);
        // Clear the notification ID after it's hidden
        lastNotificationId.current = null;
      }, 5000);
    },
    [clearTimers]
  );

  useEffect(() => {
    const handleBinChange = (message: any) => {
      const data = message.data;
      if (!data) return;

      const eventId = data.id; // Use the event ID from the WebSocket message
      const operation = data.operation;
      let notificationMessage = "";

      switch (operation) {
        case "INSERT":
          notificationMessage = `New bin "${data.record.title}" has been created`;
          break;
        case "UPDATE":
          notificationMessage = `Bin "${data.record.title}" has been updated`;
          break;
        case "DELETE":
          notificationMessage = `Bin has been deleted`;
          break;
        default:
          return;
      }

      // Show notification immediately with the event ID
      showNotification(notificationMessage, eventId);
      // Refresh bins list
      refreshBins();
    };

    // Subscribe to bin changes using the correct message type
    on("subscribe_bins", handleBinChange);

    return () => {
      off("subscribe_bins", handleBinChange);
      clearTimers();
    };
  }, [on, off, refreshBins, showNotification, clearTimers]);

  const hideNotification = () => {
    setIsVisible(false);
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification: (msg) => showNotification(msg, "manual") }}
    >
      {children}
      {notification && (
        <NotificationPopup
          message={notification.message}
          timestamp={notification.timestamp}
          onClose={hideNotification}
          isVisible={isVisible}
        />
      )}
    </NotificationContext.Provider>
  );
};
