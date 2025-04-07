import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, ChevronDown } from 'lucide-react-native';

const products = [
  {
    id: 1,
    name: 'Grey Night Marble',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
    description: 'Premium quality grey marble with distinctive patterns',
  },
  {
    id: 2,
    name: 'Carrara White',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1586871372605-c3c87ef45af3?w=800&auto=format&fit=crop',
    description: 'Classic white marble with subtle grey veining',
  },
  {
    id: 3,
    name: 'Black Galaxy',
    price: '$399',
    image: 'https://images.unsplash.com/photo-1604715892639-61d265a84377?w=800&auto=format&fit=crop',
    description: 'Elegant black granite with copper sparkles',
  },
];

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Sort by</Text>
            <ChevronDown size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#1a1a1a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.productList}>
        {products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginLeft: 8,
  },
  filterText: {
    fontFamily: 'Inter',
    marginRight: 4,
    color: '#1a1a1a',
  },
  productList: {
    padding: 20,
  },
  productCard: {
    marginBottom: 20,
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
    fontSize: 18,
    color: '#1a1a1a',
  },
  productDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  productPrice: {
    fontFamily: 'InterBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginTop: 8,
  },
});