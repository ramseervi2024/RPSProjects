import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const CHATS = [
  {
    id: '1',
    name: 'Sarah Wilson',
    message: 'Hey, how are you?',
    time: '10:30 AM',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    unread: 2,
  },
  {
    id: '2',
    name: 'John Smith',
    message: 'Did you see the meeting notes?',
    time: '9:45 AM',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    unread: 0,
  },
  {
    id: '3',
    name: 'Emily Brown',
    message: 'Let\'s catch up this weekend!',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    unread: 1,
  },
];

export default function ChatsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image
        source={{ uri: `${item.avatar}?w=100` }}
        style={styles.avatar}
      />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={1}>
            {item.message}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CHATS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#128C7E',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});