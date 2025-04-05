import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarDays, Newspaper, ArrowRight } from 'lucide-react-native';
import { newsAndEvents } from '../data/cityData';

export default function NewsEventsScreen() {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>News & Events</Text>
          <Text style={styles.subtitle}>Stay Updated with Sojat City</Text>
        </View>

        {newsAndEvents.map((item) => (
          <View key={item.id} style={styles.card}>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
            )}
            <View style={styles.cardContent}>
              <View style={styles.categoryBadge}>
                {item.category === 'event' ? (
                  <CalendarDays size={16} color="#2E7D32" />
                ) : (
                  <Newspaper size={16} color="#1565C0" />
                )}
                <Text style={[
                  styles.categoryText,
                  { color: item.category === 'event' ? '#2E7D32' : '#1565C0' }
                ]}>
                  {item.category === 'event' ? 'Event' : 'News'}
                </Text>
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
              <Text style={styles.description}>{item.description}</Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Read More</Text>
                <ArrowRight size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    marginTop: 0,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
});