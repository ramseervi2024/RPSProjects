import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';

const CATEGORIES = [
  { id: 1, name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80' },
  { id: 2, name: 'Women', image: 'https://images.unsplash.com/photo-1618244972963-dbad0c4abf18?w=500&q=80' },
  { id: 3, name: 'Kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80' },
  { id: 4, name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80' },
];

const TRENDING = [
  {
    id: 1,
    title: 'Summer Collection',
    brand: 'H&M',
    price: '₹999',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'
  },
  {
    id: 2,
    title: 'Casual Wear',
    brand: 'Zara',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80'
  },
  {
    id: 3,
    title: 'Party Wear',
    brand: 'Forever 21',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=500&q=80'
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Summer Sale</Text>
          <Text style={styles.heroSubtitle}>Up to 50% off</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((category) => (
            <View key={category.id} href="/categories" asChild>
              <Pressable style={styles.categoryCard}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Trending */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        <View style={styles.trendingGrid}>
          {TRENDING.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.brandName}>{item.brand}</Text>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    position: 'relative',
    height: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#282C3F',
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    marginRight: 15,
    width: 100,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoryName: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#282C3F',
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  brandName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#282C3F',
  },
  productTitle: {
    fontSize: 12,
    color: '#7E818C',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#282C3F',
    marginTop: 4,
  },
});