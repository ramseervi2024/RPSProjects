import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Search, MapPin, Calendar, Users } from 'lucide-react-native';

const popularDestinations = [
  {
    id: '1',
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80',
    properties: '1,234',
  },
  {
    id: '2',
    name: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80',
    properties: '2,345',
  },
  {
    id: '3',
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80',
    properties: '3,456',
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Find your next stay</Text>
        <Text style={styles.subtitle}>Search deals on hotels, homes, and much more...</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MapPin size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Where are you going?"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.searchFilters}>
          <TouchableOpacity style={styles.filterButton}>
            <Calendar size={20} color="#6B7280" />
            <Text style={styles.filterText}>Check in - Check out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Users size={20} color="#6B7280" />
            <Text style={styles.filterText}>2 adults · 0 children</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationsScroll}>
          {popularDestinations.map((destination) => (
            <View key={destination.id} href={`/destination/${destination.id}`} asChild>
              <TouchableOpacity style={styles.destinationCard}>
                <Image source={{ uri: destination.image }} style={styles.destinationImage} />
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationProperties}>{destination.properties} properties</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#003580',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#003580',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  searchFilters: {
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0071C2',
    borderRadius: 8,
    padding: 12,
  },
  searchButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  destinationsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  destinationCard: {
    width: 200,
    marginRight: 16,
  },
  destinationImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  destinationProperties: {
    fontSize: 14,
    color: '#6B7280',
  },
});