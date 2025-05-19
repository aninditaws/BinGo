import * as React from "react";
import {ScrollView, Image, StyleSheet, Text, View, Pressable} from "react-native";
import { Color, FontFamily } from "../GlobalStyles";
import { useRouter } from "expo-router";

const Frame = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={[styles.oopsParent, styles.buttonFlexBox]}>
          <Text style={[styles.oops, styles.oopsClr]}>Oops!</Text>
          <Text style={[styles.kamiTidakDapat, styles.oopsClr]}>Kami tidak dapat menemukan halaman yang Anda cari :(</Text>
        </View>
        <Pressable style={[styles.button, styles.buttonFlexBox]} onPress={() => router.push("/home")}>
          <Text style={styles.buttonText}>Kembali ke Beranda</Text>
        </Pressable>
      </View>
      <View style={styles.trashContainer}>
        <Image 
          style={styles.trashLeftIcon} 
          resizeMode="contain" 
          source={require("../assets/icons/404-trash-left.png")} 
        />
        <Image 
          style={styles.trashRightIcon} 
          resizeMode="contain" 
          source={require("../assets/icons/404-trash-right.png")} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.grayscaleWhite,
    width: "100%",
    height: "100%"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24
  },
  trashContainer: {
    position: "absolute",
    bottom: 0,
    left: -25,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 0
  },
  trashLeftIcon: {
    width: 200,
    height: 200,
    marginBottom: -50
  },
  trashRightIcon: {
    width: 200,
    height: 200,
    marginBottom: -50
  },
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  oopsClr: {
    color: "#76a35c",
    textAlign: "center"
  },
  oops: {
    fontSize: 96,
    lineHeight: 115,
    fontWeight: "700",
    fontFamily: FontFamily.nunitoBold
  },
  kamiTidakDapat: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: FontFamily.nunitoSemiBold,
    width: 337,
    fontWeight: "600",
    color: "#76a35c",
    marginTop: 8
  },
  oopsParent: {
    gap: 8,
    marginBottom: 72
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.grayscaleWhite,
    textAlign: "center"
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#76a35c",
    width: 297,
    flexDirection: "row",
    paddingHorizontal: 52,
    paddingVertical: 12
  }
});

export default Frame;
