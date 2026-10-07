import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  Crown,
  User,
  ArrowRight,
  Phone,
  PlusCircle,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { register } from '../redux/auth/action';
import { showToast } from '../components/common/Toast';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim()) {
      showToast.error('Name Required', 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast.error('Email Required', 'Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      showToast.error('Password Required', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      showToast.error('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (!agreed) {
      showToast.error('Terms Required', 'You must agree to the Terms & Conditions.');
      return;
    }

    setLoading(true);
    try {
      const res = await dispatch(
        register({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          password,
        })
      );

      if (res?.success) {
        showToast.success('Welcome to Mārwāri', 'Your royal patronage account has been created.');
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        }
      } else {
        showToast.error('Registration Notice', res?.error || 'Registration failed.');
      }
    } catch (err) {
      showToast.error('Auth Error', err?.message || 'Could not register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <AppStatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

        {/* Watermark Mock */}
        <View style={styles.watermark}>
          <View style={styles.watermarkPetal1} />
          <View style={styles.watermarkPetal2} />
          <View style={styles.watermarkPetal3} />
        </View>

        {/* Static Header Row */}
        <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16), paddingHorizontal: 24 }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardContainer}
        >
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: 16,
                paddingBottom: Math.max(insets.bottom, 20),
              },
            ]}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >

            {/* Hero Icon */}
            <View style={styles.heroWrap}>
              <View style={styles.heroCircle}>
                <User size={42} color="#831843" fill="#831843" />
                <View style={{ position: 'absolute', bottom: 18, right: 18 }}>
                  <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 2 }}>
                    <PlusCircle size={16} color="#831843" fill="#831843" />
                  </View>
                </View>
                <View style={styles.sparkleWrap}>
                  <Sparkles size={16} color="#831843" />
                </View>
              </View>
            </View>

            {/* Typography */}
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>Create Your Account</Text>
              <Text style={styles.subtitleText}>
                Join Royal Bag and enjoy exclusive offers, faster checkout and more.
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrap}>
                <User size={18} color="#94A3B8" />
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrap}>
                <Mail size={18} color="#94A3B8" />
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <View style={styles.inputWrap}>
                <Phone size={18} color="#94A3B8" />
                <TextInput
                  style={styles.inputField}
                  placeholder="+91 Enter mobile number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrap}>
                <Lock size={18} color="#94A3B8" />
                <TextInput
                  style={styles.inputField}
                  placeholder="Create a password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? (
                    <Eye size={18} color="#64748B" />
                  ) : (
                    <EyeOff size={18} color="#64748B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrap}>
                <Lock size={18} color="#94A3B8" />
                <TextInput
                  style={styles.inputField}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeBtn}
                >
                  {showConfirmPassword ? (
                    <Eye size={18} color="#64748B" />
                  ) : (
                    <EyeOff size={18} color="#64748B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Options Row */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreed(!agreed)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.checkbox,
                  agreed && styles.checkboxActive,
                ]}
              >
                {agreed && <Check size={12} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to the <Text style={styles.forgotText}>Terms & Conditions</Text>
                {'\n'}and <Text style={styles.forgotText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.88}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.loginBtnText}>Create Account</Text>
                  <ArrowRight size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            {/* Footer Login Link */}
            <View style={styles.footerWrap}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>Login Now →</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  watermark: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 200,
    height: 200,
    opacity: 0.1,
    zIndex: 0,
  },
  watermarkPetal1: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: 100,
    height: 60,
    backgroundColor: '#831843',
    borderRadius: 50,
    transform: [{ rotate: '45deg' }],
  },
  watermarkPetal2: {
    position: 'absolute',
    bottom: 20,
    left: 60,
    width: 100,
    height: 60,
    backgroundColor: '#831843',
    borderRadius: 50,
    transform: [{ rotate: '-15deg' }],
  },
  watermarkPetal3: {
    position: 'absolute',
    bottom: 70,
    left: 70,
    width: 100,
    height: 60,
    backgroundColor: '#831843',
    borderRadius: 50,
    transform: [{ rotate: '-65deg' }],
  },
  keyboardContainer: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandGroup: {
    alignItems: 'center',
  },
  brandText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#831843',
    marginTop: 2,
  },
  heroWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleWrap: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  titleWrap: {
    marginBottom: 32,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#0F172A',
    height: '100%',
  },
  eyeBtn: {
    padding: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#831843',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  checkboxActive: {
    backgroundColor: '#831843',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    lineHeight: 20,
    flex: 1,
  },
  forgotText: {
    fontWeight: '700',
    color: '#831843',
  },
  loginBtn: {
    backgroundColor: '#831843',
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#831843',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  googleBtn: {
    flexDirection: 'row',
    backgroundColor: '#FDF2F8',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleBtnText: {
    color: '#831843',
    fontSize: 14,
    fontWeight: '700',
  },
  footerWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '800',
    color: '#831843',
  },
});
