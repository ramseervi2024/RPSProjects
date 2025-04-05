import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MapPin, Navigation } from 'lucide-react-native'; // Replaced FontAwesome icons
import { localAttractions } from '../data/cityData';

export default function LocalAttractionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>Local Attractions</Text>
        <Text style={styles.subtitle}>Discover Sojat City's Best Places</Text>

        {localAttractions.map((attraction) => (
          <View key={attraction.id} style={styles.attractionCard}>
            <Image
              source={{ uri: attraction.image }}
              style={styles.attractionImage}
            />
            <View style={styles.cardContent}>
              <View style={styles.headerRow}>
                <Text style={styles.attractionName}>{attraction.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" fill="#FFD700" /> {/* Replaced star icon */}
                  <Text style={styles.rating}>{attraction.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.type}>{attraction.type}</Text>
              <Text style={styles.description}>{attraction.description}</Text>
              
              <View style={styles.footer}>
                <View style={styles.distanceContainer}>
                  <MapPin size={14} color="#2E7D32" /> {/* Replaced map-marker icon */}
                  <Text style={styles.distance}>{attraction.distance}</Text>
                </View>
                <TouchableOpacity style={styles.directionsButton}>
                  <Navigation size={14} color="white" /> {/* Optional: Add arrow icon */}
                  <Text style={styles.directionsText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    padding: 16,
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  attractionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  attractionImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  attractionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    color: '#666',
    fontWeight: 'bold',
  },
  type: {
    color: '#2E7D32',
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4, // Added spacing between icon and text
  },
  directionsButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Space between icon and text
  },
  directionsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});