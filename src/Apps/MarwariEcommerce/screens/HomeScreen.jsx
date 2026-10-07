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
  TextInput,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  X,
  Star,
  Sparkles,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getHomeFeed, getProductsList } from '../redux/profile/action';
import { addToCart, fetchCart } from '../redux/cart/action';
import { COLORS, RADII, TYPOGRAPHY } from '../theme/theme';
import { showToast } from '../components/common/Toast';
import ProductCard from '../components/ProductCard';
import CategoryPill from '../components/CategoryPill';
import SideDrawer from '../components/SideDrawer';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState({});

  const homeFeed = useSelector((state) => state.profile.homeFeed);
  const rawProducts = useSelector((state) => state.profile.products);
  const products = useMemo(
    () => (Array.isArray(rawProducts) ? rawProducts : []),
    [rawProducts]
  );
  const cartItems = useSelector((state) => state.cart.items) || [];
  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);

  const loadData = useCallback(async () => {
    try {
      await Promise.allSettled([
        dispatch(getHomeFeed()),
        dispatch(getProductsList()),
        dispatch(fetchCart(true)),
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const banners = homeFeed?.banners || [
    {
      id: 'b-1',
      title: 'The Royal Heritage of Rajasthan',
      subtitle: 'Handcrafted by Master Artisans of Marwar',
      image:
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const categories = useMemo(() => {
    const list = homeFeed?.categories || [
      { id: 'cat-1', name: 'Royal Apparel', slug: 'Royal Apparel', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' },
      { id: 'cat-2', name: 'Handicrafts', slug: 'Handicrafts', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80' },
      { id: 'cat-3', name: 'Silver Jewellery', slug: 'Silver Jewellery', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80' },
      { id: 'cat-4', name: 'Marwari Mojari', slug: 'Marwari Mojari', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80' },
      { id: 'cat-5', name: 'Food & Spices', slug: 'Food & Spices', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80' },
      { id: 'cat-6', name: 'Home & Décor', slug: 'Home & Décor', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80' },
      { id: 'cat-7', name: 'Art & Collectibles', slug: 'Art & Collectibles', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80' },
    ];
    return list;
  }, [homeFeed]);

  const heritageCities = homeFeed?.heritage_cities || [
    {
      name: 'Jodhpur',
      specialty: 'Royal Bandhgala & Mojaris',
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Jaipur',
      specialty: 'Blue Pottery & Bandhani',
      image:
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Udaipur',
      specialty: 'Silver & Meenakari Art',
      image:
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Bikaner',
      specialty: 'Sweets, Spices & Bhujia',
      image:
        'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const featuredProducts = useMemo(() => {
    let list = homeFeed?.featured_products || products;
    if (selectedCategory !== 'All') {
      list = list.filter(
        (p) =>
          (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    return list;
  }, [homeFeed, products, selectedCategory]);

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = { ...prev, [productId]: !prev[productId] };
      if (next[productId]) {
        showToast.success('Saved to Wishlist', 'Added to your royal collection.');
      }
      return next;
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product, 1));
    showToast.success('Added to Bag', `${product.name} added to your royal bag.`);
  };

  const handleOpenProduct = (product) => {
    navigation.navigate('ProductDetails', { product, productId: product.id });
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return (products || []).filter(
      (p) =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* ─── Top Sticky Bar ──────────────────────────────────────────────── */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 10) }]}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setDrawerOpen(true)}
            activeOpacity={0.7}
          >
            <Menu size={22} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.brandTitleWrap}>
            <View style={styles.titleRow}>
              <Text style={styles.brandTitle}>MĀRWĀRI</Text>
              <View style={styles.royalCrownBadge}>
                <Sparkles size={11} color="#B45309" />
              </View>
            </View>
            <TouchableOpacity
              style={styles.locationSelector}
              onPress={() =>
                showToast.info('Location', 'Delivering to Jodhpur, Rajasthan (342001)')
              }
              activeOpacity={0.7}
            >
              <MapPin size={11} color="#831843" />
              <Text style={styles.locationText}>Jodhpur, 342001</Text>
              <ChevronDown size={10} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.topBarRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setSearchModalVisible(true)}
            activeOpacity={0.7}
          >
            <Search size={20} color="#0F172A" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() =>
              showToast.info(
                'Royal Wishlist',
                `${Object.values(wishlist).filter(Boolean).length} items saved`
              )
            }
            activeOpacity={0.7}
          >
            <Heart
              size={20}
              color="#0F172A"
              fill={
                Object.values(wishlist).some(Boolean)
                  ? '#DC2626'
                  : 'transparent'
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <ShoppingBag size={20} color="#831843" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Scrollable Content ─────────────────────────────────────────── */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#831843" />
          <Text style={styles.loadingText}>Fetching Royal Heritage...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#831843']}
            />
          }
          contentContainerStyle={styles.scrollContent}
        >
          {/* Section 1: Hero Carousel Banner */}
          <View style={styles.heroSection}>
            <View style={styles.heroBannerCard}>
              <Image
                source={{ uri: banners[0]?.image }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.heroOverlay}>
                <View style={styles.heroGoldBadge}>
                  <Text style={styles.heroGoldBadgeText}>
                    ROYAL RAJASTHAN COLLECTION
                  </Text>
                </View>
                <Text style={styles.heroHeadline}>
                  Handcrafted Elegance by Master Artisans
                </Text>
                <Text style={styles.heroSubtitle}>
                  Pure Silk Bandhani, Meenakari Silver & Authentic Mojaris
                </Text>
                <TouchableOpacity
                  style={styles.heroCtaBtn}
                  onPress={() => navigation.navigate('Categories')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.heroCtaText}>Explore Collection</Text>
                  <ArrowRight size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Section 2: Heritage Categories Scroll */}
          <View style={styles.sectionWrap}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Heritage Collections</Text>
                <Text style={styles.sectionSubtitle}>
                  Centuries of royal artistry & traditional craftsmanship
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Categories')}
              >
                <Text style={styles.seeAllText}>View All →</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              <TouchableOpacity
                style={[
                  styles.categoryPillAll,
                  selectedCategory === 'All' && styles.categoryPillAllActive,
                ]}
                onPress={() => setSelectedCategory('All')}
                activeOpacity={0.8}
              >
                <Sparkles
                  size={18}
                  color={selectedCategory === 'All' ? '#831843' : '#64748B'}
                />
                <Text
                  style={[
                    styles.categoryPillAllText,
                    selectedCategory === 'All' && styles.categoryPillAllTextActive,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>

              {categories.map((cat) => (
                <CategoryPill
                  key={cat.id || cat.name}
                  item={cat}
                  isSelected={selectedCategory === cat.name}
                  onPress={(item) => setSelectedCategory(item.name)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Section 3: Featured Treasures (2-Column Grid) */}
          <View style={styles.sectionWrap}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  {selectedCategory === 'All'
                    ? 'Featured Treasures'
                    : selectedCategory}
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Curated authentic masterpieces certified from Rajasthan
                </Text>
              </View>
            </View>

            <View style={styles.productGrid}>
              {featuredProducts.map((prod) => (
                <View key={prod.id} style={styles.productCol}>
                  <ProductCard
                    product={prod}
                    onPress={handleOpenProduct}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={!!wishlist[prod.id]}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Section 4: Royal Cities of Rajasthan */}
          <View style={styles.sectionWrap}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Royal Cities of Rajasthan</Text>
                <Text style={styles.sectionSubtitle}>
                  Each corner with its own timeless royal craft
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cityScroll}
            >
              {heritageCities.map((city, idx) => (
                <TouchableOpacity
                  key={city.name || idx}
                  style={styles.cityCard}
                  activeOpacity={0.85}
                  onPress={() => {
                    showToast.info('Royal City', `Browsing creations from ${city.name}`);
                  }}
                >
                  <Image
                    source={{ uri: city.image }}
                    style={styles.cityImage}
                    resizeMode="cover"
                  />
                  <View style={styles.cityOverlay}>
                    <Text style={styles.cityName}>{city.name}</Text>
                    <Text style={styles.citySpecialty}>{city.specialty}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Section 5: Artisan Trust Banner */}
          <View style={styles.trustBannerWrap}>
            <Text style={styles.trustBannerTitle}>
              THE ROYAL MĀRWĀRI PROMISE
            </Text>
            <View style={styles.trustGrid}>
              <View style={styles.trustItem}>
                <View style={styles.trustIconWrap}>
                  <ShieldCheck size={22} color="#831843" />
                </View>
                <Text style={styles.trustItemTitle}>100% Authentic</Text>
                <Text style={styles.trustItemDesc}>Certified heritage craft</Text>
              </View>

              <View style={styles.trustItem}>
                <View style={styles.trustIconWrap}>
                  <Truck size={22} color="#831843" />
                </View>
                <Text style={styles.trustItemTitle}>Pan-India Free</Text>
                <Text style={styles.trustItemDesc}>On orders over ₹999</Text>
              </View>

              <View style={styles.trustItem}>
                <View style={styles.trustIconWrap}>
                  <RotateCcw size={22} color="#831843" />
                </View>
                <Text style={styles.trustItemTitle}>7-Day Returns</Text>
                <Text style={styles.trustItemDesc}>Hassle-free replacement</Text>
              </View>

              <View style={styles.trustItem}>
                <View style={styles.trustIconWrap}>
                  <Lock size={22} color="#831843" />
                </View>
                <Text style={styles.trustItemTitle}>100% Secure</Text>
                <Text style={styles.trustItemDesc}>Razorpay & UPI payment</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* ─── Search Modal ──────────────────────────────────────────────── */}
      <Modal
        visible={searchModalVisible}
        animationType="slide"
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View
          style={[
            styles.searchModalContainer,
            { paddingTop: Math.max(insets.top, 14) },
          ]}
        >
          <View style={styles.searchHeader}>
            <View style={styles.searchInputWrap}>
              <Search size={18} color="#64748B" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Bandhani, Mojari, Kundan..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <X size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.closeSearchBtn}
              onPress={() => setSearchModalVisible(false)}
            >
              <Text style={styles.closeSearchText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.searchResultsContainer}
            showsVerticalScrollIndicator={false}
          >
            {searchQuery.trim().length === 0 ? (
              <View style={styles.searchPrompt}>
                <Sparkles size={32} color="#B45309" />
                <Text style={styles.searchPromptTitle}>
                  Explore Royal Creations
                </Text>
                <Text style={styles.searchPromptSub}>
                  Type a handicraft, city, or product name above to discover
                  treasures.
                </Text>
              </View>
            ) : searchResults.length === 0 ? (
              <View style={styles.searchPrompt}>
                <Text style={styles.searchPromptTitle}>No Results Found</Text>
                <Text style={styles.searchPromptSub}>
                  We could not find matching treasures for &quot;{searchQuery}&quot;.
                </Text>
              </View>
            ) : (
              <View style={styles.productGrid}>
                {searchResults.map((prod) => (
                  <View key={prod.id} style={styles.productCol}>
                    <ProductCard
                      product={prod}
                      onPress={(p) => {
                        setSearchModalVisible(false);
                        handleOpenProduct(p);
                      }}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={!!wishlist[prod.id]}
                    />
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Side Drawer Component */}
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
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandTitleWrap: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#831843',
    letterSpacing: 0.8,
  },
  royalCrownBadge: {
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#FEF3C7',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 1,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#831843',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#831843',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  heroBannerCard: {
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E293B',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.88,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  heroGoldBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF08A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  heroGoldBadgeText: {
    color: '#78350F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroHeadline: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 25,
    marginBottom: 4,
  },
  heroSubtitle: {
    color: '#E2E8F0',
    fontSize: 12,
    marginBottom: 12,
  },
  heroCtaBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  heroCtaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionWrap: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#831843',
  },
  categoryScroll: {
    paddingVertical: 4,
    alignItems: 'center',
  },
  categoryPillAll: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginRight: 6,
  },
  categoryPillAllActive: {
    borderColor: '#831843',
    backgroundColor: '#FDF2F8',
  },
  categoryPillAllText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  categoryPillAllTextActive: {
    color: '#831843',
    fontWeight: '800',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  productCol: {
    width: '50%',
  },
  cityScroll: {
    paddingVertical: 4,
  },
  cityCard: {
    width: 200,
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
    backgroundColor: '#334155',
  },
  cityImage: {
    width: '100%',
    height: '100%',
  },
  cityOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  cityName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  citySpecialty: {
    color: '#FEF08A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  trustBannerWrap: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trustBannerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 16,
  },
  trustGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trustItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  trustIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  trustItemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  trustItemDesc: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
  },
  searchModalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  closeSearchBtn: {
    paddingVertical: 6,
  },
  closeSearchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#831843',
  },
  searchResultsContainer: {
    padding: 16,
  },
  searchPrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 8,
  },
  searchPromptTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  searchPromptSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 260,
  },
});
