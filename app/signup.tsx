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

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Error',
        'Kata sandi dan konfirmasi kata sandi tidak sesuai! Silahkan periksa kembali.',
        [
          {
            text: 'OK',
            onPress: () => {
              setPassword('');
              setConfirmPassword('');
            }
          }
        ]
      );
      return;
    }

    try {
      setLoading(true);
      const { error } = await signUp(email, password);
      
      if (error) {
        let errorMessage = 'Terjadi kesalahan saat mendaftar. Silahkan coba lagi!';
        
        if (error.message.includes('already registered')) {
          errorMessage = 'Email sudah terdaftar. Silahkan lakukan login!';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Format email tidak valid!';
        } else if (error.message.includes('Password')) {
          errorMessage = 'Kata sandi harus minimal 6 karakter!';
        }

        Alert.alert('Error', errorMessage);
        return;
      }

      Alert.alert(
        'Berhasil',
        'Silahkan cek email Anda untuk verifikasi',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
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
            <Text style={styles.welcomeText}>Buat Akun Anda!</Text>
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
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Konfirmasi Kata Sandi"
                    placeholderTextColor="#aba7af"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#aba7af" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignup}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signupButtonText}>Daftar</Text>
                )}
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>atau</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity
                style={styles.loginLink}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.loginText}>
                  <Text style={styles.loginTextNormal}>Sudah punya akun? </Text>
                  <Text style={styles.loginTextBold}>Masuk</Text>
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
  signupButton: {
    width: '100%',
    backgroundColor: '#5b913b',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
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
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  loginTextNormal: {
    color: '#1e3014',
  },
  loginTextBold: {
    color: '#5b913b',
  },
}); 