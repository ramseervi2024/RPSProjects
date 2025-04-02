import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, ThumbsUp, MessageCircle, Share } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stories = [
  {
    id: '1',
    user: 'Your Story',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isUser: true,
  },
  {
    id: '2',
    user: 'John Doe',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    user: 'Jane Smith',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

const posts = [
  {
    id: '1',
    user: 'John Doe',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    timeAgo: '2 hours ago',
    content: 'Beautiful day at the beach! 🌊☀️',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: '2',
    user: 'Jane Smith',
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    timeAgo: '5 hours ago',
    content: 'Just finished my morning hike! 🏃‍♀️🌄',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    likes: 156,
    comments: 23,
    shares: 5,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>facebook</Text>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
          {stories.map((story) => (
            <View key={story.id} style={styles.storyCard}>
              <Image source={{ uri: story.image }} style={styles.storyImage} />
              {story.isUser && (
                <View style={styles.addStoryButton}>
                  <Text style={styles.addStoryPlus}>+</Text>
                </View>
              )}
              <Text style={styles.storyUsername}>{story.user}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.posts}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.userImage }} style={styles.userImage} />
                <View>
                  <Text style={styles.username}>{post.user}</Text>
                  <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                </View>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              <Image source={{ uri: post.image }} style={styles.postImage} />
              <View style={styles.postStats}>
                <Text style={styles.statsText}>{post.likes} Likes</Text>
                <Text style={styles.statsText}>{post.comments} Comments</Text>
                <Text style={styles.statsText}>{post.shares} Shares</Text>
              </View>
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <ThumbsUp size={20} color="#65676B" />
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MessageCircle size={20} color="#65676B" />
                  <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Share size={20} color="#65676B" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  logo: {
    color: '#1877F2',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storiesContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  storyCard: {
    width: 110,
    height: 170,
    marginRight: 12,
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -15 }],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStoryPlus: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  storyUsername: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  posts: {
    padding: 8,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
  },
  timeAgo: {
    color: '#65676B',
    fontSize: 12,
  },
  postContent: {
    padding: 12,
    paddingTop: 0,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postStats: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  statsText: {
    color: '#65676B',
    marginRight: 16,
    fontSize: 12,
  },
  postActions: {
    flexDirection: 'row',
    padding: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    color: '#65676B',
    marginLeft: 4,
  },
});