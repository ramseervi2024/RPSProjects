import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const activities = [
  {
    id: '1',
    type: 'like',
    user: {
      username: 'emily.travels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
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
      username: 'foodie.adventures',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    },
    timestamp: '4h',
  },
  {
    id: '3',
    type: 'mention',
    user: {
      username: 'urban.lens',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    comment: 'Great shot! 📸 Love the composition!',
    post: {
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=150&h=150&fit=crop',
    },
    timestamp: '6h',
  },
  {
    id: '4',
    type: 'like',
    user: {
      username: 'nature.vibes',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    },
    post: {
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&h=150&fit=crop',
    },
    timestamp: '8h',
  },
  {
    id: '5',
    type: 'follow',
    user: {
      username: 'coffee.lover',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    },
    timestamp: '12h',
  },
];

export default function ActivityScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today</Text>
        {activities.slice(0, 2).map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        {activities.slice(2).map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </View>
    </ScrollView>
  );
}

function ActivityItem({ activity }) {
  return (
    <View style={styles.activity}>
      <Image source={{ uri: activity.user.avatar }} style={styles.avatar} />
      <View style={styles.activityContent}>
        <View style={styles.activityTextContainer}>
          <Text style={styles.username}>{activity.user.username}</Text>
          <Text style={styles.activityText}>
            {activity.type === 'like' && ' liked your post'}
            {activity.type === 'follow' && ' started following you'}
            {activity.type === 'mention' && ' mentioned you in a comment: '}
          </Text>
          {activity.type === 'mention' && (
            <Text style={styles.comment}>{activity.comment}</Text>
          )}
        </View>
        <Text style={styles.timestamp}>{activity.timestamp}</Text>
      </View>
      {(activity.type === 'like' || activity.type === 'mention') && (
        <Image source={{ uri: activity.post.image }} style={styles.postImage} />
      )}
      {activity.type === 'follow' && (
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      )}
    </View>
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
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    paddingHorizontal: 16,
    marginBottom: 8,
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
  activityTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  username: {
    fontFamily: 'Inter_600SemiBold',
  },
  activityText: {
    fontFamily: 'Inter_400Regular',
  },
  comment: {
    fontFamily: 'Inter_400Regular',
    color: '#666',
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
    borderRadius: 4,
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