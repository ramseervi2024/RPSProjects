import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MessageCircle, Repeat2, Heart, Share } from 'lucide-react-native';

const tweets = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      handle: '@johndoe',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    },
    content: 'Just deployed my first React Native app! 🚀 #reactnative #javascript',
    timestamp: '2h',
    stats: {
      replies: 12,
      retweets: 24,
      likes: 144,
    },
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      handle: '@janesmith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    content: 'Beautiful morning in San Francisco! ☀️ Time for some coding.',
    timestamp: '4h',
    stats: {
      replies: 8,
      retweets: 16,
      likes: 92,
    },
  },
];

function Tweet({ tweet }) {
  return (
    <View style={styles.tweet}>
      <Image source={{ uri: tweet.user.avatar }} style={styles.avatar} />
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.userName}>{tweet.user.name}</Text>
          <Text style={styles.userHandle}>{tweet.user.handle}</Text>
          <Text style={styles.timestamp}>{tweet.timestamp}</Text>
        </View>
        <Text style={styles.tweetText}>{tweet.content}</Text>
        <View style={styles.tweetActions}>
          <TouchableOpacity style={styles.action}>
            <MessageCircle size={16} color="#536471" />
            <Text style={styles.actionText}>{tweet.stats.replies}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <Repeat2 size={16} color="#536471" />
            <Text style={styles.actionText}>{tweet.stats.retweets}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <Heart size={16} color="#536471" />
            <Text style={styles.actionText}>{tweet.stats.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <Share size={16} color="#536471" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        style={styles.feed}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  feed: {
    flex: 1,
  },
  tweet: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  userHandle: {
    color: '#536471',
    marginRight: 4,
  },
  timestamp: {
    color: '#536471',
  },
  tweetText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  tweetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 300,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#536471',
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1DA1F2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});