// import { View, Text } from 'react-native'
// import React from 'react'

// export default function WelcomePage() {
//   return (
//     <View>
//       <Text>WelcomePage</Text>
//     </View>
//   )
// }
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function WelcomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={{ uri: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=400&fit=crop' }}
          style={styles.headerImage}
        /> */}
          <Image
          source={require('../Images/talab1.jpeg')}
          style={styles.headerImage}
        />
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.villageTitle}>SURAYATA</Text>
        </View>
      </View>

      <View style={styles.quickLinks}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkText}>Emergency Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkText}>Marketplace</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkText}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkText}>Directory</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <TouchableOpacity style={styles.newsItem}>
          <Text style={styles.newsDate}>Today</Text>
          <Text style={styles.newsTitle}>Village Clean-up Drive This Weekend</Text>
          <Text style={styles.newsExcerpt}>Join us for our monthly community clean-up initiative...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.eventsSection}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity style={styles.eventItem}>
          <Text style={styles.eventDate}>MAR 15</Text>
          <View>
            <Text style={styles.eventTitle}>Spring Festival</Text>
            <Text style={styles.eventLocation}>Village Square</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    position: 'relative',
    height: 250,
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  villageTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
  },
  quickLinks: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 15,
    color: '#111827',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickLink: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickLinkText: {
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    fontSize: 14,
  },
  newsSection: {
    padding: 20,
  },
  newsItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newsDate: {
    color: '#4f46e5',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginBottom: 5,
  },
  newsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 5,
  },
  newsExcerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  eventsSection: {
    padding: 20,
    paddingTop: 0,
  },
  eventItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventDate: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    padding: 10,
    borderRadius: 8,
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  eventTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  eventLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
});