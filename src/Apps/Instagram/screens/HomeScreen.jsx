import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

const posts = [
  {
    id: '1',
    user: {
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop',
    likes: 1234,
    caption: 'Beautiful sunset at the beach! 🌅',
    timestamp: new Date('2024-02-10T12:00:00'),
  },
  {
    id: '2',
    user: {
      username: 'janedoe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    image: 'https://images.unsplash.com/photo-1682687221038-404670d5f335?w=600&h=600&fit=crop',
    likes: 856,
    caption: 'Coffee time ☕️',
    timestamp: new Date('2024-02-09T15:30:00'),
  },
];

function Story({ username, avatar }) {
  return (
    <TouchableOpacity style={styles.story}>
      <View style={styles.storyRing}>
        <Image source={{ uri: avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {username}
      </Text>
    </TouchableOpacity>
  );
}

function Post({ post }) {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.postAvatar} />
        <Text style={styles.postUsername}>{post.user.username}</Text>
      </View>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity style={styles.postAction}>
            <Heart size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postAction}>
            <MessageCircle size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postAction}>
            <Send size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Bookmark size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.postFooter}>
        <Text style={styles.postLikes}>{post.likes.toLocaleString()} likes</Text>
        <View style={styles.postCaption}>
          <Text style={styles.postUsername}>{post.user.username}</Text>
          <Text style={styles.postText}> {post.caption}</Text>
        </View>
        <Text style={styles.postTimestamp}>
          {formatDistanceToNow(post.timestamp, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Instagram</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stories}>
        {posts.map((post) => (
          <Story key={post.id} username={post.user.username} avatar={post.user.avatar} />
        ))}
      </ScrollView>
      
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    marginTop: 50,
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  stories: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  story: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#E1306C',
    padding: 2,
  },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  storyUsername: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  post: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postUsername: {
    fontFamily: 'Inter_600SemiBold',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  postAction: {
    marginRight: 16,
  },
  postFooter: {
    padding: 10,
    paddingTop: 0,
  },
  postLikes: {
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  postCaption: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postText: {
    fontFamily: 'Inter_400Regular',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
});