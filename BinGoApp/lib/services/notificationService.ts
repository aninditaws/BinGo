// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";

// // Configure notification behavior
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// export class NotificationService {
//   static async registerForPushNotifications() {
//     try {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;

//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }

//       if (finalStatus !== "granted") {
//         console.log("Failed to get push notification permissions!");
//         return null;
//       }

//       if (Platform.OS === "android") {
//         await Notifications.setNotificationChannelAsync("default", {
//           name: "default",
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: "#5B913B", // Ensure your app's theme color is used
//         });
//       }

//       // Get the Expo Push Token
//       const expoPushToken = await Notifications.getExpoPushTokenAsync();
//       console.log("Expo Push Token:", expoPushToken.data);
//       // TODO: Send this token to your server to send notifications

//       return expoPushToken.data; // Return the token string
//     } catch (error) {
//       console.error("Error registering for push notifications:", error);
//       return null;
//     }
//   }

//   static async scheduleLocalNotification(title: string, body: string) {
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title,
//           body,
//           sound: "default",
//           badge: 1,
//         },
//         trigger: null, // null means show immediately
//       });
//     } catch (error) {
//       console.error("Error scheduling local notification:", error);
//     }
//   }

//   static async setBadgeCount(count: number) {
//     try {
//       await Notifications.setBadgeCountAsync(count);
//     } catch (error) {
//       console.error("Error setting badge count:", error);
//     }
//   }
// }

// export default NotificationService;
