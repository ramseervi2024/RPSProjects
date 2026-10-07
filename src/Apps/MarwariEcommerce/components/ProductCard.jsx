import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, ShoppingBag, Star } from 'lucide-react-native';
import { COLORS, RADII } from '../theme/theme';

export default function ProductCard({
  product,
  onPress,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  if (!product) return null;

  const originalPrice =
    product.original_price ||
    (product.price ? product.price + Math.floor(product.price * 0.15) : 0);

  const displayRating = product.rating || 5.0;
  const reviewsCount = product.reviews_count || 134;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => onPress && onPress(product)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => onToggleWishlist && onToggleWishlist(product.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.8}
        >
          <Heart
            size={18}
            color={isWishlisted ? '#DC2626' : '#64748B'}
            fill={isWishlisted ? '#DC2626' : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        {product.category ? (
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>
        ) : null}

        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingRow}>
          <Star size={13} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.ratingText}>
            {displayRating.toFixed(1)} ({reviewsCount})
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{Number(product.price || 0).toLocaleString('en-IN')}
          </Text>
          {originalPrice > product.price ? (
            <Text style={styles.originalPrice}>
              ₹{Number(originalPrice).toLocaleString('en-IN')}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.addCartBtn}
          onPress={() => onAddToCart && onAddToCart(product)}
          activeOpacity={0.85}
        >
          <ShoppingBag size={14} color="#FFFFFF" />
          <Text style={styles.addCartText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    margin: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(131, 24, 67, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  info: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 18,
    minHeight: 36,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#991B1B',
  },
  originalPrice: {
    fontSize: 12,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  addCartBtn: {
    backgroundColor: '#831843',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  addCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
