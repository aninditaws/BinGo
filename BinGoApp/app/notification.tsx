import * as React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg";
import User from "../assets/icons/user-pink.svg";
import { Gap, Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useRouter } from "expo-router";
import apiService, { Bin } from "@/lib/services/apiService";

const Notification = () => {
  const router = useRouter();
  const [notifications, setNotifications] = React.useState<
    Record<string, any[]>
  >({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, get all bins belonging to the user
      const binsResponse = await apiService.getUserBins();
      if (!binsResponse.data?.bins || !Array.isArray(binsResponse.data.bins)) {
        console.warn(
          "No bins found or unexpected data format:",
          binsResponse.data
        );
        setNotifications({});
        return;
      }

      // For each bin, get its notifications
      const allNotifications: any[] = [];
      for (const bin of binsResponse.data.bins) {
        const notifResponse = await apiService.getNotifications(bin.id);
        if (notifResponse.data && Array.isArray(notifResponse.data)) {
          allNotifications.push(...notifResponse.data);
        }
      }

      // Sort notifications by date (newest first) and group them
      allNotifications.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Group notifications by date
      const grouped = allNotifications.reduce(
        (acc: Record<string, any[]>, notification: any) => {
          const date = new Date(notification.created_at).toLocaleDateString(
            "id-ID",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(notification);
          return acc;
        },
        {}
      );

      setNotifications(grouped);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationPress = async (notification: any) => {
    try {
      console.log("Notification press");
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Dynamic positioning similar to search page
  const dynamicStyles = StyleSheet.create({
    frameParent: {
      ...styles.frameParent,
      top: Platform.OS === "web" ? 135 : 155, // Adjust content position to match topbar
    },
    topbar: {
      ...styles.topbar,
      paddingTop: Platform.OS === "web" ? 45 : 60, // Responsive padding like other pages
      paddingBottom: Platform.OS === "web" ? 15 : 20,
    },
    chevronIcon: {
      width: 28, // Make back icon bigger like search page
      height: 28,
    },
  });

  return (
    <ScrollView style={[styles.notification, styles.borderBorder]}>
      <View style={dynamicStyles.frameParent}>
        {loading && (
          <Text style={styles.loadingText}>Loading notifications...</Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && Object.keys(notifications).length === 0 && (
          <Text style={styles.emptyText}>No notifications to display.</Text>
        )}
        {!loading &&
          !error &&
          Object.keys(notifications).map((dateGroup) => (
            <View key={dateGroup} style={styles.senin19Mei2025Parent}>
              <Text style={styles.senin19Mei}>{dateGroup}</Text>
              <View style={styles.notificationCardsParent}>
                {(notifications[dateGroup] as any[]).map(
                  (item: any, index: number) => (
                    <Pressable
                      key={item.id || index}
                      onPress={() => handleNotificationPress(item)}
                    >
                      <View
                        style={[
                          styles.notificationCards,
                          styles.notificationFlexBox,
                          index === 0 && styles.firstNotificationCard, // Add top border for the first card in a group if needed
                        ]}
                      >
                        <View style={styles.lucideuserParent}>
                          <User
                            style={styles.lucideuserIcon}
                            width={18}
                            height={18}
                          />
                          <Text style={styles.tempatSampahKoicaContainer}>
                            <Text style={styles.tempatSampahKoica1SudahH}>
                              {/* Assuming 'title' and 'message' come from API */}
                              <Text style={styles.tempatSampahKoica}>
                                {item.title || "Notification"}
                              </Text>
                              <Text style={styles.sudahHampirPenuh}>
                                <Text style={styles.sudahHampirPenuh1}>
                                  {` ${
                                    item.message || "Details not available"
                                  }`}
                                </Text>
                              </Text>
                            </Text>
                            <Text style={styles.sudahHampirPenuh}>
                              <Text style={styles.wib1}>
                                (
                                {new Date(item.created_at).toLocaleTimeString(
                                  "id-ID",
                                  { hour: "2-digit", minute: "2-digit" }
                                )}{" "}
                                WIB)
                              </Text>
                            </Text>
                          </Text>
                        </View>
                        {/* Show dot if notification is unread, assuming 'is_read' field */}
                        {/* Backend needs to provide 'is_read' or similar, or we assume all fetched are unread initially */}
                        {!item.is_read && (
                          <View style={styles.notificationDot} />
                        )}
                      </View>
                    </Pressable>
                  )
                )}
              </View>
            </View>
          ))}
      </View>
      <View style={[dynamicStyles.topbar, styles.topbarLayout]}>
        <Pressable
          style={styles.brandName}
          onPress={() => router.push("/home")}
        >
          <ChevronRight
            style={dynamicStyles.chevronIcon}
            width={28}
            height={28}
          />
          <Text style={styles.title}>Notifikasi</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  topbarLayout: {
    width: "100%",
    left: 0,
  },
  notificationFlexBox: {
    gap: Gap.gap_0,
    justifyContent: "space-between",
    paddingVertical: 16,
    flexDirection: "row",
    minHeight: 80,
    borderBottomWidth: 1,
    borderColor: "#e5e0eb",
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    borderStyle: "solid",
    backgroundColor: "#fcfdfb",
  },
  senin19Mei: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left",
    color: "#1e3014",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    alignSelf: "stretch",
    marginBottom: 8,
  },
  lucideuserIcon: {
    overflow: "hidden",
  },
  tempatSampahKoica: {
    fontFamily: "Poppins-SemiBold",
    color: "#1e3014",
    fontWeight: "600",
  },
  sudahHampirPenuh1: {
    color: "#1a141f",
  },
  sudahHampirPenuh: {
    fontFamily: "Poppins-Regular",
  },
  tempatSampahKoica1SudahH: {
    fontSize: 14,
    lineHeight: 18,
  },
  wib1: {
    fontSize: 12,
    color: "#aba7af",
    lineHeight: 16,
  },
  tempatSampahKoicaContainer: {
    flex: 1,
    textAlign: "left",
  },
  lucideuserParent: {
    flex: 1,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationCards: {
    borderColor: "#e5e0eb",
    gap: Gap.gap_0,
    justifyContent: "space-between",
    paddingHorizontal: Padding.md,
    alignItems: "center",
    borderStyle: "solid",
    backgroundColor: Color.grayscaleWhite,
  },
  notificationCardsParent: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: Color.grayscaleWhite,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
    shadowOpacity: 1,
    overflow: "hidden",
  },
  senin19Mei2025Parent: {
    justifyContent: "flex-start",
    paddingVertical: 0,
    gap: 12,
    paddingHorizontal: Padding.md,
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5b913b",
  },
  brandName: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    flex: 1,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "Nunito-SemiBold",
    color: "#1e3014",
    textAlign: "center",
    fontWeight: "600",
  },
  topbar: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 18,
    width: "100%",
    left: 0,
    top: 0,
    position: "absolute",
    backgroundColor: "#fcfdfb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notification: {
    maxWidth: "100%",
    width: "100%",
    flex: 1,
    borderColor: "#aba7af",
    backgroundColor: "#fcfdfb",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  loadingText: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.primaryPrimary500,
  },
  errorText: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.errorDanger500,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.poppinsRegular,
    color: "#666666",
  },
  firstNotificationCard: {
    borderTopWidth: 1,
    borderColor: "#e5e0eb",
  },
  frameParent: {
    left: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default Notification;
