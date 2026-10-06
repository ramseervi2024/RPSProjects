import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AppStatusBar from '../components/common/AppStatusBar';
import {
  TrendingUp,
  ShieldCheck,
  Users,
  ArrowRight,
  ChevronRight,
  Shield,
  Bell,
} from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../constants/fonts';

const logoImg = require('../assets/logo.png');

const BENEFITS = [
  {
    id: 'financial',
    Icon: TrendingUp,
    title: 'Financial Planning & Advisory',
    desc: 'Bespoke strategies customized to your goals',
  },
  {
    id: 'fee-only',
    Icon: ShieldCheck,
    title: 'Fee-Only Certified Advisor',
    desc: 'Zero commission, 100% fiduciary transparent',
  },
  {
    id: 'retirement',
    Icon: Users,
    title: 'Retirement & Wealth Protection',
    desc: 'Life long partnership ensuring lasting stability',
  },
];

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const isSmallScreen = height < 720;
  const isTallScreen = height > 820;

  return (
    <View style={styles.outerContainer}>
      <AppStatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: isSmallScreen ? 8 : 14,
            paddingBottom: Math.max(insets.bottom, 16) + (isSmallScreen ? 6 : 10),
          },
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Row (Brand Lockup + Notification Bell) */}
        <View style={styles.topBar}>
          <View style={styles.brandLockup}>
            <View style={styles.logoBadge}>
              <Image source={logoImg} style={styles.logoImg} resizeMode="contain" />
            </View>
            <View style={styles.brandTextContainer}>
              <Text style={styles.brandTitle}>WealthHackers</Text>
              <Text style={styles.brandTagline}>Plan • Invest • Grow</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bellBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
            accessibilityLabel="Notifications"
          >
            <Bell size={18} color="#0F766E" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {/* Hero Section with Growth Graphic */}
        <View style={[styles.heroSection, isSmallScreen && styles.heroSectionSmall]}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>
              Your Financial{'\n'}Future,{' '}
              <Text style={styles.heroTitleAccent}>Simplified</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Smart strategies, expert guidance and personalized solutions to help you achieve your financial goals.
            </Text>
          </View>

          {/* Minimal Abstract Growth Illustration */}
          <View style={styles.growthIllustrationBox}>
            <View style={styles.growthChartContainer}>
              {/* Trend Arrow Line */}
              <View style={styles.trendArrow}>
                <TrendingUp size={28} color="#0F766E" strokeWidth={2.5} />
              </View>

              {/* Chart Bars */}
              <View style={styles.chartBarsRow}>
                <View style={[styles.chartBar, { height: 16 }]} />
                <View style={[styles.chartBar, { height: 26 }]} />
                <View style={[styles.chartBar, { height: 38 }]} />
                <View style={[styles.chartBar, { height: 52, backgroundColor: '#0F766E' }]} />
              </View>

              {/* Golden Wealth Coin Stack Accent */}
              <View style={styles.coinStack}>
                <View style={[styles.coin, { left: 0, bottom: 0 }]} />
                <View style={[styles.coin, { left: 8, bottom: 4 }]} />
                <View style={[styles.coin, { left: 4, bottom: 10 }]} />
              </View>
            </View>
          </View>
        </View>

        {/* 3 Benefit Value Cards */}
        <View style={styles.cardsSection}>
          {BENEFITS.map((item) => {
            const IconComp = item.Icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  isTallScreen && styles.cardTall,
                  isSmallScreen && styles.cardSmall,
                ]}
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.8}
              >
                <View style={[styles.iconBox, isTallScreen && styles.iconBoxTall]}>
                  <IconComp size={20} color="#0F766E" strokeWidth={2.2} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
                <ChevronRight size={18} color="#94A3B8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bottom CTA & Trust Section */}
        <View style={styles.bottomCtaSection}>
          {/* Large Primary CTA */}
          <TouchableOpacity
            style={[styles.primaryBtn, isTallScreen && styles.primaryBtnTall]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Get Started</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.2} style={styles.btnIcon} />
          </TouchableOpacity>

          {/* Trust Indicators */}
          <View style={styles.trustRow}>
            <Shield size={12} color="#0F766E" strokeWidth={2.2} style={styles.trustIcon} />
            <Text style={styles.trustText}>
              Trusted Boutique Advisory • Independent & Objective
            </Text>
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
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 2,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  brandLockup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#071F20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
    marginRight: 10,
  },
  logoImg: {
    width: 28,
    height: 28,
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size16,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  brandTagline: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size10,
    color: '#64748B',
    marginTop: 1,
    letterSpacing: 0.2,
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  // Hero Section
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginTop: 6,
  },
  heroSectionSmall: {
    paddingVertical: 12,
    marginTop: 2,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  heroTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size24,
    lineHeight: fontSizes.size24 * 1.25,
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  heroTitleAccent: {
    color: '#0F766E',
  },
  heroSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    lineHeight: 18,
    color: '#64748B',
    marginTop: 8,
  },

  // Minimal Growth Illustration
  growthIllustrationBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  growthChartContainer: {
    width: 90,
    height: 90,
    backgroundColor: '#ECFDF5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    padding: 10,
    justifyContent: 'flex-end',
    position: 'relative',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  trendArrow: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  chartBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '65%',
    height: 52,
  },
  chartBar: {
    width: 8,
    backgroundColor: '#6EE7B7',
    borderRadius: 3,
  },
  coinStack: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 22,
    height: 18,
  },
  coin: {
    position: 'absolute',
    width: 14,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#D97706',
  },

  // Benefit Cards Section
  cardsSection: {
    width: '100%',
    paddingVertical: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTall: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  cardSmall: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconBoxTall: {
    width: 46,
    height: 46,
    borderRadius: 14,
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
  },
  cardDesc: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },

  // Bottom CTA
  bottomCtaSection: {
    width: '100%',
    paddingTop: 8,
  },
  primaryBtn: {
    backgroundColor: '#0F766E',
    height: 52,
    borderRadius: 16,
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
  btnIcon: {
    marginLeft: 8,
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 4,
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
