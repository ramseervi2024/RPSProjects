import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MapPin } from 'lucide-react-native';

const nearbyBusinesses = [
  {
    id: 1,
    name: 'Central Cafe',
    distance: '0.3 km',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500',
    address: '123 Main St, Downtown',
  },
  {
    id: 2,
    name: 'City Pharmacy',
    distance: '0.5 km',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500',
    address: '456 Health Ave',
  },
  {
    id: 3,
    name: 'Quick Mart',
    distance: '0.7 km',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500',
    address: '789 Market St',
  },
];

export default function NearMeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Near Me</Text>
        <View style={styles.locationContainer}>
          <MapPin size={20} color="#E53935" />
          <Text style={styles.location}>Current Location</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {nearbyBusinesses.map((business) => (
          <View key={business.id} style={styles.card}>
            <Image source={{ uri: business.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{business.name}</Text>
              <Text style={styles.address}>{business.address}</Text>
              <View style={styles.details}>
                <Text style={styles.distance}>{business.distance}</Text>
                <Text style={styles.rating}>⭐ {business.rating}</Text>
              </View>
            </View>
          </View>
        ))}
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  location: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  distance: {
    fontSize: 14,
    color: '#E53935',
    fontFamily: 'Inter_400Regular',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
});