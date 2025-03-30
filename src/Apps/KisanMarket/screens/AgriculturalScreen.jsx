import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Sun, Droplet, CloudRain, Cloud, Thermometer } from 'lucide-react-native';

export default function AgriculturalScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  // Sample data
  const crops = {
    wheat: { 
      name: 'Wheat', 
      season: 'Rabi', 
      waterNeed: 'Moderate',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    cotton: { 
      name: 'Cotton', 
      season: 'Kharif', 
      waterNeed: 'High',
      image: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    bajra: { 
      name: 'Bajra', 
      season: 'Kharif', 
      waterNeed: 'Low',
      image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  };

  const weather = {
    temp: '32°C',
    condition: 'Sunny',
    humidity: '45%',
    rainfall: '0mm'
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient */}
      <View style={[styles.header]}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }}
          style={styles.headerImage}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>सुरायता कृषि</Text>
          <Text style={styles.headerSubtitle}>Surayta Agriculture</Text>
        </View>
      </View>

      {/* Weather Card */}
      <View style={styles.weatherCard}>
        <Text style={styles.cardTitle}>Today's Weather</Text>
        <View style={styles.weatherInfo}>
          <View style={styles.weatherMain}>
            <Sun size={40} color="#FFB347" />
            <Text style={styles.temperature}>{weather.temp}</Text>
          </View>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherRow}>
              <Thermometer size={18} color="#666" />
              <Text style={styles.weatherText}> {weather.condition}</Text>
            </View>
            <View style={styles.weatherRow}>
              <Droplet size={18} color="#666" />
              <Text style={styles.weatherText}> {weather.humidity}</Text>
            </View>
            <View style={styles.weatherRow}>
              <CloudRain size={18} color="#666" />
              <Text style={styles.weatherText}> {weather.rainfall}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Crops Section */}
      <View style={styles.cropSection}>
        <Text style={styles.sectionTitle}>Major Crops</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cropScroll}
        >
          {Object.entries(crops).map(([key, crop]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.cropCard,
                selectedCrop === key && styles.selectedCrop
              ]}
              onPress={() => setSelectedCrop(key)}
            >
              <Image 
                source={{ uri: crop.image }}
                style={styles.cropImage}
              />
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropSeason}>{crop.season} season</Text>
              <Text style={styles.cropWater}>Water: {crop.waterNeed}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Pressable style={styles.actionButton}>
          <Droplet size={24} color="#4CAF50" />
          <Text style={styles.actionText}>Irrigation</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Cloud size={24} color="#4CAF50" />
          <Text style={styles.actionText}>Weather</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Sun size={24} color="#4CAF50" />
          <Text style={styles.actionText}>Crop Tips</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 300,
    position: 'relative',
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: 1,
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  weatherCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  weatherDetails: {
    alignItems: 'flex-end',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  weatherText: {
    fontSize: 14,
    color: '#666',
  },
  cropSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginBottom: 15,
  },
  cropScroll: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  cropCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCrop: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  cropImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cropSeason: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cropWater: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});