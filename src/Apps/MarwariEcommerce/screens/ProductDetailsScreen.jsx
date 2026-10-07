import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  useWindowDimensions,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  Share2,
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { getProductDetails } from '../redux/profile/action';
import { addToCart } from '../redux/cart/action';
import { showToast } from '../components/common/Toast';

export default function ProductDetailsScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const { product: initialProduct, productId } = route.params || {};
  const [product, setProduct] = useState(initialProduct || null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(!initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Standard Royal Edition');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'materials' | 'care'
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const cartItems = useSelector((state) => state.cart.items) || [];
  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);

  useEffect(() => {
    const fetchDetail = async () => {
      const idToFetch = productId || initialProduct?.id;
      if (idToFetch) {
        const res = await dispatch(getProductDetails(idToFetch));
        if (res?.data?.product) {
          setProduct(res.data.product);
          setRecommended(res.data.recommended || []);
        } else if (res?.data) {
          setProduct(res.data);
        }
      }
      setLoading(false);
    };

    fetchDetail();
  }, [dispatch, productId, initialProduct]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product?.name} from Mārwāri E-Commerce: Handcrafted Royal Heritage from Rajasthan!`,
      });
    } catch (_) {}
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product, quantity));
    showToast.success('Added to Bag', `${quantity}x ${product.name} added to your bag.`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(addToCart(product, quantity));
    navigation.navigate('Checkout', {
      subtotal: (product.price || 0) * quantity,
      items: [{ ...product, qty: quantity }],
    });
  };

  if (loading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <ActivityIndicator size="large" color="#831843" />
        <Text style={styles.loadingText}>Unveiling Heritage Treasure...</Text>
      </View>
    );
  }

  const originalPrice =
    product.original_price ||
    (product.price ? product.price + Math.floor(product.price * 0.15) : 0);
  const discountPercent =
    product.discount_percent ||
    Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const VARIANTS = ['Standard Royal Edition', 'Imperial Velvet Gift Box'];

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* ─── Top Header ────────────────────────────────────────────────── */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Share2 size={18} color="#0F172A" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <ShoppingBag size={18} color="#831843" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Scrollable Body ───────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image Container */}
        <TouchableOpacity 
          style={[styles.imageContainer, { width, height: width * 0.95 }]}
          activeOpacity={0.9}
          onPress={() => setIsImageViewVisible(true)}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {product.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}

          <View style={styles.zoomBadge}>
            <Sparkles size={11} color="#FEF08A" />
            <Text style={styles.zoomText}>Certified Masterpiece</Text>
          </View>
        </TouchableOpacity>

        {/* Product Details Info Block */}
        <View style={styles.infoBlock}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.name}</Text>

          {/* Ratings & Verification */}
          <View style={styles.ratingRow}>
            <View style={styles.starsWrap}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={15} color="#F59E0B" fill="#F59E0B" />
              ))}
            </View>
            <Text style={styles.ratingText}>
              5.0 ({product.reviews_count || 134} Verified Reviews)
            </Text>
            <View style={styles.authenticTag}>
              <ShieldCheck size={12} color="#059669" />
              <Text style={styles.authenticText}>100% Authentic</Text>
            </View>
          </View>

          {/* Pricing Row */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{Number(product.price || 0).toLocaleString('en-IN')}
            </Text>
            {originalPrice > product.price ? (
              <Text style={styles.originalPrice}>
                ₹{Number(originalPrice).toLocaleString('en-IN')}
              </Text>
            ) : null}
            <View style={styles.discountChip}>
              <Text style={styles.discountText}>{discountPercent}% OFF</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Packaging Variant Selector */}
          <View style={styles.sectionBlock}>
            <Text style={styles.blockTitle}>SELECT PACKAGING EDITION</Text>
            <View style={styles.variantsRow}>
              {VARIANTS.map((variant) => {
                const isSel = selectedVariant === variant;
                return (
                  <TouchableOpacity
                    key={variant}
                    style={[styles.variantChip, isSel && styles.variantChipActive]}
                    onPress={() => setSelectedVariant(variant)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.variantChipText,
                        isSel && styles.variantChipTextActive,
                      ]}
                    >
                      {variant}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Quantity Stepper */}
          <View style={styles.sectionBlock}>
            <Text style={styles.blockTitle}>QUANTITY</Text>
            <View style={styles.stepperRow}>
              <View style={styles.stepper}>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                  activeOpacity={0.7}
                >
                  <Minus size={16} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.stepCount}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setQuantity((q) => q + 1)}
                  activeOpacity={0.7}
                >
                  <Plus size={16} color="#0F172A" />
                </TouchableOpacity>
              </View>
              <Text style={styles.inStockText}>✓ In Stock & Ready to Dispatch</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Accordion Tabs for Craft Story / Specs */}
          <View style={styles.tabsRow}>
            {[
              { id: 'story', label: 'Artisan Story' },
              { id: 'materials', label: 'Heritage Specs' },
              { id: 'care', label: 'Care Guide' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabBtn, activeTab === tab.id && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text
                  style={[
                    styles.tabBtnText,
                    activeTab === tab.id && styles.tabBtnTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContentCard}>
            {activeTab === 'story' && (
              <Text style={styles.tabDesc}>
                {product.description ||
                  'Crafted using ancestral traditions handed down across generations of Marwari artisans. Each detail reflects the majestic heritage of Rajasthan palaces and royal courts.'}
              </Text>
            )}
            {activeTab === 'materials' && (
              <View style={styles.specsList}>
                <Text style={styles.specItem}>
                  • <Text style={styles.specLabel}>Artisan Guild:</Text> Master Guild of Udaipur & Jodhpur
                </Text>
                <Text style={styles.specItem}>
                  • <Text style={styles.specLabel}>Craft Technique:</Text> Traditional Hand-block & Repoussé
                </Text>
                <Text style={styles.specItem}>
                  • <Text style={styles.specLabel}>Certificate:</Text> 100% Genuine GI Tagged Heritage
                </Text>
              </View>
            )}
            {activeTab === 'care' && (
              <Text style={styles.tabDesc}>
                Keep in a dry environment. Clean gently with a soft micro-fiber cloth. Avoid direct exposure to harsh chemical cleaners to preserve original artisan luster.
              </Text>
            )}
          </View>

          {/* Trust Guarantees */}
          <View style={styles.guaranteeBox}>
            <View style={styles.guaranteeItem}>
              <Truck size={18} color="#831843" />
              <Text style={styles.guaranteeText}>Pan-India Express Delivery</Text>
            </View>
            <View style={styles.guaranteeItem}>
              <RotateCcw size={18} color="#831843" />
              <Text style={styles.guaranteeText}>7-Day Royal Replacement Guarantee</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ─── Sticky Bottom Action Bar ──────────────────────────────────── */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          style={styles.wishlistBottomBtn}
          onPress={() => {
            setIsWishlisted(!isWishlisted);
            showToast.success(
              !isWishlisted ? 'Saved' : 'Removed',
              !isWishlisted
                ? 'Added to your Royal Wishlist'
                : 'Removed from Royal Wishlist'
            );
          }}
          activeOpacity={0.8}
        >
          <Heart
            size={22}
            color={isWishlisted ? '#DC2626' : '#64748B'}
            fill={isWishlisted ? '#DC2626' : 'transparent'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addCartBottomBtn}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <ShoppingBag size={18} color="#831843" />
          <Text style={styles.addCartBottomText}>Add to Bag</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyNowBtn}
          onPress={handleBuyNow}
          activeOpacity={0.85}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <ImageViewing
        images={[{ uri: product.image }]}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#831843',
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginHorizontal: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#831843',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageContainer: {
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(131, 24, 67, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  zoomBadge: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  zoomText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  infoBlock: {
    padding: 16,
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  starsWrap: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  authenticTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  authenticText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#831843',
  },
  originalPrice: {
    fontSize: 16,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  discountChip: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  sectionBlock: {
    marginBottom: 14,
  },
  blockTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  variantsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  variantChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  variantChipActive: {
    borderColor: '#831843',
    backgroundColor: '#FDF2F8',
  },
  variantChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  variantChipTextActive: {
    color: '#831843',
    fontWeight: '700',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  stepBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  stepCount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    minWidth: 28,
    textAlign: 'center',
  },
  inStockText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  tabBtn: {
    paddingVertical: 10,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#831843',
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#831843',
    fontWeight: '700',
  },
  tabContentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  tabDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155',
  },
  specsList: {
    gap: 6,
  },
  specItem: {
    fontSize: 13,
    color: '#334155',
  },
  specLabel: {
    fontWeight: '700',
    color: '#0F172A',
  },
  guaranteeBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guaranteeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78350F',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  wishlistBottomBtn: {
    width: 48,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  addCartBottomBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  addCartBottomText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#831843',
  },
  buyNowBtn: {
    flex: 1.2,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#831843',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
