import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';
import { format } from 'date-fns';

export default function BookingsScreen() {
  const bookings = [
    {
      id: 1,
      tentName: 'Wedding Marquee',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-17'),
      status: 'upcoming',
    },
    {
      id: 2,
      tentName: 'Party Tent',
      startDate: new Date('2024-03-20'),
      endDate: new Date('2024-03-21'),
      status: 'upcoming',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <View href="/bookings/new" asChild>
          <TouchableOpacity style={styles.newButton}>
            <Text style={styles.newButtonText}>New Booking</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View href={`/bookings/${item.id}`} asChild>
            <TouchableOpacity style={styles.bookingCard}>
              <Text style={styles.tentName}>{item.tentName}</Text>
              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#6b7280" />
                  <Text style={styles.detailText}>
                    {format(item.startDate, 'MMM d')} - {format(item.endDate, 'MMM d, yyyy')}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.detailText}>
                    {format(item.startDate, 'h:mm a')}
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, item.status === 'upcoming' ? styles.upcomingBadge : styles.completedBadge]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#1f2937',
  },
  newButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newButtonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#ffffff',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  tentName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 12,
  },
  bookingDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingBadge: {
    backgroundColor: '#dbeafe',
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
  },
  statusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#1f2937',
    textTransform: 'capitalize',
  },
});