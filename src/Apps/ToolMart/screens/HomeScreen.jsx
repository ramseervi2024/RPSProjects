import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: 1, name: 'Power Tools', image: 'https://images.unsplash.com/photo-1581147036324-c1c88bb273b4?w=400&q=80' },
  { id: 2, name: 'Hand Tools', image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80' },
  { id: 3, name: 'Safety Gear', image: 'https://images.unsplash.com/photo-1578167635648-df79e1e8b103?w=400&q=80' },
  { id: 4, name: 'Garden Tools', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&q=80' },
];

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'DeWalt Power Drill',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
  },
  {
    id: 2,
    name: 'Professional Tool Set',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1581147036324-c1c88bb273b4?w=400&q=80',
  },
  {
    id: 3,
    name: 'Safety Helmet',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1578167635648-df79e1e8b103?w=400&q=80',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>ToolMart</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.productsGrid}>
            {FEATURED_PRODUCTS.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>${product.price}</Text>
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
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#64748b',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#1e293b',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1e293b',
    marginBottom: 16,
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    marginRight: 16,
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 100,
  },
  categoryName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#1e293b',
    padding: 12,
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
    height: 160,
    borderRadius: 12,
  },
  productInfo: {
    marginTop: 8,
  },
  productName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#1e293b',
  },
  productPrice: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#2563eb',
    marginTop: 4,
  },
});