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
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  User,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const handleGuestExplore = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#831843" barStyle="light-content" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 24),
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        {/* Hero Visual Top */}
        <View style={styles.heroLockup}>
          <View style={styles.royalEmblemWrap}>
            <Text style={styles.royalEmblem}>M</Text>
            <View style={styles.crownDot}>
              <Sparkles size={14} color="#78350F" />
            </View>
          </View>

          <View style={styles.goldBadge}>
            <Text style={styles.goldBadgeText}>RAJASTHAN HERITAGE ARTISANS</Text>
          </View>

          <Text style={styles.mainHeading}>MĀRWĀRI</Text>
          <Text style={styles.subHeading}>Royal E-Commerce & Crafts</Text>
          <Text style={styles.description}>
            Discover genuine handcrafted Bandhani silk sarees, authentic Jodhpuri suits,
            pure silver Meenakari jewellery & artisan mojaris directly from master craftsmen.
          </Text>
        </View>

        {/* 3 Pillars */}
        <View style={styles.pillarsCard}>
          <View style={styles.pillarItem}>
            <ShieldCheck size={20} color="#831843" />
            <View style={styles.pillarTextWrap}>
              <Text style={styles.pillarTitle}>100% Authentic GI Tag</Text>
              <Text style={styles.pillarSubtitle}>Certified Rajasthan artisan guild</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.pillarItem}>
            <Truck size={20} color="#831843" />
            <View style={styles.pillarTextWrap}>
              <Text style={styles.pillarTitle}>Pan-India Express Air</Text>
              <Text style={styles.pillarSubtitle}>Free priority courier over ₹999</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.pillarItem}>
            <RotateCcw size={20} color="#831843" />
            <View style={styles.pillarTextWrap}>
              <Text style={styles.pillarTitle}>7-Day Royal Guarantee</Text>
              <Text style={styles.pillarSubtitle}>Hassle-free return and replacement</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleGuestExplore}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>Explore Royal Collection</Text>
            <ArrowRight size={18} color="#831843" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <User size={18} color="#FFFFFF" />
            <Text style={styles.signInBtnText}>Sign In / Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#831843', // Royal Maroon background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  heroLockup: {
    alignItems: 'center',
    paddingTop: 20,
  },
  royalEmblemWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FEF08A',
    marginBottom: 16,
    position: 'relative',
  },
  royalEmblem: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FEF08A',
  },
  crownDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FEF08A',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldBadge: {
    backgroundColor: '#FEF08A',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    marginBottom: 12,
  },
  goldBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#78350F',
    letterSpacing: 0.8,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FCE7F3',
    marginBottom: 14,
  },
  description: {
    fontSize: 13,
    color: '#FCE7F3',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  pillarsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  pillarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  pillarTextWrap: {
    flex: 1,
  },
  pillarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  pillarSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  actionGroup: {
    gap: 12,
    width: '100%',
  },
  primaryBtn: {
    backgroundColor: '#FEF08A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#FEF08A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#831843',
    fontSize: 15,
    fontWeight: '800',
  },
  signInBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
