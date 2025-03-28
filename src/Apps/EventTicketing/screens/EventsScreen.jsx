import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, MapPin, Clock } from 'lucide-react-native';
import { Link } from 'expo-router';

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: 'July 15-17, 2025',
    time: '12:00 PM',
    location: 'Central Park, NYC',
    category: 'Music',
  },
  {
    id: '2',
    title: 'Tech Conference 2025',
    date: 'August 22-24, 2025',
    time: '9:00 AM',
    location: 'Moscone Center, SF',
    category: 'Tech',
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    date: 'September 5, 2025',
    time: '11:00 AM',
    location: 'Downtown Miami',
    category: 'Food',
  },
];

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          
          {UPCOMING_EVENTS.map((event) => (
            <View key={event.id} href={`/event/${event.id}`} asChild>
              <TouchableOpacity style={styles.eventCard}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{event.category}</Text>
                </View>
                
                <Text style={styles.eventTitle}>{event.title}</Text>
                
                <View style={styles.eventDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#6b7280" />
                    <Text style={styles.detailText}>{event.date}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.detailText}>{event.time}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <MapPin size={16} color="#6b7280" />
                    <Text style={styles.detailText}>{event.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  filterButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  categoryTag: {
    backgroundColor: '#eff6ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#6b7280',
    fontSize: 14,
  },
});