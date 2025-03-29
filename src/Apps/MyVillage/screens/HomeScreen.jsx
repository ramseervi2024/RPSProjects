import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Bell, ChevronRight } from 'lucide-react-native';

const NEWS_UPDATES = [
  {
    id: '1',
    title: 'New Community Garden Opening',
    description: 'Join us for the grand opening of our community garden this weekend.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80',
    date: '2024-02-15',
  },
  {
    id: '2',
    title: 'Water Conservation Notice',
    description: 'Important updates regarding water usage during summer months.',
    image: 'https://images.unsplash.com/photo-1468421870903-4df1664ac249?w=500&q=80',
    date: '2024-02-14',
  },
];

const QUICK_LINKS = [
  { id: '1', title: 'Emergency Contacts', icon: '🚑' },
  { id: '2', title: 'Village Council', icon: '🏛️' },
  { id: '3', title: 'Report Issues', icon: '⚠️' },
  { id: '4', title: 'Local Services', icon: '🔧' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.villageName}>Green Valley Village</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#166534" />
        </TouchableOpacity>
      </View>

      <View style={styles.quickLinksContainer}>
        {QUICK_LINKS.map((link) => (
          <TouchableOpacity key={link.id} style={styles.quickLink}>
            <Text style={styles.quickLinkIcon}>{link.icon}</Text>
            <Text style={styles.quickLinkText}>{link.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#166534" />
          </TouchableOpacity>
        </View>

        {NEWS_UPDATES.map((news) => (
          <TouchableOpacity key={news.id} style={styles.newsCard}>
            <Image source={{ uri: news.image }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsDescription}>{news.description}</Text>
              <Text style={styles.newsDate}>{news.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weather</Text>
        </View>
        <View style={styles.weatherCard}>
          <Text style={styles.temperature}>23°C</Text>
          <Text style={styles.weatherDescription}>Partly Cloudy</Text>
          <Text style={styles.weatherLocation}>Green Valley Village</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  villageName: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  quickLink: {
    width: '25%',
    alignItems: 'center',
    padding: 10,
  },
  quickLinkIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#334155',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#334155',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#166534',
    marginRight: 4,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#334155',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#94a3b8',
  },
  weatherCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 36,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
    marginBottom: 8,
  },
  weatherDescription: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#166534',
    marginBottom: 4,
  },
  weatherLocation: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#166534',
  },
});