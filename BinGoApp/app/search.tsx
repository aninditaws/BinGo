import * as React from "react";
import {ScrollView, Text, StyleSheet, View, Pressable, TextInput, Dimensions, Platform} from "react-native";
import SearchIcon from "../assets/icons/search-dark.svg"
import MapPin from "../assets/icons/map-pin-pink.svg"
import ChevronRight from "../assets/icons/chevron-right.svg"
import HomeIcon from "../assets/icons/house-light.svg"
import UserNavbar from "../assets/icons/user-light.svg"
import { useRouter } from "expo-router";

const Search = () => {
  const [searchText, setSearchText] = React.useState("");
  const router = useRouter();
  const { height: screenHeight } = Dimensions.get('window');

  // Dynamic positioning to fix layout issues
  const { width: screenWidth } = Dimensions.get('window');
  
  const dynamicStyles = StyleSheet.create({
    navbar: {
      ...styles.navbar,
      top: screenHeight - 94, // Position navbar at bottom of screen
    },
    inputdropdownParent: {
      ...styles.inputdropdownParent,
      top: Platform.OS === 'web' ? 135 : 155, // Adjust content position to match topbar
      paddingBottom: Platform.OS === 'ios' ? 120 : 100, // Add bottom padding to prevent overlap
    },
    navbarChild: {
      ...styles.navbarChild,
      left: Platform.OS === 'web'
        ? 160  // Original perfect web positioning
        : Math.round((screenWidth - 92) / 3) + 55, // Mobile responsive positioning
    },
    topbar: {
      ...styles.topbar,
      paddingTop: Platform.OS === 'web' ? 45 : 60, // Further reduced padding for even smaller topbar
      paddingBottom: Platform.OS === 'web' ? 15 : 20, // Further reduced bottom padding
    },
    chevronIcon: {
      width: 28, // Make back icon bigger
      height: 28,
    }
  });

  return (
    <ScrollView style={[styles.searchNotFilled, styles.borderBorder]}>
      <View style={dynamicStyles.inputdropdownParent}>
        <View style={[styles.inputdropdown, styles.inputdropdownFlexBox]}>
          <View style={styles.inputdropdownTxt}>
            <TextInput
              style={[styles.text, styles.textTypo]}
              placeholder="Cari tempat sampah"
              placeholderTextColor="#aba7af"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <View style={styles.inputIcon}>
            <SearchIcon style={[styles.searchIcon, styles.iconLayout]} />
          </View>
        </View>
        <View style={styles.frameParent}>
          <View style={styles.lineParent}>
            <View style={styles.frameChild} />
            <Text style={[styles.pencarianTerakhir, styles.pencarianTerakhirTypo]}>Pencarian Terakhir</Text>
          </View>
          <View style={styles.lineParent}>
            <Pressable style={styles.binCards} onPress={() => router.push("/home-detail")}>
              <View style={[styles.frameGroup, styles.topbarFlexBox]}>
                <View style={styles.frameWrapper}>
                  <View style={styles.inputdropdownFlexBox}>
                    <Text style={[styles.tempatSampahKoica, styles.pencarianTerakhirTypo]}>Tempat Sampah KOICA #1</Text>
                    <View style={styles.mapPinParent}>
                      <MapPin style={styles.mapPinIcon} width={10} height={10} />
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
            <Pressable style={styles.binCards} onPress={() => router.push("/home-detail")}>
              <View style={[styles.frameGroup, styles.topbarFlexBox]}>
                <View style={styles.frameWrapper}>
                  <View style={styles.inputdropdownFlexBox}>
                    <Text style={[styles.tempatSampahKoica, styles.pencarianTerakhirTypo]}>Tempat Sampah KOICA #1</Text>
                    <View style={styles.mapPinParent}>
                      <MapPin style={styles.mapPinIcon} width={10} height={10} />
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
            <Pressable style={styles.binCards} onPress={() => router.push("/home-detail")}>
              <View style={[styles.frameGroup, styles.topbarFlexBox]}>
                <View style={styles.frameWrapper}>
                  <View style={styles.inputdropdownFlexBox}>
                    <Text style={[styles.tempatSampahKoica, styles.pencarianTerakhirTypo]}>Tempat Sampah KOICA #1</Text>
                    <View style={styles.mapPinParent}>
                      <MapPin style={styles.mapPinIcon} width={10} height={10} />
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
      </View>
      <View style={[dynamicStyles.topbar, styles.topbarLayout]}>
        <Pressable style={styles.brandName} onPress={() => router.push("/home")}>
          <ChevronRight style={dynamicStyles.chevronIcon} width={28} height={28} />
          <Text style={[styles.title, styles.titleTypo]}>Cari</Text>
        </Pressable>
      </View>
      <View style={[dynamicStyles.navbar, styles.topbarLayout]}>
        <View style={[styles.navbar1, styles.timePosition]}>
          <View style={[dynamicStyles.navbarChild, styles.statusBarPosition]} />
          <Pressable style={styles.homeParent} onPress={() => router.push("/home")}>
            <HomeIcon style={styles.homeIcon} width={36} height={36} />
            <Text style={styles.beranda}>Beranda</Text>
          </Pressable>
          <View style={styles.searchParent}>
            <Text style={[styles.cari, styles.cariTypo]}>Cari</Text>
            <SearchIcon style={styles.searchIcon} width={32} height={32} />
          </View>
          <Pressable style={styles.userParent} onPress={() => router.push("/profile")}>
            <UserNavbar style={styles.userIcon} />
            <Text style={[styles.profil1, styles.cariTypo]}>Profil</Text>
          </Pressable>
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
  inputdropdownFlexBox: {
    gap: 8,
    alignSelf: "stretch"
  },
  textTypo: {
    color: "#aba7af",
    fontFamily: "Poppins-Regular",
    textAlign: "left"
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute"
  },
  pencarianTerakhirTypo: {
    lineHeight: 17,
    color: "#1e3014",
    textAlign: "left",
    fontFamily: "Poppins-Regular",
    fontSize: 14
  },
  topbarFlexBox: {
    gap: 0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  badge1Position: {
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute"
  },
  topbarLayout: {
    width: "100%",
    left: 0
  },
  titleTypo: {
    textAlign: "center",
    fontWeight: "600"
  },
  statusBarPosition: {
    zIndex: 0,
    position: "absolute"
  },
  timePosition: {
    top: "50%",
    position: "absolute"
  },
  cariTypo: {
    top: "74.07%",
    color: "#fcfdfb",
    lineHeight: 14,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    position: "absolute"
  },
  text: {
    lineHeight: 20,
    textAlign: "left",
    fontSize: 14,
    color: "#aba7af",
    fontFamily: "Poppins-Regular",
    flex: 1
  },
  inputdropdownTxt: {
    flexDirection: "row",
    flex: 1
  },
  searchIcon: {
    height: "59.26%",
    bottom: "40.74%",
    left: "0%",
    right: "0%",
    top: "0%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
    maxWidth: "100%",
    width: "100%"
  },
  inputIcon: {
    width: 20,
    height: 20,
    overflow: "hidden"
  },
  inputdropdown: {
    borderRadius: 100,
    paddingVertical: 12,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fcfdfb",
    paddingHorizontal: 24,
    flexDirection: "row",
    borderColor: "#aba7af"
  },
  frameChild: {
    borderColor: "#c8dabe",
    borderTopWidth: 1,
    width: 361,
    height: 1,
    borderStyle: "solid"
  },
  pencarianTerakhir: {
    color: "#1e3014",
    alignSelf: "stretch"
  },
  lineParent: {
    gap: 12,
    alignSelf: "stretch"
  },
  tempatSampahKoica: {
    color: "#1e3014"
  },
  mapPinIcon: {
    overflow: "hidden"
  },
  koica: {
    fontSize: 11,
    lineHeight: 13,
    width: 152,
    textAlign: "left"
  },
  mapPinParent: {
    gap: 4,
    flexDirection: "row",
    alignSelf: "stretch"
  },
  frameWrapper: {
    alignItems: "center",
    flexDirection: "row"
  },
  badge1: {
    borderRadius: 500,
    backgroundColor: "#00b998",
    left: "0%",
    right: "0%",
    width: "100%"
  },
  badge: {
    width: 6,
    height: 6
  },
  kosong: {
    fontSize: 8,
    lineHeight: 10,
    fontWeight: "300",
    fontFamily: "Poppins-Light",
    color: "#1a141f",
    textAlign: "left"
  },
  status: {
    height: 10,
    gap: 4,
    alignItems: "center",
    flexDirection: "row"
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
    position: "absolute"
  },
  binCards: {
    height: 62,
    width: "100%"
  },
  frameParent: {
    gap: 14,
    alignSelf: "stretch"
  },
  inputdropdownParent: {
    left: 16,
    right: 16,
    gap: 18,
    position: "absolute"
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "Nunito-SemiBold",
    color: "#1e3014"
  },
  brandName: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    flex: 1
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
  navbarChild: {
    top: 11,
    left: 140,
    backgroundColor: "#76a35c",
    width: 92,
    height: 72,
    borderRadius: 12,
    zIndex: 0
  },
  homeIcon: {
    overflow: "hidden"
  },
  beranda: {
    color: "#fcfdfb",
    lineHeight: 14,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    alignSelf: "stretch"
  },
  homeParent: {
    width: 52,
    zIndex: 1,
    gap: 4,
    alignItems: "center"
  },
  cari: {
    left: "11.46%"
  },
  searchParent: {
    width: 32,
    zIndex: 2,
    height: 54
  },
  userIcon: {
    height: "59.26%",
    bottom: "40.74%",
    left: "0%",
    right: "0%",
    top: "0%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
    maxWidth: "100%",
    width: "100%"
  },
  profil1: {
    left: "6.25%"
  },
  userParent: {
    width: 32,
    zIndex: 3,
    height: 54
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
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  navbar: {
    top: 750,
    height: 94,
    position: "absolute"
  },
  searchNotFilled: {
    maxWidth: "100%",
    width: "100%",
    flex: 1,
    borderColor: "#aba7af",
    backgroundColor: "#fcfdfb",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  chevronRightIcon: {
    marginRight: 8
  }
});

export default Search; 