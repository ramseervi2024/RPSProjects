import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Search, MapPin } from 'lucide-react-native';

const nearbyLocations = [
  {
    id: '1',
    name: 'Downtown McDonald\'s',
    address: '123 Main Street',
    distance: '0.5 miles',
    isOpen: true,
    hours: '24/7',
  },
  {
    id: '2',
    name: 'Westfield Mall McDonald\'s',
    address: '456 Shopping Center Blvd',
    distance: '1.2 miles',
    isOpen: true,
    hours: '6:00 AM - 11:00 PM',
  },
  {
    id: '3',
    name: 'Highway Junction McDonald\'s',
    address: '789 Interstate Drive',
    distance: '2.5 miles',
    isOpen: true,
    hours: '24/7',
  },
];

export default function LocationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Restaurant</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter your location"
            placeholderTextColor="#666666"
          />
        </View>
      </View>

      <View style={styles.locationsList}>
        {nearbyLocations.map((location) => (
          <View key={location.id} style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <MapPin size={20} color="#DA291C" />
              <Text style={styles.distance}>{location.distance}</Text>
              <View style={[styles.statusBadge, location.isOpen ? styles.openBadge : styles.closedBadge]}>
                <Text style={styles.statusText}>{location.isOpen ? 'Open' : 'Closed'}</Text>
              </View>
            </View>
            <Text style={styles.locationName}>{location.name}</Text>
            <Text style={styles.locationAddress}>{location.address}</Text>
            <Text style={styles.locationHours}>Hours: {location.hours}</Text>
          </View>
        ))}
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
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#333333',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
  },
  locationsList: {
    padding: 20,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  distance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openBadge: {
    backgroundColor: '#E8F5E9',
  },
  closedBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#2E7D32',
  },
  locationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 8,
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  locationHours: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
});