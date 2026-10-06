import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  Search,
  Filter,
  ArrowRight,
  ShoppingBag,
  X,
} from 'lucide-react-native';
import { getCategoryList } from '../redux/profile/action';
import { COLORS, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { getCategoryTheme, getCategoryImageUrl } from '../utils/mediaUtils';

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const rawCategories = useSelector((state) => state.profile.categories);
  const categories = useMemo(() => (Array.isArray(rawCategories) ? rawCategories : []), [rawCategories]);

  const loadData = async () => {
    try {
      await dispatch(getCategoryList());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase().trim();
    return categories.filter(
      (cat) =>
        (cat.title || '').toLowerCase().includes(q) ||
        (cat.description || '').toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  const [imageErrors, setImageErrors] = useState({});

  const renderCategoryCard = ({ item, index }) => {
    const itemKey = item.id || item.slug || index;
    const imgUrl = imageErrors[itemKey] ? null : getCategoryImageUrl(item, index);
    const theme = getCategoryTheme(index);

    return (
      <View style={styles.card}>
        <View style={styles.cardBannerWrap}>
          {imgUrl ? (
            <Image
              source={{ uri: imgUrl }}
              style={styles.cardImage}
              resizeMode="cover"
              onError={() => setImageErrors((prev) => ({ ...prev, [itemKey]: true }))}
            />
          ) : (
            <View style={[styles.cardFallback, { backgroundColor: theme.bg }]}>
              <ShoppingBag size={32} color={theme.text} />
            </View>
          )}
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.categoryTitle}>{item.title}</Text>

          <TouchableOpacity
            style={styles.viewServicesBtn}
            onPress={() =>
              navigation.navigate('Services', { selectedCategory: item.title })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.viewServicesBtnText}>View Services</Text>
            <ArrowRight size={14} color="#0F766E" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Simple Clean Mobile Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Categories</Text>
        </View>
      </View>

      {/* Search Bar + Filter Button matching Screenshot 3 */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchBox}>
          <Search size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
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
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
          <Filter size={15} color="#FFFFFF" />
          <Text style={styles.filterBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={GLOBAL_STYLES.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCategoryCard}
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
              <Text style={styles.emptyTitle}>No Categories Found</Text>
              <Text style={styles.emptySub}>Try searching for another service category.</Text>
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 12,
    marginTop: 2,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerSubtitleTop: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    color: '#0F766E',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size24,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
  searchBarRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
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
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size13,
    color: '#0F172A',
    marginLeft: 8,
    padding: 0,
  },
  filterBtn: {
    backgroundColor: '#0F766E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 12,
    height: 42,
    gap: 6,
  },
  filterBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 110,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
    ...SHADOWS.card,
  },
  cardBannerWrap: {
    width: '100%',
    height: 160,
    backgroundColor: '#F1F5F9',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: 16,
  },
  categoryTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size16,
    color: '#0F172A',
    marginBottom: 6,
    lineHeight: fontSizes.size16 * 1.25,
  },
  categoryDesc: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    lineHeight: fontSizes.size12 * 1.4,
    marginBottom: 14,
  },
  viewServicesBtn: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewServicesBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size16,
    color: '#0F172A',
    marginTop: 12,
  },
  emptySub: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 4,
  },
});
