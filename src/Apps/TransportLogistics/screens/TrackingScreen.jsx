import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Package, Navigation } from 'lucide-react-native';

export default function TrackingScreen() {
  const shipmentLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
  };

  return (
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...shipmentLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={shipmentLocation} />
      </MapView>

      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.shipmentIcon}>
              <Package size={24} color="#007AFF" />
            </View>
            <View style={styles.shipmentInfo}>
              <Text style={styles.shipmentId}>SHP-1234</Text>
              <Text style={styles.shipmentStatus}>In Transit • 2h 45m remaining</Text>
            </View>
          </View>

          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: '#34C759' }]} />
              <View>
                <Text style={styles.routeLabel}>Current Location</Text>
                <Text style={styles.routeCity}>Manhattan, NY</Text>
              </View>
            </View>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: '#FF3B30' }]} />
              <View>
                <Text style={styles.routeLabel}>Destination</Text>
                <Text style={styles.routeCity}>Brooklyn, NY</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <Navigation size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  shipmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  shipmentId: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  shipmentStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  routeContainer: {
    gap: 16,
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  routeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  routeCity: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#000000',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});