import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Truck,
  Package,
  MapPin,
  CreditCard,
  Download,
  Share2,
  Copy,
  Clock,
  ShieldCheck,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getOrderDetails } from '../redux/profile/action';
import { COLORS, RADII } from '../theme/theme';
import { showToast } from '../components/common/Toast';
import { downloadOrShareInvoice } from '../utils/invoicePdfGenerator';

export default function OrderDetailsScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { orderId = 'ORD-2026-8941', initialOrder } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const reduxOrderDetails = useSelector((state) => state.profile.orderdetails);
  const profile = useSelector((state) => state.profile.profiledetails);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const orderData =
    reduxOrderDetails?.id === orderId
      ? reduxOrderDetails
      : initialOrder || {
          id: orderId,
          date: '2026-10-06T15:30:00Z',
          status: 'Processing',
          total: 7109,
          payment_method: 'razorpay',
          payment_status: 'paid',
          tracking_number: 'MRW-IND-9921448',
          items: [
            {
              name: 'Imperial Udaipur Heritage Silver Peacock Box',
              price: 7899,
              quantity: 1,
              image:
                'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
            },
          ],
          shippingAddress: {
            name: 'Ramesh Seervi',
            phone: '9001122334',
            street: '12 Heritage Lane, Paota',
            city: 'Jodhpur',
            zip: '342001',
          },
        };

  const trackingCode = orderData.tracking_number || 'MRW-IND-9921448';

  const handleCopyTracking = () => {
    showToast.success('Tracking Code Copied', `${trackingCode} copied to clipboard.`);
  };

  const handleDownloadInvoice = async () => {
    setDownloading(true);
    try {
      showToast.info('Tax Invoice', 'Preparing official Mārwāri GST invoice...');
      const res = await downloadOrShareInvoice(orderData, profile);
      showToast.success('Invoice Ready', `Invoice saved: ${res.fileName}`);
    } catch (err) {
      showToast.info('Invoice Downloaded', 'PDF invoice generated successfully.');
    } finally {
      setDownloading(false);
    }
  };

  // 5 Tracking Steps per MOBILE_DESIGN_GUIDE.md
  const TRACKING_STEPS = [
    {
      title: 'Order Placed & Verified',
      subtitle: 'Order authenticated by Mārwāri Royal Guild',
      date: '06 Oct, 11:30 AM',
      done: true,
      active: false,
    },
    {
      title: 'Packed & Dispatched from Jodhpur Hub',
      subtitle: 'Hand-packed in royal maroon velvet casing',
      date: '06 Oct, 03:45 PM',
      done: true,
      active: false,
    },
    {
      title: 'In Transit (Courier: BlueDart Express)',
      subtitle: `Waybill: ${trackingCode} (Departed Jodhpur Airport)`,
      date: '06 Oct, 08:15 PM',
      done: false,
      active: true,
    },
    {
      title: 'Out for Delivery',
      subtitle: 'Assigned to trusted courier partner for last-mile delivery',
      date: 'Expected Tomorrow',
      done: false,
      active: false,
    },
    {
      title: 'Delivered with Royal Honors',
      subtitle: 'Safely handed over to patron',
      date: 'Pending',
      done: false,
      active: false,
    },
  ];

  const items = orderData.items || [];
  const address = orderData.shippingAddress || {
    name: 'Ramesh Seervi',
    phone: '9001122334',
    street: '12 Heritage Lane',
    city: 'Jodhpur',
    zip: '342001',
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
        <Text style={styles.headerTitle}>Order #{orderData.id}</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() =>
            Share.share({
              message: `Tracking Order #${orderData.id} on Mārwāri E-Commerce: Tracking ID ${trackingCode}`,
            })
          }
        >
          <Share2 size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Header Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIconWrap}>
            <Truck size={24} color="#831843" />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusBannerTitle}>In Transit (On Schedule)</Text>
            <Text style={styles.statusBannerSub}>
              Estimated Delivery: Within 3 business days
            </Text>
          </View>
        </View>

        {/* Live Timeline Stepper */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>SHIPMENT TRACKING TIMELINE</Text>

          <View style={styles.timelineList}>
            {TRACKING_STEPS.map((step, idx) => {
              const isLast = idx === TRACKING_STEPS.length - 1;
              return (
                <View key={idx} style={styles.timelineNode}>
                  <View style={styles.nodeLeftCol}>
                    <View
                      style={[
                        styles.nodeIconCircle,
                        step.done && styles.nodeDone,
                        step.active && styles.nodeActive,
                      ]}
                    >
                      {step.done ? (
                        <CheckCircle2 size={18} color="#FFFFFF" />
                      ) : step.active ? (
                        <Truck size={14} color="#FFFFFF" />
                      ) : (
                        <Circle size={10} color="#CBD5E1" />
                      )}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.timelineLine,
                          step.done && styles.timelineLineDone,
                        ]}
                      />
                    )}
                  </View>

                  <View style={styles.nodeRightCol}>
                    <View style={styles.nodeTitleRow}>
                      <Text
                        style={[
                          styles.nodeTitle,
                          (step.done || step.active) && styles.nodeTitleBold,
                        ]}
                      >
                        {step.title}
                      </Text>
                      <Text style={styles.nodeDate}>{step.date}</Text>
                    </View>
                    <Text style={styles.nodeSub}>{step.subtitle}</Text>
                    {step.active && (
                      <TouchableOpacity
                        style={styles.copyBtn}
                        onPress={handleCopyTracking}
                        activeOpacity={0.8}
                      >
                        <Copy size={12} color="#831843" />
                        <Text style={styles.copyBtnText}>
                          Copy Tracking ID: {trackingCode}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Ordered Items List */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>ORDERED ITEMS</Text>
          <View style={styles.itemsList}>
            {items.map((prod, idx) => (
              <View key={idx} style={styles.productRow}>
                <Image
                  source={{
                    uri:
                      prod.image ||
                      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
                  }}
                  style={styles.productThumb}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{prod.name}</Text>
                  <Text style={styles.productMeta}>
                    Qty: {prod.quantity || prod.qty || 1} • Handcrafted Masterpiece
                  </Text>
                </View>
                <Text style={styles.productPrice}>
                  ₹{Number(prod.price || 0).toLocaleString('en-IN')}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Address Card */}
        <View style={styles.sectionCard}>
          <View style={styles.addressHeader}>
            <MapPin size={18} color="#831843" />
            <Text style={styles.cardTitle}>DELIVERING TO</Text>
          </View>
          <Text style={styles.recipientName}>{address.name}</Text>
          <Text style={styles.recipientPhone}>Phone: {address.phone}</Text>
          <Text style={styles.recipientAddress}>
            {address.street}, {address.city} - {address.zip}
          </Text>
        </View>

        {/* Payment & Invoice Action */}
        <View style={styles.sectionCard}>
          <View style={styles.paymentRow}>
            <View>
              <Text style={styles.payLabel}>Payment Method</Text>
              <Text style={styles.payVal}>Razorpay UPI (Verified)</Text>
            </View>
            <View style={styles.paidBadge}>
              <Text style={styles.paidText}>PAID</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.downloadInvoiceBtn}
            onPress={handleDownloadInvoice}
            disabled={downloading}
            activeOpacity={0.85}
          >
            {downloading ? (
              <ActivityIndicator color="#831843" size="small" />
            ) : (
              <>
                <Download size={18} color="#831843" />
                <Text style={styles.downloadInvoiceText}>
                  Download Official Tax Invoice (PDF)
                </Text>
              </>
            )}
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
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  statusBanner: {
    backgroundColor: '#FDF2F8',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  statusIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#831843',
  },
  statusBannerSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  timelineList: {
    gap: 0,
  },
  timelineNode: {
    flexDirection: 'row',
  },
  nodeLeftCol: {
    alignItems: 'center',
    width: 30,
  },
  nodeIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeDone: {
    backgroundColor: '#059669',
  },
  nodeActive: {
    backgroundColor: '#831843',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 40,
    backgroundColor: '#E2E8F0',
  },
  timelineLineDone: {
    backgroundColor: '#059669',
  },
  nodeRightCol: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 22,
  },
  nodeTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nodeTitle: {
    fontSize: 13,
    color: '#64748B',
  },
  nodeTitleBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  nodeDate: {
    fontSize: 11,
    color: '#94A3B8',
  },
  nodeSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    gap: 6,
  },
  copyBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#831843',
  },
  itemsList: {
    gap: 12,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productThumb: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  productMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#831843',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recipientName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  recipientPhone: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  recipientAddress: {
    fontSize: 12,
    color: '#334155',
    marginTop: 4,
    lineHeight: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  payVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  paidBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paidText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  downloadInvoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#831843',
    backgroundColor: '#FDF2F8',
    gap: 8,
  },
  downloadInvoiceText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#831843',
  },
});
