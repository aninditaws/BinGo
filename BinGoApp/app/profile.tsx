import * as React from "react";
import {ScrollView, StyleSheet, Text, View, Pressable, Image} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg"
import User from "../assets/icons/user-pink.svg"
import Mail from "../assets/icons/mail.svg"
import MapPin from "../assets/icons/map-pin-pink.svg"
import Bell from "../assets/icons/bell.svg"
import Settings from "../assets/icons/settings.svg"
import HomeIcon from "../assets/icons/house-light.svg"
import SearchIcon from "../assets/icons/search-light.svg"
import UserNavbar from "../assets/icons/user-dark.svg"
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.profile}>
      <View style={styles.frameParent}>
        <View style={styles.frameGroup}>
          <Pressable style={styles.chevronRightParent} onPress={()=>{}}>
            <ChevronRight style={styles.chevronRightIcon} width={24} height={24} />
            <Text style={[styles.profil, styles.bingoTypo]}>Profil</Text>
          </Pressable>
          <View style={styles.profileIconContainer}>
            <Image style={styles.profileImage} resizeMode="cover" source={require("../assets/icons/person.png")} />
          </View>
        </View>
        <View style={styles.frameContainer}>
          <View style={styles.frameView}>
            <View style={styles.frameParent1}>
              <View style={styles.iconParent}>
                <User style={styles.icon} width={18} height={18} />
                <Text style={[styles.nama, styles.namaTypo]}>Nama</Text>
              </View>
              <View style={[styles.inputdropdown, styles.borderBorder]}>
                <View style={styles.inputdropdownTxt}>
                  <Text style={[styles.text, styles.namaTypo]}>Jason Jahja</Text>
                </View>
              </View>
            </View>
            <View style={styles.frameParent1}>
              <View style={styles.iconParent}>
                <Mail style={styles.icon} width={18} height={18} />
                <Text style={[styles.nama, styles.namaTypo]}>Email</Text>
              </View>
              <View style={[styles.inputdropdown, styles.borderBorder]}>
                <View style={styles.inputdropdownTxt}>
                  <Text style={[styles.text, styles.namaTypo]}>jasonjahja123@gmail.com</Text>
                </View>
              </View>
            </View>
            <View style={styles.frameParent1}>
              <View style={styles.iconParent}>
                <MapPin style={styles.icon} width={18} height={18} />
                <Text style={[styles.nama, styles.namaTypo]}>Lokasi</Text>
              </View>
              <View style={[styles.inputdropdown, styles.borderBorder]}>
                <View style={styles.inputdropdownTxt}>
                  <Text style={[styles.text, styles.namaTypo]}>KOICA</Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable style={styles.button} onPress={()=>{}}>
            <Text style={[styles.button1, styles.text3Clr]}>Simpan</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.topbar, styles.topbarLayout]}>
        <Pressable style={styles.brandName} onPress={() => router.push("/home")}>
          <Image style={styles.binGoLogo} resizeMode="cover" source={require("../assets/images/icon.png")} />
          <Text style={[styles.bingo, styles.bingoTypo]}>BinGo</Text>
        </Pressable>
        <View style={styles.bellParent}>
          <Pressable onPress={() => router.push("/notification")}>
            <Bell style={styles.bellIcon} width={24} height={24} />
          </Pressable>
          <Pressable onPress={() => router.push("/settings")}>
            <Settings style={styles.bellIcon} width={24} height={24} />
          </Pressable>
        </View>
      </View>
      <View style={[styles.navbar, styles.topbarLayout]}>
        <View style={[styles.navbar1, styles.timePosition]}>
          <View style={[styles.navbarChild, styles.statusBarPosition]} />
          <Pressable style={styles.homeParent} onPress={() => router.push("/home")}>
            <HomeIcon style={styles.homeIcon} width={36} height={36} />
            <Text style={styles.beranda}>Beranda</Text>
          </Pressable>
          <Pressable style={styles.searchParent} onPress={() => router.push("/search")}>
            <Text style={[styles.cari, styles.cariTypo]}>Cari</Text>
            <SearchIcon style={styles.searchIcon} width={32} height={32} />
          </Pressable>
          <View style={styles.userParent}>
            <UserNavbar style={styles.userIcon} />
            <Text style={[styles.profil1, styles.cariTypo]}>Profil</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bingoTypo: {
    textAlign: "left",
    fontFamily: "Nunito-SemiBold",
    lineHeight: 26,
    fontSize: 22,
    fontWeight: "600"
  },
  namaTypo: {
    fontFamily: "Poppins-Regular",
    textAlign: "left"
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  text3Clr: {
    color: "#fcfdfb",
    textAlign: "center"
  },
  topbarFlexBox: {
    gap: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  statusBarPosition: {
    zIndex: 0,
    position: "absolute"
  },
  timePosition: {
    top: "50%",
    position: "absolute"
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute"
  },
  topbarLayout: {
    width: 393,
    left: 0
  },
  cariTypo: {
    top: "74.07%",
    lineHeight: 14,
    fontSize: 12,
    textAlign: "center",
    color: "#fcfdfb",
    fontFamily: "Poppins-Regular",
    position: "absolute",
    width: "100%",
    left: 0
  },
  chevronRightIcon: {
    overflow: "hidden"
  },
  profil: {
    color: "#1e3014"
  },
  chevronRightParent: {
    gap: 2,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center"
  },
  profileIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e5e0eb",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  profileImage: {
    width: "100%",
    height: "100%"
  },
  frameGroup: {
    gap: 16,
    alignSelf: "stretch",
    alignItems: "center"
  },
  icon: {
    overflow: "hidden"
  },
  nama: {
    fontSize: 15,
    lineHeight: 18,
    color: "#1e3014"
  },
  iconParent: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    lineHeight: 20,
    color: "#1a141f",
    fontSize: 14,
    flex: 1
  },
  inputdropdownTxt: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1
  },
  inputdropdown: {
    borderRadius: 6,
    borderColor: "#e5e0eb",
    padding: 12,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "#fcfdfb"
  },
  frameParent1: {
    gap: 8,
    alignSelf: "stretch"
  },
  frameView: {
    gap: 18,
    alignSelf: "stretch"
  },
  button1: {
    lineHeight: 17,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600"
  },
  frameContainer: {
    gap: 20,
    alignSelf: "stretch",
    marginTop: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  frameParent: {
    top: 85,
    left: 16,
    width: 361,
    gap: 16,
    alignItems: "center",
    position: "absolute",
    bottom: 100,
    display: 'flex',
    flexDirection: 'column'
  },
  bingo: {
    color: "#5b913b"
  },
  brandName: {
    width: 313,
    alignItems: "center",
    zIndex: 1,
    gap: 8,
    flexDirection: "row"
  },
  bellIcon: {
    overflow: "hidden"
  },
  bellParent: {
    zIndex: 2,
    gap: 18,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 16
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
    width: 393,
    left: 0,
    top: 0,
    position: "absolute",
    backgroundColor: "#fcfdfb"
  },
  navbarChild: {
    top: 11,
    left: 265,
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
    lineHeight: 14,
    fontSize: 12,
    textAlign: "center",
    color: "#fcfdfb",
    fontFamily: "Poppins-Regular",
    alignSelf: "stretch"
  },
  homeParent: {
    width: 52,
    gap: 4,
    zIndex: 1,
    alignItems: "center"
  },
  cari: {
    left: "11.46%"
  },
  searchIcon: {
    left: 0,
    top: 0,
    overflow: "hidden",
    position: "absolute"
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  navbar: {
    top: 750,
    height: 94,
    position: "absolute"
  },
  profile: {
    borderColor: "#aba7af",
    maxWidth: "100%",
    width: "100%",
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fcfdfb",
    borderRadius: 12
  },
  binGoLogo: {
    width: 28,
    height: 28
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#d4d2d5",
    justifyContent: "center",
    paddingHorizontal: 52,
    paddingVertical: 12,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 10
  }
});

export default Profile; 