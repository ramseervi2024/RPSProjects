import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatDistanceToNow } from 'date-fns';

const ACTIVITIES = [
  {
    id: '1',
    user: {
      username: 'sarah_designs',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    type: 'like',
    content: 'liked your photo',
    timestamp: new Date('2024-02-08T18:30:00'),
  },
  {
    id: '2',
    user: {
      username: 'travel_mike',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    type: 'follow',
    content: 'started following you',
    timestamp: new Date('2024-02-08T15:45:00'),
  },
];

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      <FlatList
        data={ACTIVITIES}
        renderItem={({ item }) => (
          <Pressable style={styles.activityItem}>
            <FastImage source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.activityContent}>
              <Text style={styles.username}>{item.user.username}</Text>
              <Text style={styles.activityText}>{item.content}</Text>
              <Text style={styles.timestamp}>
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </Text>
            </View>
          </Pressable>
        )}
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
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  username: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  activityText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  timestamp: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
