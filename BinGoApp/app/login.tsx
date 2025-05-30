import * as React from "react";
import { ScrollView, Image, StyleSheet, Text, View, Pressable, TextInput, Dimensions, Platform, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../lib/AuthContext";

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi');
      return;
    }

    try {
      setLoading(true);
      const { error } = await signIn(email, password);

      if (error) {
        let errorMessage =
          "Email atau password yang dimasukkan salah! Silahkan coba lagi!";

        // Handle specific error cases
        if (error.message.includes("Invalid login credentials")) {
          errorMessage =
            "Email atau password yang dimasukkan salah! Silahkan coba lagi!";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage =
            "Email belum diverifikasi. Silahkan cek email Anda untuk verifikasi!";
        } else if (error.message.includes("Invalid email")) {
          errorMessage = "Format email tidak valid!";
        } else if (error.message.includes("rate limit")) {
          errorMessage =
            "Terlalu banyak percobaan login. Silahkan coba beberapa saat lagi!";
        }

        Alert.alert("Error", errorMessage);
        return;
      }

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan. Silahkan coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.brandName}>
            <Image 
              style={styles.k031Deliverable2Ppt1Icon} 
              resizeMode="cover" 
              source={require("../assets/images/icon.png")} 
            />
            <Text style={styles.bingo}>BinGo</Text>
          </View>

          <View style={styles.selamatDatangKembaliParent}>
            <Text style={styles.selamatDatangKembali}>Selamat Datang Kembali!</Text>
            <View style={styles.frameParent}>
              <View style={styles.inputdropdownParent}>
                <Pressable style={styles.inputdropdownBorder}>
                  <TextInput
                    style={[styles.text, styles.textTypo]}
                    placeholder="Email"
                    placeholderTextColor="#aba7af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Pressable>
                <Pressable style={[styles.inputdropdown1, styles.inputdropdownBorder]}>
                  <TextInput
                    style={[styles.text, styles.textTypo]}
                    placeholder="Kata Sandi"
                    placeholderTextColor="#aba7af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable 
                    style={styles.inputIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={16} 
                      color="#aba7af" 
                    />
                  </Pressable>
                </Pressable>
              </View>

              <Pressable 
                style={[styles.button, styles.parentFlexBox]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={[styles.button1, styles.button1Layout]}>
                  {loading ? 'Loading...' : 'Masuk'}
                </Text>
              </Pressable>

              <View style={[styles.lineParent, styles.parentFlexBox]}>
                <View style={styles.frameChild} />
                <Text style={[styles.atau, styles.atauTypo]}>atau</Text>
                <View style={styles.frameChild} />
              </View>

              <Pressable onPress={() => router.push("/signup")}>
                <Text style={[styles.text2, styles.atauTypo]}>
                  <Text style={styles.belumPunyaAkun}>{`Belum punya akun? `}</Text>
                  <Text style={styles.daftar}>Daftar</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfdfb",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height,
  },
  contentContainer: {
    paddingHorizontal: 24,
    width: isWeb ? 390 : width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  textTypo: {
    fontFamily: "Poppins-Regular",
    textAlign: "left",
  },
  inputdropdownBorder: {
    padding: 12,
    borderColor: "#e5e0eb",
    borderRadius: 6,
    flexDirection: "row",
    alignSelf: "stretch",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fcfdfb",
    alignItems: "center",
  },
  button1Layout: {
    lineHeight: 17,
    fontSize: 14,
  },
  atauTypo: {
    lineHeight: 14,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  btnGoogleLightLayout: {
    borderRadius: 100,
    alignSelf: "stretch",
  },
  k031Deliverable2Ppt1Icon: {
    width: 32,
    height: 32,
  },
  bingo: {
    fontSize: 24,
    lineHeight: 29,
    fontFamily: "Nunito-Bold",
    textAlign: "left",
    color: "#5b913b",
    fontWeight: "600",
  },
  brandName: {
    alignItems: "flex-end",
    gap: 12,
    flexDirection: "row",
    marginBottom: 32,
    alignSelf: "flex-start",
    width: "100%",
  },
  selamatDatangKembali: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    color: "#1e3014",
    alignSelf: "stretch",
    marginBottom: 40,
  },
  text: {
    lineHeight: 20,
    color: "#1e3014",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    flex: 1,
    padding: 0,
  },
  inputIcon: {
    overflow: "hidden",
    height: 16,
    width: 16,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputdropdown1: {
    gap: 8,
  },
  inputdropdownParent: {
    gap: 16,
    alignSelf: "stretch",
    width: "100%",
    maxWidth: 361,
  },
  button1: {
    fontFamily: "Poppins-SemiBold",
    color: "#fcfdfb",
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#5b913b",
    width: "100%",
    maxWidth: 361,
    paddingHorizontal: 52,
    paddingVertical: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  frameChild: {
    borderColor: "#1e3014",
    borderTopWidth: 0.6,
    height: 1,
    flex: 1,
    borderStyle: "solid",
  },
  atau: {
    color: "#1e3014",
    textAlign: "left",
  },
  lineParent: {
    gap: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    flexDirection: "row",
  },
  belumPunyaAkun: {
    color: "#1e3014",
  },
  daftar: {
    color: "#5b913b",
  },
  text2: {
    textAlign: "center",
    alignSelf: "stretch",
  },
  masukMenggunakanGoogle: {
    color: "#1f1f1f",
    fontFamily: "Poppins-Regular",
    textAlign: "left",
  },
  officialButtonsSignInWit: {
    height: 60,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fcfdfb",
    borderRadius: 100,
  },
  btnGoogleLight: {
    backgroundColor: "#c8dabe",
    padding: 3,
  },
  btnGoogleLightWrapper: {
    alignSelf: "stretch",
    width: "100%",
    maxWidth: 361,
  },
  frameParent: {
    gap: 32,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  selamatDatangKembaliParent: {
    width: "100%",
    alignItems: "center",
  },
});

export default Login; 