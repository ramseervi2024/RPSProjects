import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapPin, Clock, Star } from 'lucide-react-native';

const SAMPLE_PLACES = [
  {
    id: '1',
    name: 'Central Park',
    address: 'New York, NY 10022',
    type: 'favorite',
  },
  {
    id: '2',
    name: 'Times Square',
    address: 'Manhattan, NY 10036',
    type: 'recent',
  },
  {
    id: '3',
    name: 'Brooklyn Bridge',
    address: 'Brooklyn, NY 11201',
    type: 'favorite',
  },
];

export default function SearchScreen() {
  const [savedPlaces] = useState(SAMPLE_PLACES);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Places</Text>
      </View>

      <View style={styles.searchContainer}>
        <View
          placeholder="Search location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: 'YOUR_GOOGLE_MAPS_API_KEY',
            language: 'en',
          }}
          styles={{
            container: styles.searchInputContainer,
            textInput: styles.searchInput,
          }}
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Places</Text>
          {savedPlaces.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeItem}>
              <View style={styles.placeIcon}>
                {place.type === 'favorite' ? (
                  <Star size={20} color="#2563eb" />
                ) : (
                  <Clock size={20} color="#64748b" />
                )}
              </View>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
              </View>
              <MapPin size={20} color="#64748b" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInputContainer: {
    flex: 0,
  },
  searchInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeIcon: {
    marginRight: 16,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
});