import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Search, MapPin } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

const popularDestinations = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
  },
];

const experiences = [
  {
    id: '1',
    title: 'Sunset Sailing',
    location: 'Mediterranean Sea',
    image: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?q=80&w=800&auto=format&fit=crop',
    price: 149,
  },
  {
    id: '2',
    title: 'Desert Safari',
    location: 'Dubai',
    image: 'https://images.unsplash.com/photo-1451440063999-77a8b2960d2b?q=80&w=800&auto=format&fit=crop',
    price: 199,
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Traveler!</Text>
        <Text style={styles.title}>Discover your next adventure</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#72777A" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#72777A"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationsContainer}
        >
          {popularDestinations.map((destination) => (
            <TouchableOpacity key={destination.id} style={styles.destinationCard}>
              <Image
                source={{ uri: destination.image }}
                style={styles.destinationImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              />
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color="#ffffff" />
                  <Text style={styles.destinationCountry}>{destination.country}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>★ {destination.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Experiences</Text>
        {experiences.map((experience) => (
          <TouchableOpacity key={experience.id} style={styles.experienceCard}>
            <Image
              source={{ uri: experience.image }}
              style={styles.experienceImage}
            />
            <View style={styles.experienceInfo}>
              <Text style={styles.experienceTitle}>{experience.title}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#72777A" />
                <Text style={styles.experienceLocation}>{experience.location}</Text>
              </View>
              <Text style={styles.experiencePrice}>${experience.price}</Text>
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
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#72777A',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 20,
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 20,
    marginBottom: 16,
  },
  destinationsContainer: {
    paddingHorizontal: 20,
  },
  destinationCard: {
    width: SCREEN_WIDTH * 0.7,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  destinationInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationCountry: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 4,
  },
  ratingContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  experienceCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  experienceImage: {
    width: 100,
    height: 100,
  },
  experienceInfo: {
    flex: 1,
    padding: 12,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  experienceLocation: {
    fontSize: 14,
    color: '#72777A',
    marginLeft: 4,
  },
  experiencePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF385C',
    marginTop: 8,
  },
});