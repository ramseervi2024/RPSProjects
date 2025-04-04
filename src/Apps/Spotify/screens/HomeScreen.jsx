import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { Play } from 'lucide-react-native';

const recentlyPlayed = [
  {
    id: '1',
    title: 'Liked Songs',
    imageUrl: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7',
    type: 'Playlist'
  },
  {
    id: '2',
    title: 'Daily Mix 1',
    imageUrl: 'https://images.unsplash.com/photo-1671726203638-83742a2721a1',
    type: 'Mix'
  },
  {
    id: '3',
    title: 'Discover Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1671726203355-c8d906bc3754',
    type: 'Playlist'
  }
];

const featuredPlaylists = [
  {
    id: '1',
    title: 'Top Hits 2024',
    description: 'The hottest tracks right now',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745'
  },
  {
    id: '2',
    title: 'Chill Vibes',
    description: 'Relaxing beats for your day',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4'
  }
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good evening</Text>
      </View>

      <View style={styles.recentlyPlayed}>
        <Text style={styles.sectionTitle}>Recently played</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentlyPlayed.map(item => (
            <View key={item.id} style={styles.recentItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.recentImage} />
              <Text style={styles.recentTitle}>{item.title}</Text>
              <Text style={styles.recentType}>{item.type}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.featured}>
        <Text style={styles.sectionTitle}>Featured Playlists</Text>
        {featuredPlaylists.map(playlist => (
          <Pressable key={playlist.id} style={styles.featuredItem}>
            <Image source={{ uri: playlist.imageUrl }} style={styles.featuredImage} />
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredTitle}>{playlist.title}</Text>
              <Text style={styles.featuredDescription}>{playlist.description}</Text>
            </View>
            <View style={styles.playButton}>
              <Play size={24} color="#fff" />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  recentlyPlayed: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  recentItem: {
    marginRight: 16,
    width: 140,
  },
  recentImage: {
    width: 140,
    height: 140,
    borderRadius: 4,
  },
  recentTitle: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  recentType: {
    color: '#b3b3b3',
    fontSize: 12,
    marginTop: 4,
  },
  featured: {
    padding: 16,
  },
  featuredItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#282828',
    borderRadius: 4,
    overflow: 'hidden',
  },
  featuredImage: {
    width: 80,
    height: 80,
  },
  featuredInfo: {
    flex: 1,
    padding: 16,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuredDescription: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 4,
  },
  playButton: {
    backgroundColor: '#1DB954',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});