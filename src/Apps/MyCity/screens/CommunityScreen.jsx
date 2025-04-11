

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Landmark, 
  Cloud, 
  Calendar, 
  Store, 
  Bus, 
  MapPin, 
  AlertCircle ,
  HeartPulse,
  GraduationCap,
  Gavel
} from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  const categories = [
    { id: 1, title: 'City Overview', icon: <MapPin size={32} color="#2E7D32" /> },
    { id: 2, title: 'Local Attractions', icon: <Landmark size={32} color="#2E7D32" /> },
    { id: 3, title: 'Emergency Services', icon: <AlertCircle size={32} color="#2E7D32" /> },
    { id: 4, title: 'Weather', icon: <Cloud size={32} color="#2E7D32" /> },
    { id: 5, title: 'News & Events', icon: <Calendar size={32} color="#2E7D32" /> },
    { id: 6, title: 'Business Directory', icon: <Store size={32} color="#2E7D32" /> },
    { id: 7, title: 'Transport', icon: <Bus size={32} color="#2E7D32" /> },
    { id: 8, title: 'Health Services', icon: <HeartPulse size={32} color="#2E7D32" /> },
    { id: 9, title: 'Education', icon: <GraduationCap size={32} color="#2E7D32" /> },
    { id: 10, title: 'Local Government', icon: <Gavel size={32} color="#2E7D32" /> },
  ];
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <View style={styles.header}>
          <Text style={styles.cityName}>Sojat City – “The Henna City”</Text>
          <Text style={styles.cityName}>सोजत सिटी  – "मेहंदी नगरी "</Text>
          <Text style={styles.pincode}>306104</Text>
        </View> */}

        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1717131553948-13c2c59c7293?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.heroImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Welcome to Sojat City</Text>
            <Text style={styles.tagline}>The Heart of Rajasthan</Text>
          </View>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (            
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryCard}
              onPress={() => {
                if (category.title === 'City Overview') {
                  navigation.navigate('CityOverview');
                }
                if (category.title === 'Local Attractions') {
                  navigation.navigate('LocalAttractions');
                }
                if (category.title === 'Emergency Services') {
                  navigation.navigate('EmergencyServices');
                }
                if (category.title === 'Weather') {
                  navigation.navigate('WeatherScreen');
                }
                if (category.title === 'News & Events') {
                  navigation.navigate('NewsEventsScreen');
                }
                if (category.title === 'Business Directory') {
                  navigation.navigate('BusinessDirectoryScreen');
                }
                if (category.title === 'Transport') {
                  navigation.navigate('TransportScreen');
                }
              }}
            >
              {category.icon}
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// Styles remain the same as your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#2E7D32',
    paddingTop:80
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  pincode: {
    fontSize: 16,
    color: '#E8F5E9',
  },
  heroContainer: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
  },
  tagline: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  categoryCard: {
    backgroundColor: 'white',
    width: '45%',
    margin: '2.5%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 120,
  },
  categoryTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#424242',
  },
});