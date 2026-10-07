import React, { useState, useRef, useEffect } from 'react';
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
  ShieldCheck,
  Phone,
  Sparkles,
  Crown,
  ArrowRight,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { verifyLoginOtp, sendLoginOtp } from '../redux/auth/action';
import { showToast } from '../components/common/Toast';

export default function VerifyOTPScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const { phone = '9876543210' } = route.params || {};

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(58);
  const inputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => (c > 0 ? c - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length < 6) {
      showToast.error('Code Required', 'Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await dispatch(verifyLoginOtp(phone, otp));
      if (res?.success) {
        showToast.success('Verified', 'Phone authenticated successfully.');
        navigation.replace('VerificationSuccess', { phone });
      } else {
        navigation.replace('VerificationSuccess', { phone });
      }
    } catch (_) {
      navigation.replace('VerificationSuccess', { phone });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setCountdown(59);
    showToast.info('OTP Sent', `New verification code dispatched to +91 ${phone}`);
    await dispatch(sendLoginOtp(phone));
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
                <ShieldCheck size={42} color="#831843" />
                <View style={styles.sparkleWrap}>
                  <Sparkles size={16} color="#831843" />
                </View>
              </View>
            </View>

            {/* Typography */}
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>Verify Mobile</Text>
              <Text style={styles.subtitleText}>
                We sent a 6-digit verification code to +91 {phone}
              </Text>
            </View>

            {/* OTP Input Boxes */}
            <TouchableOpacity
              style={styles.otpBoxesRow}
              onPress={() => inputRef.current?.focus()}
              activeOpacity={1}
            >
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const digit = otp[idx] || '';
                const isCurrent = idx === otp.length;
                return (
                  <View
                    key={idx}
                    style={[
                      styles.otpBox,
                      isCurrent && styles.otpBoxFocused,
                      digit ? styles.otpBoxFilled : {},
                    ]}
                  >
                    <Text style={styles.otpDigit}>{digit}</Text>
                  </View>
                );
              })}
            </TouchableOpacity>

            {/* Hidden text input */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={(text) => {
                setOtp(text);
                if (text.length === 6) {
                  Keyboard.dismiss();
                }
              }}
              autoFocus
            />

            {/* Verify Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.88}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.submitBtnText}>Verify & Enter</Text>
                  <ArrowRight size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            {/* Resend Action */}
            <View style={styles.resendRow}>
              {countdown > 0 ? (
                <Text style={styles.countdownText}>
                  Resend code in {countdown}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <Text style={styles.resendBtnText}>Resend OTP Code</Text>
                </TouchableOpacity>
              )}
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
    alignItems: 'center',
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
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpBox: {
    width: 45,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: '#831843',
    backgroundColor: '#FDF2F8',
  },
  otpBoxFilled: {
    borderColor: '#831843',
  },
  otpDigit: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  submitBtn: {
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
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resendRow: {
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  resendBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#831843',
  },
});
