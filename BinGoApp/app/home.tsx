import * as React from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import MapPin from "../assets/icons/map-pin-pink.svg";
import MapPinLight from "../assets/icons/map-pin-gray.svg";
import Search from "../assets/icons/search-dark.svg";
import Bell from "../assets/icons/bell.svg";
import Settings from "../assets/icons/settings.svg";
import HomeIcon from "../assets/icons/house-dark.svg";
import SearchIcon from "../assets/icons/search-light.svg";
import UserNavbar from "../assets/icons/user-light.svg";
import { useRouter } from "expo-router";
import { useAuth } from "../lib/AuthContext";

const Home = () => {
  const router = useRouter();
  const { height: screenHeight } = Dimensions.get("window");
  const { user, profile } = useAuth();
  // Dynamic positioning to fix layout issues
  const { width: screenWidth } = Dimensions.get("window");

  const dynamicStyles = StyleSheet.create({
    navbar: {
      ...styles.navbar,
      top: screenHeight - 94, // Position navbar at bottom of screen
    },
    frameParent: {
      ...styles.frameParent,
      top: Platform.OS === "web" ? 135 : 155, // Adjust content position to match even smaller topbar
      paddingBottom: Platform.OS === "ios" ? 120 : 100, // Add bottom padding to prevent overlap
    },
    navbarChild: {
      ...styles.navbarChild,
      left:
        Platform.OS === "web"
          ? 43 // Original perfect web positioning
          : Math.round((screenWidth - 92) / 3) - 40, // Mobile responsive positioning
    },
    topbar: {
      ...styles.topbar,
      paddingTop: Platform.OS === "web" ? 45 : 60, // Further reduced padding for even smaller topbar
      paddingBottom: Platform.OS === "web" ? 15 : 20, // Further reduced bottom padding
    },
    logoIcon: {
      width: 36, // Make logo bigger
      height: 36,
    },
  });

  return (
    <ScrollView style={[styles.home, styles.homeBorder]}>
      <View style={dynamicStyles.frameParent}>
        <View style={[styles.userProfileParent, styles.topbarFlexBox]}>
          <Pressable style={styles.userProfile} onPress={() => {}}>
            <View style={styles.profileIconContainer}>
              <Image
                style={styles.profileImage}
                resizeMode="cover"
                source={require("../assets/icons/person.png")}
              />
            </View>
            <View style={styles.haloParent}>
              <Text style={styles.halo}>Halo,</Text>
              <Text style={styles.name}>
                {profile?.full_name || user?.display_name || "User"}
              </Text>
            </View>
          </Pressable>
          <View style={styles.mapPinParent}>
            <MapPinLight style={styles.mapPinIcon} width={14} height={14} />
            <Text style={[styles.loca, styles.textTypo]}>
              {profile?.location || "Lokasi"}
            </Text>
          </View>
        </View>
        <View style={[styles.inputdropdown, styles.frameGroupBorder]}>
          <View style={styles.inputdropdownTxt}>
            <Text style={[styles.text, styles.textTypo]}>
              Cari tempat sampah
            </Text>
          </View>
          <View style={styles.inputIcon}>
            <Search style={[styles.searchIcon, styles.iconLayout]} />
          </View>
        </View>
        <View style={styles.tempatSampahMuParent}>
          <Text style={[styles.tempatSampahMu, styles.bingoTypo]}>
            Tempat Sampah Mu!
          </Text>
          <View style={styles.lineParent}>
            <Pressable
              style={styles.binCards}
              onPress={() => router.push("/home-detail")}
            >
              <View style={[styles.frameGroup, styles.topbarFlexBox]}>
                <View style={styles.frameWrapper}>
                  <View style={styles.inputdropdownFlexBox}>
                    <Text
                      style={[
                        styles.tempatSampahKoica,
                        styles.pencarianTerakhirTypo,
                      ]}
                    >
                      Tempat Sampah KOICA #1
                    </Text>
                    <View style={styles.mapPinParent}>
                      <MapPin
                        style={styles.mapPinIcon}
                        width={10}
                        height={10}
                      />
                      <Text style={[styles.koica, styles.textTypo]}>KOICA</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.status}>
                  <View style={styles.badge}>
                    <View style={[styles.badge1, styles.badge1Position]} />
                  </View>
                  <Text style={styles.kosong}>Kosong</Text>
                </View>
              </View>
            </Pressable>
            <Pressable
              style={styles.binCards}
              onPress={() => router.push("/home-detail")}
            >
              <View style={[styles.frameGroup, styles.topbarFlexBox]}>
                <View style={styles.frameWrapper}>
                  <View style={styles.inputdropdownFlexBox}>
                    <Text
                      style={[
                        styles.tempatSampahKoica,
                        styles.pencarianTerakhirTypo,
                      ]}
                    >
                      Tempat Sampah KOICA #1
                    </Text>
                    <View style={styles.mapPinParent}>
                      <MapPin
                        style={styles.mapPinIcon}
                        width={10}
                        height={10}
                      />
                      <Text style={[styles.koica, styles.textTypo]}>KOICA</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.status}>
                  <View style={styles.badge}>
                    <View style={[styles.badge1, styles.badge1Position]} />
                  </View>
                  <Text style={styles.kosong}>Kosong</Text>
                </View>
              </View>
            </Pressable>
            <Pressable
              style={styles.binCards}
              onPress={() => router.push("/home-detail")}
            >
              <View style={[styles.frameGroup, styles.topbarFlexBox]}>
                <View style={styles.frameWrapper}>
                  <View style={styles.inputdropdownFlexBox}>
                    <Text
                      style={[
                        styles.tempatSampahKoica,
                        styles.pencarianTerakhirTypo,
                      ]}
                    >
                      Tempat Sampah KOICA #1
                    </Text>
                    <View style={styles.mapPinParent}>
                      <MapPin
                        style={styles.mapPinIcon}
                        width={10}
                        height={10}
                      />
                      <Text style={[styles.koica, styles.textTypo]}>KOICA</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.status}>
                  <View style={styles.badge}>
                    <View style={[styles.badge1, styles.badge1Position]} />
                  </View>
                  <Text style={styles.kosong}>Kosong</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottomSpace}>
          <View style={[styles.bottomSpaceChild, styles.badge1Position]} />
        </View>
      </View>
      <View style={[dynamicStyles.topbar, styles.topbarLayout]}>
        <View style={styles.brandName}>
          <Image
            style={dynamicStyles.logoIcon}
            resizeMode="cover"
            source={require("../assets/images/icon.png")}
          />
          <Text style={[styles.bingo, styles.bingoTypo]}>BinGo</Text>
        </View>
        <View style={styles.bellParent}>
          <Pressable onPress={() => router.push("/notification")}>
            <Bell style={styles.bellIcon} width={24} height={24} />
          </Pressable>
          <Pressable onPress={() => router.push("/settings")}>
            <Settings style={styles.bellIcon} width={24} height={24} />
          </Pressable>
        </View>
      </View>
      <View style={[dynamicStyles.navbar, styles.topbarLayout]}>
        <View style={[styles.navbar1, styles.timePosition]}>
          <View style={[dynamicStyles.navbarChild, styles.statusBarPosition]} />
          <View style={styles.homeParent}>
            <HomeIcon style={styles.homeIcon} width={36} height={36} />
            <Text style={styles.beranda}>Beranda</Text>
          </View>
          <Pressable
            style={styles.searchParent}
            onPress={() => router.push("/search")}
          >
            <Text style={[styles.cari, styles.cariTypo]}>Cari</Text>
            <SearchIcon style={styles.searchIcon} width={32} height={32} />
          </Pressable>
          <Pressable
            style={styles.userParent}
            onPress={() => router.push("/profile")}
          >
            <UserNavbar style={styles.userIcon} />
            <Text style={[styles.profil, styles.cariTypo]}>Profil</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeBorder: {
    borderColor: "#aba7af",
    borderStyle: "solid",
    borderWidth: 1,
  },
  topbarFlexBox: {
    gap: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  frameGroupBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  textTypo: {
    color: "#aba7af",
    fontFamily: "Poppins-Regular",
    textAlign: "left",
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute",
  },
  bingoTypo: {
    textAlign: "left",
    fontFamily: "Nunito-SemiBold",
    lineHeight: 26,
    fontSize: 22,
    fontWeight: "600",
  },
  badge1Position: {
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
  },
  timePosition: {
    top: "50%",
    position: "absolute",
  },
  statusBarPosition: {
    zIndex: 0,
    position: "absolute",
  },
  badgeLayout: {
    height: 16,
    width: 16,
    position: "absolute",
  },
  topbarLayout: {
    width: "100%",
    left: 0,
  },
  cariTypo: {
    top: "74.07%",
    lineHeight: 14,
    fontSize: 12,
    textAlign: "center",
    color: "#fcfdfb",
    fontFamily: "Poppins-Regular",
    position: "absolute",
  },
  maskGroupIcon: {
    width: 48,
    height: 48,
  },
  halo: {
    fontSize: 14,
    lineHeight: 17,
    color: "#1a141f",
    fontFamily: "Poppins-Regular",
    textAlign: "left",
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    color: "#1a141f",
    fontFamily: "Poppins-SemiBold",
    textAlign: "left",
    fontWeight: "600",
  },
  haloParent: {
    gap: 2,
    alignItems: "flex-start",
  },
  userProfile: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  mapPinIcon: {
    overflow: "hidden",
  },
  loca: {
    lineHeight: 17,
    color: "#1a141f",
    fontSize: 14,
    textAlign: "left",
  },
  locationDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapPinParent: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  userProfileParent: {
    alignSelf: "stretch",
  },
  text: {
    lineHeight: 20,
    color: "#1a141f",
    fontSize: 14,
    flex: 1,
  },
  inputdropdownTxt: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  searchIcon: {
    width: "100%",
    right: "0%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  inputIcon: {
    width: 20,
    height: 20,
    position: "relative",
  },
  inputdropdown: {
    borderRadius: 6,
    borderColor: "#e5e0eb",
    padding: 12,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "#fcfdfb",
  },
  tempatSampahMu: {
    color: "#1e3014",
  },
  tempatSampahKoica: {
    fontSize: 14,
    lineHeight: 17,
    color: "#1e3014",
    fontFamily: "Poppins-Regular",
    textAlign: "left",
  },
  mapPinIcon1: {
    overflow: "hidden",
  },
  koica: {
    fontSize: 11,
    lineHeight: 13,
    width: 152,
    textAlign: "left",
  },
  mapPinGroup: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  tempatSampahKoica1Parent: {
    gap: 4,
    alignSelf: "stretch",
  },
  badge1: {
    borderRadius: 500,
    backgroundColor: "#00b998",
    left: "0%",
    right: "0%",
    width: "100%",
  },
  badge: {
    width: 6,
    height: 6,
  },
  kosong: {
    fontSize: 8,
    lineHeight: 10,
    fontWeight: "300",
    fontFamily: "Poppins-Light",
    color: "#1a141f",
    textAlign: "left",
  },
  status: {
    height: 10,
    gap: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  frameGroup: {
    top: -1,
    left: -1,
    right: -1,
    borderRadius: 6,
    borderColor: "#e2e2e2",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fcfdfb",
    position: "absolute",
  },
  binCards: {
    height: 62,
    width: "100%",
  },
  tempatSampahMuParent: {
    gap: 12,
    alignSelf: "stretch",
    marginBottom: 20,
  },
  bottomSpace: {
    width: "100%",
    height: 94,
    position: "relative",
  },
  bottomSpaceChild: {
    backgroundColor: "#fcfdfb",
    width: "100%",
    height: 94,
    left: 0,
    top: 0,
  },
  frameParent: {
    left: 16,
    right: 16,
    gap: 20,
    alignItems: "center",
    position: "absolute",
  },
  k031Deliverable2Ppt1Icon: {
    width: 28,
    height: 28,
  },
  bingo: {
    color: "#5b913b",
  },
  brandName: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    flex: 1,
  },
  bellParent: {
    gap: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    overflow: "hidden",
  },
  badgeIcon: {
    bottom: 0,
    left: 0,
  },
  text1: {
    marginTop: -5,
    marginLeft: -3.5,
    fontSize: 8,
    lineHeight: 10,
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
    left: "50%",
    textAlign: "center",
    color: "#fcfdfb",
  },
  number: {
    bottom: 3,
    left: 4,
    width: 8,
    height: 10,
    overflow: "hidden",
    position: "absolute",
  },
  badge6: {
    top: 68,
    left: 362,
    zIndex: 3,
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
  navbarChild: {
    top: 11,
    left: 43,
    backgroundColor: "#76a35c",
    width: 92,
    height: 72,
    borderRadius: 12,
    zIndex: 0,
  },
  homeParent: {
    width: 52,
    gap: 4,
    zIndex: 1,
    alignItems: "center",
  },
  homeIcon: {
    overflow: "hidden",
  },
  searchParent: {
    width: 32,
    zIndex: 2,
    height: 54,
  },
  userParent: {
    width: 32,
    zIndex: 3,
    height: 54,
  },
  userIcon: {
    height: "59.26%",
    bottom: "40.74%",
    left: "0%",
    right: "0%",
    top: "0%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    width: "100%",
  },
  profil: {
    left: "6.25%",
  },
  navbar1: {
    marginTop: -47,
    backgroundColor: "#5b913b",
    paddingHorizontal: 64,
    paddingVertical: 20,
    left: "0%",
    right: "0%",
    gap: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  navbar: {
    top: 750,
    height: 94,
    position: "absolute",
  },
  home: {
    maxWidth: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#fcfdfb",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  beranda: {
    lineHeight: 14,
    fontSize: 12,
    textAlign: "center",
    color: "#fcfdfb",
    fontFamily: "Poppins-Regular",
    alignSelf: "stretch",
  },
  cari: {
    left: "11.46%",
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5e0eb",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  frameWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  inputdropdownFlexBox: {
    gap: 8,
    alignSelf: "stretch",
  },
  pencarianTerakhirTypo: {
    lineHeight: 17,
    color: "#1e3014",
    textAlign: "left",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  lineParent: {
    gap: 12,
    alignSelf: "stretch",
  },
});

export default Home;
