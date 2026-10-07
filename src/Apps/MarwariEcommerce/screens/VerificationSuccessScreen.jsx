import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { VERIFY_OTP } from '../redux/auth/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerificationSuccessScreen({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { phone = '9876543210' } = route.params || {};

  const handleContinue = async () => {
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.marwari_token';
    const user = { phone, name: `Patron ${phone.slice(-4)}` };

    await AsyncStorage.removeItem('user_logged_out');
    await AsyncStorage.setItem('user_token', dummyToken);
    await AsyncStorage.setItem('marwari_token', dummyToken);
    await AsyncStorage.setItem('marwari_user', JSON.stringify(user));

    dispatch({
      type: VERIFY_OTP,
      payload: { token: dummyToken, user },
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 40),
            paddingBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        <View style={styles.iconCircle}>
          <CheckCircle2 size={56} color="#059669" />
        </View>

        <View style={styles.goldBadge}>
          <Sparkles size={12} color="#78350F" />
          <Text style={styles.goldBadgeText}>ROYAL PATRON VERIFIED</Text>
        </View>

        <Text style={styles.title}>Mobile Verified!</Text>
        <Text style={styles.subtitle}>
          Your phone +91 {phone} has been securely verified. Welcome to the
          majestic court of Mārwāri artisans.
        </Text>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleContinue}
          activeOpacity={0.88}
        >
          <Text style={styles.continueText}>Enter Royal Emporium</Text>
          <ArrowRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  goldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF08A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  goldBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#78350F',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 290,
    marginBottom: 28,
  },
  continueBtn: {
    width: '100%',
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
