import * as React from "react";
import {ScrollView, Text, StyleSheet, View, Image, Pressable} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg"
import User from "../assets/icons/user-pink.svg"
import { Gap, Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useRouter } from "expo-router";

const Notification = () => {
  const router = useRouter();
  
  return (
    <ScrollView style={[styles.notification, styles.borderBorder]}>
      <View style={styles.frameParent}>
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
      <View style={styles.topbar}>
        <View style={styles.brandName}>
          <Pressable onPress={() => router.back()}>
            <ChevronRight style={styles.chevronRight} width={22} height={22} />
          </Pressable>
          <Text style={styles.title}>Notifikasi</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  notificationFlexBox: {
    gap: Gap.gap_0,
    justifyContent: "space-between",
    paddingVertical: Padding.p_sm,
    flexDirection: "row",
    height: 70,
    borderBottomWidth: 1,
    borderColor: Color.colorGainsboro,
    width: 440,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    borderStyle: "solid",
    backgroundColor: Color.grayscaleWhite
  },
  senin19Mei: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    textAlign: "left",
    color: Color.grayscaleBorder,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: "stretch"
  },
  lucideuserIcon: {
    overflow: "hidden"
  },
  tempatSampahKoica: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.primaryPrimary500,
    fontWeight: "600"
  },
  sudahHampirPenuh1: {
    color: Color.grayscaleHintText
  },
  sudahHampirPenuh: {
    fontFamily: FontFamily.poppinsRegular
  },
  tempatSampahKoica1SudahH: {
    fontSize: FontSize.size_sm
  },
  wib1: {
    fontSize: FontSize.size_xs,
    color: Color.grayscaleBorder
  },
  tempatSampahKoicaContainer: {
    width: 321,
    textAlign: "left"
  },
  lucideuserParent: {
    width: 351,
    gap: Gap.gap_lg,
    flexDirection: "row",
    alignItems: "center"
  },
  notificationCards: {
    borderTopWidth: 1,
    gap: Gap.gap_0,
    justifyContent: "space-between"
  },
  notificationCardsParent: {
    width: 440
  },
  senin19Mei2025Parent: {
    justifyContent: "center",
    paddingVertical: 0,
    gap: Gap.gap_md,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    alignSelf: "stretch"
  },
  notificationCards2: {
    paddingVertical: Padding.p_sm,
    height: 70,
    borderBottomWidth: 1,
    borderColor: Color.colorGainsboro,
    flexDirection: "row",
    borderTopWidth: 1,
    width: 440,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    borderStyle: "solid",
    backgroundColor: Color.grayscaleWhite
  },
  frameParent: {
    top: 94,
    width: 441,
    gap: 32,
    left: 0,
    position: "absolute"
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.primaryPrimary500
  },
  brandName: {
    width: 313,
    alignItems: "center",
    zIndex: 1,
    gap: 8,
    flexDirection: "row"
  },
  chevronRight: {
    overflow: "hidden"
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: FontFamily.nunitoSemiBold,
    color: Color.grayscaleBlack,
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
    paddingTop: 24,
    paddingBottom: Padding.p_sm,
    top: 0,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    flexDirection: "row",
    width: 440,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    left: 0,
    position: "absolute",
    backgroundColor: Color.grayscaleWhite
  },
  notification: {
    borderRadius: 12,
    borderColor: Color.grayscaleBorder,
    flex: 1,
    maxWidth: "100%",
    width: "100%",
    backgroundColor: Color.grayscaleWhite,
    borderStyle: "solid"
  }
});

export default Notification; 