import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import { Search, ShoppingCart } from 'lucide-react-native';

export default function AllProductList({ route }) {
  // Destructure the passed parameter
  const { type } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  // Extended the featuredProducts array to include 20 products
  const category = 'Wedding Dresses'; // The category passed (you can change this dynamically)

const featuredProducts = [
  {
    id: 1,
    title: 'Luxurious Wedding Gown with Lace Details',
    price: 24999,
    originalPrice: 49999,
    imageUrl: `https://api.a0.dev/assets/image?text=${category}%20luxurious%20wedding%20gown%20with%20lace%20details&aspect=4:5`,
  },
  {
    id: 2,
    title: 'Bridal Silk Lehenga with Heavy Embroidery',
    price: 19999,
    originalPrice: 34999,
    imageUrl: `https://api.a0.dev/assets/image?text=${category}%20bridal%20silk%20lehenga%20with%20heavy%20embroidery&aspect=4:5`,
  },
  {
    id: 3,
    title: 'Satin Wedding Dress with Crystal Beading',
    price: 22999,
    originalPrice: 42999,
    imageUrl: `https://api.a0.dev/assets/image?text=${category}%20satin%20wedding%20dress%20with%20crystal%20beading&aspect=4:5`,
  },
  {
    id: 4,
    title: 'Traditional Velvet Bridal Saree',
    price: 16999,
    originalPrice: 31999,
    imageUrl: `https://api.a0.dev/assets/image?text=${category}%20traditional%20velvet%20bridal%20saree&aspect=4:5`,
  },
  {
    id: 5,
    title: 'Embroidered Wedding Anarkali Dress',
    price: 15999,
    originalPrice: 29999,
    imageUrl: `https://api.a0.dev/assets/image?text=${category}%20embroidered%20wedding%20anarkali%20dress&aspect=4:5`,
  },
  {
    id: 6,
    title: 'Designer Bridal Choli with Mirror Work',
    price: 18999,
    originalPrice: 36999,
    imageUrl: `https://api.a0.dev/assets/image?text=${category}%20designer%20bridal%20choli%20with%20mirror%20work&aspect=4:5`,
  },
];


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{type || 'Top Trending Dresses'} </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* <Text style={styles.sectionTitle}>{type || 'Featured Collection'}</Text> */}
        <View style={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              onPress={() => { }}
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
    paddingTop: 60,
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
