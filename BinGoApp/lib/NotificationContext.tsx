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
// import NotificationService from "./services/notificationService";

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

  // Initialize push notifications
  // useEffect(() => {
  //   const initPushNotifications = async () => {
  //     const token = await NotificationService.registerForPushNotifications();
  //     if (token) {
  //       console.log("Push notification token:", token);
  //       // Here you would typically send this token to your backend
  //     }
  //   };

  //   initPushNotifications();
  // }, []);

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

      // Show push notification
      // await NotificationService.scheduleLocalNotification(
      //   "BinGo Update",
      //   message
      // );

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

      const eventId = data.id; // Unique ID for the event
      const operation = data.operation;
      let notificationMessage = "";

      switch (operation) {
        case "INSERT":
          notificationMessage = `New bin "${data.record.title}" has been created.`;
          break;
        case "UPDATE":
          const oldRecord = data.old_record;
          const newRecord = data.record;
          const changes = [];

          if (oldRecord.title !== newRecord.title) {
            changes.push(
              `title changed from "${oldRecord.title}" to "${newRecord.title}"`
            );
          }
          if (oldRecord.status !== newRecord.status) {
            changes.push(
              `status changed from ${oldRecord.status} to ${newRecord.status}`
            );
          }
          if (oldRecord.organik_status !== newRecord.organik_status) {
            changes.push(
              `organik status changed from ${oldRecord.organik_status} to ${newRecord.organik_status}`
            );
          }
          if (oldRecord.anorganik_status !== newRecord.anorganik_status) {
            changes.push(
              `anorganik status changed from ${oldRecord.anorganik_status} to ${newRecord.anorganik_status}`
            );
          }
          if (oldRecord.b3_status !== newRecord.b3_status) {
            changes.push(
              `B3 status changed from ${oldRecord.b3_status} to ${newRecord.b3_status}`
            );
          }
          if (oldRecord.location !== newRecord.location) {
            changes.push(
              `location changed from "${oldRecord.location}" to "${newRecord.location}"`
            );
          }
          if (oldRecord.level_percentage !== newRecord.level_percentage) {
            changes.push(
              `fill level changed from ${oldRecord.level_percentage}% to ${newRecord.level_percentage}%`
            );
          }

          if (changes.length > 0) {
            notificationMessage = `Bin "${
              newRecord.title
            }" updated: ${changes.join(", ")}.`;
          } else {
            notificationMessage = `Bin "${newRecord.title}" has been updated (no specific field changes detected).`;
          }
          break;
        case "DELETE":
          // Make sure to access old_record for delete operations if that's where the title is
          notificationMessage = `Bin "${
            data.old_record?.title || "Unknown"
          }" has been deleted.`;
          break;
        default:
          console.log("Unknown operation type:", operation);
          return;
      }

      // Show notification immediately with the event ID
      showNotification(notificationMessage, eventId);
      // Refresh bins list
      refreshBins();
    };

    // Subscribe to bin changes using the correct message type
    // The WebSocket message type from your backend is 'subscribe_bins'
    // but the actual data update event seems to be nested.
    // Let's listen to the event that carries the actual bin data.
    // Based on your log: 📨 Received WebSocket message: {"data": {...}, "operation": "UPDATE", "type": "subscribe_bins"}
    // It seems like the "subscribe_bins" type itself is the event.
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
