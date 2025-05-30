import { router } from "expo-router";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../lib/AuthContext";

const Splash = () => {
  const { isAuthenticated, loading } = useAuth();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (isAuthenticated) {
          router.replace("/home");
        } else {
          router.replace("/signup");
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, loading]);

  return (
    <View style={styles.splash}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoIcon}
          resizeMode="contain"
          source={require("../assets/images/icon.png")}
        />
        <Text style={styles.bingo}>BinGo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#fcfdfb",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    gap: 20,
  },
  logoIcon: {
    width: 120,
    height: 120,
  },
  bingo: {
    fontSize: 48,
    lineHeight: 58,
    fontWeight: "700",
    fontFamily: "Nunito-Bold",
    color: "#5b913b",
    textAlign: "center",
  },
});

export default Splash;
