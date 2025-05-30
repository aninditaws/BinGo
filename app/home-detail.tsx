import * as React from "react";
import {ScrollView, StyleSheet, Text, View, Pressable, Image, TextInput, Dimensions, SafeAreaView} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg"
import Pencil from "../assets/icons/pencil.svg"
import MapPin from "../assets/icons/map-pin-gray.svg"
import OrganicOutline from "../assets/icons/organic-outline.svg"
import LabBottlePlastic from "../assets/icons/plastic-bottle.svg"
import Danger from "../assets/icons/danger.svg"
import Bell from "../assets/icons/bell.svg"
import Settings from "../assets/icons/settings.svg"
import HomeIcon from "../assets/icons/house-light.svg"
import SearchIcon from "../assets/icons/search-light.svg"
import UserNavbar from "../assets/icons/user-light.svg"
import { Gap, Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get('window');

const Detail = () => {
  const router = useRouter();
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [binTitle, setBinTitle] = React.useState("Tempat Sampah KOICA #1");
  	
  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.detail}>
      <View style={styles.frameParent}>
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
        <View style={[styles.navbar1, styles.textPosition]}>
          <View style={[styles.navbarChild, styles.statusBarPosition]} />
          <View style={styles.lucidehouseParent}>
            <HomeIcon style={styles.lucidehouseIcon} width={36} height={36} />
            <Text style={[styles.beranda, styles.textClr]}>Beranda</Text>
          </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.grayscaleWhite,
  },
  detail: {
    flex: 1,
    backgroundColor: Color.grayscaleWhite,
  },
  frameParent: {
    padding: 16,
    gap: 24,
  },
  frameGroup: {
    width: '100%',
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  frameContainer: {
    flex: 1,
    gap: Gap.gap_md,
    alignItems: "center",
    flexDirection: "row",
  },
  lucidechevronRightParent: {
    flex: 1,
    gap: Gap.gap_md,
    alignItems: "center",
    flexDirection: "row"
  },
  tempatSampahKoica: {
    fontSize: 14,
    lineHeight: 20,
    color: Color.grayscaleBlack,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    fontWeight: "600",
    flex: 1,
  },
  statusListContainer: {
    gap: Gap.gap_sm,
    width: '100%',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xs,
    borderWidth: 1.5,
    borderColor: Color.colorGainsboro,
    marginBottom: Gap.gap_xs,
    width: '100%',
  },
  userCardsParent: {
    gap: Gap.gap_sm,
    width: '100%',
  },
  userCards: {
    height: 51,
    width: '100%',
  },
  maskGroupParent: {
    width: '100%',
    borderRadius: Border.br_7xs,
    borderColor: Color.colorGainsboro,
    paddingHorizontal: Padding.p_sm,
    gap: Gap.gap_xl,
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.grayscaleWhite
  },
  topbar: {
    width: '100%',
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
    backgroundColor: "#fcfdfb"
  },
  navbar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Color.primaryPrimary500,
  },
  navbar1: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
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
    width: 393,
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
    width: 340,
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
  frameParent: {
    top: 100,
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
  navbarChild: {
    top: 11,
    left: 43,
    backgroundColor: "#5b913b",
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
  agusSutyono: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    color: Color.grayscaleHintText
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
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Gap.gap_xs
  },
  lucidemapPinParent: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  pengurus: {
    textAlign: "left",
    color: Color.grayscaleHintText,
    lineHeight: 23,
    fontSize: FontSize.size_lgi,
    alignSelf: "stretch"
  }
});

export default Detail; 