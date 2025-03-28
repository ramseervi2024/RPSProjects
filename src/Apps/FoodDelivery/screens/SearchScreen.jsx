import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon } from 'lucide-react-native';

const POPULAR_SEARCHES = ['Pizza', 'Burger', 'Sushi', 'Italian', 'Chinese'];

const SEARCH_RESULTS = [
  {
    id: 1,
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    price: '$12.99',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Classic Burger',
    restaurant: 'Burger House',
    price: '$9.99',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
  },
];

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#7C7C7C" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or restaurants"
            placeholderTextColor="#7C7C7C"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.popularSearches}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.tagsContainer}>
            {POPULAR_SEARCHES.map((search, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.searchResults}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {SEARCH_RESULTS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.resultCard}>
              <Image source={{ uri: item.image }} style={styles.resultImage} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultRestaurant}>{item.restaurant}</Text>
                <Text style={styles.resultPrice}>{item.price}</Text>
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
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  popularSearches: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#1A1A1A',
  },
  searchResults: {
    padding: 20,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  resultInfo: {
    flex: 1,
    padding: 12,
  },
  resultName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  resultRestaurant: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7C7C7C',
    marginTop: 4,
  },
  resultPrice: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#FF4B3A',
    marginTop: 8,
  },
});