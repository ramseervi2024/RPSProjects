import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Beauty & Personal Care',
  'Sports & Outdoors',
  'Toys & Games',
  'Automotive',
  'Pet Supplies',
  'Health & Household',
];

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Shop By Department</Text>
      {CATEGORIES.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem}>
          <Text style={styles.categoryText}>{category}</Text>
          <ChevronRight size={24} color="#111111" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 16,
  },
});