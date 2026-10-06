import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ShoppingBag,
  Check,
  Search,
  Filter,
  X,
  ArrowRight,
  ShoppingCart,
  RotateCcw,
  ChevronLeft,
} from 'lucide-react-native';
import { getServiceList, getCategoryList } from '../redux/profile/action';
import { fetchCart, addToCart } from '../redux/cart/action';
import { COLORS, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { showToast } from '../components/common/Toast';
import { getCategoryTheme, getServiceImageUrl } from '../utils/mediaUtils';

// Website corporate categories matching Screenshot 4
const WEBSITE_FILTER_CATEGORIES = [
  'All',
  'Mutual Fund Review',
  'Tax Planning',
  'Financial Planning',
  'Insurance Review',
  'Portfolio Review',
  'Retirement Planning',
  'Investment Advisory',
  'Estate Planning',
];

// Fallback services matching website screenshot 4 if API is loading or offline
const WEBSITE_DEFAULT_SERVICES = [
  {
    id: 101,
    name: 'Review of Existing Life Insurance & ULIPs',
    platform: 'Advisory',
    categories: ['Insurance Review'],
    price: '₹0.00',
    priceRaw: 0,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  },
  {
    id: 102,
    name: 'Review of Existing Health Insurance',
    platform: 'Health',
    categories: ['Insurance Review'],
    price: '₹5000.00',
    priceRaw: 5000,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  },
  {
    id: 103,
    name: 'Review of Existing Mutual Funds',
    platform: 'Mutual Fund',
    categories: ['Mutual Fund Review'],
    price: '₹5000.00',
    priceRaw: 5000,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
  },
  {
    id: 104,
    name: 'Life / Health Insurance Planning',
    platform: 'Insurance',
    categories: ['Insurance Review', 'Financial Planning'],
    price: '₹5000.00',
    priceRaw: 5000,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  },
  {
    id: 105,
    name: 'Child Education & Marriage Planning',
    platform: 'Planning',
    categories: ['Financial Planning'],
    price: '₹5000.00',
    priceRaw: 5000,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  },
  {
    id: 106,
    name: 'Tax Planning & Advisory',
    platform: 'Tax',
    categories: ['Tax Planning'],
    price: '₹5000.00',
    priceRaw: 5000,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
  },
  {
    id: 107,
    name: 'Retirement Planning',
    platform: 'Retirement',
    categories: ['Retirement Planning'],
    price: '₹0.00',
    priceRaw: 0,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  },
  {
    id: 108,
    name: 'Year-End Financial Review 2026',
    platform: 'Advisory',
    categories: ['Portfolio Review'],
    price: '₹5000.00',
    priceRaw: 5000,
    image_url: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  },
];

export default function ServicesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [addedIds, setAddedIds] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [activeCategory, setActiveCategory] = useState(
    route.params?.selectedCategory || 'All'
  );

  const rawServices = useSelector((state) => state.profile.servicelists);
  const cartItems = useSelector((state) => state.cart.items);

  const servicesList = useMemo(() => {
    let list = [];
    if (Array.isArray(rawServices) && rawServices.length > 0) list = rawServices;
    else if (Array.isArray(rawServices?.data) && rawServices.data.length > 0) list = rawServices.data;
    else if (Array.isArray(rawServices?.response) && rawServices.response.length > 0) list = rawServices.response;

    if (list.length === 0) {
      return WEBSITE_DEFAULT_SERVICES;
    }
    return list;
  }, [rawServices]);

  useEffect(() => {
    if (route.params?.selectedCategory) {
      setActiveCategory(route.params.selectedCategory);
    }
  }, [route.params]);

  useEffect(() => {
    Promise.all([
      dispatch(getServiceList()),
      dispatch(getCategoryList()),
      dispatch(fetchCart()),
    ]).finally(() => setLoading(false));
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(getServiceList()),
        dispatch(getCategoryList()),
        dispatch(fetchCart(true)),
      ]);
    } catch (e) {
      console.warn('Services refresh error:', e);
    } finally {
      setRefreshing(false);
    }
  };

  const totalCartCount = (cartItems || []).reduce(
    (acc, item) => acc + (parseInt(item.qty || 1, 10)),
    0
  );

  const filteredServices = useMemo(() => {
    let result = servicesList;

    if (activeCategory !== 'All') {
      const catLower = activeCategory.toLowerCase();
      result = result.filter((item) => {
        const name = (item.name || '').toLowerCase();
        const platform = (item.platform || '').toLowerCase();
        const category = (item.category || '').toLowerCase();
        const itemCats = Array.isArray(item.categories)
          ? item.categories.join(' ').toLowerCase()
          : '';
        return (
          name.includes(catLower) ||
          platform.includes(catLower) ||
          category.includes(catLower) ||
          itemCats.includes(catLower)
        );
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const name = (item.name || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        const sku = (item.sku || '').toLowerCase();
        const id = String(item.id || '');
        return name.includes(q) || desc.includes(q) || sku.includes(q) || id.includes(q);
      });
    }

    return result;
  }, [servicesList, activeCategory, searchQuery]);

  const handleAddToCart = (item) => {
    const unitPrice = parseFloat(item.priceRaw != null ? item.priceRaw : item.price || 0);
    const payload = {
      id: item.id,
      platform: item.platform || 'Services',
      name: item.name,
      priceRaw: unitPrice,
      image: item.image || item.image_url,
      qty: 1,
    };

    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    dispatch(addToCart(payload));
    showToast.success('Added to Cart', `${item.name} added to your cart.`);

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleViewDetails = (item) => {
    navigation.navigate('ContactAdvisor', {
      category: item.platform || 'Corporate Service Advisory',
      subject: `Service Inquiry: ${item.name}`,
      initialMessage: `Hello! I am interested in the "${item.name}" plan (${item.platform || 'Corporate Service'}). Please guide me with the step-by-step investment process, recommended monthly SIP allocation, and documentation needed.`,
    });
  };

  const renderServiceCard = ({ item, index }) => {
    const isRecentlyAdded = addedIds[item.id];
    const displayPrice =
      item.priceRaw != null
        ? `₹${parseFloat(item.priceRaw).toFixed(2)}`
        : item.price
        ? (String(item.price).startsWith('₹') ? item.price : `₹${item.price}`)
        : '₹0.00';
    const itemKey = item.id || item.name || index;
    const imgUrl = imageErrors[itemKey] ? null : getServiceImageUrl(item, index);
    const theme = getCategoryTheme(index);

    return (
      <View style={styles.card}>
        {/* 16:9 Rectangle Media Banner matching Website */}
        <View style={styles.cardBannerWrap}>
          {imgUrl ? (
            <Image
              source={{ uri: imgUrl }}
              style={styles.cardImage}
              resizeMode="cover"
              onError={() => setImageErrors((prev) => ({ ...prev, [itemKey]: true }))}
            />
          ) : (
            <View style={[styles.cardImageFallback, { backgroundColor: theme.bg }]}>
              <ShoppingBag size={32} color={theme.text} />
            </View>
          )}
        </View>

        {/* Card Body matching Mobile Spec: Title, Price, Actions */}
        <View style={styles.cardBody}>
          <Text style={styles.serviceTitle} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.servicePrice}>{displayPrice}</Text>

          {/* Footer Action Row: View Details ➔ | Add to Cart */}
          <View style={styles.footerActionRow}>
            <TouchableOpacity
              style={styles.viewDetailsBtn}
              onPress={() => handleViewDetails(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.viewDetailsBtnText}>View Details</Text>
              <ArrowRight size={13} color="#0F766E" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addBtn, isRecentlyAdded && styles.addBtnSuccess]}
              onPress={() => handleAddToCart(item)}
              activeOpacity={0.85}
            >
              {isRecentlyAdded ? (
                <View style={styles.btnRow}>
                  <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.addBtnText}>Added</Text>
                </View>
              ) : (
                <View style={styles.btnRow}>
                  <ShoppingCart size={13} color="#FFFFFF" strokeWidth={2.2} style={{ marginRight: 5 }} />
                  <Text style={styles.addBtnText}>Add to Cart</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Proper Header with back button */}
      <View style={styles.headerRow}>
        {/* Back button - only show when can go back */}
        {navigation.canGoBack() ? (
          <TouchableOpacity
            style={styles.headerBackBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0F172A" strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerBackBtn} />
        )}

        <Text style={styles.headerTitle}>All Services</Text>

        <View style={styles.headerIconsRow}>
          <TouchableOpacity
            style={styles.refreshIconBtn}
            onPress={handleRefresh}
            activeOpacity={0.75}
          >
            {refreshing ? (
              <ActivityIndicator size="small" color="#0F766E" />
            ) : (
              <RotateCcw size={17} color="#0F766E" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartIconBtn}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.75}
          >
            <ShoppingBag size={19} color="#0F766E" strokeWidth={2} />
            {totalCartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalCartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar + Filter Button matching Screenshot 4 */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchBox}>
          <Search size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, ID or SKU..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={15} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.filterBtn, showFilters && styles.filterBtnActive]}
          onPress={() => setShowFilters(!showFilters)}
          activeOpacity={0.8}
        >
          <Filter size={15} color="#FFFFFF" />
          <Text style={styles.filterBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Category Filter Pills matching Screenshot 4 */}
      {showFilters && (
        <View style={styles.categoriesSectionWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryPillsScroll}
          >
            {WEBSITE_FILTER_CATEGORIES.map((catName) => {
              const isActive = activeCategory === catName;
              return (
                <TouchableOpacity
                  key={`filter-pill-${catName}`}
                  style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                  onPress={() => setActiveCategory(catName)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isActive && styles.categoryChipTextActive,
                    ]}
                  >
                    {catName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Services List */}
      {loading ? (
        <View style={GLOBAL_STYLES.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item, idx) => String(item.id || idx)}
          renderItem={renderServiceCard}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ShoppingBag size={44} color="#94A3B8" />
              <Text style={styles.emptyTitle}>No Services Found</Text>
              <Text style={styles.emptySub}>Try searching for another service name or category.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitleWrap: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size17,
    color: '#0F172A',
    letterSpacing: -0.3,
    flex: 1,
    textAlign: 'center',
  },
  headerIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  refreshIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cartIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontFamily: fontFamilies.interBold,
    fontSize: fontSizes.badge,
    color: '#FFFFFF',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.interRegular,
    fontSize: fontSizes.bodySecondary, // ~13px
    color: '#0F172A',
    marginLeft: 8,
    padding: 0,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F766E',
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 12,
    gap: 6,
  },
  filterBtnActive: {
    backgroundColor: '#115E59',
  },
  filterBtnText: {
    fontFamily: fontFamilies.interSemiBold,
    fontSize: fontSizes.bodySecondary,
    color: '#FFFFFF',
  },
  categoriesSectionWrap: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  categoryPillsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  categoryChipText: {
    fontFamily: fontFamilies.interMedium,
    fontSize: fontSizes.caption, // ~12px
    color: '#64748B',
    fontWeight: '600',
  },
  categoryChipTextActive: {
    fontFamily: fontFamilies.interSemiBold,
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 110,
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
    ...SHADOWS.card,
  },
  cardBannerWrap: {
    width: '100%',
    height: 175,
    backgroundColor: '#F1F5F9',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: 16,
  },
  serviceTitle: {
    fontFamily: fontFamilies.interSemiBold,
    fontSize: fontSizes.actionTitle, // ~16px
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 22,
  },
  serviceDesc: {
    fontFamily: fontFamilies.interRegular,
    fontSize: fontSizes.caption, // ~12px
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 10,
  },
  servicePrice: {
    fontFamily: fontFamilies.interBold,
    fontSize: fontSizes.headingSub, // ~17px - 18px
    color: '#0F766E',
    marginBottom: 14,
  },
  footerActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
    paddingTop: 12,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  viewDetailsBtnText: {
    fontFamily: fontFamilies.interSemiBold,
    fontSize: fontSizes.bodySecondary,
    color: '#0F766E',
  },
  addBtn: {
    backgroundColor: '#0F766E',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnSuccess: {
    backgroundColor: '#059669',
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBtnText: {
    fontFamily: fontFamilies.interSemiBold,
    fontSize: fontSizes.bodySmall, // ~13px
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontFamily: fontFamilies.interBold,
    fontSize: fontSizes.actionTitle,
    color: '#0F172A',
    marginTop: 12,
  },
  emptySub: {
    fontFamily: fontFamilies.interRegular,
    fontSize: fontSizes.caption,
    color: '#64748B',
    marginTop: 4,
  },
});
