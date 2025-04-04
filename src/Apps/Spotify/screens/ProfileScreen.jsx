import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Settings } from 'lucide-react-native';

const stats = [
  { label: 'Followers', value: '127' },
  { label: 'Following', value: '83' },
  { label: 'Playlists', value: '12' },
];

const topArtists = [
  {
    id: '1',
    name: 'The Weeknd',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
  },
  {
    id: '2',
    name: 'Taylor Swift',
    imageUrl: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3',
  },
  {
    id: '3',
    name: 'Drake',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Profile</Text>
          <Pressable>
            <Settings size={24} color="#fff" />
          </Pressable>
        </View>
        
        <View style={styles.profile}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>John Doe</Text>
          
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.stat}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Artists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtists.map(artist => (
            <Pressable key={artist.id} style={styles.artistCard}>
              <Image source={{ uri: artist.imageUrl }} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profile: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#b3b3b3',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  artistCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  artistName: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#1DB954',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});