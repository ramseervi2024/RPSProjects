import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, Bell, Cast } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const videos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b',
    title: 'How to Build a React Native App',
    channel: 'React Native Dev',
    views: '120K views',
    timestamp: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    title: 'Complete Web Development Course',
    channel: 'Web Dev Simplified',
    views: '250K views',
    timestamp: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    title: 'JavaScript Tips and Tricks',
    channel: 'JS Mastery',
    views: '180K views',
    timestamp: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerIcons}>
          <Cast style={styles.icon} size={24} color="#000" />
          <Bell style={styles.icon} size={24} color="#000" />
          <Search style={styles.icon} size={24} color="#000" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search YouTube"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {videos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoCard}>
            <Image
              source={{ uri: video.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.videoInfo}>
              <Image
                source={{ uri: video.avatar }}
                style={styles.avatar}
              />
              <View style={styles.videoDetails}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.channelName}>{video.channel}</Text>
                <Text style={styles.videoMeta}>{video.views} • {video.timestamp}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  logo: {
    width: 90,
    height: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  videoCard: {
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  videoInfo: {
    flexDirection: 'row',
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  channelName: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 2,
  },
  videoMeta: {
    fontSize: 14,
    color: '#606060',
  },
});