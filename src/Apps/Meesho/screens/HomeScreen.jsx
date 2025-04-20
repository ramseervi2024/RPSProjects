import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import { Search, ShoppingCart } from 'lucide-react-native';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    {
      id: 1,
      title: 'Traditional Sarees',
      imageUrl: 'https://api.a0.dev/assets/image?text=beautiful%20rajasthani%20traditional%20saree%20with%20intricate%20patterns&aspect=4:5'
    },
    {
      id: 2,
      title: 'Men\'s Ethnic',
      imageUrl: 'https://api.a0.dev/assets/image?text=rajasthani%20mens%20traditional%20sherwani%20and%20turban&aspect=4:5'
    },
    {
      id: 3,
      title: 'Kids Wear',
      imageUrl: 'https://api.a0.dev/assets/image?text=cute%20rajasthani%20kids%20traditional%20dress%20colorful&aspect=4:5'
    },
    {
      id: 4,
      title: 'Wedding Collection',
      imageUrl: 'https://api.a0.dev/assets/image?text=luxurious%20rajasthani%20wedding%20dress%20with%20gold%20embroidery&aspect=4:5'
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      title: 'Bandhani Print Silk Saree',
      price: 2499,
      originalPrice: 4999,
      imageUrl: 'https://api.a0.dev/assets/image?text=elegant%20bandhani%20print%20silk%20saree%20in%20rich%20colors&aspect=4:5'
    },
    {
      id: 2,
      title: 'Men\'s Traditional Kurta Set',
      price: 1899,
      originalPrice: 3299,
      imageUrl: 'https://api.a0.dev/assets/image?text=mens%20traditional%20rajasthani%20kurta%20set%20with%20ethnic%20prints&aspect=4:5'
    },
    {
      id: 3,
      title: 'Designer Lehenga Choli',
      price: 3999,
      originalPrice: 7999,
      imageUrl: 'https://api.a0.dev/assets/image?text=designer%20rajasthani%20lehenga%20choli%20with%20mirror%20work&aspect=4:5'
    },
    {
      id: 4,
      title: 'Kids Dhoti Kurta Set',
      price: 999,
      originalPrice: 1999,
      imageUrl: 'https://api.a0.dev/assets/image?text=kids%20traditional%20dhoti%20kurta%20set%20festive%20wear&aspect=4:5'
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rajasthani Heritage</Text>
        <View style={styles.headerIcons}>
          <Search size={24} color="#333" style={styles.icon} />
          <ShoppingCart size={24} color="#333" style={styles.icon} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              imageUrl={category.imageUrl}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Collection</Text>
        <View style={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:60
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  categoryContainer: {
    paddingLeft: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
});
