import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: 1, name: 'Women Ethnic', image: 'https://images.unsplash.com/photo-1583391733956-6c74c9e3e1b4?w=500' },
  { id: 2, name: 'Women Western', image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500' },
  { id: 3, name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500' },
  { id: 4, name: 'Kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500' },
];

const TRENDING_PRODUCTS = [
  {
    id: 1,
    name: 'Floral Print Dress',
    price: 499,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
    rating: 4.5,
    reviews: 2345
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 899,
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500',
    rating: 4.2,
    reviews: 1289
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    price: 299,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    rating: 4.0,
    reviews: 890
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meesho</Text>
          <Text style={styles.headerSubtitle}>Lowest Prices Best Quality Shopping</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Products</Text>
          <View style={styles.productsGrid}>
            {TRENDING_PRODUCTS.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>₹{product.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>★ {product.rating}</Text>
                    <Text style={styles.reviews}>{product.reviews} Reviews</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#E83E8C',
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  headerSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  categoriesContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryCard: {
    marginRight: 16,
    width: 120,
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  categoryName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  productCard: {
    width: '50%',
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  productPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#E83E8C',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  reviews: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
});