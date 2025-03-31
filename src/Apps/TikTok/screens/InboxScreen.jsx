import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const MESSAGES = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    message: 'Loved your latest video! 🔥',
    time: '2m ago',
    unread: true,
  },
  {
    id: '2',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    message: 'Want to collab on a video?',
    time: '1h ago',
    unread: true,
  },
  {
    id: '3',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    message: 'Thanks for the follow!',
    time: '3h ago',
    unread: false,
  },
];

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
      </View>

      <FlatList
        data={MESSAGES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.messageItem}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.username}>{item.user.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.messageFooter}>
                <Text style={styles.messageText} numberOfLines={1}>
                  {item.message}
                </Text>
                {item.unread && <View style={styles.unreadDot} />}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
  },
  messageItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 15,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  time: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    color: '#999',
    fontSize: 14,
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff2b55',
    marginLeft: 8,
  },
});