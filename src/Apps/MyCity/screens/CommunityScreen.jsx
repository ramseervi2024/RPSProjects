import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MessageCircle, Heart, Share2 } from 'lucide-react-native';

const POSTS = [
  {
    id: '1',
    author: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    content: 'Just finished organizing the community garden. Thanks to everyone who helped out! 🌱',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80',
    likes: 24,
    comments: 8,
    time: '2 hours ago',
  },
  {
    id: '2',
    author: 'Mike Thompson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    content: 'Looking for volunteers for this weekend\'s village cleanup drive. Let\'s make our community better together! 🧹',
    likes: 15,
    comments: 12,
    time: '4 hours ago',
  },
];

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.newPostButton}>
          <Text style={styles.newPostButtonText}>New Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createPost}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }}
          style={styles.userAvatar}
        />
        <TouchableOpacity style={styles.postInput}>
          <Text style={styles.postInputText}>Share something with your community...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.posts}>
        {POSTS.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.authorAvatar} />
              <View style={styles.postHeaderText}>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>
            
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={20} color="#64748b" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color="#64748b" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
  },
  newPostButton: {
    backgroundColor: '#166534',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newPostButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  createPost: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 12,
  },
  postInputText: {
    color: '#94a3b8',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  posts: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderText: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#334155',
  },
  postTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#334155',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748b',
  },
});