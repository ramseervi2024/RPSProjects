import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { History, Clock, ThumbsUp, Download } from 'lucide-react-native';

const playlists = [
  {
    id: '1',
    title: 'Watch Later',
    icon: Clock,
    count: '15 videos',
  },
  {
    id: '2',
    title: 'History',
    icon: History,
    count: '128 videos',
  },
  {
    id: '3',
    title: 'Liked Videos',
    icon: ThumbsUp,
    count: '47 videos',
  },
  {
    id: '4',
    title: 'Downloads',
    icon: Download,
    count: '3 videos',
  },
];

const recentVideos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    title: 'Complete Web Development Course',
    channel: 'Web Dev Simplified',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    title: 'JavaScript Tips and Tricks',
    channel: 'JS Mastery',
  },
];

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Playlists</Text>
          {playlists.map((playlist) => {
            const IconComponent = playlist.icon;
            return (
              <TouchableOpacity key={playlist.id} style={styles.playlistItem}>
                <IconComponent size={24} color="#606060" />
                <View style={styles.playlistInfo}>
                  <Text style={styles.playlistTitle}>{playlist.title}</Text>
                  <Text style={styles.playlistCount}>{playlist.count}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Videos</Text>
          {recentVideos.map((video) => (
            <TouchableOpacity key={video.id} style={styles.videoItem}>
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.videoThumbnail}
              />
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.channelName}>{video.channel}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  playlistInfo: {
    marginLeft: 16,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  playlistCount: {
    fontSize: 14,
    color: '#606060',
    marginTop: 2,
  },
  videoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  videoThumbnail: {
    width: 120,
    height: 68,
    borderRadius: 4,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  channelName: {
    fontSize: 12,
    color: '#606060',
  },
});