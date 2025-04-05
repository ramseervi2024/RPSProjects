import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const CATEGORIES = [
  { id: '1', name: 'Electronics', items: '50,000+ Products' },
  { id: '2', name: 'Fashion', items: '1,00,000+ Products' },
  { id: '3', name: 'Home & Kitchen', items: '30,000+ Products' },
  { id: '4', name: 'Beauty & Health', items: '20,000+ Products' },
  { id: '5', name: 'Sports & Fitness', items: '15,000+ Products' },
  { id: '6', name: 'Books & Media', items: '25,000+ Products' },
  { id: '7', name: 'Toys & Baby', items: '10,000+ Products' },
  { id: '8', name: 'Automotive', items: '5,000+ Products' },
];

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Categories</Text>
      </View>

      {CATEGORIES.map(category => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
          <View>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.itemCount}>{category.items}</Text>
          </View>
          <ChevronRight color="#666" size={20} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 12,
    color: '#666',
  },
});