import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { fetchCart, updateCartQty, removeFromCart, clearCart } from '../redux/cart/action';
import { COLORS, RADII } from '../theme/theme';
import { showToast } from '../components/common/Toast';

import GuestAuthModal from '../components/common/GuestAuthModal';

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { items: cartItems = [], loading } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const [refreshing, setRefreshing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'MARWARI10', discountPercent: 10, discountFlat: 0 }

  useEffect(() => {
    dispatch(fetchCart(true));
  }, [dispatch]);

  const isFocused = useIsFocused();

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
        <AppStatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />
        <GuestAuthModal 
          visible={isFocused} 
          onClose={() => navigation.navigate('Dashboard')} 
          message="Please sign in to access your Royal Bag." 
        />
      </View>
    );
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCart(true));
    setRefreshing(false);
  };

  const handleIncrement = (item) => {
    dispatch(updateCartQty(item.id, 1));
  };

  const handleDecrement = (item) => {
    if ((item.qty || 1) <= 1) {
      dispatch(removeFromCart(item.id));
      showToast.info('Item Removed', `${item.name} removed from your bag.`);
    } else {
      dispatch(updateCartQty(item.id, -1));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    showToast.info('Item Removed', `${item.name} removed from your bag.`);
  };

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) {
      showToast.error('Coupon Code', 'Please enter a coupon code.');
      return;
    }

    if (code === 'MARWARI10') {
      setAppliedCoupon({ code: 'MARWARI10', percent: 10, flat: 0 });
      setCouponCode('MARWARI10');
      showToast.success('Royal Privilege Applied', '10% Royal Heritage discount has been deducted!');
    } else if (code === 'ROYAL500') {
      setAppliedCoupon({ code: 'ROYAL500', percent: 0, flat: 500 });
      setCouponCode('ROYAL500');
      showToast.success('Royal Privilege Applied', '₹500 festive discount has been deducted!');
    } else {
      showToast.error('Invalid Coupon', 'Coupon code is invalid or expired.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price || 0);
    const qty = parseInt(item.qty || 1, 10);
    return acc + price * qty;
  }, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.percent > 0) {
      discount = Math.round((subtotal * appliedCoupon.percent) / 100);
    } else if (appliedCoupon.flat > 0) {
      discount = Math.min(appliedCoupon.flat, subtotal);
    }
  }

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    navigation.navigate('Checkout', {
      subtotal: total,
      items: cartItems,
      coupon: appliedCoupon,
    });
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* ─── Top Header ────────────────────────────────────────────────── */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Royal Bag</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              dispatch(clearCart());
              showToast.info('Bag Cleared', 'All items removed.');
            }}
          >
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ─── Empty State ───────────────────────────────────────────────── */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrap}>
            <ShoppingBag size={48} color="#831843" />
          </View>
          <Text style={styles.emptyTitle}>Your royal bag is empty</Text>
          <Text style={styles.emptySubtitle}>
            Explore authentic handcrafted Rajasthan apparel, silver jewellery,
            and heritage crafts.
          </Text>
          <TouchableOpacity
            style={styles.startShopBtn}
            onPress={() => navigation.navigate('Dashboard')}
            activeOpacity={0.85}
          >
            <Text style={styles.startShopText}>Start Royal Shopping</Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#831843']}
              />
            }
          >
            {/* Free Shipping Progress */}
            <View style={styles.shippingNotice}>
              <ShieldCheck size={16} color="#059669" />
              <Text style={styles.shippingText}>
                {subtotal > 999
                  ? '🎉 Qualified for FREE Pan-India Royal Delivery!'
                  : `Add ₹${999 - subtotal} more to unlock FREE Pan-India Delivery!`}
              </Text>
            </View>

            {/* Cart Items List */}
            <View style={styles.cartList}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartCard}>
                  <Image
                    source={{
                      uri:
                        item.image ||
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
                    }}
                    style={styles.itemThumb}
                    resizeMode="cover"
                  />

                  <View style={styles.itemInfo}>
                    {item.category && (
                      <Text style={styles.itemCategory}>{item.category}</Text>
                    )}
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemPrice}>
                      ₹{Number(item.price || 0).toLocaleString('en-IN')}
                    </Text>
                  </View>

                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      onPress={() => handleRemove(item)}
                      style={styles.trashBtn}
                    >
                      <Trash2 size={16} color="#94A3B8" />
                    </TouchableOpacity>

                    <View style={styles.qtyStepper}>
                      <TouchableOpacity
                        onPress={() => handleDecrement(item)}
                        style={styles.stepBtn}
                      >
                        <Minus size={14} color="#0F172A" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty || 1}</Text>
                      <TouchableOpacity
                        onPress={() => handleIncrement(item)}
                        style={styles.stepBtn}
                      >
                        <Plus size={14} color="#0F172A" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Coupon Code Box */}
            <View style={styles.couponCard}>
              <View style={styles.couponInputRow}>
                <Tag size={18} color="#831843" />
                <TextInput
                  style={styles.couponInput}
                  placeholder="Enter Royal Coupon Code"
                  placeholderTextColor="#94A3B8"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={styles.applyCouponBtn}
                  onPress={() => handleApplyCoupon()}
                >
                  <Text style={styles.applyCouponText}>APPLY</Text>
                </TouchableOpacity>
              </View>

              {/* Coupon Chips */}
              <View style={styles.couponChipsRow}>
                <TouchableOpacity
                  style={[
                    styles.couponChip,
                    appliedCoupon?.code === 'MARWARI10' && styles.couponChipActive,
                  ]}
                  onPress={() => handleApplyCoupon('MARWARI10')}
                >
                  <Text style={styles.couponChipCode}>MARWARI10</Text>
                  <Text style={styles.couponChipDesc}>10% Off</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.couponChip,
                    appliedCoupon?.code === 'ROYAL500' && styles.couponChipActive,
                  ]}
                  onPress={() => handleApplyCoupon('ROYAL500')}
                >
                  <Text style={styles.couponChipCode}>ROYAL500</Text>
                  <Text style={styles.couponChipDesc}>₹500 Off</Text>
                </TouchableOpacity>
              </View>

              {appliedCoupon && (
                <View style={styles.appliedRow}>
                  <CheckCircle2 size={14} color="#059669" />
                  <Text style={styles.appliedText}>
                    Coupon &apos;{appliedCoupon.code}&apos; applied successfully!
                  </Text>
                </View>
              )}
            </View>

            {/* Bill Summary Card */}
            <View style={styles.billCard}>
              <Text style={styles.billTitle}>ORDER SUMMARY</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Subtotal</Text>
                <Text style={styles.billValue}>
                  ₹{subtotal.toLocaleString('en-IN')}
                </Text>
              </View>

              {discount > 0 && (
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: '#059669' }]}>
                    Coupon Privilege Discount
                  </Text>
                  <Text style={[styles.billValue, { color: '#059669' }]}>
                    - ₹{discount.toLocaleString('en-IN')}
                  </Text>
                </View>
              )}

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Pan-India Shipping</Text>
                <Text
                  style={[
                    styles.billValue,
                    shipping === 0 ? { color: '#059669' } : {},
                  ]}
                >
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Estimated Tax / GST</Text>
                <Text style={styles.billValue}>Included</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Payable</Text>
                <Text style={styles.totalValue}>
                  ₹{total.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* ─── Sticky Checkout Bar ───────────────────────────────────── */}
          <View
            style={[
              styles.checkoutBar,
              { paddingBottom: Math.max(insets.bottom, 12) },
            ]}
          >
            <View>
              <Text style={styles.checkoutTotalLabel}>Grand Total</Text>
              <Text style={styles.checkoutTotalValue}>
                ₹{total.toLocaleString('en-IN')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleProceedToCheckout}
              activeOpacity={0.88}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  startShopBtn: {
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  startShopText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
    gap: 14,
  },
  shippingNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  shippingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  cartList: {
    gap: 10,
  },
  cartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  itemThumb: {
    width: 76,
    height: 76,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  itemInfo: {
    flex: 1,
  },
  itemCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
    textTransform: 'uppercase',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#831843',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 76,
  },
  trashBtn: {
    padding: 4,
  },
  qtyStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  stepBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    minWidth: 20,
    textAlign: 'center',
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  couponInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  couponInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  applyCouponBtn: {
    backgroundColor: '#831843',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  applyCouponText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  couponChipsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  couponChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  couponChipActive: {
    borderColor: '#831843',
    backgroundColor: '#FDF2F8',
  },
  couponChipCode: {
    fontSize: 11,
    fontWeight: '800',
    color: '#831843',
  },
  couponChipDesc: {
    fontSize: 10,
    color: '#64748B',
  },
  appliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  appliedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  billTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  billValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#831843',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  checkoutTotalLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  checkoutTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#831843',
  },
  checkoutBtn: {
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
