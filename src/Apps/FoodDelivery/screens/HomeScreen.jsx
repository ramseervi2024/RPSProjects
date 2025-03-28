import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin } from 'lucide-react-native';

const CATEGORIES = [
  { id: 1, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop' },
  { id: 2, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop' },
  { id: 3, name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop' },
  { id: 4, name: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=100&h=100&fit=crop' },
];

const RESTAURANTS = [
  {
    id: 1,
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: '20-30',
    distance: '1.2',
  },
  {
    id: 2,
    name: 'Burger House',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=300&fit=crop',
    rating: 4.5,
    deliveryTime: '25-35',
    distance: '0.8',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, John! 👋</Text>
            <View style={styles.location}>
              <MapPin size={16} color="#FF4B3A" />
              <Text style={styles.locationText}>San Francisco, CA</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Popular Restaurants</Text>
        {RESTAURANTS.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
            <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View style={styles.restaurantDetails}>
                <Text style={styles.restaurantRating}>⭐ {restaurant.rating}</Text>
                <Text style={styles.restaurantDelivery}>🕒 {restaurant.deliveryTime} min</Text>
                <Text style={styles.restaurantDistance}>📍 {restaurant.distance} km</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7C7C7C',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoryCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#1A1A1A',
  },
  restaurantCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  restaurantDetails: {
    flexDirection: 'row',
    marginTop: 8,
  },
  restaurantRating: {
    marginRight: 16,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7C7C7C',
  },
  restaurantDelivery: {
    marginRight: 16,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7C7C7C',
  },
  restaurantDistance: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7C7C7C',
  },
});