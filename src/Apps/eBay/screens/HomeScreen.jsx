import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ChevronRight } from 'lucide-react-native';

const CATEGORIES = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },
  { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80' },
  { id: 3, name: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80' },
  { id: 4, name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80' },
];

const DEALS = [
  {
    id: 1,
    title: 'Apple iPhone 13',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    discount: 20,
  },
  {
    id: 2,
    title: 'Samsung 4K TV',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    discount: 30,
  },
  {
    id: 3,
    title: 'Nike Air Max',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    discount: 15,
  },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>eBay</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color="#666" />
          <Text style={styles.searchText}>Search for anything</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(category => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.dealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Deals</Text>
            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DEALS.map(deal => (
              <TouchableOpacity key={deal.id} style={styles.dealCard}>
                <Image source={{ uri: deal.image }} style={styles.dealImage} />
                <View style={styles.dealContent}>
                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <Text style={styles.dealPrice}>${deal.price}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{deal.discount}% OFF</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53238',
    marginBottom: 12,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  categoriesSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#666',
    marginRight: 4,
  },
  categoryCard: {
    marginRight: 16,
    width: 120,
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  dealsSection: {
    padding: 16,
  },
  dealCard: {
    marginRight: 16,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dealImage: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dealContent: {
    padding: 12,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dealPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53238',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#e53238',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});