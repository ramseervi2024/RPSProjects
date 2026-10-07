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
  ShoppingBag,
  Package,
  User,
  Heart,
  PhoneCall,
  LogOut,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../theme/theme';
import { logout } from '../redux/auth/action';

export default function SideDrawer({
  visible,
  onClose,
  navigation,
  activeRoute = 'Dashboard',
}) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const cartItems = useSelector((s) => s.cart?.items) || [];
  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);

  const customerName = user?.name || 'Royal Patron';
  const customerEmail = user?.email || (isAuthenticated ? 'patron@marwari.heritage' : 'Guest Traveler');

  const topPadding = insets.top > 0 ? insets.top + 16 : 40;
  const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

  const handleNavigate = (routeName, params) => {
    onClose();
    if (navigation) {
      navigation.navigate(routeName, params);
    }
  };

  const handleLogout = () => {
    onClose();
    dispatch(logout());
  };

  const MENU_ITEMS = [
    { id: 'Dashboard', label: 'Home Feed', icon: Home, route: 'Dashboard' },
    { id: 'Categories', label: 'All Collections (7)', icon: LayoutGrid, route: 'Categories' },
    { id: 'Cart', label: 'My Royal Bag', icon: ShoppingBag, route: 'Cart', badge: cartCount },
    { id: 'Orders', label: 'My Orders & Invoices', icon: Package, route: 'Orders' },
    { id: 'Profile', label: 'Royal Profile & Addresses', icon: User, route: 'Profile' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View
          style={[
            styles.drawerContent,
            { paddingTop: topPadding, paddingBottom: bottomPadding },
          ]}
        >
          {/* Header Profile Header */}
          <View style={styles.header}>
            <View style={styles.royalEmblem}>
              <Text style={styles.royalEmblemText}>
                {(customerName[0] || 'M').toUpperCase()}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName} numberOfLines={1}>
                {customerName}
              </Text>
              <Text style={styles.userEmail} numberOfLines={1}>
                {customerEmail}
              </Text>
              <View style={styles.verifiedBadge}>
                <ShieldCheck size={12} color="#059669" />
                <Text style={styles.verifiedText}>Verified Artisan Patron</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Menu Items */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuList}
          >
            <Text style={styles.sectionTitle}>ROYAL EXPLORER</Text>
            {MENU_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = activeRoute === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, isActive && styles.menuItemActive]}
                  onPress={() => handleNavigate(item.route)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.iconWrap,
                      isActive && styles.iconWrapActive,
                    ]}
                  >
                    <IconComp
                      size={20}
                      color={isActive ? '#831843' : '#64748B'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.menuLabel,
                      isActive && styles.menuLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.badge > 0 ? (
                    <View style={styles.badgeWrap}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  ) : (
                    <ChevronRight size={18} color="#CBD5E1" />
                  )}
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />

            {/* Heritage Features Banner */}
            <View style={styles.heritageCard}>
              <Text style={styles.heritageCardTitle}>MĀRWĀRI CRAFT PLEDGE</Text>
              <Text style={styles.heritageCardSubtitle}>
                Every piece is authentic, handcrafted by master artisans of
                Jodhpur, Jaipur & Udaipur.
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Auth CTA */}
          <View style={styles.footer}>
            {isAuthenticated ? (
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <LogOut size={18} color="#DC2626" />
                <Text style={styles.logoutText}>Sign Out</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => handleNavigate('Login')}
                activeOpacity={0.8}
              >
                <User size={18} color="#FFFFFF" />
                <Text style={styles.signInText}>Sign In / Register</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  drawerContent: {
    width: '82%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  royalEmblem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#831843',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  royalEmblemText: {
    color: '#FEF08A',
    fontSize: 20,
    fontWeight: '800',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  userEmail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  closeBtn: {
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  menuList: {
    paddingVertical: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: '#FDF2F8',
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconWrapActive: {
    backgroundColor: '#FCE7F3',
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  menuLabelActive: {
    color: '#831843',
    fontWeight: '700',
  },
  badgeWrap: {
    backgroundColor: '#831843',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heritageCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginTop: 12,
  },
  heritageCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heritageCardSubtitle: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 16,
  },
  footer: {
    paddingTop: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
    gap: 8,
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 14,
  },
  signInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#077B9F',
    gap: 8,
  },
  signInText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
