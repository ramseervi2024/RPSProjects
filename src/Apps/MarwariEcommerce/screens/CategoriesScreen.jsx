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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  ArrowRight,
  ShoppingBag,
  X,
  Sparkles,
  ChevronLeft,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getCategoryList, getProductsList } from '../redux/profile/action';
import { COLORS, RADII } from '../theme/theme';

const DEFAULT_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Royal Apparel',
    subtitle: 'Bandhani Sarees & Royal Jodhpuri Suits',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    itemCount: '48 items',
  },
  {
    id: 'cat-2',
    name: 'Handicrafts',
    subtitle: 'Jaipur Blue Pottery & Hand-Carved Artifacts',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    itemCount: '62 items',
  },
  {
    id: 'cat-3',
    name: 'Silver Jewellery',
    subtitle: 'Pure Sterling Silver Kundan & Meenakari Jhumkas',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    itemCount: '35 items',
  },
  {
    id: 'cat-4',
    name: 'Marwari Mojari',
    subtitle: 'Hand-stitched Double-Tanned Camel Leather Mojaris',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    itemCount: '29 items',
  },
  {
    id: 'cat-5',
    name: 'Food & Spices',
    subtitle: 'Kashmiri Kesar Peda & Bikaneri Bhujia',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    itemCount: '24 items',
  },
  {
    id: 'cat-6',
    name: 'Home & Décor',
    subtitle: 'Jaipuri Razai Quilts & Brass Hanging Lamps',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
    itemCount: '41 items',
  },
  {
    id: 'cat-7',
    name: 'Art & Collectibles',
    subtitle: 'Miniature Rajasthani Paintings & Wood Carvings',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    itemCount: '19 items',
  },
];

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const rawCategories = useSelector((state) => state.profile.categories);

  const categories = useMemo(() => {
    if (Array.isArray(rawCategories) && rawCategories.length > 0) {
      return rawCategories.map((c, idx) => ({
        ...c,
        subtitle: DEFAULT_CATEGORIES[idx % DEFAULT_CATEGORIES.length]?.subtitle || 'Authentic heritage creations',
        itemCount: DEFAULT_CATEGORIES[idx % DEFAULT_CATEGORIES.length]?.itemCount || '30+ items',
      }));
    }
    return DEFAULT_CATEGORIES;
  }, [rawCategories]);

  const loadData = async () => {
    try {
      await dispatch(getCategoryList());
      await dispatch(getProductsList());
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
        (cat.name || cat.title || '').toLowerCase().includes(q) ||
        (cat.subtitle || '').toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  const renderCategoryCard = ({ item }) => {
    const title = item.name || item.title;
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() => {
          navigation.navigate('Dashboard');
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardOverlay}>
          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>{item.itemCount}</Text>
          </View>
          <View style={styles.cardTextContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={2}>
              {item.subtitle}
            </Text>
            <View style={styles.exploreLink}>
              <Text style={styles.exploreText}>Explore Collection</Text>
              <ArrowRight size={14} color="#FEF08A" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Heritage Collections</Text>
          <Text style={styles.headerSubtitle}>
            All 7 authentic guilds of Rajasthan
          </Text>
        </View>
        <View style={styles.royalIcon}>
          <Sparkles size={18} color="#B45309" />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrap}>
        <View style={styles.searchInputWrap}>
          <Search size={18} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search collections..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#831843" />
        </View>
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item, index) => item.id || String(index)}
          renderItem={renderCategoryCard}
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
      )}
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
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  royalIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarWrap: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
    gap: 14,
  },
  card: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    padding: 16,
    justifyContent: 'space-between',
  },
  badgeWrap: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(131, 24, 67, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardTextContent: {},
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: '#E2E8F0',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  exploreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exploreText: {
    color: '#FEF08A',
    fontSize: 12,
    fontWeight: '700',
  },
});
