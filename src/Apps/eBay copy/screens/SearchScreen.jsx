import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react-native';

const PRODUCTS = [
  {
    id: '1',
    title: 'Apple iPhone 13 Pro',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    rating: 4.8,
    reviews: 2456,
  },
  {
    id: '2',
    title: 'Samsung Galaxy S21',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80',
    rating: 4.6,
    reviews: 1832,
  },
  {
    id: '3',
    title: 'Sony WH-1000XM4',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
    rating: 4.9,
    reviews: 3421,
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for anything"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  productList: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53238',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#ffd700',
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviews: {
    color: '#666',
    fontSize: 12,
  },
});