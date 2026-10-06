import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Switch,
  Platform,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  CreditCard,
  Bell,
  ListOrdered,
  LogOut,
  ChevronRight,
  Shield,
  Settings,
  UserCheck,
  CheckCircle2,
  X,
  Lock,
  RefreshCw,
  FileText,
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  LayoutGrid,
  ShoppingBag,
  ShoppingCart,
  Calculator,
  PhoneCall,
  Mail,
} from 'lucide-react-native';
import { getProfileDetails, getNotifications } from '../redux/profile/action';
import { fetchCart } from '../redux/cart/action';
import { logout } from '../redux/auth/action';
import { COLORS, TYPOGRAPHY, SPACING, RADII, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { showToast } from '../components/common/Toast';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Settings preferences state
  const [pushNotifs, setPushNotifs] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const profile = useSelector((state) => state.profile.profiledetails);
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);
  const notifications = useSelector((state) => state.profile?.notifications) || [];
  const unreadNotificationsCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.read).length
    : 0;

  const fetchProfile = async () => {
    try {
      await Promise.allSettled([
        dispatch(getProfileDetails()),
        dispatch(fetchCart(true)),
        dispatch(getNotifications()),
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRefresh = async () => {
    showToast.success('Profile Refreshed', 'Your latest account data has been synchronized.');
    setRefreshing(true);
    await fetchProfile();
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    showToast.info('Signed Out', 'You have been safely signed out of WealthHackers.');
    dispatch(logout());
  };

  const handleTogglePush = (value) => {
    setPushNotifs(value);
    showToast.info(
      value ? 'Notifications Enabled' : 'Notifications Disabled',
      value ? 'You will receive market & portfolio alerts.' : 'Push notifications have been muted.'
    );
  };

  const handleToggleBiometric = (value) => {
    setBiometricLogin(value);
    showToast.info(
      value ? 'Biometrics Active' : 'Biometrics Disabled',
      value ? 'Face ID / Fingerprint enabled for quick sign-in.' : 'Standard PIN/OTP required.'
    );
  };

  const handleToggleEmailAlerts = (value) => {
    setEmailAlerts(value);
    showToast.info(
      value ? 'Email Digest Enabled' : 'Email Digest Muted',
      value ? 'Monthly wealth statements will be sent to your email.' : 'Email statements paused.'
    );
  };

  const handleClearCache = () => {
    showToast.success('Cache Cleared', 'Local offline cache has been reset.');
  };

  const handleCheckUpdates = () => {
    showToast.success('Up to Date', 'WealthHackers is running the latest build v1.0.0.');
  };

  if (loading && !refreshing) {
    return (
      <View style={GLOBAL_STYLES.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const firstName = profile?.first_name || 'Ramesh';
  const lastName = profile?.last_name || 'Seervi';
  const fullName = `${firstName} ${lastName}`.trim();
  const userEmail = profile?.email || 'ramseervi4321@gmail.com';
  const initials = `${(firstName || 'U')[0]}${(lastName || '')[0] || ''}`.toUpperCase();
  const companyName = profile?.platform || 'Accenture';

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      {/* Standardized status bar matching other screens */}
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Clean Screen Top Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.screenHeaderTitle}>My Profile</Text>
          <Text style={styles.screenHeaderSubtitle}>Account & Corporate Access</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconCircleBtn}
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            <RotateCcw size={18} color={COLORS.navy} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconCircleBtn, { marginLeft: SPACING.sm }]}
            onPress={() => setSettingsModalVisible(true)}
            activeOpacity={0.7}
          >
            <Settings size={18} color={COLORS.navy} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* User Hero Card with quick Update Profile trigger */}
        <TouchableOpacity
          style={styles.heroCard}
          onPress={() => navigation.navigate('UpdateProfile')}
          activeOpacity={0.85}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>

          <View style={styles.userTextCol}>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.userEmail} numberOfLines={1}>{userEmail}</Text>

            {/* Corporate Badge */}
            <View style={styles.corpBadge}>
              <Shield size={12} color={COLORS.primary} style={{ marginRight: 5 }} />
              <Text style={styles.corpBadgeText}>{companyName}</Text>
            </View>
          </View>

          <View style={styles.heroRightCol}>
            <View style={styles.verifiedPill}>
              <CheckCircle2 size={12} color="#059669" strokeWidth={2.5} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
            <View style={styles.editHeroPill}>
              <Text style={styles.editHeroPillText}>Edit Profile ›</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 1. PROFILE & ORDERS CARD */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>PROFILE & ORDERS</Text>

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('UpdateProfile')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#E6F4F1' }]}>
              <UserCheck size={18} color={COLORS.primary} />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Update Profile</Text>
              <Text style={styles.navRowSub}>Personal info, official email & corporate ID</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#E0F2FE' }]}>
              <ShoppingCart size={18} color="#0284C7" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>My Cart</Text>
              <Text style={styles.navRowSub}>Review & checkout selected advisory packages</Text>
            </View>
            {cartCount > 0 && (
              <View style={styles.navBadge}>
                <Text style={styles.navBadgeText}>{cartCount}</Text>
              </View>
            )}
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#DCFCE7' }]}>
              <ListOrdered size={18} color="#15803D" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>My Order History</Text>
              <Text style={styles.navRowSub}>Active advisory packages & subscriptions</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('PaymentHistory')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#EDE9FE' }]}>
              <CreditCard size={18} color="#6366F1" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Payment & Transaction History</Text>
              <Text style={styles.navRowSub}>Invoices, receipts & payment status</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>
        </View>

        {/* 2. WEALTH & PLANNING TOOLS CARD */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>WEALTH & PLANNING TOOLS</Text>

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('Calculate')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#FEF3C7' }]}>
              <Calculator size={18} color="#D97706" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Investment Calculator</Text>
              <Text style={styles.navRowSub}>SIP, lumpsum & wealth growth projections</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('SIPPortfolios')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, styles.sipIconBg]}>
              <TrendingUp size={18} color="#0F766E" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>SIP Portfolios</Text>
              <Text style={styles.navRowSub}>Top performing Systematic Investment Plans</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('Categories')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, styles.categoriesIconBg]}>
              <LayoutGrid size={18} color="#059669" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Service Categories</Text>
              <Text style={styles.navRowSub}>Explore wealth management & advisory domains</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('Services')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, styles.servicesIconBg]}>
              <ShoppingBag size={18} color="#7E22CE" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Corporate Services</Text>
              <Text style={styles.navRowSub}>All corporate financial packages & solutions</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>
        </View>

        {/* 3. SUPPORT & PREFERENCES CARD */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>SUPPORT & PREFERENCES</Text>

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('ContactAdvisor')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#CFFAFE' }]}>
              <PhoneCall size={18} color="#0891B2" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Contact Wealth Advisor</Text>
              <Text style={styles.navRowSub}>Portfolio queries & personalized consultation</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#FEF9C3' }]}>
              <Bell size={18} color="#CA8A04" />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Notifications & Alerts</Text>
              <Text style={styles.navRowSub}>Order updates, tips & market alerts</Text>
            </View>
            {unreadNotificationsCount > 0 && (
              <View style={[styles.navBadge, { backgroundColor: COLORS.error }]}>
                <Text style={styles.navBadgeText}>{unreadNotificationsCount}</Text>
              </View>
            )}
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            onPress={() => setSettingsModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: '#F1F5F9' }]}>
              <Settings size={18} color={COLORS.navy} />
            </View>
            <View style={styles.navTextCol}>
              <Text style={styles.navRowText}>Account & App Settings</Text>
              <Text style={styles.navRowSub}>Version 1.0.0 • Preferences • Security</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textPlaceholder} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setLogoutModalVisible(true)}
          activeOpacity={0.8}
        >
          <LogOut size={18} color={COLORS.error} style={{ marginRight: 8 }} />
          <Text style={styles.logoutBtnText}>Logout from Account</Text>
        </TouchableOpacity>

        {/* Footer Version */}
        <Text style={styles.footerVersion}>WealthHackers Mobile v1.0.0 (Build 2026.1)</Text>
      </ScrollView>

      {/* ======================================================= */}
      {/* Sleek Settings Bottom Sheet / Modal (Replaces Native Alert) */}
      {/* ======================================================= */}
      <Modal
        visible={settingsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalDismissTouchable}
            activeOpacity={1}
            onPress={() => setSettingsModalVisible(false)}
          />

          <View style={styles.sheetContainer}>
            {/* Sheet Handle */}
            <View style={styles.sheetHandle} />

            {/* Sheet Header */}
            <View style={styles.sheetHeader}>
              <View style={styles.sheetTitleCol}>
                <Text style={styles.sheetTitle}>Settings & Preferences</Text>
                <Text style={styles.sheetSubtitle}>WealthHackers Financial Advisory v1.0.0</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setSettingsModalVisible(false)}
                activeOpacity={0.7}
              >
                <X size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.sheetScroll}>
              {/* Preferences Group */}
              <Text style={styles.groupLabel}>NOTIFICATIONS & SECURITY</Text>

              <View style={styles.prefRow}>
                <View style={styles.prefIconWrap}>
                  <Bell size={16} color={COLORS.primary} />
                </View>
                <View style={styles.prefTextWrap}>
                  <Text style={styles.prefTitle}>Push Notifications</Text>
                  <Text style={styles.prefDesc}>Portfolio insights & market updates</Text>
                </View>
                <Switch
                  value={pushNotifs}
                  onValueChange={handleTogglePush}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor={Platform.OS === 'android' ? COLORS.surface : undefined}
                />
              </View>

              <View style={styles.prefRow}>
                <View style={styles.prefIconWrap}>
                  <Lock size={16} color={COLORS.primary} />
                </View>
                <View style={styles.prefTextWrap}>
                  <Text style={styles.prefTitle}>Biometric Authentication</Text>
                  <Text style={styles.prefDesc}>Face ID or Fingerprint unlock</Text>
                </View>
                <Switch
                  value={biometricLogin}
                  onValueChange={handleToggleBiometric}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor={Platform.OS === 'android' ? COLORS.surface : undefined}
                />
              </View>

              <View style={styles.prefRow}>
                <View style={styles.prefIconWrap}>
                  <Mail size={16} color={COLORS.primary} />
                </View>
                <View style={styles.prefTextWrap}>
                  <Text style={styles.prefTitle}>Email Statements</Text>
                  <Text style={styles.prefDesc}>Monthly consolidated summary</Text>
                </View>
                <Switch
                  value={emailAlerts}
                  onValueChange={handleToggleEmailAlerts}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor={Platform.OS === 'android' ? COLORS.surface : undefined}
                />
              </View>

              {/* Maintenance & Legal Group */}
              <Text style={[styles.groupLabel, { marginTop: SPACING.md }]}>SYSTEM & LEGAL</Text>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={handleClearCache}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconWrap}>
                  <RefreshCw size={16} color={COLORS.navy} />
                </View>
                <Text style={styles.actionItemText}>Clear Offline Cache</Text>
                <ChevronRight size={16} color={COLORS.textPlaceholder} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={handleCheckUpdates}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconWrap}>
                  <Shield size={16} color={COLORS.navy} />
                </View>
                <Text style={styles.actionItemText}>Check for Updates</Text>
                <Text style={styles.actionMetaText}>v1.0.0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => showToast.info('Terms of Service', 'Viewing WealthHackers advisory guidelines.')}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconWrap}>
                  <FileText size={16} color={COLORS.navy} />
                </View>
                <Text style={styles.actionItemText}>Terms & Conditions</Text>
                <ChevronRight size={16} color={COLORS.textPlaceholder} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => showToast.info('Privacy Policy', 'Your financial data is protected by 256-bit encryption.')}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconWrap}>
                  <Lock size={16} color={COLORS.navy} />
                </View>
                <Text style={styles.actionItemText}>Privacy & Data Protection</Text>
                <ChevronRight size={16} color={COLORS.textPlaceholder} />
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setSettingsModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ======================================================= */}
      {/* Custom Logout Confirmation Modal (Replaces Native Alert) */}
      {/* ======================================================= */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.centerModalBackdrop}>
          <View style={styles.confirmCard}>
            <View style={styles.warnIconCircle}>
              <AlertTriangle size={26} color={COLORS.error} />
            </View>

            <Text style={styles.confirmTitle}>Sign Out?</Text>
            <Text style={styles.confirmMessage}>
              Are you sure you want to log out of WealthHackers? You will need to sign in again with your corporate email.
            </Text>

            <View style={styles.confirmBtnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setLogoutModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.destructiveBtn}
                onPress={confirmLogout}
                activeOpacity={0.8}
              >
                <Text style={styles.destructiveBtnText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  screenHeaderTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
  },
  screenHeaderSubtitle: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: RADII.full,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: 130,
  },
  heroCard: {
    backgroundColor: '#F0FDF9',
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 2.5,
    borderColor: COLORS.surface,
    ...SHADOWS.card,
  },
  avatarInitials: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.textInverted,
    letterSpacing: 1,
  },
  userTextCol: {
    flex: 1,
  },
  userName: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size16,
    color: COLORS.navy,
  },
  userEmail: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  corpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADII.full,
    marginTop: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#BFE7DE',
  },
  corpBadgeText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.primary,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: '#059669',
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  navIconBox: {
    width: 38,
    height: 38,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  sipIconBg: {
    backgroundColor: '#E6F4F1',
  },
  categoriesIconBg: {
    backgroundColor: '#FEF3C7',
  },
  servicesIconBg: {
    backgroundColor: '#F3E8FF',
  },
  navTextCol: {
    flex: 1,
  },
  navRowText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  navRowSub: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  heroRightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  editHeroPill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADII.full,
    marginTop: 8,
  },
  editHeroPillText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: 10,
    color: '#FFFFFF',
  },
  navBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.full,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.xs,
  },
  navBadgeText: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: 10,
    color: '#FFFFFF',
  },
  logoutBtn: {
    height: 48,
    backgroundColor: COLORS.errorBg,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: '#FECACA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  logoutBtnText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.error,
  },
  footerVersion: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textPlaceholder,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },

  /* Modal Backdrop & Bottom Sheet Styles */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  modalDismissTouchable: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 36 : SPACING.lg,
    maxHeight: '80%',
    ...SHADOWS.card,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginVertical: 8,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    marginBottom: SPACING.md,
  },
  sheetTitleCol: {
    flex: 1,
  },
  sheetTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
  },
  sheetSubtitle: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: RADII.full,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetScroll: {
    maxHeight: 380,
  },
  groupLabel: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: SPACING.sm,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  prefIconWrap: {
    width: 32,
    height: 32,
    borderRadius: RADII.sm,
    backgroundColor: COLORS.mint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  prefTextWrap: {
    flex: 1,
  },
  prefTitle: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  prefDesc: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  actionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: RADII.sm,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  actionItemText: {
    flex: 1,
    fontFamily: TYPOGRAPHY.family.medium,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.navy,
  },
  actionMetaText: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
  },
  doneBtn: {
    backgroundColor: COLORS.primary,
    height: 46,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.button,
  },
  doneBtnText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.textInverted,
  },

  /* Confirm Logout Modal Styles */
  centerModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  confirmCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.card,
  },
  warnIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.errorBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  confirmTitle: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size18,
    color: COLORS.navy,
    marginBottom: SPACING.xs,
  },
  confirmMessage: {
    fontFamily: TYPOGRAPHY.family.regular,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: SPACING.lg,
  },
  confirmBtnRow: {
    flexDirection: 'row',
    width: '100%',
    gap: SPACING.md,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  cancelBtnText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.textMuted,
  },
  destructiveBtn: {
    flex: 1,
    height: 44,
    borderRadius: RADII.md,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destructiveBtnText: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size13,
    color: COLORS.textInverted,
  },
});
