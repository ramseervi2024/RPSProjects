import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  MapPin,
  Package,
  Bell,
  ShieldCheck,
  PhoneCall,
  LogOut,
  ChevronRight,
  Edit3,
  Plus,
  LogIn,
  Sparkles,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getProfileDetails, getOrderList } from '../redux/profile/action';
import { logout } from '../redux/auth/action';
import { showToast } from '../components/common/Toast';

import GuestAuthModal from '../components/common/GuestAuthModal';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const { isAuthenticated, user: authUser } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profiledetails);
  const orders = useSelector((state) => state.profile.orderlists) || [];

  const currentUser = useMemo(() => {
    const p = profile && typeof profile === 'object' ? profile : {};
    const a = authUser && typeof authUser === 'object' ? authUser : {};
    const addrs = (a.addresses && a.addresses.length > 0)
      ? a.addresses
      : (p.addresses && p.addresses.length > 0)
        ? p.addresses
        : [];
    return {
      ...p,
      ...a,
      addresses: addrs,
    };
  }, [authUser, profile]);
  const isUserLoggedIn = isAuthenticated && (!!currentUser?.email || !!currentUser?.name || !!currentUser?.phone);

  const displayName = currentUser?.name || (isUserLoggedIn ? 'Royal Patron' : 'Royal Guest Patron');
  const displayEmail = currentUser?.email || (isUserLoggedIn ? '' : 'Sign in to access your royal patronage');
  const displayPhone = currentUser?.phone || '';
  const addresses = currentUser?.addresses || [];

  const fetchProfile = async () => {
    try {
      if (isAuthenticated) {
        await Promise.allSettled([
          dispatch(getProfileDetails()),
          dispatch(getOrderList()),
        ]);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuthenticated]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    showToast.info('Signed Out', 'You have been safely signed out.');
    await dispatch(logout());
  };

  const isFocused = useIsFocused();

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
        <AppStatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />
        <GuestAuthModal 
          visible={isFocused} 
          onClose={() => navigation.navigate('Dashboard')} 
          message="Please sign in to access your Profile." 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <Text style={styles.headerTitle}>Royal Patron Profile</Text>
        {isUserLoggedIn && (
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateProfile')}
            style={styles.editBtn}
          >
            <Edit3 size={18} color="#831843" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#831843']}
          />
        }
      >
        {/* Profile Card Lockup */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>
              {(displayName[0] || (isUserLoggedIn ? 'R' : 'G')).toUpperCase()}
            </Text>
            {isUserLoggedIn && (
              <View style={styles.badgeCrown}>
                <Sparkles size={11} color="#78350F" />
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{displayName}</Text>
            {displayEmail ? (
              <Text style={styles.profileEmail}>{displayEmail}</Text>
            ) : null}
            {displayPhone ? (
              <Text style={styles.profilePhone}>📞 +91 {displayPhone}</Text>
            ) : null}

            <View style={styles.tierPill}>
              <ShieldCheck
                size={12}
                color={isUserLoggedIn ? '#059669' : '#B45309'}
              />
              <Text
                style={[
                  styles.tierText,
                  { color: isUserLoggedIn ? '#059669' : '#B45309' },
                ]}
              >
                {isUserLoggedIn ? 'Verified Royal Patron' : 'Guest Traveler'}
              </Text>
            </View>
          </View>
        </View>

        {/* If Guest: Sign In Call to Action */}
        {!isUserLoggedIn && (
          <View style={styles.guestCard}>
            <Text style={styles.guestCardTitle}>Sign In for Royal Privileges</Text>
            <Text style={styles.guestCardSub}>
              Save your delivery addresses, track live courier shipments, and view official tax invoices.
            </Text>
            <TouchableOpacity
              style={styles.guestLoginBtn}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.88}
            >
              <LogIn size={16} color="#FFFFFF" />
              <Text style={styles.guestLoginBtnText}>Sign In / Create Account</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Saved Addresses Section (Only if Logged In) */}
        {isUserLoggedIn && (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.manageLink}>+ Add New</Text>
              </TouchableOpacity>
            </View>

            {addresses.length === 0 ? (
              <View style={styles.emptyAddrBox}>
                <MapPin size={22} color="#94A3B8" />
                <Text style={styles.emptyAddrText}>
                  No saved addresses found. Add an address during checkout.
                </Text>
              </View>
            ) : (
              addresses.map((addr, idx) => (
                <View key={addr.id || idx} style={styles.addressCard}>
                  <View style={styles.addrIconWrap}>
                    <MapPin size={18} color="#831843" />
                  </View>
                  <View style={styles.addrTextWrap}>
                    <View style={styles.addrLabelRow}>
                      <Text style={styles.addrLabel}>
                        {addr.label || `Address ${idx + 1}`}
                      </Text>
                      {addr.default && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.addrDetails}>
                      {addr.street}, {addr.city} - {addr.zip}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* Quick Menu Links */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>MY ORDERS & ACTIVITY</Text>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconWrap}>
              <Package size={18} color="#831843" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>My Orders & Shipments</Text>
              <Text style={styles.menuSub}>
                {orders.length > 0
                  ? `${orders.length} orders recorded`
                  : 'Track live courier & tax invoices'}
              </Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconWrap}>
              <Bell size={18} color="#831843" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Notifications & Royal Alerts</Text>
              <Text style={styles.menuSub}>
                Exclusive discounts & festive launches
              </Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {/* Trust & Concierge */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>HERITAGE & ASSISTANCE</Text>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() =>
              showToast.info(
                'Royal Guarantee',
                'All artifacts come with 100% authentic GI certification from Rajasthan artisans.'
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.menuIconWrap}>
              <ShieldCheck size={18} color="#059669" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Authenticity & GI Tag Guarantee</Text>
              <Text style={styles.menuSub}>
                Directly supporting artisan families
              </Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() =>
              showToast.info(
                'Royal Concierge',
                'Support available 7 days a week: concierge@marwari.heritage'
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.menuIconWrap}>
              <PhoneCall size={18} color="#831843" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Royal Concierge Support</Text>
              <Text style={styles.menuSub}>
                Toll-Free WhatsApp & Email assistance
              </Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {/* Dynamic Action: Sign Out if logged in, or Sign In if guest */}
        {isUserLoggedIn ? (
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setLogoutModalVisible(true)}
            activeOpacity={0.8}
          >
            <LogOut size={18} color="#DC2626" />
            <Text style={styles.logoutText}>Sign Out of Mārwāri</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginCtaBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <LogIn size={18} color="#FFFFFF" />
            <Text style={styles.loginCtaBtnText}>Sign In to Account</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sign Out of Mārwāri?</Text>
            <Text style={styles.modalSubtitle}>
              You will need to sign in again to view your orders and saved delivery addresses.
            </Text>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={confirmLogout}
              >
                <Text style={styles.modalConfirmText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  editBtn: {
    padding: 6,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#831843',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#FEF08A',
    fontSize: 24,
    fontWeight: '800',
  },
  badgeCrown: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FEF08A',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  profileEmail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  profilePhone: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
    marginTop: 6,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '700',
  },
  guestCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    gap: 8,
  },
  guestCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#78350F',
  },
  guestCardSub: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
  guestLoginBtn: {
    backgroundColor: '#077B9F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    marginTop: 4,
  },
  guestLoginBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  manageLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#831843',
  },
  emptyAddrBox: {
    alignItems: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  emptyAddrText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  addrIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addrTextWrap: {
    flex: 1,
  },
  addrLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addrLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  defaultBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#78350F',
  },
  addrDetails: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 12,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 14,
  },
  loginCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#077B9F',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  loginCtaBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  modalConfirmBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
