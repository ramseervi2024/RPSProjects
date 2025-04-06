import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

const hotels = [
  {
    id: '1',
    name: 'Grand Hotel Paris',
    location: 'Paris City Center',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
    rating: 4.8,
    reviews: 2345,
    price: 299,
  },
  {
    id: '2',
    name: 'The Ritz London',
    location: 'Westminster Borough',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80',
    rating: 4.9,
    reviews: 3456,
    price: 499,
  },
  {
    id: '3',
    name: 'Plaza New York',
    location: 'Manhattan',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80',
    rating: 4.7,
    reviews: 1234,
    price: 399,
  },
];

export default function StaysScreen() {
  const renderHotelItem = ({ item }) => (
    <TouchableOpacity style={styles.hotelCard}>
      <Image source={{ uri: item.image }} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFB700" fill="#FFB700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviews} reviews)</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.priceUnit}>/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Stays</Text>
        <Text style={styles.headerSubtitle}>Find and manage your bookings</Text>
      </View>

      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
  hotelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hotelImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  hotelInfo: {
    padding: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0071C2',
  },
  priceUnit: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
});