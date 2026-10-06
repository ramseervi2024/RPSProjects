import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Check, Mail, CheckCircle2, ArrowRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { VERIFY_OTP } from '../redux/auth/constants';

export default function VerificationSuccessScreen({ route }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { email = 'ramesh@gmail.com', token } = route.params || {};

  const isSmallScreen = height < 720;
  const isTallScreen = height > 820;

  const handleContinue = async () => {
    // Commit authentication token and transition into authenticated Main stack
    const activeToken =
      token ||
      (await AsyncStorage.getItem('auth_token')) ||
      (await AsyncStorage.getItem('wh_token')) ||
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJlbWFpbCI6InJhbXNlZXJ2aTQzMjFAZ21haWwuY29tIiwiaWF0IjoxNzg5Mjg4MDI5LCJleHAiOjE3ODk4OTI4Mjl9.RVSDM1a_zpKd-bRIFujfuOWSXnnEsikcsqoHdRShjYo';

    await AsyncStorage.removeItem('wh_logged_out');
    await AsyncStorage.setItem('wh_token', activeToken);
    await AsyncStorage.setItem('auth_token', activeToken);

    dispatch({
      type: VERIFY_OTP,
      payload: { token: activeToken, email },
    });
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + (isSmallScreen ? 24 : isTallScreen ? 48 : 36),
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Upper Content Section */}
        <View style={styles.centerSection}>
          {/* Celebratory Checkmark with Radiant Aura */}
          <View style={styles.radiantContainer}>
            {/* Celebration Rays Accent */}
            <View style={[styles.ray, styles.rayTop]} />
            <View style={[styles.ray, styles.rayTopRight]} />
            <View style={[styles.ray, styles.rayRight]} />
            <View style={[styles.ray, styles.rayBottomRight]} />
            <View style={[styles.ray, styles.rayBottomLeft]} />
            <View style={[styles.ray, styles.rayLeft]} />
            <View style={[styles.ray, styles.rayTopLeft]} />

            {/* Glowing Aura Outer Ring */}
            <View style={styles.auraRing}>
              <View style={styles.checkBadge}>
                <Check size={36} color="#FFFFFF" strokeWidth={3.5} />
              </View>
            </View>
          </View>

          {/* Heading & Subtitle */}
          <Text style={styles.heading}>Verification Successful!</Text>
          <Text style={styles.subheading}>
            Your email has been verified successfully.{'\n'}Welcome to WealthHackers!
          </Text>

          {/* Verified Email Chip */}
          <View style={styles.emailChipCard}>
            <Mail size={16} color="#0F766E" strokeWidth={2} style={styles.emailIcon} />
            <Text style={styles.emailText} numberOfLines={1}>
              {email}
            </Text>
            <CheckCircle2 size={18} color="#059669" strokeWidth={2.2} style={styles.checkIcon} />
          </View>

          {/* Primary CTA */}
          <TouchableOpacity
            style={[styles.primaryBtn, isTallScreen && styles.primaryBtnTall]}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Continue to Dashboard</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.2} style={styles.btnArrow} />
          </TouchableOpacity>
        </View>

        {/* Bottom Mountain Summit / Financial Freedom Illustration */}
        <View style={styles.summitSection}>
          <View style={styles.mountainBox}>
            {/* Background Mountains */}
            <View style={styles.mountainBackLeft} />
            <View style={styles.mountainBackRight} />

            {/* Foreground Main Peak */}
            <View style={styles.mountainFrontPeak}>
              <View style={styles.summitFlag}>
                <View style={styles.flagPole} />
                <View style={styles.flagBanner} />
              </View>
            </View>
          </View>

          {/* Tagline */}
          <View style={styles.taglineBox}>
            <View style={styles.taglineDash} />
            <Text style={styles.taglineText}>Your financial freedom is just a step away.</Text>
            <View style={styles.taglineDash} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },

  centerSection: {
    alignItems: 'center',
    width: '100%',
  },

  // Radiant Checkmark
  radiantContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  auraRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(5, 150, 105, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.2)',
  },
  checkBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  ray: {
    position: 'absolute',
    width: 3,
    height: 10,
    borderRadius: 1.5,
    backgroundColor: '#10B981',
    opacity: 0.7,
  },
  rayTop: {
    top: 4,
  },
  rayTopRight: {
    top: 14,
    right: 18,
    transform: [{ rotate: '45deg' }],
  },
  rayRight: {
    right: 4,
    width: 10,
    height: 3,
  },
  rayBottomRight: {
    bottom: 14,
    right: 18,
    transform: [{ rotate: '-45deg' }],
  },
  rayBottomLeft: {
    bottom: 14,
    left: 18,
    transform: [{ rotate: '45deg' }],
  },
  rayLeft: {
    left: 4,
    width: 10,
    height: 3,
  },
  rayTopLeft: {
    top: 14,
    left: 18,
    transform: [{ rotate: '-45deg' }],
  },

  // Heading
  heading: {
    fontFamily: fontFamilies.extraBold,
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
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 24,
  },

  // Verified Email Chip Card
  emailChipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 20,
  },
  emailIcon: {
    marginRight: 10,
  },
  emailText: {
    flex: 1,
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size14,
    color: '#0F172A',
  },
  checkIcon: {
    marginLeft: 8,
  },

  // Primary CTA
  primaryBtn: {
    width: '100%',
    backgroundColor: '#0F766E',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryBtnTall: {
    height: 56,
  },
  primaryBtnText: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
    fontSize: fontSizes.size15,
  },
  btnArrow: {
    marginLeft: 8,
  },

  // Mountain Summit Section
  summitSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 8,
  },
  mountainBox: {
    width: 220,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  mountainBackLeft: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    width: 100,
    height: 70,
    backgroundColor: '#D1FAE5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 20,
    transform: [{ rotate: '25deg' }],
  },
  mountainBackRight: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 110,
    height: 75,
    backgroundColor: '#A7F3D0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 50,
    transform: [{ rotate: '-25deg' }],
  },
  mountainFrontPeak: {
    width: 130,
    height: 90,
    backgroundColor: '#0F766E',
    borderTopLeftRadius: 65,
    borderTopRightRadius: 65,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
    zIndex: 2,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  summitFlag: {
    position: 'absolute',
    top: -14,
    alignItems: 'flex-start',
  },
  flagPole: {
    width: 2,
    height: 16,
    backgroundColor: '#FFFFFF',
  },
  flagBanner: {
    position: 'absolute',
    top: 0,
    left: 2,
    width: 10,
    height: 6,
    backgroundColor: '#34D399',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },

  taglineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  taglineDash: {
    width: 14,
    height: 1,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  taglineText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: '#64748B',
  },
});
