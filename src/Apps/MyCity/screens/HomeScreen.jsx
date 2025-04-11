import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { Sun, TrendingUp, TrendingDown, AlertCircle, Clock, DollarSign, Sprout, Droplet, Users } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const crops = {
    mehndi: { name: 'Mehndi', hindiName: 'मेहंदी', season: 'Rabi', waterNeed: 'Low' },
    bajra: { name: 'Bajra', hindiName: 'बाजरा', season: 'Kharif', waterNeed: 'Low' },
    cotton: { name: 'Cotton', hindiName: 'कपास', season: 'Kharif', waterNeed: 'High' },
    wheat: { name: 'Wheat', hindiName: 'गेहूं', season: 'Rabi', waterNeed: 'Moderate' },
    barley: { name: 'Barley', hindiName: 'जौ', season: 'Rabi', waterNeed: 'Moderate' },
    guar: { name: 'Guar (Cluster Bean)', hindiName: 'ग्वार', season: 'Kharif', waterNeed: 'Low' },
    sesame: { name: 'Sesame', hindiName: 'तिल', season: 'Kharif', waterNeed: 'Low' },
    groundnut: { name: 'Groundnut', hindiName: 'मूंगफली', season: 'Kharif', waterNeed: 'Moderate' },
    soybean: { name: 'Soybean', hindiName: 'सोयाबीन', season: 'Kharif', waterNeed: 'Moderate' },
    maize: { name: 'Maize', hindiName: 'मक्का', season: 'Kharif', waterNeed: 'High' },
    chili: { name: 'Chili', hindiName: 'मिर्च', season: 'Kharif', waterNeed: 'Moderate' },
  };
  

  const weather = {
    temp: '32°C',
    condition: 'Sunny',
    humidity: '45%',
    rainfall: '0mm'
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.headerGradient}
        />
        <Image 
          source={{ uri: 'https://api.a0.dev/assets/image?text=beautiful%20agricultural%20fields%20in%20rajasthan%20with%20farmers%20working&aspect=16:9' }}
          style={styles.headerImage}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}> सोजत सिटी (मेहंदी नगरी)</Text>
          <Text style={styles.headerSubtitle}>Sojat City – “The Henna City”</Text>
        </View>
      </View>

      <View style={styles.weatherCard}>
        <Text style={styles.cardTitle}>Today's Weather</Text>
        <View style={styles.weatherInfo}>
          <View style={styles.weatherMain}>
            <Sun size={40} color="#FFB347" />
            <Text style={styles.temperature}>{weather.temp}</Text>
          </View>
          <View style={styles.weatherDetails}>
            <Text style={styles.weatherText}>Humidity: {weather.humidity}</Text>
            <Text style={styles.weatherText}>Rainfall: {weather.rainfall}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cropSection}>
        <Text style={styles.sectionTitle}>Major Crops</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropScroll}>
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
                source={{ uri: `https://api.a0.dev/assets/image?text=${crop.name}%20crop%20in%20farm&aspect=1:1` }}
                style={styles.cropImage}
              />
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropName}>{crop.hindiName}</Text>
              <Text style={styles.cropSeason}>{crop.season}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.quickActions}>
        <Pressable style={styles.actionButton}>
          <DollarSign size={24} color="#4CAF50" />
          <Text style={styles.actionText}>Market Prices</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Sprout size={24} color="#4CAF50" />
          <Text style={styles.actionText}>Farming Tips</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Droplet size={24} color="#4CAF50" />
          <Text style={styles.actionText}>Irrigation</Text>
        </Pressable>
      </View>

      <View style={styles.communitySection}>
        <Text style={styles.sectionTitle}>Community Resources</Text>
        <View style={styles.resourceCard}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=farmers%20meeting%20in%20village&aspect=16:9' }}
            style={styles.resourceImage}
          />
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Farmers' Meeting</Text>
            <Text style={styles.resourceText}>Join weekly discussions on agricultural practices and market trends</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 250,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
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
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  weatherCard: {
    backgroundColor: '#FFF',
    margin: 15,
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
  weatherText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cropSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cropScroll: {
    flexDirection: 'row',
  },
  cropCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 140,
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
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  cropSeason: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  actionButton: {
    backgroundColor: '#FFF',
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
  communitySection: {
    padding: 15,
  },
  resourceCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceImage: {
    width: '100%',
    height: 150,
  },
  resourceContent: {
    padding: 15,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  resourceText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});