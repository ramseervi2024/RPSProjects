import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';

const FOLLOWING_STREAMS = [
  {
    id: '1',
    streamer: 'Sarah Gaming',
    title: 'Speedrunning World Record Attempt!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop',
    viewers: '12.5K',
    isLive: true,
  },
  {
    id: '2',
    streamer: 'Tech Talk with Mike',
    title: 'Building a React Native App from Scratch',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop',
    viewers: '8.2K',
    isLive: true,
  },
  {
    id: '3',
    streamer: 'Art with Emma',
    title: 'Digital Art Masterclass',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1547333590-47fae5f58d21?w=800&auto=format&fit=crop',
    viewers: '5.7K',
    isLive: false,
  },
];

export default function FollowingScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Following</Text>
          <Text style={styles.headerSubtitle}>Streams from people you follow</Text>
        </View>

        <View style={styles.streamList}>
          {FOLLOWING_STREAMS.map((stream) => (
            <TouchableOpacity key={stream.id} style={styles.streamCard}>
              <Image source={{ uri: stream.thumbnail }} style={styles.thumbnail} />
              <View style={styles.streamContent}>
                <Image source={{ uri: stream.avatar }} style={styles.avatar} />
                <View style={styles.streamInfo}>
                  <Text style={styles.streamerName}>{stream.streamer}</Text>
                  <Text style={styles.streamTitle}>{stream.title}</Text>
                  <View style={styles.viewerInfo}>
                    {stream.isLive && <View style={styles.liveIndicator} />}
                    <Users size={16} color="#8E8E93" />
                    <Text style={styles.viewerCount}>{stream.viewers}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  streamList: {
    padding: 20,
  },
  streamCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  streamContent: {
    flexDirection: 'row',
    padding: 15,
    gap: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  streamInfo: {
    flex: 1,
    gap: 4,
  },
  streamerName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  streamTitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
  },
  viewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 4,
  },
  viewerCount: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
  },
});