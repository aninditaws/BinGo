import * as React from "react";
import {ScrollView, Text, StyleSheet, View, Pressable, Modal} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg"
import Cookie from "../assets/icons/cookie.svg"
import Handshake from "../assets/icons/handshake.svg"
import UserRoundX from "../assets/icons/user-round-x.svg"
import Logout from "../assets/icons/log-out.svg"
import { Gap, Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useRouter } from "expo-router";
import DeleteAccountModal from "./delete-account";
import LogoutModal from "./logout";

const Settings = () => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  
  return (
    <View style={styles.container}>
      <ScrollView style={[styles.settings, styles.borderBorder]} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topbar}>
          <Pressable style={styles.brandName} onPress={() => router.push("/home")}>
            <ChevronRight style={styles.chevronRight} width={22} height={22} />
            <Text style={styles.title}>Pengaturan</Text>
          </Pressable>
        </View>

        <View style={styles.frameParent}>
          <View style={styles.settingsCardsParent}>
            <View style={[styles.settingsCards, styles.settingsLayout]}>
              <View style={styles.iconParent}>
                <Cookie style={styles.icon} width={20} height={20} />
                <Text style={[styles.kebijakanKeamanan, styles.textTypo]}>Kebijakan Keamanan</Text>
              </View>
            </View>
            <View style={styles.settingsLayout}>
              <View style={styles.iconParent}>
                <Handshake style={styles.icon} width={20} height={20} />
                <Text style={[styles.kebijakanKeamanan, styles.textTypo]}>Syarat dan Ketentuan</Text>
              </View>
            </View>
            <Pressable style={[styles.settingsCards, styles.settingsLayout]} onPress={() => setShowDeleteModal(true)}>
              <View style={styles.iconParent}>
                <UserRoundX style={styles.icon} width={20} height={20} />
                <Text style={[styles.hapusAkun, styles.textTypo]}>Hapus Akun</Text>
              </View>
            </Pressable>
            <Pressable style={[styles.settingsCards, styles.settingsLayout]} onPress={() => setShowLogoutModal(true)}>
              <View style={styles.iconParent}>
                <Logout style={styles.icon} width={20} height={20} />
                <Text style={[styles.hapusAkun, styles.textTypo]}>Keluar</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyright}>© 2025 BinGo. All rights reserved.</Text>
        </View>
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
        </View>
      </Modal>

      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <LogoutModal onClose={() => setShowLogoutModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.grayscaleWhite
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  settingsLayout: {
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_xl,
    height: 56,
    borderBottomWidth: 1,
    borderColor: Color.colorGainsboro,
    alignItems: "center",
    flexDirection: "row",
    width: 440,
    borderStyle: "solid",
    backgroundColor: Color.grayscaleWhite
  },
  textTypo: {
    width: 321,
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 20,
    fontSize: FontSize.size_sm
  },
  icon: {
    overflow: "hidden"
  },
  kebijakanKeamanan: {
    color: Color.grayscaleHintText
  },
  iconParent: {
    width: 351,
    gap: Gap.gap_md,
    alignItems: "center",
    flexDirection: "row"
  },
  settingsCards: {
    borderTopWidth: 1
  },
  hapusAkun: {
    color: Color.errorDanger500
  },
  settingsCardsParent: {
    width: 440
  },
  copyrightContainer: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center"
  },
  copyright: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#1e3014",
    textAlign: "center"
  },
  frameParent: {
    width: 440,
    flex: 1
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
  brandName: {
    width: 313,
    alignItems: "center",
    zIndex: 1,
    gap: 8,
    flexDirection: "row"
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
    gap: Gap.gap_0,
    justifyContent: "space-between",
    flexDirection: "row",
    width: 440,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    backgroundColor: Color.grayscaleWhite
  },
  settings: {
    borderRadius: 12,
    borderColor: Color.grayscaleBorder,
    flex: 1,
    maxWidth: "100%",
    width: "100%",
    backgroundColor: Color.grayscaleWhite,
    borderStyle: "solid"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default Settings; 