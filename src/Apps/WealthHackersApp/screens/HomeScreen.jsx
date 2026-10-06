import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Image,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  TrendingUp,
  ShoppingBag,
  ListOrdered,
  Bell,
  PieChart,
  Star,
  ChevronRight,
  PhoneCall,
  Mail,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../constants/fonts';
import {
  getDashboard,
  getProfileDetails,
  getNotifications,
  getSipLists,
  getCategoryList,
  getServiceList,
} from '../redux/profile/action';
import { fetchCart } from '../redux/cart/action';
import { COLORS, TYPOGRAPHY, SPACING, RADII, GLOBAL_STYLES } from '../theme/theme';
import SideDrawer from '../components/SideDrawer';
import { showToast } from '../components/common/Toast';
import { getCategoryTheme, getCategoryImageUrl, getServiceImageUrl, getSipImageUrl } from '../utils/mediaUtils';
import ReanimatedUniversalCarousel from '../components/common/ReanimatedUniversalCarousel';

const DEFAULT_SERVICES = [
  {
    id: 101,
    name: 'Review of Existing Life Insurance & ULIPs',
    price: '₹0.00',
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  },
  {
    id: 102,
    name: 'Review of Existing Health Insurance',
    price: '₹5,000.00',
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  },
  {
    id: 103,
    name: 'Review of Existing Mutual Funds',
    price: '₹5,000.00',
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
  },
  {
    id: 104,
    name: 'Life / Health Insurance Planning',
    price: '₹5,000.00',
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  },
  {
    id: 105,
    name: 'Child Education & Marriage Planning',
    price: '₹5,000.00',
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  },
  {
    id: 106,
    name: 'Tax Planning & Advisory',
    price: '₹5,000.00',
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
  },
  {
    id: 107,
    name: 'Comprehensive Retirement Planning',
    price: '₹5,000.00',
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width: screenWidth } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeModalSip, setActiveModalSip] = useState(null);

  const dashboard = useSelector((state) => state.profile.dashboard);
  const profile = useSelector((state) => state.profile.profiledetails);
  const cartItems = useSelector((state) => state.cart.items);
  const notifications = useSelector((state) => state.profile.notifications);
  const rawSips = useSelector((state) => state.profile.siplists);
  const rawCategories = useSelector((state) => state.profile.categories);
  const rawServices = useSelector((state) => state.profile.servicelists);

  const categories = Array.isArray(rawCategories)
    ? rawCategories
    : (Array.isArray(rawCategories?.data) ? rawCategories.data : []);

  const sipsList = Array.isArray(rawSips)
    ? rawSips
    : (Array.isArray(rawSips?.data) ? rawSips.data : (Array.isArray(rawSips?.response) ? rawSips.response : []));

  const servicesList = useMemo(() => {
    let list = [];
    if (Array.isArray(rawServices) && rawServices.length > 0) list = rawServices;
    else if (Array.isArray(rawServices?.data) && rawServices.data.length > 0) list = rawServices.data;
    else if (Array.isArray(rawServices?.response) && rawServices.response.length > 0) list = rawServices.response;

    if (list.length === 0) {
      return DEFAULT_SERVICES;
    }
    return list;
  }, [rawServices]);


  const loadData = useCallback(() => {
    return Promise.all([
      dispatch(getDashboard()),
      dispatch(getProfileDetails()),
      dispatch(fetchCart()),
      dispatch(getNotifications()),
      dispatch(getSipLists()),
      dispatch(getCategoryList()),
      dispatch(getServiceList()),
    ]);
  }, [dispatch]);

  useEffect(() => {
    loadData().finally(() => setLoading(false));
  }, [loadData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData();
    } finally {
      setRefreshing(false);
    }
  };

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.read).length
    : 0;

  const totalCartCount = (cartItems || []).reduce(
    (acc, item) => acc + (parseInt(item.qty || 1, 10)),
    0
  );

  const totalOrders = dashboard?.total_orders != null ? dashboard.total_orders : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };


  const userInitial = (profile?.first_name || 'R')[0].toUpperCase();

  const renderCategoryCarouselItem = useCallback(
    ({ item: cat, index: idx }) => {
      const catImg = getCategoryImageUrl(cat, idx);
      const theme = getCategoryTheme(idx);
      const title = cat.title || cat.name || 'Category';

      return (
        <TouchableOpacity
          key={`carousel-cat-${cat.id || idx}`}
          style={styles.catCard}
          onPress={() => navigation.navigate('Services', { selectedCategory: title })}
          activeOpacity={0.88}
        >
          <View style={styles.catCardBanner}>
            {catImg ? (
              <Image
                source={{ uri: catImg }}
                style={styles.reanimatedImg}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.categoryFallback, { backgroundColor: theme.bg }]}>
                <ShoppingBag size={24} color={theme.text} />
              </View>
            )}
          </View>

          <View style={styles.catCardBody}>
            <Text style={styles.catCardTitle} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.catCardActionRow}>
              <Text style={styles.catCardActionText}>Explore</Text>
              <ArrowRight size={11} color="#0F766E" strokeWidth={2.4} />
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation]
  );

  const renderServiceCarouselItem = useCallback(
    ({ item: srv, index: idx }) => {
      const srvImg = getServiceImageUrl(srv, idx);
      const theme = getCategoryTheme(idx + 1);
      const title = srv.name || srv.title || 'Corporate Service';
      const rawPrice = srv.price || srv.amount || srv.fee;
      const priceText = rawPrice
        ? String(rawPrice).startsWith('₹')
          ? rawPrice
          : `₹${rawPrice}`
        : null;

      return (
        <TouchableOpacity
          key={`carousel-srv-${srv.id || idx}`}
          style={styles.srvCard}
          onPress={() => navigation.navigate('Services')}
          activeOpacity={0.88}
        >
          <View style={styles.srvCardBanner}>
            {srvImg ? (
              <Image
                source={{ uri: srvImg }}
                style={styles.reanimatedImg}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.categoryFallback, { backgroundColor: theme.bg }]}>
                <ShoppingBag size={32} color={theme.text} />
              </View>
            )}
          </View>

          <View style={styles.srvCardBody}>
            <Text style={styles.srvCardTitle} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.srvCardFooter}>
              {priceText && priceText !== '₹0.00' && priceText !== '₹0' ? (
                <Text style={styles.srvCardPrice}>{priceText}</Text>
              ) : (
                <Text style={styles.srvCardIncluded}>Included in Plan</Text>
              )}
              <View style={styles.viewServicesRow}>
                <Text style={styles.viewServicesRowText}>View →</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation]
  );


  const renderSipCarouselItem = useCallback(
    ({ item, index: idx }) => {
      const rating = item.rating_label;
      const sipImg = getSipImageUrl(item, idx);
      const theme = getCategoryTheme(idx);
      const cagr3y = item.three_year_cagr ? `${item.three_year_cagr}%` : null;

      return (
        <TouchableOpacity
          key={`carousel-sip-${item.id || idx}`}
          style={styles.sipCard}
          onPress={() => setActiveModalSip(item)}
          activeOpacity={0.88}
        >
          <View style={styles.sipCardMedia}>
            {sipImg ? (
              <Image
                source={{ uri: sipImg }}
                style={styles.reanimatedImg}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.homeSipFallback, { backgroundColor: theme.bg }]}>
                <TrendingUp size={32} color={theme.text} />
              </View>
            )}

            <View style={styles.homeSipBadgesRow}>
              {item.category ? (
                <View style={styles.homeSipCatBadge}>
                  <Text style={styles.homeSipCatText}>{item.category}</Text>
                </View>
              ) : null}
              {rating ? (
                <View style={styles.homeSipRatingBadge}>
                  <Star size={10} color="#D97706" fill="#D97706" style={styles.starMargin} />
                  <Text style={styles.homeSipRatingText}>{rating}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.sipCardBody}>
            <Text style={styles.sipCardTitle} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.sipCardFooter}>
              {cagr3y ? (
                <View style={styles.sipCagrChip}>
                  <TrendingUp size={11} color="#059669" strokeWidth={2} />
                  <Text style={styles.sipCagrChipText}>3Y: +{cagr3y}</Text>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.sipCardInvestBtn}
                onPress={() => setActiveModalSip(item)}
                activeOpacity={0.85}
              >
                <Text style={styles.sipCardInvestBtnText}>Invest Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    []
  );

  if (loading) {
    return (
      <View style={GLOBAL_STYLES.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (


    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Screen Top Bar matching Mockup Screen 1 */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.brandLockup}
          onPress={() => setDrawerOpen(true)}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <View style={styles.brandTextCol}>
            <Text style={styles.brandName}>WealthHackers</Text>
            <Text style={styles.brandTagline}>Plan • Invest • Grow</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <Bell size={20} color={COLORS.textPrimary} strokeWidth={2} />
            {unreadCount > 0 && <View style={styles.badgeDot} />}
          </TouchableOpacity>

          {totalCartCount > 0 && (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate('Cart')}
              activeOpacity={0.7}
            >
              <ShoppingBag size={20} color="#0F766E" strokeWidth={2} />
              <View style={styles.cartBadgeSmall}>
                <Text style={styles.cartBadgeTextSmall}>{totalCartCount}</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <View style={styles.avatarCircleSmall}>
              <Text style={styles.avatarInitialSmall}>{userInitial}</Text>
            </View>
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
        {/* Welcome Greeting matching Web Portal */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>
            {getGreeting()}, {profile?.first_name || profile?.name || 'User'}
          </Text>
          <Text style={styles.greetingSubtitle}>
            Your financial health is looking Stable. Access your corporate wealth benefits below.
          </Text>
        </View>

        {/* Hero Card: Recommended Action / Plan Today • Secure Tomorrow */}
        <View style={styles.heroCardModern}>
          <View style={styles.heroLeftCol}>
            <View style={styles.heroPillBadge}>
              <ShieldCheck size={12} color="#A7F3D0" strokeWidth={2.4} />
              <Text style={styles.heroPillText}>RECOMMENDED ACTION</Text>
            </View>

            <Text style={styles.heroMainTitle}>
              Plan Today  •  Secure Tomorrow
            </Text>

            <Text style={styles.heroSubtitle}>
              To maintain financial stability and achieve your long-term goals, explore certified corporate advisory plans.
            </Text>

            <TouchableOpacity
              style={styles.heroActionBtn}
              onPress={() => navigation.navigate('Services')}
              activeOpacity={0.88}
            >
              <Text style={styles.heroActionBtnText}>View Plans</Text>
              <ArrowRight size={13} color="#064E3B" strokeWidth={2.4} />
            </TouchableOpacity>
          </View>

          {/* Right Graphic: Stylized Organic Sprout Graphic */}
          <View style={styles.heroRightGraphic}>
            <View style={styles.sproutGlowCircle}>
              <View style={styles.sproutLeafLeft} />
              <View style={styles.sproutLeafRight} />
              <View style={styles.sproutStem} />
            </View>
          </View>
        </View>

        {/* 2-Column Corporate Stats matching Web Dashboard */}
        <View style={styles.statsRowTwo}>
          {/* Financial Health Score Card */}
          <View style={styles.statCardWeb}>
            <View style={styles.statCardTopRow}>
              <View style={styles.healthScoreRing}>
                <Text style={styles.healthScoreValue}>78</Text>
              </View>
              <View style={styles.statCardHeaderCol}>
                <Text style={styles.statCardLabel}>FINANCIAL HEALTH</Text>
                <Text style={styles.statCardValue}>Good</Text>
              </View>
            </View>
            <View style={styles.statCardFooterRow}>
              <TrendingUp size={12} color="#059669" strokeWidth={2.2} />
              <Text style={styles.statCardFooterText}>▲ Stable Status</Text>
            </View>
          </View>

          {/* Total Corporate Orders Card */}
          <TouchableOpacity
            style={styles.statCardWeb}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.8}
          >
            <View style={styles.statCardTopRow}>
              <View style={styles.ordersIconBox}>
                <ShoppingBag size={20} color="#0F766E" strokeWidth={2.2} />
              </View>
              <View style={styles.statCardHeaderCol}>
                <Text style={styles.statCardLabel}>CORPORATE ORDERS</Text>
                <Text style={styles.statCardValue}>{totalOrders} {totalOrders === 1 ? 'Order' : 'Orders'}</Text>
              </View>
            </View>
            <View style={styles.statCardFooterRow}>
              <CheckCircle2 size={12} color="#0F766E" strokeWidth={2.2} />
              <Text style={styles.statCardActiveText}>Active Member →</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions Header */}
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.sectionHeading}>Quick Actions</Text>
        </View>

        {/* 4 Square Quick Actions Grid matching Mockup */}
        <View style={styles.quickActionsGrid}>
          {/* SIP */}
          <TouchableOpacity
            style={styles.actionSquare}
            onPress={() => navigation.navigate('Calculate', { calcTab: 'sip' })}
            activeOpacity={0.75}
          >
            <View style={[styles.actionSquareIconBg, { backgroundColor: '#E6F4F1' }]}>
              <TrendingUp size={22} color="#0F766E" strokeWidth={2.2} />
            </View>
            <Text style={styles.actionSquareTitle}>SIP</Text>
            <Text style={styles.actionSquareSub}>Start SIP</Text>
          </TouchableOpacity>

          {/* Lumpsum */}
          <TouchableOpacity
            style={styles.actionSquare}
            onPress={() => navigation.navigate('Calculate', { calcTab: 'lump' })}
            activeOpacity={0.75}
          >
            <View style={[styles.actionSquareIconBg, { backgroundColor: '#FEF3C7' }]}>
              <ShoppingBag size={22} color="#D97706" strokeWidth={2.2} />
            </View>
            <Text style={styles.actionSquareTitle}>Lumpsum</Text>
            <Text style={styles.actionSquareSub}>Invest Once</Text>
          </TouchableOpacity>

          {/* Portfolio */}
          <TouchableOpacity
            style={styles.actionSquare}
            onPress={() => navigation.navigate('SIPPortfolios')}
            activeOpacity={0.75}
          >
            <View style={[styles.actionSquareIconBg, { backgroundColor: '#E0F2FE' }]}>
              <PieChart size={22} color="#0284C7" strokeWidth={2.2} />
            </View>
            <Text style={styles.actionSquareTitle}>Portfolio</Text>
            <Text style={styles.actionSquareSub}>View Portfolio</Text>
          </TouchableOpacity>

          {/* Plans */}
          <TouchableOpacity
            style={styles.actionSquare}
            onPress={() => navigation.navigate('Services')}
            activeOpacity={0.75}
          >
            <View style={[styles.actionSquareIconBg, { backgroundColor: '#F3E8FF' }]}>
              <ListOrdered size={22} color="#7C3AED" strokeWidth={2.2} />
            </View>
            <Text style={styles.actionSquareTitle}>Plans</Text>
            <Text style={styles.actionSquareSub}>Explore Plans</Text>
          </TouchableOpacity>
        </View>

        {/* Service Categories Section */}
        {categories.length > 0 && (
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleRowLeft}>
                <View style={styles.greenAccentBar} />
                <Text style={styles.sectionTitle}>Service Categories</Text>
              </View>
              <TouchableOpacity
                style={styles.viewAllPillBtn}
                onPress={() => navigation.navigate('Categories')}
                activeOpacity={0.8}
              >
                <Text style={styles.viewAllPillBtnText}>View All Categories</Text>
                <ArrowRight size={13} color="#0F766E" strokeWidth={2.2} />
              </TouchableOpacity>
            </View>

            <ReanimatedUniversalCarousel
              data={categories}
              height={180}
              itemWidth={Math.round(screenWidth * 0.62)}
              autoplayInterval={2800}
              renderItem={renderCategoryCarouselItem}
            />
          </View>
        )}

        {/* Corporate Services Section */}
        {servicesList.length > 0 && (
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleRowLeft}>
                <View style={styles.greenAccentBar} />
                <Text style={styles.sectionTitle}>Corporate Services</Text>
              </View>
              <TouchableOpacity
                style={styles.viewAllPillBtn}
                onPress={() => navigation.navigate('Services')}
                activeOpacity={0.8}
              >
                <Text style={styles.viewAllPillBtnText}>View All Services</Text>
                <ArrowRight size={13} color="#0F766E" strokeWidth={2.2} />
              </TouchableOpacity>
            </View>

            <ReanimatedUniversalCarousel
              data={servicesList}
              height={240}
              itemWidth={Math.round(screenWidth * 0.72)}
              autoplayInterval={3400}
              autoplayDirection="backward"
              renderItem={renderServiceCarouselItem}
            />
          </View>
        )}

        {/* Financial Freedom Mountain Summit Banner matching Mockup */}
        <View style={styles.freedomBanner}>
          <View style={styles.freedomBannerContent}>
            <Text style={styles.freedomBannerTitle}>
              Your financial freedom{'\n'}is just a step away.
            </Text>
            <TouchableOpacity
              style={styles.freedomBannerBtn}
              onPress={() => navigation.navigate('Services')}
              activeOpacity={0.85}
            >
              <Text style={styles.freedomBannerBtnText}>Explore Plans</Text>
              <ChevronRight size={14} color="#0F766E" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          <View style={styles.freedomMountainVisual}>
            <View style={styles.mountainPeak1} />
            <View style={styles.mountainPeak2} />
            <View style={styles.mountainFlagPole}>
              <View style={styles.mountainFlagTop} />
            </View>
          </View>
        </View>

        {/* SIP Portfolios */}
        {sipsList.length > 0 && (
          <View style={styles.sipSection}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleRowLeft}>
                <View style={styles.greenAccentBar} />
                <Text style={styles.sectionTitle}>SIP Portfolios</Text>
              </View>
              <TouchableOpacity
                style={styles.viewAllPillBtn}
                onPress={() => navigation.navigate('SIPPortfolios')}
                activeOpacity={0.8}
              >
                <Text style={styles.viewAllPillBtnText}>View All SIPs</Text>
                <ChevronRight size={14} color="#0F766E" strokeWidth={2.2} />
              </TouchableOpacity>
            </View>

            <ReanimatedUniversalCarousel
              data={sipsList}
              height={210}
              itemWidth={Math.round(screenWidth * 0.84)}
              autoplayInterval={3800}
              renderItem={renderSipCarouselItem}
            />
          </View>
        )}
      </ScrollView>


      {/* Advisor Contact Modal */}
      <Modal
        visible={!!activeModalSip}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModalSip(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIconBg}>
                <TrendingUp size={24} color={COLORS.primary} />
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setActiveModalSip(null)}
                activeOpacity={0.7}
              >
                <X size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Invest in {activeModalSip?.name}</Text>
            <Text style={styles.modalSub}>
              To initiate your automated monthly SIP or customize portfolio allocation, connect directly
              with your dedicated Corporate Wealth Advisor.
            </Text>

            <View style={styles.advisorInfoBox}>
              <View style={styles.advisorRow}>
                <PhoneCall size={16} color={COLORS.primary} />
                <Text style={styles.advisorText}>Corporate Desk: +91 80 4718 9000</Text>
              </View>
              <View style={[styles.advisorRow, styles.advisorRowMargin]}>
                <Mail size={16} color={COLORS.primary} />
                <Text style={styles.advisorText}>advisors@wealthhackers.in</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[GLOBAL_STYLES.primaryBtn, styles.modalActionBtn]}
              onPress={() => {
                const sipName = activeModalSip?.name;
                setActiveModalSip(null);
                showToast.success(
                  'Advisor Request Received',
                  `A dedicated wealth advisor has been notified for ${sipName}. Portfolio details will be shared on your email.`
                );
              }}
              activeOpacity={0.85}
            >
              <Text style={GLOBAL_STYLES.primaryBtnText}>Request Advisor Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSimulateBtn}
              onPress={() => {
                const s = activeModalSip;
                setActiveModalSip(null);
                navigation.navigate('Calculate', {
                  prefillRate: parseFloat(s?.one_year_return) || 12,
                  sipName: s?.name,
                });
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.modalSimulateText}>Simulate Growth in SIP Calculator</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Side Navigation Drawer per Official Spec */}
      <SideDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navigation={navigation}
        activeRoute="Dashboard"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  brandLockup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size15,
    color: '#0F172A',
    lineHeight: 19,
  },
  brandTagline: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size9,
    color: '#64748B',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  cartBadgeSmall: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeTextSmall: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size9,
    color: '#FFFFFF',
  },
  avatarBtn: {
    padding: 2,
  },
  avatarCircleSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitialSmall: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  greetingSection: {
    marginBottom: 14,
  },
  greetingTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size18,
    color: '#0F172A',
    letterSpacing: -0.3,
    lineHeight: 23,
  },
  greetingSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
  // Hero Card Modern (Recommended Action / Plan Today • Secure Tomorrow)
  heroCardModern: {
    backgroundColor: '#064E3B',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#064E3B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
    overflow: 'hidden',
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 12,
  },
  heroPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  heroPillText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size9,
    color: '#A7F3D0',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  heroMainTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size16,
    color: '#FFFFFF',
    letterSpacing: -0.3,
    lineHeight: 22,
    marginBottom: 5,
  },
  heroSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size11,
    color: '#CCFBF1',
    lineHeight: 16,
    marginBottom: 12,
  },
  heroActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  heroActionBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#064E3B',
    marginRight: 5,
  },
  heroRightGraphic: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sproutGlowCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  sproutLeafLeft: {
    position: 'absolute',
    top: 14,
    left: 20,
    width: 22,
    height: 16,
    backgroundColor: '#34D399',
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    transform: [{ rotate: '-35deg' }],
  },
  sproutLeafRight: {
    position: 'absolute',
    top: 8,
    right: 20,
    width: 26,
    height: 18,
    backgroundColor: '#10B981',
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    transform: [{ rotate: '35deg' }],
  },
  sproutStem: {
    width: 4,
    height: 32,
    backgroundColor: '#059669',
    borderRadius: 2,
    marginTop: 10,
  },
  // 2-Column Corporate Stats matching Web Dashboard
  statsRowTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCardWeb: {
    flex: 0.485,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: 'space-between',
    minHeight: 90,
  },
  statCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthScoreRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  healthScoreValue: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F766E',
  },
  ordersIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statCardHeaderCol: {
    flex: 1,
  },
  statCardLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size9,
    color: '#64748B',
    letterSpacing: 0.3,
  },
  statCardValue: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
    marginTop: 1,
  },
  statCardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCardFooterText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size10,
    color: '#059669',
    marginLeft: 4,
  },
  statCardActiveText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size10,
    color: '#0F766E',
    marginLeft: 4,
  },
  // Section Headers
  sectionHeaderWrap: {
    marginBottom: 10,
  },
  sectionHeading: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size16,
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  // Quick Actions 4 Grid
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  actionSquare: {
    flex: 0.225,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  actionSquareIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionSquareTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size11,
    color: '#0F172A',
    textAlign: 'center',
  },
  actionSquareSub: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size8,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
  },
  // Freedom Mountain Banner
  freedomBanner: {
    backgroundColor: '#0F766E',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  freedomBannerContent: {
    flex: 1,
    zIndex: 2,
  },
  freedomBannerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 10,
  },
  freedomBannerBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  freedomBannerBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size11,
    color: '#0F766E',
    marginRight: 4,
  },
  freedomMountainVisual: {
    width: 80,
    height: 60,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mountainPeak1: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    width: 50,
    height: 45,
    backgroundColor: '#115E59',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  mountainPeak2: {
    position: 'absolute',
    bottom: 0,
    left: 4,
    width: 44,
    height: 35,
    backgroundColor: '#14B8A6',
    opacity: 0.6,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  mountainFlagPole: {
    position: 'absolute',
    top: 2,
    right: 28,
    width: 2,
    height: 14,
    backgroundColor: '#FFFFFF',
  },
  mountainFlagTop: {
    position: 'absolute',
    top: 0,
    left: 2,
    width: 7,
    height: 5,
    backgroundColor: '#34D399',
  },
  sipSection: {
    marginBottom: 0,
    paddingTop: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitleCol: {
    flex: 1,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  viewAllBtnText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.family.bold,
    marginRight: 2,
  },
  sipCard: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sipCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sipIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  sipHeaderInfo: {
    flex: 1,
  },
  sipTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sipName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.xs,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADII.sm,
  },
  ratingText: {
    ...TYPOGRAPHY.caption,
    color: '#92400E',
    fontFamily: TYPOGRAPHY.family.bold,
    marginLeft: 3,
  },
  sipCategory: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sipMetricsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: RADII.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    marginTop: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sipMetricItem: {
    flex: 1,
    alignItems: 'center',
  },
  sipMetricDivider: {
    width: 1,
    height: 22,
    backgroundColor: COLORS.border,
  },
  sipMetricLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: TYPOGRAPHY.sizes.size10,
    color: COLORS.textMuted,
  },
  sipMetricVal: {
    fontFamily: TYPOGRAPHY.family.bold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.success,
    marginTop: 2,
  },
  sipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.xs,
  },
  sipSimulateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  sipSimulateText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textMuted,
    marginLeft: 4,
    fontFamily: TYPOGRAPHY.family.medium,
  },
  sipInvestBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADII.full,
  },
  sipInvestBtnText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textInverted,
    fontSize: TYPOGRAPHY.sizes.size13,
  },
  exploreMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  exploreMoreText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.family.bold,
    marginRight: 4,
  },
  exploreRemainingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  exploreRemainingText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.family.bold,
    marginRight: 4,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  actionIconBg: {
    width: 42,
    height: 42,
    borderRadius: RADII.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  actionIconCalculator: {
    backgroundColor: COLORS.primaryLight,
  },
  actionIconSip: {
    backgroundColor: COLORS.successBg,
  },
  actionIconServices: {
    backgroundColor: '#E0F2FE',
  },
  actionIconOrders: {
    backgroundColor: COLORS.successBg,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: TYPOGRAPHY.family.semiBold,
    fontSize: TYPOGRAPHY.sizes.size14,
    color: COLORS.textPrimary,
  },
  actionSub: {
    ...TYPOGRAPHY.bodySmall,
    fontSize: TYPOGRAPHY.sizes.size12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  modalIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  modalSub: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
    lineHeight: 20,
  },
  advisorInfoBox: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: RADII.sm,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  advisorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advisorRowMargin: {
    marginTop: SPACING.sm,
  },
  advisorText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.family.semiBold,
    marginLeft: SPACING.sm,
  },
  modalActionBtn: {
    marginTop: SPACING.lg,
  },
  modalSimulateBtn: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    marginTop: SPACING.xs,
  },
  modalSimulateText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.family.semiBold,
  },

  // Service Categories Section
  categoriesSection: {
    marginBottom: 0,
    paddingTop: 14,
  },
  categoriesCarousel: {
    paddingRight: 16,
    gap: 14,
  },
  viewAllPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#0F766E',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  viewAllPillBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#0F766E',
    marginRight: 4,
  },
  categoryCard: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 14,
  },
  categoryBannerWrap: {
    width: '100%',
    height: 125,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  categoryImg: {
    width: '100%',
    height: '100%',
  },
  categoryFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryOverlayGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
  },
  categoryCardBody: {
    padding: 14,
  },
  categoryTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
    marginBottom: 4,
    lineHeight: fontSizes.size14 * 1.3,
  },
  categoryDesc: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size11,
    color: '#64748B',
    lineHeight: fontSizes.size11 * 1.35,
    marginBottom: 12,
    minHeight: 30,
  },
  viewServicesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  viewServicesRowText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
    marginRight: 4,
  },
  categoryFooterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  categoryFooterText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
    marginRight: 2,
  },

  // Upgraded SIP Card on Home
  homeSipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  homeSipMedia: {
    width: '100%',
    height: 150,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  homeSipImg: {
    width: '100%',
    height: '100%',
  },
  homeSipFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeSipFallbackText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    marginTop: 4,
  },
  homeSipBadgesRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeSipCatBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 16,
  },
  homeSipCatText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    color: '#0F172A',
  },
  homeSipRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  homeSipRatingText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    color: '#B45309',
  },
  homeSipBody: {
    padding: 14,
  },
  homeSipName: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size16,
    color: '#0F172A',
    lineHeight: fontSizes.size16 * 1.25,
  },
  homeSipHeading: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
    marginTop: 2,
    marginBottom: 4,
  },
  homeSipDesc: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    lineHeight: fontSizes.size12 * 1.4,
    marginBottom: 12,
  },
  homeSipMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 12,
  },
  homeSipMetricBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  homeSipMetricBoxHighlight: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  homeSipMetricLbl: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size9,
    color: '#64748B',
    marginBottom: 2,
  },
  homeSipMetricVal: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F766E',
  },
  homeSipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  homeSipSimulateBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeSipSimulateText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },
  homeSipInvestBtn: {
    flex: 1.2,
    backgroundColor: '#0F766E',
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
  },
  homeSipInvestBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#FFFFFF',
  },
  sectionTitleRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  greenAccentBar: {
    width: 3.5,
    height: 22,
    borderRadius: 2,
    backgroundColor: '#0F766E',
    marginRight: 8,
  },
  servicePriceHome: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F766E',
    marginBottom: 6,
  },
  viewServicesBtnHome: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // ── Category Carousel Card (compact square, 62% wide, height 180) ──────────
  catCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginHorizontal: 5,
  },
  catCardBanner: {
    width: '100%',
    height: 110,
    backgroundColor: '#F1F5F9',
  },
  catCardBody: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  catCardTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size12,
    color: '#0F172A',
    lineHeight: 16,
    marginBottom: 4,
  },
  catCardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  catCardActionText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#0F766E',
  },

  // ── Service Carousel Card (tall portrait, 72% wide, height 240) ────────────
  srvCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 5,
  },
  srvCardBanner: {
    width: '100%',
    height: 150,
    backgroundColor: '#F1F5F9',
  },
  srvCardBody: {
    padding: 14,
    flex: 1,
    justifyContent: 'space-between',
  },
  srvCardTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
    lineHeight: 19,
    marginBottom: 6,
  },
  srvCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  srvCardPrice: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F766E',
  },
  srvCardIncluded: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: '#0F766E',
  },

  // ── SIP Carousel Card (wide cinematic, 84% wide, height 210) ──────────────
  sipCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 5,
    marginHorizontal: 4,
  },
  sipCardMedia: {
    width: '100%',
    height: 135,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  sipCardBody: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  sipCardTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F172A',
    marginBottom: 6,
  },
  sipCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sipCagrChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  sipCagrChipText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#059669',
  },
  sipCardInvestBtn: {
    backgroundColor: '#0F766E',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  sipCardInvestBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#FFFFFF',
  },

  // ── Legacy shared styles (kept for fallback) ──────────────────────────────
  reanimatedCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 4,
  },
  reanimatedBannerWrap: {
    width: '100%',
    height: 115,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  reanimatedImg: {
    width: '100%',
    height: '100%',
  },
  reanimatedBody: {
    padding: 12,
  },
  reanimatedTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F172A',
    marginBottom: 4,
  },
  reanimatedActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  reanimatedFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  reanimatedPrice: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F766E',
  },
  reanimatedIncluded: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },
  reanimatedSipCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 4,
  },
  reanimatedSipMedia: {
    width: '100%',
    height: 115,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  sipCagrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sipCagrLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: '#64748B',
  },
  sipCagrVal: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size12,
    color: '#059669',
  },
  sipActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  reanimatedInvestBtn: {
    backgroundColor: '#0F766E',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reanimatedInvestBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#FFFFFF',
  },
  starMargin: {
    marginRight: 3,
  },
});
