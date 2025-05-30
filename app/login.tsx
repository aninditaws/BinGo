import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../lib/AuthContext';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
        let errorMessage = 'Email atau password yang dimasukkan salah! Silahkan coba lagi!';
        
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email atau password yang dimasukkan salah! Silahkan coba lagi!';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Email belum diverifikasi. Silahkan cek email Anda untuk verifikasi!';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Format email tidak valid!';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Terlalu banyak percobaan login. Silahkan coba beberapa saat lagi!';
        }

        Alert.alert('Error', errorMessage);
        return;
      }

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan. Silahkan coba lagi!');
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
              style={styles.icon} 
              resizeMode="cover" 
              source={require("../assets/images/icon.png")} 
            />
            <Text style={styles.bingo}>BinGo</Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Selamat Datang Kembali!</Text>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aba7af"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Kata Sandi"
                    placeholderTextColor="#aba7af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#aba7af" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Masuk</Text>
                )}
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>atau</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity
                style={styles.signupLink}
                onPress={() => router.push('/signup')}
              >
                <Text style={styles.signupText}>
                  <Text style={styles.signupTextNormal}>Belum punya akun? </Text>
                  <Text style={styles.signupTextBold}>Daftar</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
  brandName: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  icon: {
    width: 32,
    height: 32,
  },
  bingo: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#5b913b',
    fontWeight: '600',
  },
  welcomeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#1e3014',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    gap: 32,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e0eb',
    borderRadius: 6,
    backgroundColor: '#fcfdfb',
    padding: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#1e3014',
  },
  eyeIcon: {
    padding: 2,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#5b913b',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fcfdfb',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    borderTopWidth: 0.6,
    borderColor: '#1e3014',
  },
  dividerText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#1e3014',
  },
  signupLink: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  signupTextNormal: {
    color: '#1e3014',
  },
  signupTextBold: {
    color: '#5b913b',
  },
}); 