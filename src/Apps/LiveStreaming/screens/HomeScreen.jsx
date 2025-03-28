import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';

const FEATURED_STREAMS = [
  {
    id: '1',
    title: 'Pro Gaming Championship Finals',
    streamer: 'ProGamer123',
    viewers: '125K',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Cooking Show Live: Italian Cuisine',
    streamer: 'ChefMaria',
    viewers: '45K',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Music Festival Backstage',
    streamer: 'MusicLover',
    viewers: '78K',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
  },
];

const CATEGORIES = [
  { id: '1', name: 'Gaming', icon: '🎮' },
  { id: '2', name: 'Music', icon: '🎵' },
  { id: '3', name: 'Sports', icon: '⚽' },
  { id: '4', name: 'Art', icon: '🎨' },
  { id: '5', name: 'Food', icon: '🍳' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Now</Text>
          <Text style={styles.headerSubtitle}>Trending streams</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredContainer}>
          {FEATURED_STREAMS.map((stream) => (
            <TouchableOpacity key={stream.id} style={styles.featuredCard}>
              <Image source={{ uri: stream.thumbnail }} style={styles.featuredImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}>
                <View style={styles.streamInfo}>
                  <Text style={styles.streamTitle}>{stream.title}</Text>
                  <Text style={styles.streamerName}>{stream.streamer}</Text>
                  <View style={styles.viewerCount}>
                    <View style={styles.liveIndicator} />
                    <Text style={styles.viewerText}>{stream.viewers} viewers</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
    marginTop: 4,
  },
  featuredContainer: {
    paddingLeft: 20,
  },
  featuredCard: {
    width: 300,
    height: 400,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    padding: 20,
    justifyContent: 'flex-end',
  },
  streamInfo: {
    gap: 8,
  },
  streamTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  streamerName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  viewerCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  viewerText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  categoriesSection: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
  },
});