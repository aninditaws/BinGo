import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import LogoutPopup from "../assets/icons/log-out-popup.svg";
import { useRouter } from "expo-router";

const LogoutModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <LogoutPopup style={styles.illustration} width={120} height={120} />
        <Text style={styles.description}>
          Apakah Anda yakin ingin keluar dari akun ini?
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={[styles.buttonText, styles.logoutText]}>Keluar</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={[styles.buttonText, styles.cancelText]}>Batal</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fcfdfb",
    borderRadius: 16,
    padding: 20,
    width: "70%",
    maxWidth: 320,
    alignItems: "center",
    shadowColor: "rgba(42, 51, 70, 0.04)",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 6,
    elevation: 6,
    shadowOpacity: 1,
  },
  modalContent: {
    alignItems: "center",
    width: "100%"
  },
  illustration: {
    marginBottom: 16,
    overflow: "hidden"
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#1e3014",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 17
  },
  buttonContainer: {
    width: "100%",
    gap: 8
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "600"
  },
  logoutButton: {
    backgroundColor: "#d51a52"
  },
  cancelButton: {
    backgroundColor: "#fcfdfb",
    borderWidth: 1,
    borderColor: "#e5e0eb"
  },
  logoutText: {
    color: "#fcfdfb"
  },
  cancelText: {
    color: "#1e3014"
  }
});

export default LogoutModal; 