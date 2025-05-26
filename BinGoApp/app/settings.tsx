import * as React from "react";
import {ScrollView, Text, StyleSheet, View, Pressable, Modal, Dimensions, Platform} from "react-native";
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
    <View style={styles.container}>
      <ScrollView style={[styles.settings, styles.borderBorder]} contentContainerStyle={styles.scrollViewContent}>
        <View style={[dynamicStyles.topbar, styles.topbarLayout]}>
          <Pressable style={styles.brandName} onPress={() => router.push("/home")}>
            <ChevronRight style={dynamicStyles.chevronIcon} width={28} height={28} />
            <Text style={styles.title}>Pengaturan</Text>
          </Pressable>
        </View>

        <View style={dynamicStyles.frameParent}>
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
    backgroundColor: "#fcfdfb"
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  topbarLayout: {
    width: "100%",
    left: 0
  },
  settingsLayout: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 64,
    borderBottomWidth: 1,
    borderColor: "#e5e0eb",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    borderStyle: "solid",
    backgroundColor: "#fcfdfb"
  },
  textTypo: {
    flex: 1,
    textAlign: "left",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
    fontSize: 15
  },
  icon: {
    overflow: "hidden"
  },
  kebijakanKeamanan: {
    color: "#1a141f"
  },
  iconParent: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    flexDirection: "row"
  },
  settingsCards: {
    borderTopWidth: 1,
    borderColor: "#e5e0eb"
  },
  hapusAkun: {
    color: "#d51a52",
    fontWeight: "500"
  },
  settingsCardsParent: {
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
    overflow: "hidden",
    marginHorizontal: 16
  },
  copyrightContainer: {
    width: "100%",
    paddingVertical: 32,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  copyright: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#aba7af",
    textAlign: "center"
  },
  frameParent: {
    width: "100%",
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    paddingBottom: 100
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "Nunito-SemiBold",
    color: "#1e3014",
    textAlign: "center",
    fontWeight: "600"
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
  settings: {
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