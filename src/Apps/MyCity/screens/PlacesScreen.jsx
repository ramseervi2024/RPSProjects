import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

const mockPlaces = [
  {
    id: '1',
    name: 'Central Park',
    category: 'Park',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
    distance: '1.2 km',
  },
  {
    id: '2',
    name: 'City Museum',
    category: 'Museum',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400',
    distance: '2.5 km',
  },
  // Add more mock places
];

export default function PlacesScreen() {
 
  return (
    <View style={styles.container}>
      <FlatList
        data={mockPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.placeCard}>
            <Image source={{ uri: item.image }} style={styles.placeImage} />
            <View style={styles.placeContent}>
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeCategory}>{item.category}</Text>
              <View style={styles.placeDetails}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
                <View style={styles.distanceContainer}>
                  <MapPin size={16} color="#8E8E93" />
                  <Text style={styles.distance}>{item.distance}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  placeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeContent: {
    padding: 16,
  },
  placeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  placeCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  placeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1C1C1E',
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
});