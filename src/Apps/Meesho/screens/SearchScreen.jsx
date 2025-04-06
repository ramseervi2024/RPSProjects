import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon } from 'lucide-react-native';

const TRENDING_SEARCHES = [
  'Summer Dresses',
  'Men\'s T-Shirts',
  'Kids Party Wear',
  'Ethnic Wear',
  'Casual Shoes',
];

const RECENT_SEARCHES = [
  'Floral Print Dress',
  'Cotton T-Shirt',
  'Denim Jacket',
];

const SEARCH_RESULTS = [
  {
    id: 1,
    name: 'Floral Print Dress',
    price: 499,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 899,
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500',
    rating: 4.2,
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Products, Brands and More"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setIsSearching(text.length > 0);
            }}
          />
        </View>
      </View>

      {isSearching ? (
        <FlatList
          data={SEARCH_RESULTS}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem}>
              <Image source={{ uri: item.image }} style={styles.resultImage} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultPrice}>₹{item.price}</Text>
                <Text style={styles.resultRating}>★ {item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {RECENT_SEARCHES.map((search, index) => (
              <TouchableOpacity key={index} style={styles.searchItem}>
                <SearchIcon size={16} color="#666666" />
                <Text style={styles.searchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Searches</Text>
            {TRENDING_SEARCHES.map((search, index) => (
              <TouchableOpacity key={index} style={styles.searchItem}>
                <SearchIcon size={16} color="#666666" />
                <Text style={styles.searchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
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
    backgroundColor: '#E83E8C',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    marginBottom: 16,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginLeft: 12,
  },
  resultItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  resultInfo: {
    marginLeft: 16,
    flex: 1,
  },
  resultName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  resultPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#E83E8C',
    marginTop: 4,
  },
  resultRating: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
});