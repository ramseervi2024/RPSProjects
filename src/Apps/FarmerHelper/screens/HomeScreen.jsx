import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloudSun, Leaf, Calendar, TrendingUp } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  const features = [
    { 
      title: 'Weather Updates', 
      icon: <CloudSun size={32} color="white" />,
      description: 'Check local weather forecasts',
      color: '#4CA6A8'
    },
    { 
      title: 'Crop Management', 
      icon: <Leaf size={32} color="white" />,
      description: 'Track and manage your crops',
      color: '#69B578'
    },
    { 
      title: 'Tasks', 
      icon: <Calendar size={32} color="white" />,
      description: 'Schedule farming activities',
      color: '#FFA62B'
    },
    { 
      title: 'Market Prices', 
      icon: <TrendingUp size={32} color="white" />,
      description: 'Check current market rates',
      color: '#FF715B'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=beautiful%20farm%20landscape%20with%20modern%20sustainable%20farming&aspect=16:9' }}
            style={styles.headerImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Welcome, Farmer!</Text>
            <Text style={styles.subtitleText}>What would you like to do today?</Text>
          </View>
        </View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.featureCard, { backgroundColor: feature.color }]}
              onPress={() => navigation.navigate(feature.title.replace(' ', ''))}
            >
              {feature.icon}
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>Daily Farming Tip</Text>
          <Text style={styles.tipText}>
            Remember to check soil moisture levels before irrigation. Optimal soil moisture helps in better nutrient absorption.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitleText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  featureTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  featureDescription: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.9,
    textAlign: 'center',
  },
  tipContainer: {
    margin: 15,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  tipText: {
    color: '#7F8C8D',
    lineHeight: 20,
  },
});