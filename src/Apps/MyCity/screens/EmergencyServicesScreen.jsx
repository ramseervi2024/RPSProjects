import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  AlertTriangle, 
  Phone, 
  Hospital, 
  Shield, 
  Flame, 
  AlertCircle 
} from 'lucide-react-native';
import { emergencyServices } from '../data/cityData';

export default function EmergencyServicesScreen() {
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const getServiceIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <Hospital size={32} color="#e53935" />;
      case 'police':
        return <Shield size={32} color="#1565c0" />;
      case 'fire':
        return <Flame size={32} color="#ff6f00" />;
      default:
        return <AlertCircle size={32} color="#e53935" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Emergency Services</Text>
          <Text style={styles.subtitle}>24/7 Emergency Contact Numbers</Text>
        </View>

        <View style={styles.emergencyBox}>
          <AlertTriangle size={24} color="#e53935" />
          <Text style={styles.emergencyText}>In case of emergency, dial 112</Text>
        </View>

        {emergencyServices.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.iconContainer}>
              {getServiceIcon(service.type)}
            </View>
            
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceAddress}>{service.address}</Text>
              {service.available24x7 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>24x7 Available</Text>
                </View>
              )}
            </View>

            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => handleCall(service.phone)}
            >
              <Phone size={24} color="white" />
              <Text style={styles.callButtonText}>Call Now</Text>
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
    color: '#e53935',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  emergencyBox: {
    backgroundColor: '#ffebee',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  emergencyText: {
    color: '#c62828',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceCard: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceAddress: {
    color: '#666',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '500',
  },
  callButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  callButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});