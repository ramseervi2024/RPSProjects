import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Search, Plus, Camera, MessageSquare } from 'lucide-react-native';

const CHATS  = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    lastMessage: 'Hey there!',
    time: '2m',
    unread: true,
    streak: 100,
    isTyping: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Check this out',
    time: '1h',
    unread: false,
    streak: 45,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    lastMessage: 'Received',
    time: '2h',
    unread: false,
    streak: 200,
  },
];

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState(CHATS);
  const [showSearch, setShowSearch] = useState(false);
  const searchAnimation = new Animated.Value(0);

  useEffect(() => {
    const filtered = CHATS.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchQuery]);

  const toggleSearch = () => {
    const toValue = showSearch ? 0 : 1;
    Animated.spring(searchAnimation, {
      toValue,
      useNativeDriver: false,
    }).start();
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery('');
    }
  };

  const searchHeight = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => {}}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          {item.streak && (
            <View style={styles.streakContainer}>
              <Text style={styles.streakNumber}>{item.streak}</Text>
              <Text style={styles.streakEmoji}>🔥</Text>
            </View>
          )}
        </View>
        <View style={styles.messageContainer}>
          {item.isTyping ? (
            <Text style={styles.typingText}>Typing...</Text>
          ) : (
            <Text style={styles.message}>{item.lastMessage}</Text>
          )}
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a1a']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Chat</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton} onPress={toggleSearch}>
              <Search color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Plus color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={[styles.searchContainer, { height: searchHeight }]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search chats..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction}>
          <Camera color="#fff" size={24} />
          <Text style={styles.quickActionText}>New Snap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction}>
          <MessageSquare color="#fff" size={24} />
          <Text style={styles.quickActionText}>New Chat</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 20,
  },
  searchContainer: {
    overflow: 'hidden',
    marginTop: 10,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  quickActionText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  streakNumber: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  streakEmoji: {
    fontSize: 12,
    marginLeft: 2,
  },
  messageContainer: {
    marginTop: 2,
  },
  message: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  typingText: {
    color: '#fffc00',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fffc00',
    marginTop: 4,
  },
});