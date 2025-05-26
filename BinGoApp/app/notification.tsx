import * as React from "react";
import {ScrollView, Text, StyleSheet, View, Pressable, Dimensions, Platform} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg"
import User from "../assets/icons/user-pink.svg"
import { Gap, Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useRouter } from "expo-router";

const Notification = () => {
  const router = useRouter();
  
  // Dynamic positioning similar to search page
  const dynamicStyles = StyleSheet.create({
    frameParent: {
      ...styles.frameParent,
      top: Platform.OS === 'web' ? 135 : 155, // Adjust content position to match topbar
    },
    topbar: {
      ...styles.topbar,
      paddingTop: Platform.OS === 'web' ? 45 : 60, // Responsive padding like other pages
      paddingBottom: Platform.OS === 'web' ? 15 : 20,
    },
    chevronIcon: {
      width: 28, // Make back icon bigger like search page
      height: 28,
    }
  });
  
  return (
    <ScrollView style={[styles.notification, styles.borderBorder]}>
      <View style={dynamicStyles.frameParent}>
        <View style={styles.senin19Mei2025Parent}>
          <Text style={styles.senin19Mei}>Senin, 19 Mei 2025</Text>
          <View style={styles.notificationCardsParent}>
            <View style={[styles.notificationCards, styles.notificationFlexBox]}>
              <View style={styles.lucideuserParent}>
                <User style={styles.lucideuserIcon} width={18} height={18} />
                <Text style={styles.tempatSampahKoicaContainer}>
                  <Text style={styles.tempatSampahKoica1SudahH}>
                    <Text style={styles.tempatSampahKoica}>Tempat Sampah KOICA #1</Text>
                    <Text style={styles.sudahHampirPenuh}>
                      <Text style={styles.sudahHampirPenuh1}>{` sudah hampir penuh `}</Text>
                    </Text>
                  </Text>
                  <Text style={styles.sudahHampirPenuh}>
                    <Text style={styles.wib1}>(14:09 WIB)</Text>
                  </Text>
                </Text>
              </View>
              <View style={styles.notificationDot} />
            </View>
            <View style={styles.notificationFlexBox}>
              <View style={styles.lucideuserParent}>
                <User style={styles.lucideuserIcon} width={18} height={18} />
                <Text style={styles.tempatSampahKoicaContainer}>
                  <Text style={styles.tempatSampahKoica1SudahH}>
                    <Text style={styles.tempatSampahKoica}>Tempat Sampah KOICA #1</Text>
                    <Text style={styles.sudahHampirPenuh}>
                      <Text style={styles.sudahHampirPenuh1}>{` sudah hampir penuh `}</Text>
                    </Text>
                  </Text>
                  <Text style={styles.sudahHampirPenuh}>
                    <Text style={styles.wib1}>(14:09 WIB)</Text>
                  </Text>
                </Text>
              </View>
              <View style={styles.notificationDot} />
            </View>
          </View>
        </View>
        <View style={styles.senin19Mei2025Parent}>
          <Text style={styles.senin19Mei}>Jumat, 16 Mei 2025</Text>
          <View style={styles.notificationCardsParent}>
            <View style={styles.notificationCards2}>
              <View style={styles.lucideuserParent}>
                <User style={styles.lucideuserIcon} width={18} height={18} />
                <Text style={styles.tempatSampahKoicaContainer}>
                  <Text style={styles.tempatSampahKoica1SudahH}>
                    <Text style={styles.tempatSampahKoica}>Tempat Sampah KOICA #1</Text>
                    <Text style={styles.sudahHampirPenuh}>
                      <Text style={styles.sudahHampirPenuh1}>{` sudah hampir penuh `}</Text>
                    </Text>
                  </Text>
                  <Text style={styles.sudahHampirPenuh}>
                    <Text style={styles.wib1}>(14:09 WIB)</Text>
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.notificationFlexBox}>
              <View style={styles.lucideuserParent}>
                <User style={styles.lucideuserIcon} width={18} height={18} />
                <Text style={styles.tempatSampahKoicaContainer}>
                  <Text style={styles.tempatSampahKoica1SudahH}>
                    <Text style={styles.tempatSampahKoica}>Tempat Sampah KOICA #1</Text>
                    <Text style={styles.sudahHampirPenuh}>
                      <Text style={styles.sudahHampirPenuh1}>{` sudah hampir penuh `}</Text>
                    </Text>
                  </Text>
                  <Text style={styles.sudahHampirPenuh}>
                    <Text style={styles.wib1}>(14:09 WIB)</Text>
                  </Text>
                </Text>
              </View>
              <View style={styles.notificationDot} />
            </View>
          </View>
        </View>
      </View>
      <View style={[dynamicStyles.topbar, styles.topbarLayout]}>
        <Pressable style={styles.brandName} onPress={() => router.push("/home")}>
          <ChevronRight style={dynamicStyles.chevronIcon} width={28} height={28} />
          <Text style={styles.title}>Notifikasi</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  topbarLayout: {
    width: "100%",
    left: 0
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
    backgroundColor: "#fcfdfb"
  },
  senin19Mei: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left",
    color: "#1e3014",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    alignSelf: "stretch",
    marginBottom: 8
  },
  lucideuserIcon: {
    overflow: "hidden"
  },
  tempatSampahKoica: {
    fontFamily: "Poppins-SemiBold",
    color: "#1e3014",
    fontWeight: "600"
  },
  sudahHampirPenuh1: {
    color: "#1a141f"
  },
  sudahHampirPenuh: {
    fontFamily: "Poppins-Regular"
  },
  tempatSampahKoica1SudahH: {
    fontSize: 14,
    lineHeight: 18
  },
  wib1: {
    fontSize: 12,
    color: "#aba7af",
    lineHeight: 16
  },
  tempatSampahKoicaContainer: {
    flex: 1,
    textAlign: "left"
  },
  lucideuserParent: {
    flex: 1,
    gap: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  notificationCards: {
    borderTopWidth: 1,
    borderColor: "#e5e0eb",
    gap: Gap.gap_0,
    justifyContent: "space-between"
  },
  notificationCardsParent: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#fcfdfb",
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    elevation: 2,
    shadowOpacity: 1,
    overflow: "hidden"
  },
  senin19Mei2025Parent: {
    justifyContent: "flex-start",
    paddingVertical: 0,
    gap: 12,
    paddingHorizontal: 16,
    alignItems: "flex-start",
    alignSelf: "stretch"
  },
  notificationCards2: {
    paddingVertical: 16,
    minHeight: 80,
    borderBottomWidth: 1,
    borderColor: "#e5e0eb",
    flexDirection: "row",
    borderTopWidth: 1,
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    borderStyle: "solid",
    backgroundColor: "#fcfdfb"
  },
  frameParent: {
    left: 0,
    right: 0,
    gap: 24,
    position: "absolute",
    paddingBottom: 100
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5b913b"
  },
  brandName: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    flex: 1
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "Nunito-SemiBold",
    color: "#1e3014",
    textAlign: "center",
    fontWeight: "600"
  },
  topbar: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
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
    alignItems: "center"
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
    borderBottomRightRadius: 0
  }
});

export default Notification; 