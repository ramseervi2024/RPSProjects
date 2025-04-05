import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Phone, Clock, MapPin } from 'lucide-react-native';

const mockServices = [
  {
    id: '1',
    name: 'City General Hospital',
    category: 'Hospital',
    phone: '+1 234-567-8900',
    hours: '24/7',
    distance: '0.8 km',
  },
  {
    id: '2',
    name: 'Public Library',
    category: 'Library',
    phone: '+1 234-567-8901',
    hours: '9 AM - 8 PM',
    distance: '1.5 km',
  },
  // Add more mock services
];

export default function ServicesScreen() {
 

  return (
    <View style={styles.container}>
      <FlatList
        data={mockServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceCategory}>{item.category}</Text>
            </View>
            <View style={styles.serviceDetails}>
              <View style={styles.detailRow}>
                <Phone size={16} color="#8E8E93" />
                <Text style={styles.detailText}>{item.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color="#8E8E93" />
                <Text style={styles.detailText}>{item.hours}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#8E8E93" />
                <Text style={styles.detailText}>{item.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    marginBottom: 12,
  },
  serviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  serviceCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  serviceDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#3C3C43',
  },
});