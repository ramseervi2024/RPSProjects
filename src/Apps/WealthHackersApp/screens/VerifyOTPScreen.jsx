import React, { useState, useRef, useEffect } from 'react';
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
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  Mail,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowRight,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { verifyLoginOtp, sendLoginOtp } from '../redux/auth/action';
import { showToast } from '../components/common/Toast';

export default function VerifyOTPScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { email = 'ramesh@gmail.com' } = route.params || {};

  const isSmallScreen = height < 720;
  const isTallScreen = height > 820;

  const boxGap = 8;
  const boxWidth = Math.min(50, Math.floor((width - 40 - 5 * boxGap) / 6));
  const boxHeight = Math.round(boxWidth * 1.16);

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(58);
  const inputRef = useRef(null);

  // Live countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleVerify = async () => {
    const cleanOtp = otp.trim();
    if (cleanOtp.length < 6) {
      showToast.error('Invalid OTP', 'Please enter the complete 6-digit passcode.');
      return;
    }

    setLoading(true);
    try {
      const res = await dispatch(verifyLoginOtp(email, cleanOtp));
      if (res?.success) {
        showToast.success('Verified', 'Logged in successfully!');
        // Navigate to celebratory Verification Successful screen
        navigation.navigate('VerificationSuccess', { email });
      } else {
        showToast.error(
          'Verification Notice',
          res?.error || res?.message || "The code you entered isn't correct. Please check and try again."
        );
      }
    } catch (err) {
      if (__DEV__) {
        showToast.info('Dev Mode', 'Verification bypassed in dev mode.');
        navigation.navigate('VerificationSuccess', { email });
      } else {
        showToast.error('Error', 'Network error occurred during verification.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setResending(true);
    try {
      const res = await dispatch(sendLoginOtp(email));
      if (res?.success) {
        setCountdown(60);
        showToast.success('OTP Sent', 'A fresh 6-digit code has been sent to your email.');
      } else {
        showToast.error('Notice', res?.message || 'Could not resend OTP at this moment.');
      }
    } catch (err) {
      showToast.error('Error', 'Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  const handleDevLogin = async () => {
    const devToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJlbWFpbCI6InJhbXNlZXJ2aTQzMjFAZ21haWwuY29tIiwiaWF0IjoxNzg5Mjg4MDI5LCJleHAiOjE3ODk4OTI4Mjl9.RVSDM1a_zpKd-bRIFujfuOWSXnnEsikcsqoHdRShjYo';
    await AsyncStorage.removeItem('wh_logged_out');
    await AsyncStorage.setItem('wh_token', devToken);
    await AsyncStorage.setItem('auth_token', devToken);
    // Navigate to Verification Successful screen first for seamless flow
    navigation.navigate('VerificationSuccess', { email: email || 'ramesh@gmail.com', token: devToken });
  };

  // Render 6 individual passcode boxes matching Mockup 3
  const renderPasscodeBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const digit = otp[i] || '';
      const isFocusedBox = i === otp.length || (i === 5 && otp.length === 6);

      boxes.push(
        <View
          key={i}
          style={[
            styles.passcodeBox,
            {
              width: boxWidth,
              height: boxHeight,
              marginRight: i === 5 ? 0 : boxGap,
            },
            digit ? styles.passcodeBoxFilled : null,
            isFocusedBox ? styles.passcodeBoxFocused : null,
          ]}
        >
          {digit ? (
            <Text style={styles.passcodeDigit}>{digit}</Text>
          ) : (
            <View style={styles.passcodeEmptyDot} />
          )}
        </View>
      );
    }
    return boxes;
  };

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
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
          {/* Top Bar: Back on Left, Resend countdown on Right */}
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
              onPress={handleResend}
              disabled={countdown > 0 || resending}
              activeOpacity={0.7}
              style={styles.topResendBtn}
            >
              <Text style={styles.topResendText}>
                Didn't receive code?{' '}
                <Text style={[styles.topResendLink, countdown > 0 && styles.topResendDisabled]}>
                  {resending ? 'Sending...' : countdown > 0 ? `Resend (${countdown}s)` : 'Resend'}
                </Text>
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
            {/* Center Visual: Soft Mint Circular Badge with Shield Check */}
            <View style={styles.visualContainer}>
              <View style={styles.shieldBadge}>
                <ShieldCheck size={38} color="#0F766E" strokeWidth={2.2} />
              </View>
            </View>

            {/* Header & Subtitle */}
            <View style={styles.headerSection}>
              <Text style={styles.heading}>Verify OTP</Text>
              <Text style={styles.subheading}>
                Enter the 6-digit verification code sent to your email.
              </Text>
            </View>

            {/* Email Confirmation Chip */}
            <View style={styles.emailPillContainer}>
              <View style={styles.emailPill}>
                <Mail size={15} color="#0F766E" strokeWidth={2} style={styles.emailIcon} />
                <Text style={styles.emailText} numberOfLines={1}>
                  {email}
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                  <Text style={styles.changeBtn}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 6-Digit Passcode Section */}
            <View style={styles.passcodeSection}>
              <Text style={styles.passcodeLabel}>ENTER 6-DIGIT PASSCODE</Text>

              {/* Passcode Boxes Row */}
              <TouchableOpacity
                style={styles.boxesRow}
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
              >
                {renderPasscodeBoxes()}
              </TouchableOpacity>

              {/* Hidden TextInput for native numeric keyboard */}
              <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                value={otp}
                onChangeText={(val) => {
                  const numeric = val.replace(/[^0-9]/g, '').slice(0, 6);
                  setOtp(numeric);
                }}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
                editable={!loading}
              />

              {/* Mid Resend Link with Lock */}
              <View style={styles.resendRow}>
                <Lock size={12} color="#0F766E" strokeWidth={2.2} style={styles.lockIcon} />
                <Text style={styles.resendPrompt}>Didn't receive the code? </Text>
                <TouchableOpacity
                  onPress={handleResend}
                  disabled={countdown > 0 || resending}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.resendBtnText, countdown > 0 && styles.resendBtnDisabled]}>
                    {countdown > 0 ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Verify Button */}
              <TouchableOpacity
                style={[styles.submitBtn, isTallScreen && styles.submitBtnTall]}
                onPress={handleVerify}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.submitBtnText}>Verify & Continue</Text>
                    <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.2} style={styles.btnArrow} />
                  </>
                )}
              </TouchableOpacity>

              {/* Dev Shortcut */}
              {__DEV__ && (
                <TouchableOpacity
                  style={styles.devBypassBtn}
                  onPress={handleDevLogin}
                  activeOpacity={0.7}
                >
                  <Sparkles size={13} color="#0F766E" style={styles.devBypassIcon} />
                  <Text style={styles.devBypassText}>Quick Dev Login</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Bottom Security Warning Banner */}
            <View style={styles.bottomSecurityBanner}>
              <ShieldCheck size={14} color="#0F766E" strokeWidth={2.2} style={styles.bannerIcon} />
              <Text style={styles.bannerText}>
                Never share your one-time password with anyone.
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
  topResendBtn: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  topResendText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
  },
  topResendLink: {
    fontFamily: fontFamilies.bold,
    color: '#0F766E',
  },
  topResendDisabled: {
    color: '#94A3B8',
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
  shieldBadge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },

  // Header Section
  headerSection: {
    alignItems: 'center',
    marginBottom: 16,
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

  // Email Pill
  emailPillContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  emailIcon: {
    marginRight: 8,
  },
  emailText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size13,
    color: '#0F172A',
  },
  changeBtn: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F766E',
    marginLeft: 10,
  },

  // Passcode Section
  passcodeSection: {
    width: '100%',
  },
  passcodeLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size11,
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  boxesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passcodeBox: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  passcodeBoxFilled: {
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  passcodeBoxFocused: {
    borderColor: '#0F766E',
    borderWidth: 2,
    backgroundColor: '#F0FDFA',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  passcodeDigit: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size22,
    color: '#0F172A',
  },
  passcodeEmptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0.01,
    width: 1,
    height: 1,
  },

  // Resend
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  lockIcon: {
    marginRight: 4,
  },
  resendPrompt: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size13,
    color: '#64748B',
  },
  resendBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F766E',
  },
  resendBtnDisabled: {
    color: '#94A3B8',
  },

  // Submit Button
  submitBtn: {
    backgroundColor: '#0F766E',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnTall: {
    height: 54,
    marginTop: 22,
  },
  submitBtnText: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
    fontSize: fontSizes.size15,
  },
  btnArrow: {
    marginLeft: 8,
  },

  // Dev Bypass
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

  // Bottom Security Banner
  bottomSecurityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 20,
  },
  bannerIcon: {
    marginRight: 8,
  },
  bannerText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: '#0F766E',
  },
});
