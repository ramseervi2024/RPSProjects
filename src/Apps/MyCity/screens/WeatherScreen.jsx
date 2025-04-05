import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  Droplet, 
  Wind,
  Thermometer
} from 'lucide-react-native';

export default function WeatherScreen() {
  const weather = {
    current: {
      temperature: 32,
      condition: 'Sunny',
      humidity: 45,
      windSpeed: '15 km/h'
    },
    forecast: [
      { day: 'Tomorrow', temp: 33, condition: 'Clear' },
      { day: 'Wednesday', temp: 31, condition: 'Partly Cloudy' },
      { day: 'Thursday', temp: 30, condition: 'Cloudy' },
      { day: 'Friday', temp: 32, condition: 'Sunny' },
    ]
  };

  const getWeatherIcon = (condition,size=24) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun size={size} color="#FFA000" />;
      case 'clear': return <Sun size={size} color="#FFA000" />;
      case 'partly cloudy': return <CloudSun size={size} color="#FFA000" />;
      case 'cloudy': return <Cloud size={size} color="#FFA000" />;
      default: return <Thermometer size={size} color="#FFA000" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Weather</Text>
          <Text style={styles.location}>Sojat City, 306104</Text>
        </View>

        <View style={styles.currentWeather}>
          {getWeatherIcon(weather.current.condition, 64)}
          <Text style={styles.temperature}>{weather.current.temperature}°C</Text>
          <Text style={styles.condition}>{weather.current.condition}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Droplet size={24} color="#64B5F6" />
              <Text style={styles.detailText}>
                Humidity: {weather.current.humidity}%
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Wind size={24} color="#81C784" />
              <Text style={styles.detailText}>
                Wind: {weather.current.windSpeed}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>4-Day Forecast</Text>
          {weather.forecast.map((day, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.day}>{day.day}</Text>
              {getWeatherIcon(day.condition)}
              <Text style={styles.forecastTemp}>{day.temp}°C</Text>
              <Text style={styles.forecastCondition}>{day.condition}</Text>
            </View>
          ))}
        </View>
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
  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  currentWeather: {
    backgroundColor: 'white',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  condition: {
    fontSize: 20,
    color: '#666',
    marginTop: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  forecastContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  day: {
    fontSize: 16,
    color: '#333',
    width: 100,
  },
  forecastTemp: {
    fontSize: 16,
    color: '#333',
    width: 60,
    textAlign: 'right',
  },
  forecastCondition: {
    fontSize: 16,
    color: '#666',
    width: 120,
    textAlign: 'right',
  },
});