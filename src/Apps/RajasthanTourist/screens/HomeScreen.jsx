import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

const places = [
  {
    id: 1,
    name: 'Hawa Mahal',
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    description: 'Palace of Winds, an iconic landmark of Jaipur',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Mehrangarh Fort',
    location: 'Jodhpur',
    image: 'https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b',
    description: 'One of the largest forts in India',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'City Palace',
    location: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e',
    description: 'Royal palace complex with stunning architecture',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Amber Fort',
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada',
    description: 'Majestic fort complex combining Rajput and Mughal architecture',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Jaisalmer Fort',
    location: 'Jaisalmer',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
    description: 'Living fort in the heart of the Thar Desert',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Lake Pichola',
    location: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1586183189334-1677ab81e3e0',
    description: 'Artificial fresh water lake with stunning palace views',
    rating: 4.6,
  }
];

const categories = [
  'All', 'Popular', 'Forts', 'Palaces', 'Lakes', 'Temples', 'Museums'
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Discover</Text>
        <Text style={styles.title}>Rajasthan's Beauty</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <Text style={styles.searchPlaceholder}>Search destinations...</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.categoryButton,
              index === 0 && styles.activeCategoryButton
            ]}
          >
            <Text style={[
              styles.categoryText,
              index === 0 && styles.activeCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.placesContainer}>
        {places.map(place => (
          <TouchableOpacity key={place.id} style={styles.placeCard}>
            <Image
              source={{ uri: place.image }}
              style={styles.placeImage}
            />
            <View style={styles.placeInfo}>
              <View style={styles.placeHeader}>
                <Text style={styles.placeName}>{place.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{place.rating}</Text>
                  <Text style={styles.ratingMax}>/5</Text>
                </View>
              </View>
              <Text style={styles.placeLocation}>{place.location}</Text>
              <Text style={styles.placeDescription}>{place.description}</Text>
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
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#1D3557',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1FAEE',
    margin: 20,
    padding: 15,
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1FAEE',
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#E63946',
  },
  categoryText: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
  },
  placesContainer: {
    padding: 20,
  },
  placeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeInfo: {
    padding: 15,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1D3557',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#F1FAEE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#E63946',
  },
  ratingMax: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  placeLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  placeDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});