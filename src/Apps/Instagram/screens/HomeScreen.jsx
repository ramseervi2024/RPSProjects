import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

const posts = [
  {
    id: '1',
    user: {
      username: 'emily.travels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop',
    likes: 2834,
    caption: '🌅 Chasing sunsets in Santorini. Every corner of this island is a photographer\'s dream! #Greece #TravelPhotography #Wanderlust',
    timestamp: new Date('2024-02-10T12:00:00'),
    comments: 142,
  },
  {
    id: '2',
    user: {
      username: 'foodie.adventures',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
    likes: 1567,
    caption: '🍕 The perfect Neapolitan pizza in the heart of Naples. That crust though! 😍 #FoodPorn #ItalianFood #Foodiegram',
    timestamp: new Date('2024-02-09T15:30:00'),
    comments: 89,
  },
  {
    id: '3',
    user: {
      username: 'urban.lens',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=600&fit=crop',
    likes: 3921,
    caption: '🌆 NYC never sleeps. The city lights create such magical moments. #UrbanPhotography #NYCLife #CityScape',
    timestamp: new Date('2024-02-09T10:15:00'),
    comments: 231,
  },
];

const stories = [
  {
    id: '1',
    username: 'your.story',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    isYou: true,
  },
  {
    id: '2',
    username: 'emily.travels',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    hasNewStory: true,
  },
  {
    id: '3',
    username: 'foodie.adventures',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    hasNewStory: true,
  },
  {
    id: '4',
    username: 'urban.lens',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    hasNewStory: true,
  },
  {
    id: '5',
    username: 'nature.vibes',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    hasNewStory: true,
  },
];

function Story({ username, avatar, isYou, hasNewStory }) {
  return (
    <TouchableOpacity style={styles.story}>
      <View style={[styles.storyRing, isYou && styles.yourStoryRing, !hasNewStory && !isYou && styles.seenStoryRing]}>
        <Image source={{ uri: avatar }} style={styles.storyAvatar} />
        {isYou && (
          <View style={styles.addStoryButton}>
            <Text style={styles.addStoryPlus}>+</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {isYou ? 'Your story' : username}
      </Text>
    </TouchableOpacity>
  );
}

function Post({ post }) {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <TouchableOpacity style={styles.postHeaderLeft}>
          <Image source={{ uri: post.user.avatar }} style={styles.postAvatar} />
          <Text style={styles.postUsername}>{post.user.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.moreButton}>•••</Text>
        </TouchableOpacity>
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
        <TouchableOpacity>
          <Text style={styles.viewComments}>
            View all {post.comments} comments
          </Text>
        </TouchableOpacity>
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
        {stories.map((story) => (
          <Story
            key={story.id}
            username={story.username}
            avatar={story.avatar}
            isYou={story.isYou}
            hasNewStory={story.hasNewStory}
          />
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
  yourStoryRing: {
    borderColor: '#DBDBDB',
  },
  seenStoryRing: {
    borderColor: '#DBDBDB',
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
  addStoryButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#0095F6',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  addStoryPlus: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -2,
  },
  post: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  moreButton: {
    fontSize: 16,
    transform: [{ rotate: '90deg' }],
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
  viewComments: {
    color: '#8E8E8E',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
});