import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Trash2, Plus, Minus, ArrowRight, RotateCcw, TrendingUp } from 'lucide-react-native';
import { fetchCart, updateCartQty, removeFromCart, clearCart } from '../redux/cart/action';
import { COLORS, TYPOGRAPHY, SPACING, RADII, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { showToast } from '../components/common/Toast';

function CartItemThumb({ uri }) {
  const [hasError, setHasError] = useState(false);

  if (!uri || hasError) {
    return (
      <View style={[styles.itemThumb, styles.itemThumbFallback]}>
        <TrendingUp size={22} color={COLORS.primary} strokeWidth={2.2} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={styles.itemThumb}
      onError={() => setHasError(true)}
    />
  );
}

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { items: cartItems, loading } = useSelector((state) => state.cart);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Only fetch from backend on initial mount if cart is empty.
    // If cart items already exist in Redux, render them immediately with 0ms delay
    // and avoid any sudden 1-second network overwrite/flicker.
    if (!cartItems || cartItems.length === 0) {
      dispatch(fetchCart(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchCart(true));
      showToast.info('Cart Updated', 'Cart items synced with server.');
    } catch {
      // ignore
    } finally {
      setRefreshing(false);
    }
  };

  const subtotal = (cartItems || []).reduce((acc, item) => {
    const unitPrice = parseFloat(item.priceRaw != null ? item.priceRaw : item.price || 0);
    const quantity = parseInt(item.qty || 1, 10);
    return acc + unitPrice * quantity;
  }, 0);

  const totalItemsCount = (cartItems || []).reduce(
    (acc, item) => acc + parseInt(item.qty || 1, 10),
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateCartQty(item.id, item.platform, 1));
  };

  const handleDecrement = (item) => {
    dispatch(updateCartQty(item.id, item.platform, -1));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id, item.platform));
    showToast.info('Item Removed', `${item.name} removed from your cart.`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast.info('Cart Cleared', 'All items have been removed from your cart.');
  };

  const handleProceedToCheckout = () => {
    if (!cartItems || cartItems.length === 0) return;
    navigation.navigate('Checkout', {
      subtotal,
      items: cartItems,
    });
  };

  const renderCartItem = ({ item }) => {
    const unitPrice = parseFloat(item.priceRaw != null ? item.priceRaw : item.price || 0);
    const qty = parseInt(item.qty || 1, 10);
    const imageUri = item.image || item.image_url;

    return (
      <View style={styles.itemCard}>
        <CartItemThumb uri={imageUri} />

        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={2}>
            {(item.name || '').toUpperCase()}
          </Text>
          <Text style={styles.itemPlatform}>
            {(item.platform || 'ACCENTURE').toUpperCase()}
          </Text>
          <Text style={styles.itemPrice}>₹{unitPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.actionCol}>
          <TouchableOpacity
            style={styles.trashBtn}
            onPress={() => handleRemove(item)}
            activeOpacity={0.7}
          >
            <Trash2 size={16} color={COLORS.error} />
          </TouchableOpacity>

          <View style={styles.stepperBox}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => handleDecrement(item)}
              activeOpacity={0.7}
            >
              <Minus size={12} color={COLORS.navy} />
            </TouchableOpacity>

            <Text style={styles.stepQty}>{qty}</Text>

            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => handleIncrement(item)}
              activeOpacity={0.7}
            >
              <Plus size={12} color={COLORS.navy} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading && (!cartItems || cartItems.length === 0)) {
    return (
      <View style={GLOBAL_STYLES.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const isEmpty = !cartItems || cartItems.length === 0;

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header matching Mockup 1 Screen 8 */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color={COLORS.navy} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Shopping Cart</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            {refreshing ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <RotateCcw size={17} color={COLORS.navy} />
            )}
          </TouchableOpacity>

          {!isEmpty && (
            <TouchableOpacity onPress={handleClearCart} activeOpacity={0.7} style={styles.clearBtn}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isEmpty ? (
        <ScrollView
          contentContainerStyle={GLOBAL_STYLES.emptyContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        >
          <Text style={GLOBAL_STYLES.emptyIcon}>🛒</Text>
          <Text style={GLOBAL_STYLES.emptyTitle}>Your Cart is Empty</Text>
          <Text style={GLOBAL_STYLES.emptySubtitle}>
            Explore our curated corporate advisory, mutual funds, and succession planning services.
          </Text>
          <TouchableOpacity
            style={[GLOBAL_STYLES.primaryBtn, { marginTop: SPACING.xl }]}
            onPress={() => navigation.navigate('Main', { screen: 'Services' })}
            activeOpacity={0.85}
          >
            <Text style={GLOBAL_STYLES.primaryBtnText}>Explore Services</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
            ListHeaderComponent={
              <Text style={styles.cartCountLabel}>
                {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} in your active cart
              </Text>
            }
            ListFooterComponent={
              <View style={styles.billSummaryCard}>
                <Text style={styles.billTitle}>BILL SUMMARY</Text>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Item Subtotal</Text>
                  <Text style={styles.billVal}>₹{subtotal.toFixed(2)}</Text>
                </View>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Platform Advisory Fee</Text>
                  <Text style={styles.freeBadgeText}>FREE</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.billRow}>
                  <Text style={styles.totalLabel}>Total Payable</Text>
                  <Text style={styles.totalVal}>₹{subtotal.toFixed(2)}</Text>
                </View>
              </View>
            }
          />

          {/* Bottom Fixed Checkout Button */}
          <View
            style={[
              styles.bottomBar,
              { paddingBottom: Math.max(insets.bottom, SPACING.lg) },
            ]}
          >
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleProceedToCheckout}
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
              <ArrowRight size={18} color={COLORS.textInverted} style={styles.checkoutArrow} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
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
    flex: 1,
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshBtn: {
    width: 36,
    height: 36,
    borderRadius: RADII.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginRight: SPACING.xs,
  },
  clearBtn: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  clearText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.error,
  },
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: 120,
  },
  cartCountLabel: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  itemCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.card,
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: RADII.md,
    backgroundColor: COLORS.backgroundAlt,
    marginRight: SPACING.md,
  },
  itemThumbFallback: {
    backgroundColor: '#E6F4F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCECE6',
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  itemName: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.navy,
    lineHeight: 16,
    marginBottom: 2,
  },
  itemPlatform: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: TYPOGRAPHY.family.extraBold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.navy,
  },
  actionCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  trashBtn: {
    padding: 4,
  },
  stepperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stepBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepQty: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.navy,
    marginHorizontal: 8,
  },
  billSummaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  billTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  billLabel: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.textSecondary,
  },
  billVal: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  freeBadgeText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: '#15803D',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size15,
    color: COLORS.navy,
  },
  totalVal: {
    fontFamily: TYPOGRAPHY.family.extraBold,
    fontSize: TYPOGRAPHY.sizes.size17,
    color: COLORS.navy,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADII.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  checkoutBtnText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size15,
    color: COLORS.textInverted,
  },
  checkoutArrow: {
    marginLeft: 6,
  },
});
