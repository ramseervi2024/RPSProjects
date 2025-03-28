import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react-native';

const EVENTS = [
  {
    id: '1',
    title: 'Village Festival',
    date: '2024-02-20',
    time: '10:00 AM',
    location: 'Village Square',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80',
    category: 'Festival',
  },
  {
    id: '2',
    title: 'Farmers Market',
    date: '2024-02-22',
    time: '8:00 AM',
    location: 'Community Center',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80',
    category: 'Market',
  },
  {
    id: '3',
    title: 'Traditional Dance Workshop',
    date: '2024-02-25',
    time: '4:00 PM',
    location: 'Cultural Center',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=500&q=80',
    category: 'Workshop',
  },
];

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Village Events</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <CalendarIcon size={24} color="#166534" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.categoryButton, styles.categoryButtonActive]}>
            <Text style={[styles.categoryText, styles.categoryTextActive]}>All Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Festivals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Markets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Workshops</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.eventsContainer}>
        {EVENTS.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventContent}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{event.category}</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventDetailItem}>
                  <Clock size={16} color="#64748b" />
                  <Text style={styles.eventDetailText}>{event.time}</Text>
                </View>
                <View style={styles.eventDetailItem}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
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
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f8fafc',
  },
  categoryButtonActive: {
    backgroundColor: '#166534',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  eventsContainer: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventContent: {
    padding: 15,
  },
  categoryTag: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryTagText: {
    color: '#166534',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#334155',
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 15,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: '#166534',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});