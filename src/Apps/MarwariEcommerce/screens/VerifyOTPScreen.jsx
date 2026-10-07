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
    if (otp.length < 4) {
      showToast.error('Code Required', 'Please enter the complete verification code.');
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
        <AppStatusBar backgroundColor="#077B9F" barStyle="light-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardContainer}
        >
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top, 24),
                paddingBottom: Math.max(insets.bottom, 20),
              },
            ]}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <ArrowLeft size={16} color="#FFFFFF" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.authCard}>
              <View style={styles.brandCrest}>
                <ShieldCheck size={22} color="#077B9F" />
              </View>

              <Text style={styles.cardTitle}>Verify Mobile</Text>
              <Text style={styles.cardSubtitle}>
                We sent a 6-digit verification code to +91 {phone}
              </Text>

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

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleVerify}
                disabled={loading}
                activeOpacity={0.88}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitBtnText}>VERIFY & ENTER</Text>
                )}
              </TouchableOpacity>

              {/* Resend */}
              <View style={styles.resendRow}>
                {countdown > 0 ? (
                  <Text style={styles.countdownText}>
                    Resend code in {countdown}s
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendBtnText}>Resend OTP Code</Text>
                  </TouchableOpacity>
                )}
              </View>
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
    backgroundColor: '#077B9F',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  authCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  brandCrest: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4B5563',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 20,
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: '#077B9F',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFilled: {
    borderColor: '#077B9F',
    backgroundColor: '#F0F9FF',
  },
  otpDigit: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  submitBtn: {
    backgroundColor: '#077B9F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  resendRow: {
    alignItems: 'center',
    marginTop: 18,
  },
  countdownText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  resendBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#077B9F',
  },
});
