import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Truck,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';

export default function OrderSuccessScreen({ route }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { order = {} } = route.params || {};

  const orderId = order.id || `ORD-${Date.now().toString().slice(-6)}`;
  const orderTotal = order.total || 7109;
  const trackingNumber = order.tracking_number || 'MRW-IND-9921448';

  const handleTrackOrder = () => {
    navigation.replace('OrderDetails', {
      orderId,
      initialOrder: order,
    });
  };

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 24), paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header */}
        <View style={styles.celebrationBox}>
          <View style={styles.checkCircle}>
            <CheckCircle2 size={56} color="#059669" />
          </View>

          <View style={styles.goldBadge}>
            <Sparkles size={12} color="#78350F" />
            <Text style={styles.goldBadgeText}>ORDER CONFIRMED & INSCRIBED</Text>
          </View>

          <Text style={styles.heading}>Padharo Sa!</Text>
          <Text style={styles.subheading}>
            Your royal order has been received and sent to our master artisans in Jodhpur for packaging.
          </Text>
        </View>

        {/* Order Summary Card */}
        <View style={styles.orderCard}>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Order Reference</Text>
            <Text style={styles.orderValBold}>#{orderId}</Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Total Amount Paid</Text>
            <Text style={[styles.orderValBold, { color: '#831843' }]}>
              ₹{Number(orderTotal).toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Payment Status</Text>
            <View style={styles.paidBadge}>
              <Text style={styles.paidText}>● Verified & Paid</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Dispatch Origin</Text>
            <Text style={styles.orderVal}>Jodhpur Palace Hub</Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Estimated Delivery</Text>
            <Text style={styles.orderVal}>3 - 5 Business Days</Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Courier Partner</Text>
            <Text style={styles.orderVal}>BlueDart Express Air</Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Tracking Code</Text>
            <Text style={styles.orderValCode}>{trackingNumber}</Text>
          </View>
        </View>

        {/* Trust Note */}
        <View style={styles.trustNote}>
          <ShieldCheck size={18} color="#059669" />
          <Text style={styles.trustNoteText}>
            Our concierge will send real-time SMS updates regarding dispatch, transit, and delivery.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.trackOrderBtn}
            onPress={handleTrackOrder}
            activeOpacity={0.88}
          >
            <Package size={18} color="#FFFFFF" />
            <Text style={styles.trackOrderText}>Track Order Timeline</Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueShopBtn}
            onPress={handleContinueShopping}
            activeOpacity={0.8}
          >
            <Text style={styles.continueShopText}>Continue Royal Shopping</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  celebrationBox: {
    alignItems: 'center',
    marginVertical: 16,
  },
  checkCircle: {
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
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    marginVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  orderVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  orderValBold: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  orderValCode: {
    fontSize: 12,
    fontWeight: '800',
    color: '#831843',
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  paidBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  paidText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  trustNote: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
  },
  trustNoteText: {
    flex: 1,
    fontSize: 11,
    color: '#065F46',
    lineHeight: 16,
  },
  btnGroup: {
    width: '100%',
    gap: 10,
  },
  trackOrderBtn: {
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  trackOrderText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  continueShopBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 12,
  },
  continueShopText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
});
