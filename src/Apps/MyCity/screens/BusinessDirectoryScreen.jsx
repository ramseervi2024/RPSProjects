import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Building2, 
  Star, 
  MapPin, 
  Clock, 
  Phone 
} from 'lucide-react-native';
import { businesses } from '../data/cityData';

export default function BusinessDirectoryScreen() {
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Business Directory</Text>
          <Text style={styles.subtitle}>Local Businesses in Sojat City</Text>
        </View>

        {businesses.map((business) => (
          <View key={business.id} style={styles.card}>
            <View style={styles.categoryBadge}>
              <Building2 size={16} color="#2E7D32" />
              <Text style={styles.categoryText}>{business.category}</Text>
            </View>

            <Text style={styles.businessName}>{business.name}</Text>

            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFA000" fill="#FFA000" />
              <Text style={styles.rating}>{business.rating}</Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <MapPin size={20} color="#666" />
                <Text style={styles.infoText}>{business.address}</Text>
              </View>

              <View style={styles.infoItem}>
                <Clock size={20} color="#666" />
                <Text style={styles.infoText}>{business.openingHours}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => handleCall(business.phone)}
            >
              <Phone size={20} color="white" />
              <Text style={styles.callButtonText}>Call Business</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles remain exactly the same as your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    padding: 12,
    borderRadius: 8,
  },
  callButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});