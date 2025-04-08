import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon } from 'lucide-react-native';

const POPULAR_SEARCHES = ['Power Tools', 'Hand Tools', 'Safety Equipment', 'Garden Tools'];

const SEARCH_RESULTS = [
  {
    id: 1,
    name: 'DeWalt Power Drill',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: 'Professional Tool Set',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1581147036324-c1c88bb273b4?w=400&q=80',
    rating: 4.8,
    reviews: 256,
  },
];

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for tools..."
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.popularSearches}>
            {POPULAR_SEARCHES.map((search, index) => (
              <TouchableOpacity key={index} style={styles.searchTag}>
                <Text style={styles.searchTagText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {SEARCH_RESULTS.map((product) => (
            <TouchableOpacity key={product.id} style={styles.resultCard}>
              <Image source={{ uri: product.image }} style={styles.resultImage} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{product.name}</Text>
                <Text style={styles.resultPrice}>${product.price}</Text>
                <Text style={styles.resultMeta}>
                  ★ {product.rating} ({product.reviews} reviews)
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1e293b',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 16,
  },
  popularSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  searchTag: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  searchTagText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#64748b',
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultImage: {
    width: 100,
    height: 100,
  },
  resultInfo: {
    flex: 1,
    padding: 12,
  },
  resultName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#1e293b',
  },
  resultPrice: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#2563eb',
    marginTop: 4,
  },
  resultMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
});