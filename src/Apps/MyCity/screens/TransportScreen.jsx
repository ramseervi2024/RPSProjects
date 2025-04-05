import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bus, 
  Train, 
  Taxi, 
  Route, 
  Clock, 
  WalletCards,
  Phone
} from 'lucide-react-native';
import { transportInfo } from '../data/cityData';

export default function TransportScreen() {
  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case 'bus': return <Bus size={32} color="#2E7D32" />;
      case 'train': return <Train size={32} color="#2E7D32" />;
      case 'taxi': return <Bus size={32} color="#2E7D32" />;
      default: return <Bus size={32} color="#2E7D32" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transport</Text>
          <Text style={styles.subtitle}>Getting Around Sojat City</Text>
        </View>

        {transportInfo.map((transport) => {
          return (
            <View key={transport.id} style={styles.card}>
              <View style={styles.iconContainer}>
                {getTransportIcon(transport.type)}
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.transportType}>
                  {transport.type.charAt(0).toUpperCase() + transport.type.slice(1)}
                </Text>

                {transport.route && (
                  <View style={styles.infoRow}>
                    <Route size={20} color="#666" />
                    <Text style={styles.infoText}>{transport.route}</Text>
                  </View>
                )}

                {transport.schedule && (
                  <View style={styles.infoRow}>
                    <Clock size={20} color="#666" />
                    <Text style={styles.infoText}>{transport.schedule}</Text>
                  </View>
                )}

                <View style={styles.infoRow}>
                  <WalletCards size={20} color="#666" />
                  <Text style={styles.infoText}>Fare: {transport.fare}</Text>
                </View>

                {transport.contact && (
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleCall(transport.contact)}
                  >
                    <Phone size={20} color="white" />
                    <Text style={styles.contactButtonText}>Contact</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

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
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  transportType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});
