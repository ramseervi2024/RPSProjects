import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Heart } from 'lucide-react-native';

const SAVED_PROPERTIES = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    title: 'Modern Villa with Pool',
    location: 'Beverly Hills, CA',
    price: '$5,250,000',
    beds: 5,
    baths: 4,
    sqft: 4500,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    title: 'Luxury Penthouse',
    location: 'Manhattan, NY',
    price: '$3,800,000',
    beds: 3,
    baths: 2,
    sqft: 2100,
  },
];

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Properties</Text>
        <Text style={styles.subtitle}>{SAVED_PROPERTIES.length} properties saved</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {SAVED_PROPERTIES.map((property) => (
          <TouchableOpacity key={property.id} style={styles.propertyCard}>
            <Image source={{ uri: property.image }} style={styles.propertyImage} />
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart size={20} color="#ef4444" fill="#ef4444" />
            </TouchableOpacity>
            <View style={styles.propertyContent}>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.locationText}>{property.location}</Text>
              </View>
              <Text style={styles.price}>{property.price}</Text>
              <View style={styles.propertyDetails}>
                <Text style={styles.detail}>{property.beds} beds</Text>
                <Text style={styles.detailSeparator}>•</Text>
                <Text style={styles.detail}>{property.baths} baths</Text>
                <Text style={styles.detailSeparator}>•</Text>
                <Text style={styles.detail}>{property.sqft} sqft</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  title: {
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
  content: {
    padding: 24,
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  propertyContent: {
    padding: 16,
  },
  propertyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
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
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1e40af',
    marginBottom: 8,
  },
  propertyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748b',
  },
  detailSeparator: {
    color: '#94a3b8',
    marginHorizontal: 8,
  },
});