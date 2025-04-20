import { View, Text, ScrollView, StyleSheet, RefreshControl, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import { Search, ShoppingCart } from 'lucide-react-native';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Extended the featuredProducts array to include 20 products
  const featuredProducts = [
    {
      id: 1,
      title: 'Bandhani Print Silk Saree',
      price: 2499,
      originalPrice: 4999,
      imageUrl: 'https://api.a0.dev/assets/image?text=elegant%20bandhani%20print%20silk%20saree%20in%20rich%20colors&aspect=4:5',
    },
    {
      id: 2,
      title: 'Men\'s Traditional Kurta Set',
      price: 1899,
      originalPrice: 3299,
      imageUrl: 'https://api.a0.dev/assets/image?text=mens%20traditional%20rajasthani%20kurta%20set%20with%20ethnic%20prints&aspect=4:5',
    },
    {
      id: 3,
      title: 'Designer Lehenga Choli',
      price: 3999,
      originalPrice: 7999,
      imageUrl: 'https://api.a0.dev/assets/image?text=designer%20rajasthani%20lehenga%20choli%20with%20mirror%20work&aspect=4:5',
    },
    {
      id: 4,
      title: 'Kids Dhoti Kurta Set',
      price: 999,
      originalPrice: 1999,
      imageUrl: 'https://api.a0.dev/assets/image?text=kids%20traditional%20dhoti%20kurta%20set%20festive%20wear&aspect=4:5',
    },
    {
      id: 5,
      title: 'Rajasthani Anarkali Dress',
      price: 2899,
      originalPrice: 5499,
      imageUrl: 'https://api.a0.dev/assets/image?text=rajasthani%20anarkali%20dress%20with%20intricate%20work&aspect=4:5',
    },
    {
      id: 6,
      title: 'Embroidered Chikan Kurta',
      price: 1799,
      originalPrice: 3499,
      imageUrl: 'https://api.a0.dev/assets/image?text=embroidered%20chikan%20kurta%20for%20women&aspect=4:5',
    },
    {
      id: 7,
      title: 'Silk Dupatta with Gold Work',
      price: 1299,
      originalPrice: 2499,
      imageUrl: 'https://api.a0.dev/assets/image?text=silk%20dupatta%20with%20gold%20work%20design&aspect=4:5',
    },
    {
      id: 8,
      title: 'Traditional Marwari Sherwani',
      price: 4999,
      originalPrice: 7999,
      imageUrl: 'https://api.a0.dev/assets/image?text=traditional%20marwari%20sherwani%20for%20men&aspect=4:5',
    },
    {
      id: 9,
      title: 'Designer Lehenga Dupatta Set',
      price: 5499,
      originalPrice: 8999,
      imageUrl: 'https://api.a0.dev/assets/image?text=designer%20lehenga%20dupatta%20set%20for%20women&aspect=4:5',
    },
    {
      id: 10,
      title: 'Traditional Marwari Saree Set',
      price: 3999,
      originalPrice: 6999,
      imageUrl: 'https://api.a0.dev/assets/image?text=traditional%20marwari%20saree%20set%20with%20blouse&aspect=4:5',
    },
    {
      id: 11,
      title: 'Kurta Pajama Set for Men',
      price: 1599,
      originalPrice: 2999,
      imageUrl: 'https://api.a0.dev/assets/image?text=kurta%20pajama%20set%20for%20men%20traditional%20wear&aspect=4:5',
    },
    {
      id: 12,
      title: 'Kids Ghagras for Festivals',
      price: 1499,
      originalPrice: 2999,
      imageUrl: 'https://api.a0.dev/assets/image?text=kids%20ghagras%20for%20festivals%20bright%20colors&aspect=4:5',
    },
    {
      id: 13,
      title: 'Festive Marwari Lehenga',
      price: 4999,
      originalPrice: 8999,
      imageUrl: 'https://api.a0.dev/assets/image?text=festive%20marwari%20lehenga%20for%20special%20occasions&aspect=4:5',
    },
    {
      id: 14,
      title: 'Traditional Marwari Kurta',
      price: 1899,
      originalPrice: 3499,
      imageUrl: 'https://api.a0.dev/assets/image?text=traditional%20marwari%20kurta%20set%20for%20men&aspect=4:5',
    },
    {
      id: 15,
      title: 'Embroidered Wedding Lehenga',
      price: 7999,
      originalPrice: 12999,
      imageUrl: 'https://api.a0.dev/assets/image?text=embroidered%20wedding%20lehenga%20set%20for%20bride&aspect=4:5',
    },
    {
      id: 16,
      title: 'Marwari Wedding Sherwani',
      price: 5999,
      originalPrice: 9999,
      imageUrl: 'https://api.a0.dev/assets/image?text=marwari%20wedding%20sherwani%20for%20groom&aspect=4:5',
    },
    {
      id: 17,
      title: 'Marwari Dupatta for Women',
      price: 1299,
      originalPrice: 1999,
      imageUrl: 'https://api.a0.dev/assets/image?text=marwari%20dupatta%20for%20women%20traditional%20design&aspect=4:5',
    },
    {
      id: 18,
      title: 'Ethnic Floral Kurtis',
      price: 1599,
      originalPrice: 2899,
      imageUrl: 'https://api.a0.dev/assets/image?text=ethnic%20floral%20kurtis%20with%20traditional%20design&aspect=4:5',
    },
    {
      id: 19,
      title: 'Rajasthani Bandhej Dupatta',
      price: 999,
      originalPrice: 1999,
      imageUrl: 'https://api.a0.dev/assets/image?text=rajasthani%20bandhej%20dupatta%20for%20women&aspect=4:5',
    },
    {
      id: 20,
      title: 'Kanchipuram Silk Saree',
      price: 7999,
      originalPrice: 12999,
      imageUrl: 'https://api.a0.dev/assets/image?text=kanchipuram%20silk%20saree%20with%20golden%20border&aspect=4:5',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Trending Dresses</Text>
        <View style={styles.headerIcons}>
          <Search size={24} color="#333" style={styles.icon} />
          <ShoppingCart size={24} color="#333" style={styles.icon} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
              item={product}
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
        paddingTop: Platform.OS == 'ios' ? 70 : 30
    
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
