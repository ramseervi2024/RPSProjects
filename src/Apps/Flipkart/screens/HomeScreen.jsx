import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: 1, name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop' },
  { id: 2, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop' },
  { id: 3, name: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop' },
  { id: 4, name: 'Beauty', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=200&fit=crop' },
];

const DEALS = [
  { id: 1, title: 'iPhone 13', price: '₹54,999', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop' },
  { id: 2, title: 'Samsung TV', price: '₹32,999', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop' },
  { id: 3, title: 'Nike Shoes', price: '₹4,999', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Search for products, brands and more</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <Pressable
            key={category.id}
            style={styles.categoryItem}
          >
            <Image source={{ uri: category.image }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{category.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.dealsSection}>
        <Text style={styles.sectionTitle}>Deals of the Day</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DEALS.map((deal) => (
            <Pressable key={deal.id} style={styles.dealCard}>
              <Image source={{ uri: deal.image }} style={styles.dealImage} />
              <Text style={styles.dealTitle}>{deal.title}</Text>
              <Text style={styles.dealPrice}>{deal.price}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  searchBar: {
    backgroundColor: '#2874F0',
    padding: 12,
  },
  searchText: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    color: '#666',
  },
  categoriesContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
  },
  dealsSection: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dealCard: {
    width: 150,
    marginRight: 15,
  },
  dealImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  dealTitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2874F0',
    marginTop: 4,
  },
});