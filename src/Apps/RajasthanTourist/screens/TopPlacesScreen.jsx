import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';

const topPlaces = [
  {
    id: 1,
    name: 'Taj Lake Palace',
    location: 'Udaipur',
    image: 'https://plus.unsplash.com/premium_photo-1697729790981-cdf4d9b7a6cc?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
    description: 'Luxury hotel on Lake Pichola, former summer palace',
    highlights: ['Floating Palace', 'Royal Heritage', 'Luxury Experience'],
  },
  {
    id: 2,
    name: 'Jal Mahal',
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1617516202907-ff85692a5b22',
    rating: 4.8,
    description: 'Palace in the middle of Man Sagar Lake',
    highlights: ['Water Palace', 'Architectural Wonder', 'Scenic Beauty'],
  },
  {
    id: 3,
    name: 'Ranakpur Jain Temple',
    location: 'Pali',
    image: 'https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b',
    rating: 4.7,
    description: 'Ancient Jain temple with intricate marble carvings',
    highlights: ['1444 Marble Pillars', 'Detailed Sculptures', 'Sacred Site'],
  },
];

export default function TopPlacesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Places</Text>
        <Text style={styles.subtitle}>Must-visit destinations in Rajasthan</Text>
      </View>

      <View style={styles.placesContainer}>
        {topPlaces.map(place => (
          <TouchableOpacity key={place.id} style={styles.placeCard}>
            <Image
              source={{ uri: place.image }}
              style={styles.placeImage}
            />
            <View style={styles.ratingBadge}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{place.rating}</Text>
            </View>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeLocation}>{place.location}</Text>
              <Text style={styles.placeDescription}>{place.description}</Text>
              <View style={styles.highlightsContainer}>
                {place.highlights.map((highlight, index) => (
                  <View key={index} style={styles.highlightBadge}>
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
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
    backgroundColor: '#E63946',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
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
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#1D3557',
    marginLeft: 4,
  },
  placeInfo: {
    padding: 15,
  },
  placeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D3557',
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
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  highlightBadge: {
    backgroundColor: '#F1FAEE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  highlightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1D3557',
  },
});