import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Circle,
  CreditCard,
  Zap,
  Banknote,
  ShieldCheck,
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { placeOrderWithPayment, clearCart } from '../redux/cart/action';
import { getOrderList } from '../redux/profile/action';
import { COLORS, RADII } from '../theme/theme';
import { showToast } from '../components/common/Toast';

export default function CheckoutScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { subtotal: passedSubtotal, items: passedItems, coupon } = route.params || {};
  const cartState = useSelector((state) => state.cart);
  const userProfile = useSelector((state) => state.profile.profiledetails);

  const cartItems = passedItems || cartState.items || [];
  const totalAmount = passedSubtotal || 7109;

  const [loading, setLoading] = useState(false);
  const [itemsExpanded, setItemsExpanded] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'razorpay' | 'cod'

  const authUser = useSelector((state) => state.auth.user);
  const activeUser = userProfile?.name ? userProfile : authUser;

  const defaultUserAddresses = useMemo(() => {
    if (activeUser?.addresses && activeUser.addresses.length > 0) {
      return activeUser.addresses.map((addr, idx) => ({
        id: addr.id || `addr-${idx}`,
        name: activeUser.name || 'Patron',
        phone: activeUser.phone || '',
        street: addr.street || addr.label || '',
        city: addr.city || 'Jodhpur',
        state: addr.state || 'Rajasthan',
        zip: addr.zip || '342001',
        isDefault: !!addr.default || idx === 0,
      }));
    }
    return [
      {
        id: 'addr-1',
        name: activeUser?.name || 'Patron',
        phone: activeUser?.phone || '',
        street: '12 Heritage Lane, Paota',
        city: 'Jodhpur',
        state: 'Rajasthan',
        zip: '342001',
        isDefault: true,
      },
    ];
  }, [activeUser]);

  // Saved Addresses
  const [addresses, setAddresses] = useState(defaultUserAddresses);

  // Modal for new address
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newZip, setNewZip] = useState('');

  const handleAddNewAddress = () => {
    if (!newName || !newPhone || !newStreet || !newCity || !newZip) {
      showToast.error('Address Form', 'Please fill all required address fields.');
      return;
    }

    const created = {
      id: `addr-${Date.now()}`,
      name: newName,
      phone: newPhone,
      street: newStreet,
      city: newCity,
      state: 'Rajasthan',
      zip: newZip,
      isDefault: false,
    };

    setAddresses((prev) => [created, ...prev]);
    setSelectedAddressIndex(0);
    setNewAddressModal(false);
    showToast.success('Address Saved', 'New delivery address added.');
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      showToast.warning('Cart Empty', 'Your cart has no items.');
      return;
    }

    const selectedAddr = addresses[selectedAddressIndex] || addresses[0];

    const orderPayload = {
      shippingAddress: {
        name: selectedAddr.name,
        phone: selectedAddr.phone,
        street: selectedAddr.street,
        city: selectedAddr.city,
        zip: selectedAddr.zip,
      },
      paymentMethod,
      couponCode: coupon?.code || 'MARWARI10',
      total: totalAmount,
      items: cartItems,
    };

    setLoading(true);
    try {
      const res = await dispatch(placeOrderWithPayment(orderPayload));
      const orderData = res?.data || {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        status: 'Processing',
        total: totalAmount,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
        tracking_number: 'MRW-IND-9921448',
        date: new Date().toISOString(),
      };

      dispatch(clearCart());
      dispatch(getOrderList());
      navigation.replace('OrderSuccess', { order: orderData });
    } catch (err) {
      showToast.error('Order Error', err?.message || 'Could not place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout & Payment</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section 1: Delivery Address */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MapPin size={18} color="#831843" />
              <Text style={styles.cardTitle}>DELIVERY ADDRESS</Text>
            </View>
            <TouchableOpacity
              onPress={() => setNewAddressModal(true)}
              style={styles.addAddrLink}
            >
              <Plus size={14} color="#831843" />
              <Text style={styles.addAddrText}>Add New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressList}>
            {addresses.map((addr, idx) => {
              const isSelected = selectedAddressIndex === idx;
              return (
                <TouchableOpacity
                  key={addr.id}
                  style={[
                    styles.addressItem,
                    isSelected && styles.addressItemActive,
                  ]}
                  onPress={() => setSelectedAddressIndex(idx)}
                  activeOpacity={0.8}
                >
                  <View style={styles.radioWrap}>
                    {isSelected ? (
                      <CheckCircle2 size={20} color="#831843" fill="#FDF2F8" />
                    ) : (
                      <Circle size={20} color="#CBD5E1" />
                    )}
                  </View>
                  <View style={styles.addrTextWrap}>
                    <View style={styles.addrNameRow}>
                      <Text style={styles.addrName}>{addr.name}</Text>
                      {addr.isDefault && (
                        <View style={styles.defaultPill}>
                          <Text style={styles.defaultPillText}>DEFAULT</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.addrPhone}>📞 {addr.phone}</Text>
                    <Text style={styles.addrStreet}>
                      {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 2: Items in Order */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setItemsExpanded(!itemsExpanded)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>
              ORDER ITEMS ({cartItems.length})
            </Text>
            {itemsExpanded ? (
              <ChevronUp size={18} color="#64748B" />
            ) : (
              <ChevronDown size={18} color="#64748B" />
            )}
          </TouchableOpacity>

          {itemsExpanded ? (
            <View style={styles.itemsList}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <Image
                    source={{
                      uri:
                        item.image ||
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
                    }}
                    style={styles.itemThumb}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemQtyPrice}>
                      Qty: {item.qty || 1} × ₹{Number(item.price || 0).toLocaleString('en-IN')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.itemsSummaryHint}>
              {cartItems.map((it) => it.name).slice(0, 2).join(', ')}
              {cartItems.length > 2 ? ` + ${cartItems.length - 2} more` : ''}
            </Text>
          )}
        </View>

        {/* Section 3: Payment Methods */}
        <View style={styles.sectionCard}>
          <Text style={[styles.cardTitle, { marginBottom: 12 }]}>
            SELECT PAYMENT METHOD
          </Text>

          {/* UPI */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'upi' && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod('upi')}
            activeOpacity={0.8}
          >
            <View style={styles.radioWrap}>
              {paymentMethod === 'upi' ? (
                <CheckCircle2 size={20} color="#831843" fill="#FDF2F8" />
              ) : (
                <Circle size={20} color="#CBD5E1" />
              )}
            </View>
            <View style={styles.payOptionText}>
              <View style={styles.payHeaderRow}>
                <Zap size={18} color="#D97706" />
                <Text style={styles.payName}>UPI Instant Payment (Zero Fee)</Text>
              </View>
              <Text style={styles.paySub}>
                Google Pay, PhonePe, Paytm, BHIM & Any UPI ID
              </Text>
            </View>
          </TouchableOpacity>

          {/* Razorpay Cards / Netbanking */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'razorpay' && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod('razorpay')}
            activeOpacity={0.8}
          >
            <View style={styles.radioWrap}>
              {paymentMethod === 'razorpay' ? (
                <CheckCircle2 size={20} color="#831843" fill="#FDF2F8" />
              ) : (
                <Circle size={20} color="#CBD5E1" />
              )}
            </View>
            <View style={styles.payOptionText}>
              <View style={styles.payHeaderRow}>
                <CreditCard size={18} color="#831843" />
                <Text style={styles.payName}>Credit / Debit Cards & Net Banking</Text>
              </View>
              <Text style={styles.paySub}>
                Visa, MasterCard, RuPay, Amex & Top Indian Banks
              </Text>
            </View>
          </TouchableOpacity>

          {/* Cash on Delivery */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cod' && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod('cod')}
            activeOpacity={0.8}
          >
            <View style={styles.radioWrap}>
              {paymentMethod === 'cod' ? (
                <CheckCircle2 size={20} color="#831843" fill="#FDF2F8" />
              ) : (
                <Circle size={20} color="#CBD5E1" />
              )}
            </View>
            <View style={styles.payOptionText}>
              <View style={styles.payHeaderRow}>
                <Banknote size={18} color="#059669" />
                <Text style={styles.payName}>Cash on Delivery (COD)</Text>
              </View>
              <Text style={styles.paySub}>Pay in cash when order is delivered</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Security badge */}
        <View style={styles.securityBadge}>
          <ShieldCheck size={20} color="#059669" />
          <Text style={styles.securityText}>
            256-Bit Bank Grade Encryption • 100% Buyer Protection Guarantee
          </Text>
        </View>
      </ScrollView>

      {/* ─── Sticky Place Order Button ─────────────────────────────────── */}
      <View
        style={[
          styles.footerBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <View>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerAmount}>
            ₹{Number(totalAmount).toLocaleString('en-IN')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
          disabled={loading}
          activeOpacity={0.88}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Text style={styles.placeOrderText}>
                Place Order & Pay ₹{Number(totalAmount).toLocaleString('en-IN')}
              </Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Add Address Modal */}
      <Modal
        visible={newAddressModal}
        animationType="slide"
        transparent
        onRequestClose={() => setNewAddressModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Delivery Address</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              placeholderTextColor="#94A3B8"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Mobile Phone Number"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Street / Flat / Colony"
              placeholderTextColor="#94A3B8"
              value={newStreet}
              onChangeText={setNewStreet}
            />

            <View style={styles.modalRow}>
              <TextInput
                style={[styles.modalInput, { flex: 1, marginRight: 8 }]}
                placeholder="City"
                placeholderTextColor="#94A3B8"
                value={newCity}
                onChangeText={setNewCity}
              />
              <TextInput
                style={[styles.modalInput, { flex: 1 }]}
                placeholder="PIN Code"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={newZip}
                onChangeText={setNewZip}
              />
            </View>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setNewAddressModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleAddNewAddress}
              >
                <Text style={styles.modalSaveText}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
    gap: 14,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  addAddrLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addAddrText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#831843',
  },
  addressList: {
    gap: 10,
  },
  addressItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 10,
  },
  addressItemActive: {
    borderColor: '#831843',
    backgroundColor: '#FDF2F8',
  },
  radioWrap: {
    marginTop: 2,
  },
  addrTextWrap: {
    flex: 1,
  },
  addrNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addrName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  defaultPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#78350F',
  },
  addrPhone: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  addrStreet: {
    fontSize: 12,
    color: '#334155',
    marginTop: 4,
    lineHeight: 16,
  },
  itemsSummaryHint: {
    fontSize: 13,
    color: '#64748B',
  },
  itemsList: {
    gap: 10,
    marginTop: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemThumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemQtyPrice: {
    fontSize: 12,
    color: '#831843',
    fontWeight: '700',
    marginTop: 2,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 10,
    marginBottom: 8,
  },
  paymentOptionActive: {
    borderColor: '#831843',
    backgroundColor: '#FDF2F8',
  },
  payOptionText: {
    flex: 1,
  },
  payHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  payName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  paySub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 10,
    gap: 10,
  },
  securityText: {
    flex: 1,
    fontSize: 11,
    color: '#065F46',
    lineHeight: 16,
  },
  footerBar: {
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
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  footerLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  footerAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#831843',
  },
  placeOrderBtn: {
    flex: 1,
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 13,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  modalRow: {
    flexDirection: 'row',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  modalSaveBtn: {
    flex: 1,
    backgroundColor: '#831843',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
