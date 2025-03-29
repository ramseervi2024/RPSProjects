import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MyMap = () => (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 25.92467502829789,
        longitude: 73.52042584507409,
        latitudeDelta: 0.009, 
        longitudeDelta: 0.009,
      }}

      // mapType="standard"  // Default map type
      mapType="satellite" // Satellite imagery map type
      // mapType="terrain"   // Terrain map type (shows elevation and natural landforms)
      // mapType="hybrid"    // Hybrid map type (satellite imagery with roads and labels)
      zoomEnabled={true}
      scrollEnabled={true}
      pitchEnabled={true} // For allowing tilting of the map
      rotateEnabled={true} // For allowing rotation of the map
      showsZoomControls={true} // Show zoom controls (iOS only)
    >
      <Marker
        coordinate={{ latitude: 25.92467502829789, longitude: 73.52042584507409 }}
        // title="Surayata Main Bus Stop " 
      />
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MyMap;
