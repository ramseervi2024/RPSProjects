import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import {
  Home,
  LayoutGrid,
  Calculator,
  ClipboardList,
  CreditCard,
  LogOut,
  Check,
} from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { logoutAction } from '../redux/auth/action';

export default function SideDrawer({ visible, onClose, navigation, activeRoute = 'Dashboard' }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const userProfile = useSelector((s) => s.profile?.userProfile) || {};
  const ordersList = useSelector((s) => s.profile?.orders) || [];
  const servicesList = useSelector((s) => s.profile?.services) || [];

  const fullName = `${userProfile?.first_name || 'Ramesh'} ${userProfile?.last_name || 'Seervi'}`.trim();
  const initials = `${(userProfile?.first_name || 'R')[0]}${(userProfile?.last_name || 'S')[0]}`.toUpperCase();
  const email = userProfile?.email || 'ramseervi4321@gmail.com';
  const company = userProfile?.company_name || 'Accenture Corporate Tier 1';

  const topPadding = insets.top > 0 ? insets.top + 14 : (Platform.OS === 'android' ? 48 : 24);
  const bottomPadding = insets.bottom > 0 ? insets.bottom + 12 : (Platform.OS === 'android' ? 22 : 16);

  const handleNavigate = (routeName) => {
    onClose();
    if (navigation) {
      navigation.navigate(routeName);
    }
  };

  const handleLogout = () => {
    onClose();
    dispatch(logoutAction());
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  };

  const PORTALS = [
    {
      id: 'Dashboard',
      title: 'Executive Dashboard',
      Icon: Home,
      badge: 'Active',
      badgeType: 'active',
      screen: 'Dashboard',
    },
    {
      id: 'SIPPortfolios',
      title: 'SIP Portfolios',
      Icon: Calculator,
      badge: 'Verified CAGR',
      badgeType: 'popular',
      screen: 'SIPPortfolios',
    },
    {
      id: 'Categories',
      title: 'Service Categories',
      Icon: LayoutGrid,
      badge: '12 Domains',
      badgeType: 'neutral',
      screen: 'Categories',
    },
    {
      id: 'Services',
      title: 'All Corporate Services',
      Icon: LayoutGrid,
      badge: `${servicesList.length || 8} Available`,
      badgeType: 'neutral',
      screen: 'Services',
    },
    {
      id: 'Calculate',
      title: 'Wealth Calculators',
      Icon: Calculator,
      badge: 'Popular',
      badgeType: 'popular',
      screen: 'Calculate',
    },
    {
      id: 'Orders',
      title: 'Order History & Status',
      Icon: ClipboardList,
      badge: `${ordersList.length || 14} Total`,
      badgeType: 'neutral',
      screen: 'Orders',
    },
    {
      id: 'ContactAdvisor',
      title: 'Contact Advisor Desk',
      Icon: CreditCard,
      badge: 'Online',
      badgeType: 'popular',
      screen: 'ContactAdvisor',
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Drawer Panel on Left */}
        <View
          style={[
            styles.drawerContainer,
            {
              paddingTop: topPadding,
              paddingBottom: bottomPadding,
            },
          ]}
        >
          {/* User Profile Header (Matching Section 1 Spec) */}
          <View style={styles.drawerHeader}>
            {/* RS Squircle Avatar with Online Status */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
              <View style={styles.onlineDot} />
            </View>

            {/* Name, PRO tag, email, company */}
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName} numberOfLines={1}>
                  {fullName}
                </Text>
                <View style={styles.proBadge}>
                  <Text style={styles.proText}>PRO</Text>
                </View>
              </View>
              <Text style={styles.userEmail} numberOfLines={1}>
                {email}
              </Text>
              <View style={styles.corporateRow}>
                <View style={styles.checkIconWrapper}>
                  <Check size={8} color="#FFFFFF" strokeWidth={3.5} />
                </View>
                <Text style={styles.corporateText} numberOfLines={1}>
                  {company}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Primary Portals List */}
          <ScrollView
            style={styles.drawerBody}
            contentContainerStyle={styles.drawerBodyContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionHeading}>PRIMARY PORTALS</Text>

            {PORTALS.map((portal) => {
              const isActive = activeRoute === portal.id;
              const IconComp = portal.Icon;

              return (
                <TouchableOpacity
                  key={portal.id}
                  style={[styles.portalItem, isActive && styles.portalItemActive]}
                  onPress={() => handleNavigate(portal.screen)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.portalIconWrapper,
                      isActive && styles.portalIconWrapperActive,
                    ]}
                  >
                    <IconComp
                      size={18}
                      color={isActive ? '#FFFFFF' : '#0F766E'}
                      strokeWidth={2.2}
                    />
                  </View>

                  <Text
                    style={[
                      styles.portalTitle,
                      isActive && styles.portalTitleActive,
                    ]}
                    numberOfLines={1}
                  >
                    {portal.title}
                  </Text>

                  {portal.badgeType === 'active' && (
                    <View style={styles.badgeActive}>
                      <Text style={styles.badgeTextActive}>{portal.badge}</Text>
                    </View>
                  )}

                  {portal.badgeType === 'popular' && (
                    <View style={styles.badgePopular}>
                      <Text style={styles.badgeTextPopular}>{portal.badge}</Text>
                    </View>
                  )}

                  {portal.badgeType === 'neutral' && (
                    <Text style={styles.badgeTextNeutral}>{portal.badge}</Text>
                  )}

                  {portal.badgeType === 'currency' && (
                    <Text style={styles.badgeTextCurrency}>{portal.badge}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.divider} />

          {/* Drawer Footer (Logout + Version) */}
          <View style={styles.drawerFooter}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogOut size={16} color="#EF4444" strokeWidth={2.2} />
              <Text style={styles.logoutText}>Logout Account</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>v2.4.0 (2028)</Text>
          </View>
        </View>

        {/* Backdrop on Right - Dismiss on tap */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  backdrop: {
    flex: 1,
  },
  drawerContainer: {
    width: '84%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 22,
    paddingHorizontal: 18,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    fontFamily: fontFamilies.extraBold,
    color: '#FFFFFF',
    fontSize: fontSizes.size16,
    letterSpacing: 0.5,
  },
  onlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size15,
    color: '#0F172A',
    flexShrink: 1,
  },
  proBadge: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 6,
  },
  proText: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.size10,
    color: '#0F766E',
  },
  userEmail: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 2,
  },
  corporateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  checkIconWrapper: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  corporateText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#0F766E',
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  drawerBody: {
    flex: 1,
  },
  drawerBodyContent: {
    paddingVertical: 6,
  },
  sectionHeading: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.size11,
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  portalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  portalItemActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  portalIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  portalIconWrapperActive: {
    backgroundColor: '#0F766E',
  },
  portalTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    color: '#1E293B',
    flex: 1,
  },
  portalTitleActive: {
    fontFamily: fontFamilies.bold,
    color: '#0F766E',
  },
  badgeActive: {
    backgroundColor: '#0F766E',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  badgeTextActive: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
    fontSize: fontSizes.size11,
  },
  badgePopular: {
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeTextPopular: {
    fontFamily: fontFamilies.bold,
    color: '#059669',
    fontSize: fontSizes.size11,
  },
  badgeTextNeutral: {
    fontFamily: fontFamilies.medium,
    color: '#64748B',
    fontSize: fontSizes.size11,
  },
  badgeTextCurrency: {
    fontFamily: fontFamilies.bold,
    color: '#0F766E',
    fontSize: fontSizes.size12,
  },
  drawerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    color: '#EF4444',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: '#94A3B8',
  },
});
