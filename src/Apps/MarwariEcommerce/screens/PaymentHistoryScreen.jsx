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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, CreditCard, Sparkles } from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getTransactionList } from '../redux/profile/action';
import { COLORS } from '../theme/theme';

export default function PaymentHistoryScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
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

    return (
      <View
        style={[
          styles.statusPill,
          { backgroundColor: isSuccess ? '#ECFDF5' : '#FEF3C7' },
        ]}
      >
        <Text
          style={[
            styles.statusPillText,
            { color: isSuccess ? '#059669' : '#B45309' },
          ]}
        >
          ● {isSuccess ? 'COMPLETED' : 'PENDING'}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const formattedAmount = parseFloat(item.amount || 7109).toLocaleString('en-IN');
    const orderId = item.order_id || 'ORD-2026-8941';
    const title = item.title || 'Royal Handicrafts & Apparel Order';
    const dateStr = item.date || '06 Oct 2026';
    const gateway = item.method || 'Razorpay UPI Gateway';

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.iconBox}>
            <CreditCard size={20} color="#831843" />
          </View>

          <View style={styles.infoCol}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.orderRef}>Order #{orderId}</Text>
            <Text style={styles.gatewayText}>{gateway}</Text>
            <Text style={styles.dateText}>{dateStr}</Text>
          </View>

          <View style={styles.rightCol}>
            <Text style={styles.amountText}>₹{formattedAmount}</Text>
            <View style={{ marginTop: 6 }}>{renderStatusPill(item.status)}</View>
          </View>
        </View>
      </View>
    );
  };

  const list = Array.isArray(transactions) ? transactions : [];

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Receipts</Text>
        <View style={{ width: 36 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#831843" />
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id || String(Math.random())}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#831843']}
            />
          }
        />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  orderRef: {
    fontSize: 11,
    color: '#831843',
    fontWeight: '600',
    marginTop: 2,
  },
  gatewayText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  dateText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusPillText: {
    fontSize: 9,
    fontWeight: '800',
  },
});
