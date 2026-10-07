import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Filter,
  X,
  Search,
  Check,
  Sparkles,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import ProductCard from '../components/ProductCard';
import { getProductsList } from '../redux/profile/action';
import { addToCart } from '../redux/cart/action';
import { showToast } from '../components/common/Toast';

export default function AllProductsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState({});
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');

  const rawProducts = useSelector((state) => state.profile.products);
  const products = useMemo(
    () => (Array.isArray(rawProducts) ? rawProducts : []),
    [rawProducts]
  );

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  const categories = useMemo(() => {
    const cats = ['All'];
    products.forEach((p) => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter(
        (p) =>
          (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort
    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => {
        const pA = parseFloat(a.regular_price || a.price || 0);
        const pB = parseFloat(b.regular_price || b.price || 0);
        return pA - pB;
      });
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => {
        const pA = parseFloat(a.regular_price || a.price || 0);
        const pB = parseFloat(b.regular_price || b.price || 0);
        return pB - pA;
      });
    } else if (sortBy === 'Newest') {
      // Assuming 'id' correlates to newest, or we could sort by date if available
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [products, selectedCategory, sortBy]);

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

  const sortOptions = ['Recommended', 'Newest', 'Price: Low to High', 'Price: High to Low'];

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Heritage Products</Text>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterModalVisible(true)}
          activeOpacity={0.7}
        >
          <Filter size={20} color="#0F172A" />
          {(selectedCategory !== 'All' || sortBy !== 'Recommended') && (
            <View style={styles.activeFilterDot} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerStats}>
          <Text style={styles.resultsText}>
            Showing {filteredAndSortedProducts.length} Treasures
          </Text>
          {selectedCategory !== 'All' && (
            <View style={styles.activeTag}>
              <Text style={styles.activeTagText}>{selectedCategory}</Text>
              <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                <X size={12} color="#831843" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.productGrid}>
          {filteredAndSortedProducts.map((prod) => (
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
          {filteredAndSortedProducts.length === 0 && (
            <View style={styles.emptyState}>
              <Sparkles size={32} color="#B45309" />
              <Text style={styles.emptyTitle}>No Treasures Found</Text>
              <Text style={styles.emptySub}>
                Try adjusting your filters to discover more royal collections.
              </Text>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  setSelectedCategory('All');
                  setSortBy('Recommended');
                }}
              >
                <Text style={styles.clearBtnText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Filter & Sort Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter & Sort</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <X size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Sort By</Text>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.filterOption}
                    onPress={() => setSortBy(option)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        sortBy === option && styles.filterOptionTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                    {sortBy === option && <Check size={18} color="#831843" />}
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Category</Text>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={styles.filterOption}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedCategory === cat && styles.filterOptionTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                    {selectedCategory === cat && <Check size={18} color="#831843" />}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalBtnOutline}
                onPress={() => {
                  setSelectedCategory('All');
                  setSortBy('Recommended');
                }}
              >
                <Text style={styles.modalBtnOutlineText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnSolid}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.modalBtnSolidText}>Apply Filters</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  filterBtn: {
    padding: 6,
    position: 'relative',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  activeFilterDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 16,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  activeTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#831843',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  productCol: {
    width: '50%',
  },
  emptyState: {
    width: '100%',
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
    marginBottom: 24,
  },
  clearBtn: {
    backgroundColor: '#831843',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  filterOptionText: {
    fontSize: 16,
    color: '#0F172A',
  },
  filterOptionTextActive: {
    fontWeight: '700',
    color: '#831843',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  modalBtnOutline: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  modalBtnOutlineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  modalBtnSolid: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#831843',
    alignItems: 'center',
  },
  modalBtnSolidText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
