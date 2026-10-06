import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getOrderList } from '../redux/profile/action';
import { ChevronLeft } from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { COLORS, GLOBAL_STYLES } from '../theme/theme';
import { showToast } from '../components/common/Toast';
import { downloadOrShareInvoice } from '../utils/invoicePdfGenerator';

const FILTER_TABS = ['All', 'Processing', 'Completed', 'Pending'];

export default function OrdersScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [downloadingOrderId, setDownloadingOrderId] = useState(null);
  const orders = useSelector((state) => state.profile.orderlists);
  const profile = useSelector((state) => state.profile.profiledetails);

  const handleDownloadPdf = async (item) => {
    const itemOrderId = item?.id || '408';
    try {
      setDownloadingOrderId(itemOrderId);
      showToast.info('Generating PDF', `Preparing official Tax Invoice for Order #${itemOrderId}...`);
      const res = await downloadOrShareInvoice(item, profile);
      showToast.success('Invoice Ready', `Official GST invoice ${res.fileName} is ready.`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      showToast.error('Download Failed', err?.message || 'Unable to generate PDF invoice.');
    } finally {
      setDownloadingOrderId(null);
    }
  };

  useEffect(() => {
    dispatch(getOrderList()).finally(() => setLoading(false));
  }, [dispatch]);

  const rawList = Array.isArray(orders) ? orders : [];

  const filteredOrders = rawList.filter((item) => {
    if (activeFilter === 'All') return true;
    const status = (item.status || '').toLowerCase();
    if (activeFilter === 'Processing') return status === 'processing';
    if (activeFilter === 'Completed') return status === 'completed' || status === 'success';
    if (activeFilter === 'Pending') return status === 'pending';
    return true;
  });

  const renderStatusPill = (status) => {
    const s = (status || '').toLowerCase();
    let bg = '#ECFDF5';
    let color = '#059669';
    let text = '● Processing';

    if (s === 'completed' || s === 'final_plan' || s === 'final plan') {
      bg = '#E6F4F1';
      color = '#0F766E';
      text = '● Final Plan';
    } else if (s === 'pending') {
      bg = '#FEF9C3';
      color = '#CA8A04';
      text = '● Pending';
    } else if (s === 'failed' || s === 'cancelled') {
      bg = '#FEE2E2';
      color = '#DC2626';
      text = '● Cancelled';
    }

    return (
      <View style={[styles.statusPillBox, { backgroundColor: bg }]}>
        <Text style={[styles.statusPillText, { color }]}>{text}</Text>
      </View>
    );
  };

  const renderOrderItem = ({ item }) => {
    const displayTotal = parseFloat(item.total || 0).toFixed(2);
    const serviceName =
      item.service_name ||
      (item.items && item.items[0]?.name) ||
      item.name ||
      `Product ID #${item.product_id || (item.id ? `2357${item.id}` : '235708')}`;

    const dateFormatted =
      item.date_ist ||
      item.created_at ||
      item.date ||
      '26 Sep 2026, 11:23 PM IST';

    return (
      <View style={styles.orderCard}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetails', { orderId: item.id, initialOrder: item })
          }
          activeOpacity={0.8}
        >
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.orderIdText}>#{item.id || '408'}</Text>
              <View style={styles.servicePillBadge}>
                <Text style={styles.servicePillText} numberOfLines={1}>
                  {serviceName}
                </Text>
              </View>
            </View>
            {renderStatusPill(item.status)}
          </View>
        </TouchableOpacity>

        <View style={styles.cardDivider} />

        <View style={styles.cardBottomRow}>
          <TouchableOpacity
            style={styles.cardTotalDateWrap}
            onPress={() =>
              navigation.navigate('OrderDetails', { orderId: item.id, initialOrder: item })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.orderTotalAmount}>INR {displayTotal}</Text>
            <Text style={styles.orderDateText}>{dateFormatted}</Text>
          </TouchableOpacity>

          <View style={styles.actionsRowOrders}>
            <TouchableOpacity
              style={styles.detailsActionBtn}
              onPress={() =>
                navigation.navigate('OrderDetails', { orderId: item.id, initialOrder: item })
              }
              activeOpacity={0.7}
            >
              <Text style={styles.detailsActionText}>Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pdfActionBtn,
                downloadingOrderId === (item.id || '408') && { opacity: 0.8 },
              ]}
              onPress={() => handleDownloadPdf(item)}
              disabled={downloadingOrderId === (item.id || '408')}
              activeOpacity={0.7}
            >
              {downloadingOrderId === (item.id || '408') ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.pdfActionText}>PDF</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={GLOBAL_STYLES.loadingContainer}>
        <ActivityIndicator size="large" color="#0F766E" />
      </View>
    );
  }

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header to go back */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
          activeOpacity={0.7}
        >
          <ChevronLeft size={20} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item, index) => `${item.id || 'order'}-${index}`}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <Text style={styles.screenSubtitleModern}>
              Your corporate services, plans, and transaction receipts
            </Text>

            {/* Filter Tabs matching Mockup Screen 4 */}
            <View style={styles.filterTabsRow}>
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.filterTabPill, isActive && styles.filterTabPillActive]}
                    onPress={() => setActiveFilter(tab)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.filterTabText,
                        isActive && styles.filterTabTextActive,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptySub}>
              {activeFilter === 'All'
                ? 'You have not placed any orders yet. Check our services catalog to get started.'
                : `No orders currently matching "${activeFilter}".`}
            </Text>
            {activeFilter !== 'All' ? (
              <TouchableOpacity
                style={styles.clearFilterBtn}
                onPress={() => setActiveFilter('All')}
                activeOpacity={0.8}
              >
                <Text style={styles.clearFilterText}>Show All Orders</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.exploreCatalogBtn}
                onPress={() => navigation.navigate('Services')}
                activeOpacity={0.85}
              >
                <Text style={styles.exploreCatalogBtnText}>Browse Services</Text>
              </TouchableOpacity>
            )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size18 || 18,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  headerWrap: {
    marginBottom: 16,
  },
  screenTitleModern: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size24,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  screenSubtitleModern: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 3,
    marginBottom: 16,
  },
  // Filter Tabs
  filterTabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterTabPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterTabPillActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  filterTabText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    color: '#64748B',
  },
  filterTabTextActive: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
  },
  // Order Card Modern
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  docIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderMetaCol: {
    flex: 1,
  },
  orderIdText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
  },
  orderDateText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size11,
    color: '#64748B',
    marginTop: 2,
  },
  statusPillBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPillText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTotalDateWrap: {
    flex: 1,
    paddingRight: 8,
  },
  itemCountLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size11,
    color: '#64748B',
  },
  orderTotalAmount: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.size16,
    color: '#0F766E',
    marginTop: 2,
  },
  viewDetailsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
    marginRight: 2,
  },
  // Empty State
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size16,
    color: '#0F172A',
    marginBottom: 6,
  },
  emptySub: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  clearFilterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  clearFilterText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },
  exploreCatalogBtn: {
    backgroundColor: '#0F766E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  exploreCatalogBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#FFFFFF',
  },
  servicePillBadge: {
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
    maxWidth: 150,
  },
  servicePillText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    color: '#7E22CE',
  },
  actionsRowOrders: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailsActionBtn: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  detailsActionText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },
  pdfActionBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pdfActionText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#64748B',
  },
});
