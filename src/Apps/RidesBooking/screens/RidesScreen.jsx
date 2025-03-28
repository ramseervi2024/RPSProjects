import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Navigation } from 'lucide-react-native';

const rides = [
  {
    id: '1',
    from: '123 Main St',
    to: 'Airport Terminal 1',
    date: '2024-02-20',
    time: '14:30',
    status: 'completed',
    price: '$25',
  },
  {
    id: '2',
    from: 'Shopping Mall',
    to: 'Central Park',
    date: '2024-02-19',
    time: '11:15',
    status: 'completed',
    price: '$15',
  },
  {
    id: '3',
    from: 'Office Complex',
    to: 'Restaurant Row',
    date: '2024-02-18',
    time: '19:45',
    status: 'cancelled',
    price: '$18',
  },
];

export default function RidesScreen() {
  const renderRide = ({ item }) => (
    <Pressable style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <Text
          style={[
            styles.rideStatus,
            { color: item.status === 'completed' ? '#34C759' : '#FF3B30' },
          ]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <MapPin size={20} color="#666666" />
          <Text style={styles.locationText}>{item.from}</Text>
        </View>
        <View style={styles.locationRow}>
          <Navigation size={20} color="#666666" />
          <Text style={styles.locationText}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <View style={styles.timeContainer}>
          <Clock size={16} color="#666666" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rides</Text>
      </View>

      <FlatList
        data={rides}
        renderItem={renderRide}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ridesList}
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
  ridesList: {
    padding: 20,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rideDate: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  rideStatus: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  priceText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#007AFF',
  },
});