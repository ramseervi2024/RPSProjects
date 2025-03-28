import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Clock } from 'lucide-react-native';

const upcomingTrips = [
  {
    id: '1',
    destination: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    startDate: '15 Mar 2024',
    duration: '7 days',
  },
  {
    id: '2',
    destination: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
    startDate: '2 Apr 2024',
    duration: '10 days',
  },
];

export default function TripsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Trips</Text>
        {upcomingTrips.map((trip) => (
          <TouchableOpacity key={trip.id} style={styles.tripCard}>
            <Image source={{ uri: trip.image }} style={styles.tripImage} />
            <View style={styles.tripInfo}>
              <Text style={styles.tripDestination}>{trip.destination}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#72777A" />
                <Text style={styles.tripCountry}>{trip.country}</Text>
              </View>
              <View style={styles.tripDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={14} color="#72777A" />
                  <Text style={styles.detailText}>{trip.startDate}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={14} color="#72777A" />
                  <Text style={styles.detailText}>{trip.duration}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.planTripButton}>
        <Text style={styles.planTripText}>Plan a New Trip</Text>
      </TouchableOpacity>
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
  tripCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripImage: {
    width: '100%',
    height: 200,
  },
  tripInfo: {
    padding: 16,
  },
  tripDestination: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripCountry: {
    fontSize: 14,
    color: '#72777A',
    marginLeft: 4,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#72777A',
    marginLeft: 4,
  },
  planTripButton: {
    backgroundColor: '#FF385C',
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  planTripText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});