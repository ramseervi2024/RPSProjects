import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';
// import { Link } from 'expo-router';

const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival 2025',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    date: 'Jul 15-17',
    location: 'Central Park, NYC',
    price: '$299',
  },
  {
    id: '2',
    title: 'Tech Conference 2025',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    date: 'Aug 22-24',
    location: 'Moscone Center, SF',
    price: '$599',
  },
];

const CATEGORIES = [
  { id: '1', name: 'Music', emoji: '🎵' },
  { id: '2', name: 'Sports', emoji: '⚽' },
  { id: '3', name: 'Tech', emoji: '💻' },
  { id: '4', name: 'Arts', emoji: '🎨' },
  { id: '5', name: 'Food', emoji: '🍔' },
];

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, John! 👋</Text>
          <Text style={styles.subtitle}>Discover amazing events</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#94a3b8" />
            <Text style={styles.searchPlaceholder}>Search events...</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          {FEATURED_EVENTS.map((event) => (
            // <Link key={event.id} href={`/event/${event.id}`} asChild>
              <TouchableOpacity style={styles.eventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDetails}>{event.date} • {event.location}</Text>
                  <Text style={styles.eventPrice}>{event.price}</Text>
                </View>
              </TouchableOpacity>
            // </Link>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  searchPlaceholder: {
    color: '#94a3b8',
    flex: 1,
  },
  filterButton: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  categoriesList: {
    flexDirection: 'row',
  },
  categoryItem: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#4b5563',
  },
  featuredContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  eventDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
    marginTop: 8,
  },
});