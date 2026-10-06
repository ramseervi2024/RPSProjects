import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, CreditCard } from 'lucide-react-native';
import { getTransactionList } from '../redux/profile/action';
import { COLORS, TYPOGRAPHY, SPACING, RADII, SHADOWS, GLOBAL_STYLES } from '../theme/theme';

export default function PaymentHistoryScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const transactions = useSelector((state) => state.profile.transactionlists);

  const fetchTransactions = async () => {
    try {
      await dispatch(getTransactionList());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTransactions();
  };

  const renderStatusPill = (status) => {
    const s = (status || '').toLowerCase();
    const isSuccess = s === 'completed' || s === 'success';
    const isFailed = s === 'failed' || s === 'error';

    let pillStyle = styles.pillPending;
    let textStyle = styles.pillPendingText;
    let label = (status || 'PENDING').toUpperCase();

    if (isSuccess) {
      pillStyle = styles.pillCompleted;
      textStyle = styles.pillCompletedText;
      label = 'COMPLETED';
    } else if (isFailed) {
      pillStyle = styles.pillFailed;
      textStyle = styles.pillFailedText;
      label = 'FAILED';
    }

    return (
      <View style={[styles.statusPill, pillStyle]}>
        <Text style={textStyle}>{label}</Text>
      </View>
    );
  };

  const renderTransactionItem = ({ item }) => {
    const formattedAmount = parseFloat(item.amount || 0).toFixed(2);
    const orderId = item.order_id || 'AG-20260914-2510';
    const title = item.plan_name || 'Corporate Cart (1 Items)';
    const dateStr = item.date || '14 Sep 2026, 12:05 PM';
    const gateway = item.payment_method || 'Razorpay Gateway';

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* Left squircle icon */}
          <View style={styles.iconBox}>
            <CreditCard size={20} color={COLORS.primary} />
          </View>

          {/* Middle details */}
          <View style={styles.infoCol}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.orderRef}>Order #{orderId}</Text>
            <Text style={styles.gatewayText}>{gateway}</Text>
            <Text style={styles.dateText}>{dateStr}</Text>
          </View>

          {/* Right amount & pill */}
          <View style={styles.rightCol}>
            <Text style={styles.amountText}>₹{formattedAmount}</Text>
            <View style={{ marginTop: SPACING.xs }}>
              {renderStatusPill(item.status)}
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={GLOBAL_STYLES.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const list = Array.isArray(transactions) ? transactions : [];

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Bar matching Mockup 2 Screen 5 */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.screenTitle}>Payment History</Text>
          <Text style={styles.screenSubtitle}>Monetary gateway logs and verified transactions.</Text>
        </View>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item, index) => `${item.id || item.order_id || 'txn'}-${index}`}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={GLOBAL_STYLES.emptyContainer}>
            <Text style={GLOBAL_STYLES.emptyIcon}>💳</Text>
            <Text style={GLOBAL_STYLES.emptyTitle}>No Transactions Recorded</Text>
            <Text style={GLOBAL_STYLES.emptySubtitle}>
              Completed corporate advisory orders and payment receipts will appear here automatically.
            </Text>
          </View>
        }
      />
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
  screenTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
  },
  screenSubtitle: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl + 40,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    ...SHADOWS.card,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: RADII.md,
    backgroundColor: COLORS.mint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: '#BFE7DE',
  },
  infoCol: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  cardTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.navy,
    marginBottom: 2,
  },
  orderRef: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  gatewayText: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textPlaceholder,
    marginBottom: 4,
  },
  dateText: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textSecondary,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontFamily: TYPOGRAPHY.family.extraBold,
    fontSize: TYPOGRAPHY.sizes.size15,
    color: COLORS.navy,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADII.full,
    alignSelf: 'flex-end',
  },
  pillCompleted: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  pillCompletedText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size9,
    color: '#15803D',
    letterSpacing: 0.5,
  },
  pillPending: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pillPendingText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size9,
    color: '#B45309',
    letterSpacing: 0.5,
  },
  pillFailed: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  pillFailedText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size9,
    color: '#B91C1C',
    letterSpacing: 0.5,
  },
});
