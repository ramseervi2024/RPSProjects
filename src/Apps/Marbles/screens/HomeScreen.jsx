import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

const featuredProducts = [
  {
    id: 1,
    name: 'Grey Night Marble',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Carrara White',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Grey Night Marble',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Carrara White',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
  },
];

const categories = [
  { id: 1, name: 'Grey Night', count: 24 },
  { id: 2, name: 'Marble', count: 18 },
  { id: 3, name: 'Granite', count: 12 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.title}>Discover Premium Stone</Text>
        </View>

        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color="#666" />
          <Text style={styles.searchText}>Search products</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            {featuredProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count} items</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 32,
    color: '#1a1a1a',
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 20,
    padding: 12,
    borderRadius: 12,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
    fontFamily: 'Inter',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 20,
    marginBottom: 16,
    color: '#1a1a1a',
  },
  productsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  productCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: '#1a1a1a',
  },
  productPrice: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryName: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: '#1a1a1a',
  },
  categoryCount: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
  },
});