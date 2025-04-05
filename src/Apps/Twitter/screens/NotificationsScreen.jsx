import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const notifications = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    },
    content: 'liked your Tweet',
    timestamp: '2h',
  },
  {
    id: '2',
    type: 'retweet',
    user: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    content: 'retweeted your Tweet',
    timestamp: '4h',
  },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationText}>
                <Text style={styles.userName}>{item.user.name}</Text> {item.content}
              </Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  notification: {
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
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userName: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#536471',
    marginTop: 4,
  },
});