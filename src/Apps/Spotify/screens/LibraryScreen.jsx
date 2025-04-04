import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { Filter, Plus } from 'lucide-react-native';

const playlists = [
  {
    id: '1',
    name: 'Liked Songs',
    imageUrl: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7',
    type: 'Playlist',
    count: '326 songs'
  },
  {
    id: '2',
    name: 'Your Top Songs 2023',
    imageUrl: 'https://images.unsplash.com/photo-1671726203638-83742a2721a1',
    type: 'Playlist',
    count: '100 songs'
  },
  {
    id: '3',
    name: 'Discover Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1671726203355-c8d906bc3754',
    type: 'Playlist',
    count: '30 songs'
  }
];

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
        <View style={styles.headerButtons}>
          <Pressable style={styles.iconButton}>
            <Plus size={24} color="#fff" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Filter size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {playlists.map(playlist => (
          <Pressable key={playlist.id} style={styles.playlistItem}>
            <Image source={{ uri: playlist.imageUrl }} style={styles.playlistImage} />
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName}>{playlist.name}</Text>
              <Text style={styles.playlistMeta}>
                {playlist.type} • {playlist.count}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playlistImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  playlistInfo: {
    marginLeft: 12,
    flex: 1,
  },
  playlistName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  playlistMeta: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 4,
  },
});