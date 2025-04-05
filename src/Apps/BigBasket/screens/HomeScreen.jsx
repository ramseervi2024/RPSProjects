import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 1, name: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=80' },
  { id: 2, name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80' },
  { id: 3, name: 'Meat & Fish', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=80' },
  { id: 4, name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80' },
];

const deals = [
  { id: 1, name: 'Fresh Oranges', price: '4.99', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&q=80' },
  { id: 2, name: 'Organic Milk', price: '3.99', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80' },
  { id: 3, name: 'Whole Wheat Bread', price: '2.99', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Good Morning</Text>
            <TouchableOpacity>
              <Bell size={24} color="#16a34a" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.searchBar}>
            <Search size={20} color="#64748b" />
            <Text style={styles.searchText}>Search for groceries</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.dealsSection}>
            <Text style={styles.sectionTitle}>Today's Deals</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {deals.map((deal) => (
                <TouchableOpacity key={deal.id} style={styles.dealCard}>
                  <Image source={{ uri: deal.image }} style={styles.dealImage} />
                  <View style={styles.dealInfo}>
                    <Text style={styles.dealName}>{deal.name}</Text>
                    <Text style={styles.dealPrice}>${deal.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1f2937',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  searchText: {
    marginLeft: 8,
    color: '#64748b',
    fontFamily: 'Poppins_400Regular',
  },
  categoriesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 16,
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
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1f2937',
    textAlign: 'center',
  },
  dealsSection: {
    padding: 16,
  },
  dealCard: {
    marginRight: 16,
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dealImage: {
    width: 160,
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dealInfo: {
    padding: 12,
  },
  dealName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 4,
  },
  dealPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#16a34a',
  },
});