import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Car, Search } from 'lucide-react-native';

export default function HomeScreen() {
  const [selectedRideType, setSelectedRideType] = useState('standard');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, John</Text>
        <Text style={styles.subtitle}>Where are you going today?</Text>
      </View>

      <View style={styles.searchBar}>
        <Search size={20} color="#666" />
        <Text style={styles.searchText}>Where to?</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Your Location"
        />
      </MapView>

      <View style={styles.rideOptions}>
        <Text style={styles.rideTitle}>Select Ride Type</Text>
        <View style={styles.rideTypes}>
          <Pressable
            style={[
              styles.rideType,
              selectedRideType === 'standard' && styles.selectedRideType,
            ]}
            onPress={() => setSelectedRideType('standard')}>
            <Car size={24} color={selectedRideType === 'standard' ? '#007AFF' : '#666'} />
            <Text
              style={[
                styles.rideTypeText,
                selectedRideType === 'standard' && styles.selectedRideTypeText,
              ]}>
              Standard
            </Text>
            <Text style={styles.price}>$12</Text>
          </Pressable>

          <Pressable
            style={[
              styles.rideType,
              selectedRideType === 'premium' && styles.selectedRideType,
            ]}
            onPress={() => setSelectedRideType('premium')}>
            <Car size={24} color={selectedRideType === 'premium' ? '#007AFF' : '#666'} />
            <Text
              style={[
                styles.rideTypeText,
                selectedRideType === 'premium' && styles.selectedRideTypeText,
              ]}>
              Premium
            </Text>
            <Text style={styles.price}>$18</Text>
          </Pressable>
        </View>

        <Pressable style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Ride</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1A1A1A',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  searchText: {
    marginLeft: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
  },
  map: {
    flex: 1,
  },
  rideOptions: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  rideTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  rideTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rideType: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedRideType: {
    backgroundColor: '#E8F1FF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  rideTypeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
    marginTop: 8,
  },
  selectedRideTypeText: {
    color: '#007AFF',
  },
  price: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#1A1A1A',
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});