import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  Check,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
} from 'lucide-react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { createRazorpayOrder, placeOrderWithPayment } from '../redux/cart/action';
import { getOrderList } from '../redux/profile/action';
import { RAZORPAY_KEY_ID } from '../redux/api/api';
import { COLORS, TYPOGRAPHY, SPACING, RADII, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { showToast } from '../components/common/Toast';

export default function CheckoutScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { subtotal: passedSubtotal, items: passedItems } = route.params || {};

  const cartState = useSelector((state) => state.cart);
  const userProfile = useSelector((state) => state.profile.profiledetails);

  const cartItems = passedItems || cartState.items || [];
  const totalAmount =
    passedSubtotal ||
    cartItems.reduce((acc, item) => {
      const p = parseFloat(item.priceRaw != null ? item.priceRaw : item.price || 0);
      const q = parseInt(item.qty || 1, 10);
      return acc + p * q;
    }, 0);

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('razorpay'); // 'razorpay' | 'wallet'

  const handlePay = async () => {
    if (!cartItems || cartItems.length === 0) {
      showToast.warning('Cart Empty', 'Please add items to your cart before checking out.');
      return;
    }

    if (selectedMethod === 'wallet') {
      showToast.info('Wallet Payment', 'Wallet payments will be supported in the next corporate release.');
      return;
    }

    // Handle Free items (totalAmount <= 0)
    if (totalAmount <= 0) {
      setLoading(true);
      const placeRes = await dispatch(
        placeOrderWithPayment({
          razorpay_payment_id: '',
          razorpay_order_id: '',
          razorpay_signature: '',
          cart_items: cartItems.map((it) => ({
            id: it.id,
            name: it.name,
            priceRaw: parseFloat(it.priceRaw != null ? it.priceRaw : it.price || 0),
            image: it.image,
            platform: it.platform || 'Services',
            qty: parseInt(it.qty || 1, 10),
          })),
        })
      );
      setLoading(false);
      if (placeRes?.success) {
        setPaymentSuccess(true);
        const confirmedOrder =
          placeRes.results?.[0] ||
          placeRes.data?.results?.[0] ||
          placeRes.data?.orders?.[0] ||
          { order_id: 'FREE-ORDER' };
        setCreatedOrder(confirmedOrder);
        dispatch(getOrderList());
      } else {
        showToast.error('Notice', placeRes?.message || placeRes?.data?.message || 'Could not place free order.');
      }
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create official Razorpay Order via backend
      const rzpRes = await dispatch(createRazorpayOrder(totalAmount));

      if (!rzpRes?.success || !rzpRes?.data?.order_id) {
        showToast.error(
          'Payment Gateway Notice',
          rzpRes?.message || rzpRes?.error || 'Could not initiate Razorpay order on server.'
        );
        setLoading(false);
        return;
      }

      const rzpData = rzpRes.data;
      const orderAmountPaise = rzpData.amount || Math.round(totalAmount * 100);

      const options = {
        description: 'WealthHackers Corporate Advisory Order',
        image: 'https://wealthhackers.in/wp-content/uploads/2023/10/logo.png',
        currency: 'INR',
        key: RAZORPAY_KEY_ID,
        amount: orderAmountPaise,
        name: 'WealthHackers',
        order_id: rzpData.order_id,
        prefill: {
          email: userProfile?.email || 'corporate@wealthhackers.in',
          contact: userProfile?.mobile || '9999999999',
          name: `${userProfile?.first_name || 'Corporate'} ${userProfile?.last_name || 'Member'}`.trim(),
        },
        theme: { color: COLORS.primary },
      };

      // Step 2: Open Native Razorpay Checkout
      RazorpayCheckout.open(options)
        .then(async (data) => {
          // Step 3: Record Order with verified payment
          const recordRes = await dispatch(
            placeOrderWithPayment({
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id || rzpData.order_id,
              razorpay_signature: data.razorpay_signature,
              cart_items: cartItems.map((it) => ({
                id: it.id,
                name: it.name,
                priceRaw: parseFloat(it.priceRaw != null ? it.priceRaw : it.price || 0),
                image: it.image,
                platform: it.platform || 'Services',
                qty: parseInt(it.qty || 1, 10),
              })),
            })
          );

          setLoading(false);

          if (recordRes?.success) {
            setPaymentSuccess(true);
            const confirmedOrder =
              recordRes.results?.[0] ||
              recordRes.data?.results?.[0] ||
              recordRes.data?.orders?.[0] ||
              { order_id: data.razorpay_order_id || rzpData.order_id };
            setCreatedOrder(confirmedOrder);
            dispatch(getOrderList());
          } else {
            showToast.warning(
              'Order Registration Notice',
              recordRes?.message || recordRes?.data?.message || 'Payment received. Please verify in My Orders.'
            );
            dispatch(getOrderList());
            navigation.navigate('Main', { screen: 'Orders' });
          }
        })
        .catch((error) => {
          setLoading(false);
          const errorDesc = error?.description || error?.message || 'Payment cancelled by user.';
          showToast.info('Payment Incomplete', errorDesc);
        });
    } catch (err) {
      setLoading(false);
      showToast.error('Payment Error', err.message || 'An unexpected error occurred.');
    }
  };

  if (paymentSuccess) {
    return (
      <View style={GLOBAL_STYLES.screenContainer}>
        <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <View style={styles.successContainer}>
          <View style={styles.successIconCircle}>
            <CheckCircle2 size={56} color={COLORS.primary} />
          </View>
          <Text style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successSub}>
            Your advisory order has been successfully placed. Your dedicated wealth advisor will connect with you.
          </Text>

          {createdOrder?.order_id && (
            <View style={styles.orderIdBox}>
              <Text style={styles.orderIdLabel}>ORDER REFERENCE</Text>
              <Text style={styles.orderIdVal}>#{createdOrder.order_id}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main', state: { routes: [{ name: 'Orders' }] } }],
              });
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.doneBtnText}>View My Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header matching Mockup 1 Screen 9 */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      {/* 3-Step Indicator matching Mockup 1 Screen 9 */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepItem}>
          <View style={styles.stepCircleCompleted}>
            <Check size={12} color={COLORS.primary} />
          </View>
          <Text style={styles.stepTextCompleted}>Cart</Text>
        </View>

        <View style={styles.stepConnectorActive} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircleActive}>
            <Text style={styles.stepNumberActive}>2</Text>
          </View>
          <Text style={styles.stepTextActive}>Payment</Text>
        </View>

        <View style={styles.stepConnector} />

        <View style={styles.stepItem}>
          <View style={styles.stepCirclePending}>
            <Text style={styles.stepNumberPending}>3</Text>
          </View>
          <Text style={styles.stepTextPending}>Confirm</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary */}
        <Text style={styles.sectionHeading}>Order Summary</Text>
        <View style={styles.summaryCard}>
          {cartItems.map((item, idx) => {
            const unitPrice = parseFloat(item.priceRaw != null ? item.priceRaw : item.price || 0);
            return (
              <View key={`${item.id}-${idx}`} style={styles.summaryItemRow}>
                <Image
                  source={{
                    uri:
                      item.image ||
                      'https://wealthhackers.in/wp-content/uploads/2023/10/estate_planning.png',
                  }}
                  style={styles.summaryThumb}
                />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryItemName} numberOfLines={2}>
                    {(item.name || '').toUpperCase()}
                  </Text>
                  <Text style={styles.summaryItemPlatform}>
                    {(item.platform || 'ACCENTURE').toUpperCase()}
                  </Text>
                  <Text style={styles.summaryItemPrice}>₹{unitPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.qtyBadge}>
                  <Text style={styles.qtyText}>{item.qty || 1}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Promo Code Box */}
        <TouchableOpacity
          style={styles.promoCard}
          onPress={() => showToast.info('Promo Code', 'Corporate discounts are automatically applied to your order.')}
          activeOpacity={0.7}
        >
          <View style={styles.promoLeft}>
            <Tag size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
            <Text style={styles.promoText}>Apply Promo Code</Text>
          </View>
          <ChevronRight size={16} color={COLORS.textPlaceholder} />
        </TouchableOpacity>

        {/* Payment Method Selector */}
        <Text style={styles.sectionHeading}>Payment Method</Text>
        <View style={styles.paymentMethodsCard}>
          {/* Radio 1: UPI / Cards / Net Banking */}
          <TouchableOpacity
            style={styles.methodRow}
            onPress={() => setSelectedMethod('razorpay')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, selectedMethod === 'razorpay' && styles.radioCircleActive]}>
              {selectedMethod === 'razorpay' && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.methodLabel}>UPI / Cards / Net Banking</Text>
          </TouchableOpacity>

          <View style={styles.methodDivider} />

          {/* Radio 2: Wallet (Coming Soon) */}
          <TouchableOpacity
            style={styles.methodRow}
            onPress={() => setSelectedMethod('wallet')}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle, selectedMethod === 'wallet' && styles.radioCircleActive]}>
              {selectedMethod === 'wallet' && <View style={styles.radioDot} />}
            </View>
            <Text style={[styles.methodLabel, { color: COLORS.textMuted }]}>
              Wallet (Coming Soon)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Assurance */}
        <View style={styles.securityBox}>
          <ShieldCheck size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.securityText}>
            Secured by 256-bit TLS Encryption & Official Razorpay Gateway
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Payment Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handlePay}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.textInverted} />
          ) : (
            <>
              <Text style={styles.payButtonText}>
                Continue to Payment • ₹{totalAmount.toFixed(2)}
              </Text>
              <ArrowRight size={18} color={COLORS.textInverted} style={{ marginLeft: 6 }} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: RADII.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    marginRight: SPACING.sm,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircleCompleted: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  stepTextCompleted: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.navy,
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  stepNumberActive: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textInverted,
  },
  stepTextActive: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.primary,
  },
  stepCirclePending: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  stepNumberPending: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textPlaceholder,
  },
  stepTextPending: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textPlaceholder,
  },
  stepConnector: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: 8,
  },
  stepConnectorActive: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.primary,
    marginHorizontal: 8,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: 120,
  },
  sectionHeading: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    ...SHADOWS.card,
  },
  summaryItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryThumb: {
    width: 50,
    height: 50,
    borderRadius: RADII.md,
    backgroundColor: COLORS.backgroundAlt,
    marginRight: SPACING.md,
  },
  summaryInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  summaryItemName: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.navy,
    lineHeight: 15,
  },
  summaryItemPlatform: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.primary,
    marginTop: 2,
  },
  summaryItemPrice: {
    fontFamily: TYPOGRAPHY.family.extraBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
    marginTop: 2,
  },
  qtyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.xs,
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  qtyText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.navy,
  },
  promoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoText: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  paymentMethodsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    ...SHADOWS.card,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs + 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  radioCircleActive: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  methodLabel: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  methodDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.xs + 2,
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  securityText: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 24 : SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADII.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size15,
    color: COLORS.textInverted,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.mint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#BFE7DE',
  },
  successTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size22,
    color: COLORS.navy,
    marginBottom: SPACING.xs,
  },
  successSub: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  orderIdBox: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: RADII.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderIdLabel: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
  },
  orderIdVal: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size16,
    color: COLORS.navy,
    marginTop: 2,
  },
  doneBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  doneBtnText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size15,
    color: COLORS.textInverted,
  },
});
