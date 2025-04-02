import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const activities = [
  {
    id: '1',
    type: 'like',
    user: {
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    post: {
      image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=150&h=150&fit=crop',
    },
    timestamp: '2h',
  },
  {
    id: '2',
    type: 'follow',
    user: {
      username: 'janedoe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    timestamp: '4h',
  },
];

export default function ActivityScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      {activities.map((activity) => (
        <View key={activity.id} style={styles.activity}>
          <Image source={{ uri: activity.user.avatar }} style={styles.avatar} />
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              <Text style={styles.username}>{activity.user.username}</Text>
              {activity.type === 'like' ? ' liked your post' : ' started following you'}
            </Text>
            <Text style={styles.timestamp}>{activity.timestamp}</Text>
          </View>
          {activity.type === 'like' && (
            <Image source={{ uri: activity.post.image }} style={styles.postImage} />
          )}
          {activity.type === 'follow' && (
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          )}
        </View>
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
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    marginTop: 50,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activityContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  activityText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  username: {
    fontFamily: 'Inter_600SemiBold',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  postImage: {
    width: 44,
    height: 44,
  },
  followButton: {
    backgroundColor: '#0095F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});