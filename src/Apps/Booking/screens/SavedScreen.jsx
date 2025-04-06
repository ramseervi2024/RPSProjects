import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Heart, Star } from 'lucide-react-native';

const savedHotels = [
  {
    id: '1',
    name: 'Four Seasons Paris',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80',
    rating: 4.9,
    price: 599,
  },
  {
    id: '2',
    name: 'Mandarin Oriental',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
    rating: 4.8,
    price: 499,
  },
];

export default function SavedScreen() {
  const renderSavedItem = ({ item }) => (
    <TouchableOpacity style={styles.savedCard}>
      <Image source={{ uri: item.image }} style={styles.savedImage} />
      <View style={styles.savedInfo}>
        <Text style={styles.savedName}>{item.name}</Text>
        <Text style={styles.savedLocation}>{item.location}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFB700" fill="#FFB700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.savedPrice}>${item.price}/night</Text>
      </View>
      <TouchableOpacity style={styles.heartButton}>
        <Heart size={24} color="#FF3366" fill="#FF3366" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
        <Text style={styles.headerSubtitle}>Your favorite places</Text>
      </View>

      <FlatList
        data={savedHotels}
        renderItem={renderSavedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved places yet</Text>
            <Text style={styles.emptySubtext}>Start exploring and save your favorite places</Text>
          </View>
        }
      />
    </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  listContainer: {
    padding: 20,
  },
  savedCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  savedImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  savedInfo: {
    flex: 1,
    padding: 12,
  },
  savedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  savedLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  savedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0071C2',
  },
  heartButton: {
    padding: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});