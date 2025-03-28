import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

const POSTS = [
  {
    id: '1',
    user: {
      username: 'sarah_designs',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
    caption: 'Beautiful sunset at the beach 🌅',
    likes: 234,
    comments: 12,
    timestamp: new Date('2024-02-08T18:30:00'),
  },
  {
    id: '2',
    user: {
      username: 'travel_mike',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
    caption: 'Adventure awaits in every corner 🌎✈️',
    likes: 567,
    comments: 34,
    timestamp: new Date('2024-02-08T15:45:00'),
  },
  {
    id: '3',
    user: {
      username: 'sarah_designs',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
    caption: 'Beautiful sunset at the beach 🌅',
    likes: 234,
    comments: 12,
    timestamp: new Date('2024-02-08T18:30:00'),
  },
];

function Post({ post }) {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <FastImage source={{ uri: post.user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{post.user.username}</Text>
      </View>

      <FastImage source={{ uri: post.image }} style={styles.postImage} />

      <View style={styles.postActions}>
        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton}>
            <Heart size={24} color="#000" />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <MessageCircle size={24} color="#000" />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Share2 size={24} color="#000" />
          </Pressable>
        </View>

        <Text style={styles.likes}>{post.likes} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.username}>{post.user.username}</Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
        <Text style={styles.timestamp}>
          {formatDistanceToNow(post.timestamp, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social Feed</Text>
      </View>
      <FlatList
        data={POSTS}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  post: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: undefined,  // Let aspectRatio manage the height
    aspectRatio: 1,     // This ensures a square aspect ratio
  },
  postActions: {
    padding: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  actionButton: {
    marginRight: 16,
  },
  likes: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  timestamp: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
