import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
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
  ChevronLeft,
  Mail,
  ArrowRight,
  Sparkles,
  Lock,
  X,
  Send,
  ShieldCheck,
} from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { sendLoginOtp } from '../redux/auth/action';
import { showToast } from '../components/common/Toast';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const isSmallScreen = height < 720;
  const isTallScreen = height > 820;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSendOTP = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      showToast.error('Required', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await dispatch(sendLoginOtp(trimmedEmail));
      if (res?.success) {
        showToast.success('OTP Sent', `Verification code sent to ${trimmedEmail}`);
        navigation.navigate('VerifyOTP', { email: trimmedEmail });
      } else {
        showToast.error(
          'Login Notice',
          res?.error || res?.message || 'We could not send an OTP to this address. Please try again.'
        );
      }
    } catch (err) {
      if (__DEV__) {
        showToast.info('Dev Mode', 'Navigating to Verify OTP directly.');
        navigation.navigate('VerifyOTP', { email: trimmedEmail });
      } else {
        showToast.error('Network Error', 'Could not reach authentication server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + (isSmallScreen ? 6 : 10),
            paddingBottom: Math.max(insets.bottom, 14),
          },
        ]}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardContainer}
        >
          {/* Top Navigation Bar: Back on Left, "New here? Sign Up" on Right */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              accessibilityLabel="Back"
            >
              <ChevronLeft size={20} color="#334155" strokeWidth={2.4} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showToast.info('Direct Sign-Up', 'Enter your corporate or personal email below to continue.')}
              activeOpacity={0.7}
              style={styles.signUpPrompt}
            >
              <Text style={styles.signUpText}>
                New here? <Text style={styles.signUpLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: isTallScreen ? 20 : isSmallScreen ? 8 : 14,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Center Visual: Soft Mint Circular Badge with Mail & Paper Plane */}
            <View style={styles.visualContainer}>
              <View style={styles.mailBadge}>
                <Mail size={36} color="#0F766E" strokeWidth={2.2} />
                <View style={styles.paperPlaneAccent}>
                  <Send size={14} color="#0F766E" strokeWidth={2.5} />
                </View>
              </View>
            </View>

            {/* Header & Subtitle */}
            <View style={styles.headerSection}>
              <Text style={styles.heading}>Welcome Back</Text>
              <Text style={styles.subheading}>
                Enter your personal or corporate email to receive your 6-digit verification OTP.
              </Text>
            </View>

            {/* Form Group */}
            <View style={[styles.formGroup, isTallScreen && styles.formGroupTall]}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                <Mail
                  size={18}
                  color={isFocused ? '#0F766E' : '#94A3B8'}
                  strokeWidth={2}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ramesh@gmail.com"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  editable={!loading}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {email.length > 0 && !loading && (
                  <TouchableOpacity
                    onPress={() => setEmail('')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={styles.clearBtn}
                  >
                    <X size={16} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Primary CTA */}
              <TouchableOpacity
                style={[styles.submitBtn, isTallScreen && styles.submitBtnTall]}
                onPress={handleSendOTP}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.submitBtnText}>Send Verification OTP</Text>
                    <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.2} style={styles.btnArrow} />
                  </>
                )}
              </TouchableOpacity>

              {/* Secondary Dev Shortcut */}
              {__DEV__ && (
                <TouchableOpacity
                  style={styles.devBypassBtn}
                  onPress={() => navigation.navigate('VerifyOTP', { email: email.trim() || 'ramesh@gmail.com' })}
                  activeOpacity={0.7}
                >
                  <Sparkles size={13} color="#0F766E" style={styles.devBypassIcon} />
                  <Text style={styles.devBypassText}>Quick Dev Preview (Verify OTP)</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Subtle Divider "OR" */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Security Guarantee Info Card */}
            <View style={styles.securityCard}>
              <View style={styles.lockSquare}>
                <Lock size={16} color="#0F766E" strokeWidth={2.2} />
              </View>
              <Text style={styles.securityCardText}>
                Your information is 100% secure and never shared with third parties.
              </Text>
            </View>

            {/* Bottom Trust Information */}
            <View style={styles.bottomTrustRow}>
              <ShieldCheck size={13} color="#0F766E" strokeWidth={2.2} style={styles.trustIcon} />
              <Text style={styles.trustText}>
                256-Bit TLS Encryption • SEBI Compliant Privacy
              </Text>
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
    paddingHorizontal: 20,
  },
  keyboardContainer: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  signUpPrompt: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  signUpText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size13,
    color: '#64748B',
  },
  signUpLink: {
    fontFamily: fontFamilies.bold,
    color: '#0F766E',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 8,
  },

  // Center Visual Badge
  visualContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  mailBadge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  paperPlaneAccent: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // Heading Section
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size24,
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  subheading: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 6,
    paddingHorizontal: 16,
  },

  // Form
  formGroup: {
    width: '100%',
  },
  formGroupTall: {
    marginTop: 4,
  },
  inputLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size11,
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  inputWrapperFocused: {
    borderColor: '#0F766E',
    backgroundColor: '#F0FDFA',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size14,
    color: '#0F172A',
    padding: 0,
  },
  clearBtn: {
    padding: 4,
  },

  submitBtn: {
    backgroundColor: '#0F766E',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnTall: {
    height: 54,
    marginTop: 20,
  },
  submitBtnText: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
    fontSize: fontSizes.size15,
  },
  btnArrow: {
    marginLeft: 8,
  },

  devBypassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 6,
  },
  devBypassIcon: {
    marginRight: 6,
  },
  devBypassText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size11,
    color: '#94A3B8',
    marginHorizontal: 12,
  },

  // Security Guarantee Card
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  lockSquare: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  securityCardText: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#334155',
    lineHeight: 16,
  },

  // Bottom Trust Footer
  bottomTrustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  trustIcon: {
    marginRight: 6,
  },
  trustText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: '#64748B',
  },
});
