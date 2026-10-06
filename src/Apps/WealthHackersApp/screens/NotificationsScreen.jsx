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
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Bell,
  Calendar,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import { getNotifications } from '../redux/profile/action';
import { COLORS, TYPOGRAPHY, SPACING, RADII, SHADOWS, GLOBAL_STYLES } from '../theme/theme';

const SEED_NOTIFICATIONS = [
  {
    id: 'seed-1',
    title: 'Welcome to WealthHackers',
    message: 'Thank you for joining our corporate program.',
    date: '2026-09-15 17:42:37',
    category: 'System',
    type: 'welcome',
    read: true,
  },
  {
    id: 'seed-2',
    title: 'Profile Verified',
    message: 'Your corporate employee ID has been verified.',
    date: '2026-09-15 17:42:37',
    category: 'System',
    type: 'verified',
    read: true,
  },
  {
    id: 'seed-3',
    title: 'Order #362 Processed',
    message: 'Your order has been successfully processed.',
    date: '2026-09-14 11:22:04',
    category: 'Orders',
    type: 'order',
    read: false,
    badgeCount: 2,
  },
  {
    id: 'seed-4',
    title: 'SIP Reminder',
    message: 'Your SIP of ₹5,000 is due in 3 days.',
    date: '2026-09-12 09:30:00',
    category: 'SIP Updates',
    type: 'sip',
    read: true,
  },
  {
    id: 'seed-5',
    title: 'System Update',
    message: 'We have updated our latest financial plans.',
    date: '2026-09-10 16:20:15',
    category: 'System',
    type: 'info',
    read: true,
  },
];

const NOTIF_TABS = ['All', 'Orders', 'SIP Updates', 'System'];

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const reduxNotifications = useSelector((state) => state.profile.notifications);

  const fetchNotifs = async () => {
    try {
      await dispatch(getNotifications());
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

  const combinedNotifications = useMemo(() => {
    const list = Array.isArray(reduxNotifications) ? reduxNotifications : [];
    if (list.length === 0) return SEED_NOTIFICATIONS;

    const formattedApiList = list.map((item, idx) => {
      const lowerTitle = (item.title || '').toLowerCase();
      let cat = 'System';
      let type = 'info';

      if (lowerTitle.includes('order')) {
        cat = 'Orders';
        type = 'order';
      } else if (lowerTitle.includes('sip') || lowerTitle.includes('invest')) {
        cat = 'SIP Updates';
        type = 'sip';
      }

      return {
        id: `api-${item.id || idx}`,
        title: item.title || 'Corporate Alert',
        message: item.message || '',
        date: item.date || 'Recent',
        category: cat,
        type,
        read: !!item.read,
      };
    });

    return [...formattedApiList, ...SEED_NOTIFICATIONS];
  }, [reduxNotifications]);

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'All') return combinedNotifications;
    return combinedNotifications.filter(
      (item) => (item.category || '').toLowerCase() === activeTab.toLowerCase()
    );
  }, [combinedNotifications, activeTab]);

  const getIconConfig = (type) => {
    switch (type) {
      case 'welcome':
        return {
          Icon: CheckCircle2,
          bg: '#DCFCE7',
          color: '#15803D',
        };
      case 'verified':
        return {
          Icon: ShieldCheck,
          bg: '#E6F4F1',
          color: '#0F766E',
        };
      case 'order':
        return {
          Icon: Bell,
          bg: '#FEF3C7',
          color: '#D97706',
        };
      case 'sip':
        return {
          Icon: Calendar,
          bg: '#DCFCE7',
          color: '#15803D',
        };
      case 'info':
      default:
        return {
          Icon: Info,
          bg: '#E0F2FE',
          color: '#0284C7',
        };
    }
  };

  const renderNotificationItem = ({ item }) => {
    const { Icon, bg, color } = getIconConfig(item.type);

    return (
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: bg }]}>
          <Icon size={20} color={color} />
        </View>

        <View style={styles.contentCol}>
          <View style={styles.titleRow}>
            <Text style={styles.notifTitle} numberOfLines={1}>
              {item.title}
            </Text>
            {item.badgeCount && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{item.badgeCount}</Text>
              </View>
            )}
          </View>

          <Text style={styles.notifMessage}>{item.message}</Text>
          <Text style={styles.notifDate}>{item.date}</Text>
        </View>

        <ChevronRight size={16} color={COLORS.textPlaceholder} style={styles.chevron} />
      </View>
    );
  };

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header matching Mockup 2 Screen 8 */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.screenTitle}>Notifications</Text>
          <Text style={styles.screenSubtitle}>
            Stay updated with your order statuses and SIP updates.
          </Text>
        </View>
      </View>

      {/* Tabs Filter Bar */}
      <View style={styles.tabsBar}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={NOTIF_TABS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.tabsContent}
          renderItem={({ item: tab }) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                style={[styles.tabPill, isActive && styles.tabPillActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Notifications List */}
      {loading && !refreshing ? (
        <View style={GLOBAL_STYLES.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
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
              <Text style={GLOBAL_STYLES.emptyIcon}>🔔</Text>
              <Text style={GLOBAL_STYLES.emptyTitle}>No Notifications</Text>
              <Text style={GLOBAL_STYLES.emptySubtitle}>
                You have no updates in this category at this time.
              </Text>
            </View>
          }
        />
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
  tabsBar: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  tabsContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADII.full,
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.textInverted,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: 130,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm + 2,
    borderWidth: 1,
    borderColor: COLORS.mintBorder,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.card,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  contentCol: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  notifTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.navy,
    flex: 1,
  },
  unreadBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  unreadBadgeText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.textInverted,
  },
  notifMessage: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
    lineHeight: 17,
    marginBottom: 4,
  },
  notifDate: {
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textPlaceholder,
  },
  chevron: {
    marginLeft: 4,
  },
});
