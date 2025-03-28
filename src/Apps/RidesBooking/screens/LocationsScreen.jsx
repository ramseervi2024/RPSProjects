import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star, Plus } from 'lucide-react-native';

const savedLocations = [
  {
    id: '1',
    name: 'Home',
    address: '123 Main Street, Apt 4B',
    favorite: true,
  },
  {
    id: '2',
    name: 'Work',
    address: '456 Business Ave, Floor 12',
    favorite: true,
  },
  {
    id: '3',
    name: 'Gym',
    address: '789 Fitness Lane',
    favorite: false,
  },
  {
    id: '4',
    name: 'Shopping Mall',
    address: '321 Retail Road',
    favorite: false,
  },
];

export default function LocationsScreen() {
  const [locations, setLocations] = useState(savedLocations);

  const toggleFavorite = (id) => {
    setLocations(
      locations.map((location) =>
        location.id === id
          ? { ...location, favorite: !location.favorite }
          : location
      )
    );
  };

  const renderLocation = ({ item }) => (
    <Pressable style={styles.locationCard}>
      <View style={styles.locationInfo}>
        <MapPin size={24} color="#666666" />
        <View style={styles.locationText}>
          <Text style={styles.locationName}>{item.name}</Text>
          <Text style={styles.locationAddress}>{item.address}</Text>
        </View>
      </View>
      <Pressable onPress={() => toggleFavorite(item.id)}>
        <Star
          size={24}
          color={item.favorite ? '#FFD700' : '#666666'}
          fill={item.favorite ? '#FFD700' : 'none'}
        />
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Places</Text>
      </View>

      <Pressable style={styles.addButton}>
        <Plus size={24} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add New Place</Text>
      </Pressable>

      <FlatList
        data={locations}
        renderItem={renderLocation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.locationsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1A1A1A',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  locationsList: {
    padding: 20,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    marginLeft: 12,
    flex: 1,
  },
  locationName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  locationAddress: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});