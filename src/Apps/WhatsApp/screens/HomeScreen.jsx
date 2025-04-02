import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { MessageCircle, Search, MoveVertical as MoreVertical } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

const CHATS = [
  {
    id: '1',
    name: 'Sarah Wilson',
    message: 'Hey, how are you? I was thinking about our project...',
    time: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'John Smith',
    message: 'The presentation went really well! The client loved our...',
    time: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Emily Brown',
    message: 'Let\'s catch up this weekend! I have so much to tell you...',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    unread: 1,
    online: true,
  },
  {
    id: '4',
    name: 'Tech Team',
    message: 'Alex: The new feature is ready for testing',
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    unread: 5,
    online: false,
    isGroup: true,
  },
];

export default function ChatsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: `${item.avatar}?w=100` }}
          style={styles.avatar}
        />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>
            {formatDistanceToNow(item.time, { addSuffix: true })}
          </Text>
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
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search chats</Text>
        </View>
      </View>

      <FlatList
        data={CHATS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.fab}>
        <MessageCircle size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  list: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
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
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  time: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-SemiBold',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'ios' ? 40 : 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});