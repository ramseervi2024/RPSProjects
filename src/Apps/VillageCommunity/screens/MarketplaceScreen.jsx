import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

const PRODUCTS = [
  {
    id: '1',
    name: 'Fresh Farm Vegetables',
    price: '25.00',
    seller: 'Green Farm',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&q=80',
    category: 'Produce',
  },
  {
    id: '2',
    name: 'Handmade Pottery',
    price: '45.00',
    seller: 'Local Artisan',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500&q=80',
    category: 'Crafts',
  },
  {
    id: '3',
    name: 'Organic Honey',
    price: '15.00',
    seller: 'Valley Apiaries',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80',
    category: 'Food',
  },
];

export default function MarketplaceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Village Market</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <Text style={styles.searchPlaceholder}>Search products...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#166534" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.categoryButton, styles.categoryButtonActive]}>
            <Text style={[styles.categoryText, styles.categoryTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Produce</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Crafts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Food</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.productsGrid}>
        {PRODUCTS.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productContent}>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSeller}>{product.seller}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ List Your Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#94a3b8',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f8fafc',
  },
  categoryButtonActive: {
    backgroundColor: '#166534',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  productsGrid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productContent: {
    padding: 12,
  },
  productCategory: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#166534',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#334155',
    marginBottom: 4,
  },
  productSeller: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
  },
  addButton: {
    margin: 20,
    backgroundColor: '#166534',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});