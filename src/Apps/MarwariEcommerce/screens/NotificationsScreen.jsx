import React, { useEffect, useState, useMemo } from 'react';
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
import {
  ArrowLeft,
  Bell,
  Sparkles,
  Package,
  ShieldCheck,
  Tag,
  CheckCircle2,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getNotifications } from '../redux/profile/action';
import { COLORS, RADII } from '../theme/theme';

const ROYAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Shipment Dispatched via BlueDart',
    message: 'Your order #ORD-2026-8941 has departed from Jodhpur Palace Hub.',
    date: '2 hours ago',
    category: 'Orders',
    type: 'order',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Festive Royal Privilege: ROYAL500',
    message: 'Use coupon ROYAL500 at checkout to receive ₹500 discount on silver jewellery and sarees.',
    date: '1 day ago',
    category: 'Privilege',
    type: 'discount',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Authenticity Guarantee Certified',
    message: 'Your purchased Udaipur Silver Box has been issued verified GI artisan provenance.',
    date: '3 days ago',
    category: 'Heritage',
    type: 'certificate',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'Welcome to Mārwāri Royal Court',
    message: 'Thank you for joining our patronage society supporting authentic Rajasthan artisans.',
    date: '1 week ago',
    category: 'Welcome',
    type: 'welcome',
    read: true,
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(ROYAL_NOTIFICATIONS);

  const fetchNotifs = async () => {
    try {
      const res = await dispatch(getNotifications());
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setNotifications(res.data);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifs();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return <Package size={18} color="#831843" />;
      case 'discount':
        return <Tag size={18} color="#B45309" />;
      case 'certificate':
        return <ShieldCheck size={18} color="#059669" />;
      default:
        return <Sparkles size={18} color="#831843" />;
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.notifCard, !item.read && styles.notifCardUnread]}>
      <View style={styles.iconCircle}>{getIcon(item.type)}</View>
      <View style={styles.textContent}>
        <View style={styles.titleRow}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          <Text style={styles.notifDate}>{item.date}</Text>
        </View>
        <Text style={styles.notifMessage}>{item.message}</Text>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Royal Notifications</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
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
  listContent: {
    padding: 16,
    gap: 12,
  },
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  notifCardUnread: {
    borderColor: '#FCE7F3',
    backgroundColor: '#FFFDFE',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginRight: 6,
  },
  notifDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
  notifMessage: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
});
