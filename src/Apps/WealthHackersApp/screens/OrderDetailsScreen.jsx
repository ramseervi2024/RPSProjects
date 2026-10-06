import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Share,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  PhoneCall,
  Mail,
  ShieldCheck,
  Download,
  CreditCard,
  User,
  Calendar,
} from 'lucide-react-native';
import { getOrderDetails, getProfileDetails } from '../redux/profile/action';
import { COLORS, TYPOGRAPHY, SPACING, RADII, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { showToast } from '../components/common/Toast';
import { downloadOrShareInvoice } from '../utils/invoicePdfGenerator';

export default function OrderDetailsScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orderId, initialOrder } = route.params || {};

  const [loading, setLoading] = useState(true);
  const reduxOrderDetails = useSelector((state) => state.profile.orderdetails);
  const profile = useSelector((state) => state.profile.profiledetails);

  useEffect(() => {
    const promises = [];
    if (orderId) {
      promises.push(dispatch(getOrderDetails(orderId)));
    }
    if (!profile?.email) {
      promises.push(dispatch(getProfileDetails()));
    }
    Promise.all(promises).finally(() => setLoading(false));
  }, [dispatch, orderId, profile?.email]);

  const orderData =
    reduxOrderDetails?.id === orderId || reduxOrderDetails?.id
      ? reduxOrderDetails
      : initialOrder || {};

  const formatCurrency = (val) => {
    if (val == null) return '0.00';
    const num = parseFloat(String(val).replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return '0.00';
    return num.toFixed(2);
  };

  const capitalize = (str) => {
    if (!str) return 'Processing';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (loading && !orderData.id && !orderData.total) {
    return (
      <View style={GLOBAL_STYLES.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const rawStatus = orderData.status || initialOrder?.status || 'Processing';
  const displayStatus = capitalize(rawStatus);
  const isCompleted =
    rawStatus.toLowerCase() === 'completed' || rawStatus.toLowerCase() === 'success';
  const isFailed =
    rawStatus.toLowerCase() === 'failed' || rawStatus.toLowerCase() === 'cancelled';

  let statusBg = '#FEF3C7';
  let statusTextColor = '#B45309';
  let statusBorder = '#FDE68A';
  let StatusIcon = Clock;

  if (isCompleted) {
    statusBg = '#DCFCE7';
    statusTextColor = '#15803D';
    statusBorder = '#86EFAC';
    StatusIcon = CheckCircle2;
  } else if (isFailed) {
    statusBg = '#FEE2E2';
    statusTextColor = '#B91C1C';
    statusBorder = '#FECACA';
    StatusIcon = AlertCircle;
  }

  const displayEmail =
    orderData.email || initialOrder?.email || profile?.email || 'ramseervi4321@gmail.com';
  const displayDate =
    orderData.date || initialOrder?.date || '14 Sep 2026, 12:05 PM';
  const displayPlatform =
    orderData.platform ||
    initialOrder?.platform ||
    profile?.platform ||
    'Accenture Corporate Wellness';

  const rawTotal = orderData.total || initialOrder?.total || 1.0;
  const formattedTotal = formatCurrency(rawTotal);
  const displayOrderId = orderData.id || orderId || '363';

  // Line items list
  const rawItems =
    Array.isArray(orderData.items) && orderData.items.length > 0
      ? orderData.items
      : Array.isArray(initialOrder?.items) && initialOrder.items.length > 0
      ? initialOrder.items
      : [
          {
            name: orderData.plan_name || initialOrder?.plan_name || 'Corporate Advisory Order',
            quantity: 1,
            subtotal: rawTotal,
          },
        ];

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadInvoice = async () => {
    if (isGeneratingPdf) return;
    try {
      setIsGeneratingPdf(true);
      showToast.info('Generating PDF', `Preparing official Tax Invoice for Order #${displayOrderId}...`);
      const res = await downloadOrShareInvoice(orderData, profile);
      showToast.success(
        'Invoice Ready',
        `Official GST invoice ${res.fileName} generated successfully.`
      );
    } catch (error) {
      console.error('Invoice PDF download error:', error);
      showToast.error('Download Failed', error?.message || 'Unable to generate PDF invoice.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShareReceipt = async () => {
    return handleDownloadInvoice();
  };

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color={COLORS.navy} />
        </TouchableOpacity>

        <View style={styles.titleWrap}>
          <Text style={styles.headerTitle}>Order Receipt</Text>
          <Text style={styles.headerSubtitle}>Order #{displayOrderId} • Verified Gateway</Text>
        </View>

        <TouchableOpacity
          style={styles.shareBtn}
          onPress={handleShareReceipt}
          activeOpacity={0.7}
        >
          <Share2 size={18} color={COLORS.navy} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Digital Receipt Banner Card */}
        <View style={styles.heroCard}>
          <View style={[styles.statusIconBox, { backgroundColor: statusBg, borderColor: statusBorder }]}>
            <StatusIcon size={28} color={statusTextColor} />
          </View>

          <Text style={styles.heroStatusLabel}>
            {isCompleted ? 'Payment Verified & Confirmed' : 'Order Placed & Processing'}
          </Text>

          <Text style={styles.heroAmount}>₹{formattedTotal}</Text>

          <View style={[styles.statusPill, { backgroundColor: statusBg, borderColor: statusBorder }]}>
            <Text style={[styles.statusPillText, { color: statusTextColor }]}>
              {displayStatus.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.heroOrderRef}>
            Order ID: <Text style={styles.boldText}>#{displayOrderId}</Text>
          </Text>
          <Text style={styles.heroDate}>{displayDate}</Text>
        </View>

        {/* 3-Step Order Progress Tracker */}
        <View style={styles.trackerCard}>
          <Text style={styles.sectionHeader}>ORDER STATUS TIMELINE</Text>

          <View style={styles.timelineRow}>
            {/* Step 1 */}
            <View style={styles.stepNode}>
              <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
                <CheckCircle2 size={14} color="#15803D" />
              </View>
              <Text style={styles.stepTitle}>Order Placed</Text>
              <Text style={styles.stepTime}>Payment Logged</Text>
            </View>

            <View style={[styles.stepLine, isCompleted ? styles.stepLineActive : null]} />

            {/* Step 2 */}
            <View style={styles.stepNode}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted ? styles.stepCircleCompleted : styles.stepCircleActive,
                ]}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} color="#15803D" />
                ) : (
                  <Clock size={14} color="#B45309" />
                )}
              </View>
              <Text style={styles.stepTitle}>Advisor Review</Text>
              <Text style={styles.stepTime}>{isCompleted ? 'Completed' : 'In Progress'}</Text>
            </View>

            <View style={[styles.stepLine, isCompleted ? styles.stepLineActive : null]} />

            {/* Step 3 */}
            <View style={styles.stepNode}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted ? styles.stepCircleCompleted : styles.stepCirclePending,
                ]}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} color="#15803D" />
                ) : (
                  <ShieldCheck size={14} color={COLORS.textPlaceholder} />
                )}
              </View>
              <Text style={styles.stepTitle}>Fulfilled</Text>
              <Text style={styles.stepTime}>{isCompleted ? 'Activated' : 'Pending'}</Text>
            </View>
          </View>
        </View>

        {/* Purchased Services Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderWithCount}>
            <Text style={styles.sectionHeader}>PURCHASED SERVICES ({rawItems.length})</Text>
          </View>

          {rawItems.map((item, index) => {
            const itemPrice = formatCurrency(item.subtotal || item.total || rawTotal);
            const qty = item.quantity || item.qty || 1;

            return (
              <View key={index} style={styles.itemRow}>
                <View style={styles.itemIconBox}>
                  <FileText size={20} color={COLORS.primary} />
                </View>

                <View style={styles.itemTitleCol}>
                  <Text style={styles.itemNameText} numberOfLines={2}>
                    {item.name || 'Corporate Order'}
                  </Text>
                  <Text style={styles.itemPlatformTag}>{displayPlatform}</Text>
                  <Text style={styles.itemQtySubtitle}>Quantity: {qty}</Text>
                </View>

                <Text style={styles.itemPriceText}>₹{itemPrice}</Text>
              </View>
            );
          })}
        </View>

        {/* Payment & Billing Breakdown Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>BILLING & PAYMENT SUMMARY</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Subtotal</Text>
            <Text style={styles.billValue}>₹{formattedTotal}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Corporate Advisory Fee</Text>
            <Text style={styles.freeBadge}>FREE</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes & GST</Text>
            <Text style={styles.billValue}>Included (0%)</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.billRowTotal}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹{formattedTotal}</Text>
          </View>

          <View style={styles.paymentMethodBox}>
            <CreditCard size={16} color={COLORS.primary} style={styles.creditCardIcon} />
            <View style={styles.flexOne}>
              <Text style={styles.methodTitle}>Razorpay Payment Gateway</Text>
              <Text style={styles.methodSubtitle}>NetBanking / UPI / Corporate Card • Verified</Text>
            </View>
            <ShieldCheck size={16} color="#15803D" />
          </View>
        </View>

        {/* Employee & Corporate Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>CORPORATE EMPLOYEE DETAILS</Text>

          <View style={styles.metaField}>
            <User size={15} color={COLORS.textMuted} style={styles.fieldIcon} />
            <View style={styles.flexOne}>
              <Text style={styles.fieldLabel}>Employee / Account Email</Text>
              <Text style={styles.fieldValue}>{displayEmail}</Text>
            </View>
          </View>

          <View style={styles.metaField}>
            <ShieldCheck size={15} color={COLORS.textMuted} style={styles.fieldIcon} />
            <View style={styles.flexOne}>
              <Text style={styles.fieldLabel}>Corporate Platform</Text>
              <Text style={styles.fieldValue}>{displayPlatform}</Text>
            </View>
          </View>

          <View style={styles.metaField}>
            <Calendar size={15} color={COLORS.textMuted} style={styles.fieldIcon} />
            <View style={styles.flexOne}>
              <Text style={styles.fieldLabel}>Transaction Timestamp</Text>
              <Text style={styles.fieldValue}>{displayDate}</Text>
            </View>
          </View>
        </View>

        {/* Advisor Support Card */}
        <View style={styles.advisorCard}>
          <View style={styles.advisorHeaderRow}>
            <View style={styles.advisorIconBox}>
              <PhoneCall size={18} color={COLORS.primary} />
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.advisorTitle}>Need Help with your Order?</Text>
              <Text style={styles.advisorDesc}>
                Your dedicated Corporate Wealth Advisor is available for priority consultation.
              </Text>
            </View>
          </View>

          <View style={styles.advisorDivider} />

          <View style={styles.advisorContacts}>
            <View style={styles.contactItem}>
              <PhoneCall size={13} color={COLORS.primary} />
              <Text style={styles.contactText}>Desk: +91 80 4718 9000</Text>
            </View>
            <View style={[styles.contactItem, styles.contactItemSecond]}>
              <Mail size={13} color={COLORS.primary} />
              <Text style={styles.contactText}>advisors@wealthhackers.in</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.downloadBtn, isGeneratingPdf && { opacity: 0.8 }]}
          onPress={handleDownloadInvoice}
          disabled={isGeneratingPdf}
          activeOpacity={0.85}
        >
          {isGeneratingPdf ? (
            <ActivityIndicator size="small" color="#FFFFFF" style={styles.downloadIcon} />
          ) : (
            <Download size={18} color="#FFFFFF" style={styles.downloadIcon} />
          )}
          <Text style={styles.downloadBtnText}>
            {isGeneratingPdf ? 'Generating PDF Invoice...' : 'Download Tax Invoice (PDF)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={() => navigation.navigate('Main', { screen: 'Dashboard' })}
          activeOpacity={0.75}
        >
          <Text style={styles.dashboardBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
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
  titleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
  },
  headerSubtitle: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  shareBtn: {
    width: 38,
    height: 38,
    borderRadius: RADII.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl + 30,
  },
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    ...SHADOWS.card,
  },
  statusIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1.5,
  },
  heroStatusLabel: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  heroAmount: {
    fontFamily: TYPOGRAPHY.family.extraBold,
    fontSize: TYPOGRAPHY.sizes.size32,
    color: COLORS.navy,
    letterSpacing: -0.5,
    marginBottom: SPACING.sm,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADII.full,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  statusPillText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size10,
    letterSpacing: 0.8,
  },
  heroOrderRef: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
  },
  boldText: {
    fontFamily: TYPOGRAPHY.family.bold,
    color: COLORS.navy,
  },
  heroDate: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textPlaceholder,
    marginTop: 2,
  },
  trackerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  stepNode: {
    alignItems: 'center',
    width: 80,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1.5,
  },
  stepCircleCompleted: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  stepCircleActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  stepCirclePending: {
    backgroundColor: COLORS.backgroundAlt,
    borderColor: COLORS.border,
  },
  stepTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.navy,
    textAlign: 'center',
  },
  stepTime: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size9,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 1,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.borderLight,
    marginBottom: 16,
  },
  stepLineActive: {
    backgroundColor: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  cardHeaderWithCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionHeader: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: SPACING.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  itemIconBox: {
    width: 42,
    height: 42,
    borderRadius: RADII.md,
    backgroundColor: COLORS.mint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: '#BFE7DE',
  },
  itemTitleCol: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  itemNameText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  itemPlatformTag: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.primary,
    marginTop: 2,
  },
  itemQtySubtitle: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  itemPriceText: {
    fontFamily: TYPOGRAPHY.family.extraBold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.navy,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs + 2,
  },
  billLabel: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.textSecondary,
  },
  billValue: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  freeBadge: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: '#15803D',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  billRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size15,
    color: COLORS.navy,
  },
  totalValue: {
    fontFamily: TYPOGRAPHY.family.extraBold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
  },
  paymentMethodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: RADII.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  methodTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.navy,
  },
  methodSubtitle: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  metaField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  fieldIcon: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  fieldLabel: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
    marginTop: 1,
  },
  advisorCard: {
    backgroundColor: COLORS.mintLight,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  advisorHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advisorIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: '#BFE7DE',
  },
  advisorTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  advisorDesc: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  advisorDivider: {
    height: 1,
    backgroundColor: '#CCFBF1',
    marginVertical: SPACING.sm,
  },
  advisorContacts: {
    paddingLeft: 46,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.primary,
    marginLeft: 6,
  },
  downloadBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADII.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  downloadBtnText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: '#FFFFFF',
  },
  dashboardBtn: {
    height: 46,
    borderRadius: RADII.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardBtnText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.textSecondary,
  },
  creditCardIcon: {
    marginRight: 8,
  },
  flexOne: {
    flex: 1,
  },
  contactItemSecond: {
    marginTop: 4,
  },
  downloadIcon: {
    marginRight: 8,
  },
});
