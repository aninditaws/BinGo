import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { Color, FontFamily, Shadow } from "../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";

interface NotificationPopupProps {
  message: string;
  timestamp: string;
  onClose: () => void;
  isVisible: boolean;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  timestamp,
  onClose,
  isVisible,
}) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const countdown = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isVisible) {
      // Reset animation values
      translateY.setValue(-100);
      opacity.setValue(0);
      countdown.setValue(1);

      // Animate in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Start countdown animation
      Animated.timing(countdown, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }).start();

      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, onClose, translateY, opacity, countdown]);

  if (!isVisible) return null;

  const { width: screenWidth } = Dimensions.get("window");
  const maxWidth = Math.min(screenWidth - 32, 400);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: maxWidth,
          left: (screenWidth - maxWidth) / 2,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <AntDesign name="bells" size={24} color={Color.primaryPrimary500} />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <AntDesign name="close" size={20} color={Color.grayscaleHintText} />
        </TouchableOpacity>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              transform: [{ scaleX: countdown }],
              transformOrigin: "left",
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "web" ? 20 : 40,
    backgroundColor: Color.grayscaleWhite,
    borderRadius: 16,
    ...Shadow.medium,
    zIndex: 1000,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Color.grayscaleWhite,
  },
  iconContainer: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.primaryPrimary000,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
    marginRight: 12,
  },
  message: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: 14,
    color: Color.labelsPrimary,
    marginBottom: 4,
    lineHeight: 20,
  },
  timestamp: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 12,
    color: Color.grayscaleHintText,
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: Color.grayscaleBorder,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressBar: {
    height: "100%",
    backgroundColor: Color.primaryPrimary500,
    width: "100%",
  },
});

export default NotificationPopup;
