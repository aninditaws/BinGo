import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import ChevronRight from "../assets/icons/chevron-right.svg";
import User from "../assets/icons/user-pink.svg";
import Mail from "../assets/icons/mail.svg";
import MapPin from "../assets/icons/map-pin-pink.svg";
import Bell from "../assets/icons/bell.svg";
import Settings from "../assets/icons/settings.svg";
import HomeIcon from "../assets/icons/house-light.svg";
import SearchIcon from "../assets/icons/search-light.svg";
import UserNavbar from "../assets/icons/user-dark.svg";
import { useRouter } from "expo-router";
import { useAuth } from "@/lib/AuthContext";

const Profile = () => {
  const router = useRouter();
  const { height: screenHeight } = Dimensions.get("window");
  const { user, profile, updateProfile, refreshProfile } = useAuth();

  // Form state - initialize with any available data
  const [fullName, setFullName] = React.useState(
    profile?.full_name || user?.display_name || ""
  );
  const [email, setEmail] = React.useState(user?.email || "");
  const [location, setLocation] = React.useState(profile?.location || "");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Initialize form with existing data immediately
  React.useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      // Only set fullName from user if we don't have profile data
      if (!profile?.full_name) {
        setFullName(user.display_name || "");
      }
    }

    if (profile) {
      setFullName(profile.full_name || user?.display_name || "");
      setLocation(profile.location || "");
    }
  }, [user, profile]);

  // Load initial data and refresh profile
  React.useEffect(() => {
    const loadProfileData = async () => {
      // Only show loading if we don't have basic user data
      if (!user) {
        setIsLoading(true);
      }

      try {
        await refreshProfile();

        // If profile is still null after first attempt, try once more after a short delay
        setTimeout(async () => {
          if (!profile) {
            console.log("Profile still null, retrying...");
            await refreshProfile();
          }
        }, 1000);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []); // Remove refreshProfile dependency to avoid infinite re-renders

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const result = await updateProfile({
        full_name: fullName.trim(),
        location: location.trim(),
      });

      if (result.error) {
        Alert.alert("Error", result.error.message);
      } else {
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Dynamic positioning to fix layout issues
  const { width: screenWidth } = Dimensions.get("window");

  const dynamicStyles = StyleSheet.create({
    navbar: {
      ...styles.navbar,
      top: screenHeight - 94, // Position navbar at bottom of screen
    },
    frameParent: {
      ...styles.frameParent,
      top: Platform.OS === "web" ? 130 : 150, // Adjust content position to match even smaller topbar
      paddingBottom: Platform.OS === "ios" ? 120 : 100, // Add bottom padding to prevent overlap
    },
    navbarChild: {
      ...styles.navbarChild,
      left:
        Platform.OS === "web"
          ? 265 // Original perfect web positioning
          : Math.round(((screenWidth - 92) / 3) * 2) + 56, // Mobile responsive positioning
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5b913b" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.profile}>
      <View style={dynamicStyles.frameParent}>
        <View style={styles.frameGroup}>
          <Pressable style={styles.chevronRightParent} onPress={() => {}}>
            <ChevronRight
              style={styles.chevronRightIcon}
              width={24}
              height={24}
            />
            <Text style={[styles.profil, styles.bingoTypo]}>Profil</Text>
          </Pressable>
          <View style={styles.profileIconContainer}>
            <Image
              style={styles.profileImage}
              resizeMode="cover"
              source={require("../assets/icons/person.png")}
            />
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
                <TextInput
                  style={[styles.textInput, styles.namaTypo]}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  editable={!isSaving}
                />
              </View>
            </View>
            <View style={styles.frameParent1}>
              <View style={styles.iconParent}>
                <Mail style={styles.icon} width={18} height={18} />
                <Text style={[styles.nama, styles.namaTypo]}>Email</Text>
              </View>
              <View
                style={[
                  styles.inputdropdown,
                  styles.borderBorder,
                  styles.disabledInput,
                ]}
              >
                <TextInput
                  style={[
                    styles.textInput,
                    styles.namaTypo,
                    styles.disabledText,
                  ]}
                  value={email}
                  placeholder="Email address"
                  placeholderTextColor="#999"
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.frameParent1}>
              <View style={styles.iconParent}>
                <MapPin style={styles.icon} width={18} height={18} />
                <Text style={[styles.nama, styles.namaTypo]}>Lokasi</Text>
              </View>
              <View style={[styles.inputdropdown, styles.borderBorder]}>
                <TextInput
                  style={[styles.textInput, styles.namaTypo]}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter your location"
                  placeholderTextColor="#999"
                  editable={!isSaving}
                />
              </View>
            </View>
          </View>
          <Pressable
            style={[styles.button, isSaving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#fcfdfb" />
            ) : (
              <Text style={[styles.button1, styles.text3Clr]}>Simpan</Text>
            )}
          </Pressable>
        </View>
      </View>
      <View style={[dynamicStyles.topbar, styles.topbarLayout]}>
        <Pressable
          style={styles.brandName}
          onPress={() => router.push("/home")}
        >
          <Image
            style={dynamicStyles.logoIcon}
            resizeMode="cover"
            source={require("../assets/images/icon.png")}
          />
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
        <View style={[styles.navbar1, styles.timePosition]}>
          <View style={[dynamicStyles.navbarChild, styles.statusBarPosition]} />
          <Pressable
            style={styles.homeParent}
            onPress={() => router.push("/home")}
          >
            <HomeIcon style={styles.homeIcon} width={36} height={36} />
            <Text style={styles.beranda}>Beranda</Text>
          </Pressable>
          <Pressable
            style={styles.searchParent}
            onPress={() => router.push("/search")}
          >
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
    fontWeight: "600",
  },
  namaTypo: {
    fontFamily: "Poppins-Regular",
    textAlign: "left",
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  text3Clr: {
    color: "#fcfdfb",
    textAlign: "center",
  },
  topbarFlexBox: {
    gap: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  statusBarPosition: {
    zIndex: 0,
    position: "absolute",
  },
  timePosition: {
    top: "50%",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
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
    width: "100%",
    left: 0,
  },
  chevronRightIcon: {
    overflow: "hidden",
  },
  profil: {
    color: "#1e3014",
  },
  chevronRightParent: {
    gap: 2,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  profileIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e5e0eb",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  frameGroup: {
    gap: 16,
    alignSelf: "stretch",
    alignItems: "center",
  },
  icon: {
    overflow: "hidden",
  },
  nama: {
    fontSize: 15,
    lineHeight: 18,
    color: "#1e3014",
  },
  iconParent: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
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
  inputdropdown: {
    borderRadius: 6,
    borderColor: "#e5e0eb",
    padding: 12,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "#fcfdfb",
  },
  frameParent1: {
    gap: 8,
    alignSelf: "stretch",
  },
  frameView: {
    gap: 18,
    alignSelf: "stretch",
  },
  button1: {
    lineHeight: 17,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  frameContainer: {
    gap: 20,
    alignSelf: "stretch",
    marginTop: 20,
    flex: 1,
  },
  frameParent: {
    left: 16,
    right: 16,
    gap: 16,
    alignItems: "center",
    position: "absolute",
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
  bellIcon: {
    overflow: "hidden",
  },
  bellParent: {
    gap: 18,
    flexDirection: "row",
    alignItems: "center",
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
    left: 245,
    backgroundColor: "#76a35c",
    width: 92,
    height: 72,
    borderRadius: 12,
    zIndex: 0,
  },
  homeIcon: {
    overflow: "hidden",
  },
  beranda: {
    lineHeight: 14,
    fontSize: 12,
    textAlign: "center",
    color: "#fcfdfb",
    fontFamily: "Poppins-Regular",
    alignSelf: "stretch",
  },
  homeParent: {
    width: 52,
    gap: 4,
    zIndex: 1,
    alignItems: "center",
  },
  cari: {
    left: "11.46%",
  },
  searchIcon: {
    left: 0,
    top: 0,
    overflow: "hidden",
    position: "absolute",
  },
  searchParent: {
    width: 32,
    zIndex: 2,
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
  profil1: {
    left: "6.25%",
  },
  userParent: {
    width: 32,
    zIndex: 3,
    height: 54,
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
  profile: {
    borderColor: "#aba7af",
    maxWidth: "100%",
    width: "100%",
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fcfdfb",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  binGoLogo: {
    width: 28,
    height: 28,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#5b913b",
    justifyContent: "center",
    paddingHorizontal: 52,
    paddingVertical: 12,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcfdfb",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1e3014",
    fontFamily: "Poppins-Regular",
  },
  textInput: {
    lineHeight: 20,
    color: "#1a141f",
    fontSize: 14,
    flex: 1,
    paddingVertical: 0, // Remove default padding to maintain consistent height
  },
  disabledInput: {
    backgroundColor: "#f5f5f5",
  },
  disabledText: {
    color: "#999",
  },
});

export default Profile;
