import * as React from "react";
import {ScrollView, StyleSheet, Text, View, Pressable, Image, TextInput, Dimensions, Platform} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg"
import Pencil from "../assets/icons/pencil.svg"
import MapPin from "../assets/icons/map-pin-gray.svg"
import OrganicOutline from "../assets/icons/organic-outline.svg"
import LabBottlePlastic from "../assets/icons/plastic-bottle.svg"
import Danger from "../assets/icons/danger.svg"
import Bell from "../assets/icons/bell.svg"
import Settings from "../assets/icons/settings.svg"
import HomeIcon from "../assets/icons/house-dark.svg"
import SearchIcon from "../assets/icons/search-light.svg"
import UserNavbar from "../assets/icons/user-light.svg"
import { Gap, Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { useRouter } from "expo-router";

const Detail = () => {
  const router = useRouter();
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [binTitle, setBinTitle] = React.useState("Tempat Sampah KOICA #1");
  const { height: screenHeight } = Dimensions.get('window');

  // Dynamic positioning to fix layout issues
  const { width: screenWidth } = Dimensions.get('window');
  
  const dynamicStyles = StyleSheet.create({
    navbar: {
      ...styles.navbar,
      top: screenHeight - 94, // Position navbar at bottom of screen
    },
    frameParent: {
      ...styles.frameParent,
      top: Platform.OS === 'web' ? 145 : 165, // Adjust content position to match even smaller topbar
      paddingBottom: Platform.OS === 'ios' ? 120 : 100, // Add bottom padding to prevent overlap
    },
    navbarChild: {
      ...styles.navbarChild,
      left: Platform.OS === 'web' 
        ? 43  // Original perfect web positioning
        : Math.round((screenWidth - 92) / 3) - 40, // Mobile responsive positioning
    },
    topbar: {
      ...styles.topbar,
      paddingTop: Platform.OS === 'web' ? 45 : 60, // Further reduced padding for even smaller topbar
      paddingBottom: Platform.OS === 'web' ? 15 : 20, // Further reduced bottom padding
    },
    logoIcon: {
      width: 36, // Make logo bigger
      height: 36,
    }
  });
  
  return (
    <ScrollView style={styles.detail}>
      <View style={dynamicStyles.frameParent}>
        <View style={[styles.frameGroup, styles.topbarFlexBox]}>
          <View style={styles.frameContainer}>
            <View style={styles.lucidechevronRightParent}>
              <Pressable onPress={() => router.back()}>
                <ChevronRight style={styles.lucidechevronRightIcon} width={24} height={24} />
              </Pressable>
              {isEditingTitle ? (
                <TextInput
                  style={[styles.tempatSampahKoica, styles.statusClr, { flex: 1, borderBottomWidth: 1, borderColor: Color.grayscaleBorder }]}
                  value={binTitle}
                  onChangeText={setBinTitle}
                  autoFocus
                  onBlur={() => setIsEditingTitle(false)}
                />
              ) : (
                <Text style={[styles.tempatSampahKoica, styles.statusClr]}>{binTitle}</Text>
              )}
            </View>
            <Pressable onPress={() => setIsEditingTitle(true)}>
              <Pencil style={[styles.lucidepencilIcon, styles.badgeIconLayout]} width={16} height={16} />
            </Pressable>
          </View>
          <View style={styles.lucidemapPinParent}>
            <MapPin style={styles.lucidemapPinIcon} width={14} height={14} />
            <Text style={[styles.koica, styles.organikLayout]}>KOICA</Text>
          </View>
        </View>
        <View style={styles.frameView}>
          <View style={[styles.frameGroup, styles.topbarFlexBox]}>
            <Text style={[styles.status, styles.bingoTypo]}>Status</Text>
            <View style={styles.status1}>
              <View style={[styles.statusDot, { backgroundColor: Color.errorDanger500 }]} />
              <Text style={[styles.penuh, styles.penuhLayout]}>Penuh</Text>
            </View>
          </View>
          <View style={styles.frameChild} />
          <View style={styles.statusListContainer}>
            <View style={[styles.statusRow, { backgroundColor: 'transparent' }]}>
              <View style={styles.statusLabelContent}>
                <OrganicOutline style={styles.mdiorganicOutlineIcon} width={15} height={15} />
                <Text style={[styles.statusLabelText, { color: Color.grayscaleBlack }]}>Organik</Text>
              </View>
              <View style={styles.statusValueContent}>
                <View style={[styles.statusDot, { backgroundColor: Color.approvalApproval700 }]} />
                <Text style={[styles.statusValueText, { color: Color.grayscaleBlack }]}>Kosong</Text>
              </View>
            </View>

            <View style={[styles.statusRow, { backgroundColor: "#FEF2F2" }]}>
              <View style={styles.statusLabelContent}>
                <LabBottlePlastic width={15} height={15} />
                <Text style={[styles.statusLabelText, { color: Color.errorDanger500 }]}>Anorganik</Text>
              </View>
              <View style={styles.statusValueContent}>
                <View style={[styles.statusDot, { backgroundColor: Color.errorDanger500 }]} />
                <Text style={[styles.statusValueText, { color: "#d51a52" }]}>Penuh</Text>
              </View>
            </View>

            <View style={[styles.statusRow, { backgroundColor: 'transparent' }]}>
              <View style={styles.statusLabelContent}>
                <Danger style={styles.makidangerIcon} width={13} height={13} />
                <Text style={[styles.statusLabelText, { color: Color.grayscaleBlack }]}>B3</Text>
              </View>
              <View style={styles.statusValueContent}>
                <View style={[styles.statusDot, { backgroundColor: Color.primaryPrimary500 }]} />
                <Text style={[styles.statusValueText, { color: Color.grayscaleBlack }]}>Kosong</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.parentFlexBox}>
          <Text style={[styles.pengurus, styles.bingoTypo]}>Pengurus</Text>
          <View style={styles.userCardsParent}>
            <View style={styles.userCards}>
              <View style={[styles.maskGroupParent, styles.textPosition]}>
                <Image style={styles.avatarImage} resizeMode="cover" source={require("../assets/icons/person.png")} />
                <Text style={[styles.agusSutyono, styles.organikLayout]}>Agus Sutyono</Text>
              </View>
            </View>
            <View style={styles.userCards}>
              <View style={[styles.maskGroupParent, styles.textPosition]}>
                <Image style={styles.avatarImage} resizeMode="cover" source={require("../assets/icons/person.png")} />
                <Text style={[styles.agusSutyono, styles.organikLayout]}>Budi Rahaja</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[dynamicStyles.topbar, styles.topbarLayout]}>
        <Pressable style={styles.brandName} onPress={() => router.push("/home")}>
          <Image style={dynamicStyles.logoIcon} resizeMode="cover" source={require("../assets/images/icon.png")} />
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
      <View style={[dynamicStyles.navbar, styles.topbarLayout]}>
        <View style={[styles.navbar1, styles.textPosition]}>
          <View style={[dynamicStyles.navbarChild, styles.statusBarPosition]} />
          <Pressable style={styles.lucidehouseParent} onPress={() => router.push("/home")}>
            <HomeIcon style={styles.lucidehouseIcon} width={36} height={36} />
            <Text style={[styles.beranda, styles.textClr]}>Beranda</Text>
          </Pressable>
          <Pressable style={[styles.cariParent, styles.parentLayout]} onPress={() => router.push("/search")}>
            <Text style={[styles.cari, styles.cariTypo]}>Cari</Text>
            <SearchIcon style={[styles.lucidesearchIcon, styles.iconPosition]} width={32} height={32} />
          </Pressable>
          <Pressable style={[styles.lucideuserParent, styles.parentLayout]} onPress={() => router.push("/profile")}>
            <UserNavbar style={[styles.lucideuserIcon, styles.iconLayout]} />
            <Text style={[styles.profil, styles.cariTypo]}>Profil</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topbarFlexBox: {
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  statusClr: {
    color: Color.grayscaleHintText,
    textAlign: "left"
  },
  badgeIconLayout: {
    height: 16,
    width: 16
  },
  organikLayout: {
    lineHeight: 17,
    fontSize: FontSize.size_sm
  },
  bingoTypo: {
    fontFamily: FontFamily.nunitoSemiBold,
    fontWeight: "600"
  },
  penuhLayout: {
    lineHeight: 14,
    fontSize: FontSize.size_xs
  },
  frameBorder: {
    height: 1,
    borderTopWidth: 1,
    borderColor: Color.colorBeige_100,
    borderStyle: "solid"
  },
  frameParent3FlexBox: {
    backgroundColor: Color.primaryPrimary000,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    width: 243
  },
  frameParentFlexBox1: {
    padding: Padding.p_xs,
    borderRadius: Border.br_9xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    borderBottomWidth: 2,
    borderColor: Color.colorBeige_100,
    borderStyle: "solid"
  },
  frameParent5FlexBox: {
    backgroundColor: Color.tertierTertier000,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    width: 243
  },
  penuh1Typo: {
    color: Color.errorDanger500,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  frameParent7FlexBox: {
    backgroundColor: "rgba(241, 179, 197, 0.5)",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    width: 243
  },
  parentFlexBox: {
    gap: Gap.gap_lg,
    alignSelf: "stretch"
  },
  frameParentFlexBox: {
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    flexDirection: "row"
  },
  bingoClr: {
    color: Color.primaryPrimary500,
    textAlign: "left"
  },
  penuh3Typo: {
    color: Color.tertierTertier500,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  textPosition: {
    top: "50%",
    position: "absolute"
  },
  topbarLayout: {
    width: "100%",
    left: 0
  },
  statusBarPosition: {
    zIndex: 0,
    position: "absolute"
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute"
  },
  iconPosition: {
    position: "absolute"
  },
  textClr: {
    color: Color.grayscaleWhite
  },
  parentLayout: {
    width: 32,
    zIndex: 2,
    height: 54
  },
  cariTypo: {
    top: "74.07%",
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.grayscaleWhite,
    fontFamily: FontFamily.poppinsRegular,
    position: "absolute"
  },
  lucidechevronRightIcon: {
    overflow: "hidden"
  },
  lucidepencilIcon: {
    overflow: "hidden"
  },
  lucidemapPinIcon: {
    overflow: "hidden"
  },
  koica: {
    color: Color.grayscaleBlack,
    textAlign: "justify",
    fontFamily: FontFamily.poppinsRegular
  },
  status: {
    textAlign: "left",
    color: Color.grayscaleBlack,
    lineHeight: 23,
    fontSize: FontSize.size_lgi
  },
  status1: {
    gap: Gap.gap_sm,
    alignItems: "center",
    flexDirection: "row"
  },
  frameChild: {
    width: "100%",
    height: 2,
    borderTopWidth: 2,
    borderColor: Color.colorBeige_100,
    borderStyle: "solid"
  },
  mdiorganicOutlineIcon: {
    overflow: "hidden"
  },
  organik: {
    color: Color.approvalApproval700,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  anorganik: {
    color: Color.errorDanger500,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  penuh: {
    color: "#d51a52",
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  penuh1: {
    color: "#d51a52",
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  penuh3: {
    color: "#d51a52",
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  kosong2: {
    color: Color.grayscaleBlack,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left"
  },
  tempatSampahKoica: {
    fontSize: 14,
    lineHeight: 20,
    color: Color.grayscaleBlack,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    fontWeight: "600"
  },
  lucidechevronRightParent: {
    gap: Gap.gap_md,
    alignItems: "center",
    flexDirection: "row"
  },
  lucidemapPinParent: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center"
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
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Gap.gap_xs
  },
  frameParent: {
    left: 16,
    right: 16,
    gap: 24,
    position: "absolute",
    paddingBottom: 110
  },
  binGoLogo: {
    width: 28,
    height: 28
  },
  bingo: {
    color: "#5b913b",
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "Nunito-SemiBold",
    fontWeight: "600"
  },
  brandName: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    flex: 1
  },
  bellIcon: {
    overflow: "hidden"
  },
  bellParent: {
    gap: 18,
    flexDirection: "row",
    alignItems: "center"
  },
  notificationBadgeText: {
    color: Color.grayscaleWhite,
    fontSize: 10,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700"
  },
  beranda: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: "stretch",
    color: Color.grayscaleWhite
  },
  cari: {
    left: "11.46%"
  },
  profil: {
    left: "6.25%"
  },
  lucidehouseIcon: {
    overflow: "hidden"
  },
  lucidehouseParent: {
    width: 52,
    zIndex: 1,
    gap: Gap.gap_sm,
    alignItems: "center"
  },
  lucidesearchIcon: {
    top: 0,
    overflow: "hidden"
  },
  cariParent: {
    width: 32,
    zIndex: 2,
    height: 54
  },
  lucideuserIcon: {
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
  lucideuserParent: {
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
    width: "100%",
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  navbar: {
    top: 750,
    height: 94,
    position: "absolute",
    width: "100%",
    left: 0
  },
  detail: {
    borderColor: Color.grayscaleBorder,
    flex: 1,
    maxWidth: "100%",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.grayscaleWhite,
    borderTopLeftRadius: Border.br_xs,
    borderTopRightRadius: Border.br_xs,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  navbarChild: {
    top: 11,
    left: 43,
    backgroundColor: "#76a35c",
    width: 92,
    height: 72,
    borderRadius: 12,
    zIndex: 0
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Gap.gap_sm
  },
  maskGroupParent: {
    marginTop: -25,
    width: "100%",
    right: "0%",
    left: "0%",
    borderRadius: Border.br_7xs,
    paddingHorizontal: Padding.p_sm,
    gap: Gap.gap_xl,
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.grayscaleWhite
  },
  userCards: {
    height: 51,
    width: "100%"
  },
  userCardsParent: {
    gap: Gap.gap_sm,
    width: "100%"
  },
  pengurus: {
    textAlign: "left",
    color: Color.grayscaleHintText,
    lineHeight: 23,
    fontSize: FontSize.size_lgi,
    alignSelf: "stretch"
  },
  agusSutyono: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    color: Color.grayscaleHintText
  },
  frameGroup: {
    alignSelf: "stretch"
  },
  frameContainer: {
    gap: Gap.gap_md,
    alignItems: "center",
    flexDirection: "row",
    marginTop: -8,
    marginLeft: -8
  },
  frameView: {
    gap: Gap.gap_md,
    alignSelf: "stretch"
  },
  frameParent3: {
    backgroundColor: "transparent",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    width: 243
  },
  frameParent4: {
    backgroundColor: "transparent"
  },
  frameParent5: {
    backgroundColor: "transparent",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    width: 243
  },
  frameParent7: {
    backgroundColor: "transparent",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    width: 243
  },
  makidangerIcon: {
    overflow: "hidden"
  },
  statusListContainer: {
    gap: Gap.gap_sm
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
    width: "100%"
  },
  statusLabelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Gap.gap_sm
  },
  statusLabelText: {
    lineHeight: 17,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular
  },
  statusValueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Gap.gap_sm
  },
  statusValueText: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular
  }
});

export default Detail; 