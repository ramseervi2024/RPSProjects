import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

const FEATURED_PROPERTIES = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    title: 'Modern Villa with Pool',
    location: 'Beverly Hills, CA',
    price: '$5,250,000',
    rating: 4.8,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    title: 'Luxury Penthouse',
    location: 'Manhattan, NY',
    price: '$3,800,000',
    rating: 4.9,
  },
];

const RECENT_PROPERTIES = [
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    title: 'Cozy Downtown Loft',
    location: 'San Francisco, CA',
    price: '$1,200,000',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
    title: 'Waterfront Estate',
    location: 'Miami Beach, FL',
    price: '$7,500,000',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, John 👋</Text>
        <Text style={styles.subtitle}>Find your perfect home</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FEATURED_PROPERTIES.map((property) => (
            <TouchableOpacity key={property.id} style={styles.featuredCard}>
              <Image source={{ uri: property.image }} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <Text style={styles.propertyTitle}>{property.title}</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.locationText}>{property.location}</Text>
                </View>
                <View style={styles.propertyFooter}>
                  <Text style={styles.price}>{property.price}</Text>
                  <View style={styles.rating}>
                    <Star size={16} color="#eab308" fill="#eab308" />
                    <Text style={styles.ratingText}>{property.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Properties</Text>
        {RECENT_PROPERTIES.map((property) => (
          <TouchableOpacity key={property.id} style={styles.recentCard}>
            <Image source={{ uri: property.image }} style={styles.recentImage} />
            <View style={styles.recentContent}>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.locationText}>{property.location}</Text>
              </View>
              <Text style={styles.price}>{property.price}</Text>
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
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#0f172a',
    marginBottom: 16,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  featuredContent: {
    padding: 16,
  },
  propertyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  propertyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#1e40af',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0f172a',
    marginLeft: 4,
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recentImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  recentContent: {
    flex: 1,
    padding: 16,
  },
});