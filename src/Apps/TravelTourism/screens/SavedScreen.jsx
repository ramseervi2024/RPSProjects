import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

const savedPlaces = [
  {
    id: '1',
    name: 'Amalfi Coast',
    location: 'Italy',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    savedDate: '2 days ago',
  },
  {
    id: '2',
    name: 'Machu Picchu',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    savedDate: '1 week ago',
  },
  {
    id: '3',
    name: 'Great Barrier Reef',
    location: 'Australia',
    image: 'https://images.unsplash.com/photo-1582434221241-50b269a36040?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    savedDate: '2 weeks ago',
  },
];

export default function SavedScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Places</Text>
        <Text style={styles.subtitle}>{savedPlaces.length} destinations saved</Text>
      </View>

      {savedPlaces.map((place) => (
        <TouchableOpacity key={place.id} style={styles.placeCard}>
          <Image source={{ uri: place.image }} style={styles.placeImage} />
          <View style={styles.placeInfo}>
            <View>
              <Text style={styles.placeName}>{place.name}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#72777A" />
                <Text style={styles.placeLocation}>{place.location}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{place.rating}</Text>
            </View>
          </View>
          <Text style={styles.savedDate}>Saved {place.savedDate}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#72777A',
  },
  placeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeLocation: {
    fontSize: 14,
    color: '#72777A',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  savedDate: {
    fontSize: 12,
    color: '#72777A',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});