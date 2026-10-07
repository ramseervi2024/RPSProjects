import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Package,
  Calendar,
  ChevronRight,
  Download,
  Truck,
  Sparkles,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getOrderList } from '../redux/profile/action';
import { COLORS, RADII } from '../theme/theme';
import { showToast } from '../components/common/Toast';

const FILTER_TABS = ['All', 'Processing', 'In Transit', 'Delivered'];

export default function OrdersScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const orders = useSelector((state) => state.profile.orderlists);

  const fetchOrders = async () => {
    try {
      await dispatch(getOrderList());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const rawList = Array.isArray(orders) ? orders : [];

  const filteredOrders = rawList.filter((item) => {
    if (activeFilter === 'All') return true;
    const status = (item.status || '').toLowerCase();
    if (activeFilter === 'Processing') return status === 'processing';
    if (activeFilter === 'In Transit') return status === 'in transit' || status === 'dispatched';
    if (activeFilter === 'Delivered') return status === 'delivered' || status === 'completed';
    return true;
  });

  const renderStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    let bg = '#FEF3C7';
    let textCol = '#B45309';
    let label = 'Processing';

    if (s === 'delivered' || s === 'completed') {
      bg = '#ECFDF5';
      textCol = '#059669';
      label = 'Delivered';
    } else if (s === 'in transit' || s === 'dispatched') {
      bg = '#E0F2FE';
      textCol = '#0284C7';
      label = 'In Transit';
    } else if (s === 'cancelled') {
      bg = '#FEE2E2';
      textCol = '#DC2626';
      label = 'Cancelled';
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Text style={[styles.statusBadgeText, { color: textCol }]}>
          ● {label}
        </Text>
      </View>
    );
  };

  const renderOrderItem = ({ item }) => {
    const orderId = item.id || 'ORD-2026-8941';
    const displayTotal = parseFloat(item.total || 0).toLocaleString('en-IN');
    const orderDate = item.date
      ? new Date(item.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '06 Oct 2026';

    const rawItems = Array.isArray(item.items) ? item.items : [];
    const items =
      rawItems.length > 0
        ? rawItems.map((prod) => ({
            name: prod.product?.name || prod.productName || prod.name || 'Heritage Creation',
            price: prod.product?.price || prod.price || 0,
            image:
              prod.product?.image ||
              prod.image ||
              'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
            quantity: prod.quantity || prod.qty || 1,
          }))
        : [
            {
              name: 'Royal Heritage Artifact',
              price: item.total || 0,
              image:
                'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
              quantity: 1,
            },
          ];

    return (
      <TouchableOpacity
        style={styles.orderCard}
        activeOpacity={0.88}
        onPress={() =>
          navigation.navigate('OrderDetails', {
            orderId,
            initialOrder: item,
          })
        }
      >
        {/* Card Header */}
        <View style={styles.orderCardHeader}>
          <View>
            <Text style={styles.orderIdText}>#{orderId}</Text>
            <View style={styles.dateRow}>
              <Calendar size={12} color="#64748B" />
              <Text style={styles.dateText}>{orderDate}</Text>
            </View>
          </View>
          {renderStatusBadge(item.status)}
        </View>

        <View style={styles.divider} />

        {/* Card Body - Products Thumbnails */}
        <View style={styles.itemsPreview}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map((prod, idx) => (
              <Image
                key={idx}
                source={{
                  uri:
                    prod.image ||
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
                }}
                style={styles.itemThumb}
              />
            ))}
          </ScrollView>
          <View style={styles.itemsMeta}>
            <Text style={styles.itemsCount}>
              {items.length} {items.length > 1 ? 'items' : 'item'}
            </Text>
            <Text style={styles.itemFirstName} numberOfLines={1}>
              {items[0]?.name || 'Heritage Creation'}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Card Footer */}
        <View style={styles.orderCardFooter}>
          <View>
            <Text style={styles.totalLabel}>Total Inscribed</Text>
            <Text style={styles.totalAmount}>₹{displayTotal}</Text>
          </View>

          <TouchableOpacity
            style={styles.trackBtn}
            onPress={() =>
              navigation.navigate('OrderDetails', {
                orderId,
                initialOrder: item,
              })
            }
          >
            <Truck size={14} color="#FFFFFF" />
            <Text style={styles.trackBtnText}>Track Order</Text>
            <ChevronRight size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Royal Orders & Invoices</Text>
          <Text style={styles.headerSubtitle}>
            Track shipments & verified authenticity certificates
          </Text>
        </View>
        <View style={styles.crownWrap}>
          <Sparkles size={18} color="#B45309" />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabsRow}>
        {FILTER_TABS.map((tab) => {
          const isSel = activeFilter === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.filterTab, isSel && styles.filterTabActive]}
              onPress={() => setActiveFilter(tab)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  isSel && styles.filterTabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#831843" />
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id || String(Math.random())}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#831843']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Package size={48} color="#94A3B8" />
              <Text style={styles.emptyTitle}>No Orders Found</Text>
              <Text style={styles.emptySubtitle}>
                No orders matching the &quot;{activeFilter}&quot; status filter.
              </Text>
            </View>
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
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  crownWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterTabActive: {
    backgroundColor: '#831843',
    borderColor: '#831843',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 30,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  dateText: {
    fontSize: 11,
    color: '#64748B',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  itemsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemThumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    marginRight: 6,
  },
  itemsMeta: {
    flex: 1,
  },
  itemsCount: {
    fontSize: 11,
    color: '#64748B',
  },
  itemFirstName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  orderCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#831843',
  },
  trackBtn: {
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
});
