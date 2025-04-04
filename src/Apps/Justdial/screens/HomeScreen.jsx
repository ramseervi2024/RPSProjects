import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

const categories = [
  { id: 1, name: 'Restaurants', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500' },
  { id: 2, name: 'Hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
  { id: 3, name: 'Shopping', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500' },
  { id: 4, name: 'Healthcare', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500' },
];

const topBusinesses = [
  { id: 1, name: 'The Grand Restaurant', rating: 4.5, image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500' },
  { id: 2, name: 'Luxury Hotel & Spa', rating: 4.8, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500' },
  { id: 3, name: 'City Mall', rating: 4.3, image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=500' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Find the best services near you</Text>
      </View>

      <TouchableOpacity style={styles.searchBar}>
        <Search size={20} color="#666" />
        <Text style={styles.searchText}>Search for services, businesses...</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Rated Near You</Text>
        {topBusinesses.map((business) => (
          <TouchableOpacity key={business.id} style={styles.businessCard}>
            <Image source={{ uri: business.image }} style={styles.businessImage} />
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>{business.name}</Text>
              <Text style={styles.businessRating}>⭐ {business.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryCard: {
    marginRight: 15,
    width: 120,
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  businessCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  businessImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  businessInfo: {
    flex: 1,
    padding: 10,
  },
  businessName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  businessRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
});