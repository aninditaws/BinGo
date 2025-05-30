import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DeletePopup from "../assets/icons/delete-popup.svg";
import { useAuth } from "../lib/AuthContext";

const DeleteAccountModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleDelete = async () => {
    try {
      // TODO: Implement account deletion API endpoint in backend
      // For now, just sign out the user
      await signOut();
      onClose();
      router.replace("/signup");
    } catch (error) {
      console.error("Delete account error:", error);
      // Still navigate to signup even if signout fails
      onClose();
      router.replace("/signup");
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <DeletePopup style={styles.illustration} width={120} height={120} />
        <Text style={styles.description}>
          <Text style={styles.normalText}>{`Tindakan ini `}</Text>
          <Text style={styles.boldText}>tidak dapat dibatalkan</Text>
          <Text
            style={styles.normalText}
          >{`. Akun dan seluruh data Anda akan `}</Text>
          <Text style={styles.boldText}>dihapus selamanya</Text>
          <Text style={styles.normalText}>{`.

  Apakah Anda ingin melanjutkan?
`}</Text>
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={[styles.buttonText, styles.deleteText]}>
              Hapus Akun
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
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
      height: 6,
    },
    shadowRadius: 6,
    elevation: 6,
    shadowOpacity: 1,
  },
  modalContent: {
    alignItems: "center",
    width: "100%",
  },
  illustration: {
    marginBottom: 16,
    overflow: "hidden",
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 17,
  },
  normalText: {
    color: "#1e3014",
  },
  boldText: {
    color: "#d51a52",
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    gap: 8,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#d51a52",
  },
  cancelButton: {
    backgroundColor: "#fcfdfb",
    borderWidth: 1,
    borderColor: "#e5e0eb",
  },
  deleteText: {
    color: "#fcfdfb",
  },
  cancelText: {
    color: "#1e3014",
  },
});

export default DeleteAccountModal;
