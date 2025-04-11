import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cityOverview } from '../data/cityData';

export default function CityOverviewScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633209451905-b38d1342805c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNvamF0JTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D' }}
          style={styles.headerImage}
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>About Sojat City</Text>
          <Text style={styles.description}>{cityOverview.description}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Population</Text>
            <Text style={styles.infoText}>{cityOverview.population}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Climate</Text>
            <Text style={styles.infoText}>{cityOverview.climate}</Text>
          </View>

          <Text style={styles.sectionTitle}>Main Industries</Text>
          {cityOverview.mainIndustries.map((industry, index) => (
            <Text key={index} style={styles.listItem}>• {industry}</Text>
          ))}

          <Text style={styles.sectionTitle}>Famous For</Text>
          {cityOverview.famousFor.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}

          <Text style={styles.sectionTitle}>Notable Landmarks</Text>
          {cityOverview.landmarks.map((landmark, index) => (
            <Text key={index} style={styles.listItem}>• {landmark}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#424242',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 15,
    color: '#424242',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 20,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 15,
    color: '#424242',
    marginBottom: 8,
    paddingLeft: 8,
  },
});