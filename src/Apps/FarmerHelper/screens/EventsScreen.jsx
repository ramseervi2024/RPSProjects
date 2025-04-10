import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { CloudSun, Droplet, Wind, Sun, CloudRain, Cloud } from 'lucide-react-native';

export default function WeatherUpdates() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Simulated weather data
    setTimeout(() => {
      setWeatherData({
        current: {
          temp: 25,
          humidity: 65,
          windSpeed: 12,
          description: 'Partly Cloudy'
        },
        forecast: [
          { day: 'Tomorrow', temp: 26, icon: 'partly-sunny' },
          { day: 'Wednesday', temp: 28, icon: 'sunny' },
          { day: 'Thursday', temp: 24, icon: 'rainy' },
          { day: 'Friday', temp: 23, icon: 'cloud' },
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CA6A8" />
      </View>
    );
  }

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'partly-sunny':
        return <CloudSun size={24} color="#4CA6A8" />;
      case 'sunny':
        return <Sun size={24} color="#4CA6A8" />;
      case 'rainy':
        return <CloudRain size={24} color="#4CA6A8" />;
      case 'cloud':
        return <Cloud size={24} color="#4CA6A8" />;
      default:
        return <CloudSun size={24} color="#4CA6A8" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.currentWeather}>
        <Text style={styles.temperature}>{weatherData.current.temp}°C</Text>
        <Text style={styles.description}>{weatherData.current.description}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Droplet size={24} color="#4CA6A8" />
            <Text style={styles.detailText}>
              {weatherData.current.humidity}%
            </Text>
            <Text style={styles.detailLabel}>Humidity</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Wind size={24} color="#4CA6A8" />
            <Text style={styles.detailText}>
              {weatherData.current.windSpeed} km/h
            </Text>
            <Text style={styles.detailLabel}>Wind Speed</Text>
          </View>
        </View>
      </View>

      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>4-Day Forecast</Text>
        {weatherData.forecast.map((day, index) => (
          <View key={index} style={styles.forecastDay}>
            <Text style={styles.dayText}>{day.day}</Text>
            {getIconComponent(day.icon)}
            <Text style={styles.tempText}>{day.temp}°C</Text>
          </View>
        ))}
      </View>

      <View style={styles.farmingTips}>
        <Text style={styles.tipsTitle}>Farming Recommendations</Text>
        <Text style={styles.tipText}>
          • Current conditions are suitable for irrigation
        </Text>
        <Text style={styles.tipText}>
          • Consider harvesting in the next 2 days before rain
        </Text>
        <Text style={styles.tipText}>
          • Good weather for applying fertilizer
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentWeather: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    margin: 15,
    borderRadius: 15,
    elevation: 2,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  description: {
    fontSize: 20,
    color: '#7F8C8D',
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#2C3E50',
    marginTop: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  forecastContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  forecastDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dayText: {
    fontSize: 16,
    color: '#2C3E50',
    width: 100,
  },
  tempText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  farmingTips: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  tipText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 10,
    lineHeight: 20,
  },
});