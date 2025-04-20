import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Heart, Star } from 'lucide-react-native'; // Replaced Ionicons with Lucide icons
import ProductGallery from './components/ProductGallery';
import SizeSelector from './components/SizeSelector';
import ColorSelector from './components/ColorSelector';
import { toast } from 'sonner-native';
import ReviewsScreen from './ReviewsScreen';
import LoaderTwo from './LoaderTwo';

export default function ProductDetailsScreen({ route }) {
  // Destructure the passed parameter
  const { item, type } = route.params;

  const IMAGES = [
    // `https://images.unsplash.com/photo-1738301824209-0a1016f5b06f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8`,
    // `https://images.unsplash.com/photo-1711128640065-cdac1e385dc2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20with%20golden%20embroidery%20in%20blue&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20with%20peacock%20feather%20motifs&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20in%20green%20with%20mirror%20work&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20with%20floral%20prints%20in%20pink&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20with%20golden%20brocade%20and%20red%20border&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20with%20embroidered%20paisley%20design%20in%20maroon&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20in%20blue%20with%20silver%20thread%20work&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20with%20bandhani%20pattern%20in%20yellow&aspect=4:5`,
    `https://api.a0.dev/assets/image?text=beautiful%marwari%20traditional%${type}%20with%20multicolor%20patchwork%20design&aspect=4:5`,
  ];

  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const COLORS = [

    { name: 'Dark Red', code: '#8B0000' },
    { name: 'Royal Purple', code: '#6A0DAD' },
    { name: 'Gray', code: '#708090' },
    { name: 'Dark Orange', code: '#FF8C00' },
    { name: 'Wheat', code: '#F5DEB3' },
  ];



  console.log(item, type, 'typetypetype');

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    toast.success('Added to cart successfully!');
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(newQuantity, 10));
    });
  };


  const [isLoading, setIsLoading] = useState(true); // 👈 Loading state


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // 👈 2 seconds loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {
        isLoading ? <LoaderTwo /> :
          <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ProductGallery images={IMAGES} />

              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <View>
                    <Text style={styles.brand}>PREMIUM ESSENTIALS</Text>
                    <Text style={styles.title}>Classic Cotton {type}</Text>
                  </View>
                  <Pressable
                    onPress={() => setIsWishlisted(!isWishlisted)}
                    style={styles.wishlistButton}
                  >
                    <Heart
                      size={28}
                      color={isWishlisted ? '#FF3B30' : '#000'}
                    />
                  </Pressable>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹{item?.price}</Text>
                  <Text style={styles.originalPrice}>₹{item?.originalPrice}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>25% OFF</Text>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        color={star <= 4 ? '#FFB800' : '#dcdcdc'}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewCount}>4.0 (2.5k reviews)</Text>
                </View>

                <Text style={styles.description}>
                  Premium quality cotton t-shirt designed for maximum comfort and style. Features a classic fit
                  with reinforced stitching and premium fabric that gets softer with each wash while maintaining
                  its shape.
                </Text>

                <ColorSelector
                  colors={COLORS}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                />

                <SizeSelector
                  sizes={SIZES}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />

                <View style={styles.quantityContainer}>
                  <Text style={styles.label}>Quantity</Text>
                  <View style={styles.quantitySelector}>
                    <Pressable
                      onPress={() => handleQuantityChange(false)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <Pressable
                      onPress={() => handleQuantityChange(true)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.stockInfo}>
                  <Star name="check-circle" size={20} color="green" />
                  <Text style={styles.stockText}>In Stock - Ships within 24 hours</Text>
                </View>

                <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </Pressable>

                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryTitle}>Free Delivery</Text>
                  <Text style={styles.deliveryText}>
                    Estimated delivery: 2-4 business days
                  </Text>
                </View>
              </View>
              <ReviewsScreen />
            </ScrollView>
          </SafeAreaView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  wishlistButton: {
    padding: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  discountBadge: {
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  discountText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewCount: {
    color: '#666',
    fontSize: 14,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  quantityContainer: {
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  stockText: {
    marginLeft: 8,
    color: 'green',
    fontSize: 14,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deliveryInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  deliveryText: {
    color: '#666',
    fontSize: 14,
  },
});
