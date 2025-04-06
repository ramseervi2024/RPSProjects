import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smile, CirclePlus as PlusCircle, Gift, Sticker, Send } from 'lucide-react-native';
import { format } from 'date-fns';

const messages = [
  {
    id: 1,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    content: 'Hey everyone! Hows it going?',
    timestamp: new Date(2024, 1, 15, 14, 30),
  },
  {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    content: 'Just finished working on the new feature. Ready for review!',
    timestamp: new Date(2024, 1, 15, 14, 32),
  },
  {
    id: 3,
    user: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    content: 'Great work! Ill take a look at it soon.',
    timestamp: new Date(2024, 1, 15, 14, 35),
  },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}># general</Text>
      </SafeAreaView>

      <ScrollView style={styles.messageList}>
        {messages.map(message => (
          <View key={message.id} style={styles.messageItem}>
            <Image
              source={{ uri: `${message.user.avatar}?w=100` }}
              style={styles.avatar}
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.userName}>{message.user.name}</Text>
                <Text style={styles.timestamp}>
                  {format(message.timestamp, 'h:mm a')}
                </Text>
              </View>
              <Text style={styles.messageText}>{message.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <PlusCircle size={24} color="#b9bbbe" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Message #general"
          placeholderTextColor="#72767d"
        />
        <View style={styles.inputActions}>
          <Gift size={24} color="#b9bbbe" style={styles.inputIcon} />
          <Sticker size={24} color="#b9bbbe" style={styles.inputIcon} />
          <Smile size={24} color="#b9bbbe" style={styles.inputIcon} />
          <Send size={24} color="#b9bbbe" style={styles.inputIcon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginRight: 8,
  },
  timestamp: {
    color: '#72767d',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  messageText: {
    color: '#dcddde',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#202225',
  },
  input: {
    flex: 1,
    backgroundColor: '#40444b',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    marginHorizontal: 12,
  },
  inputActions: {
    flexDirection: 'row',
  },
  inputIcon: {
    marginHorizontal: 4,
  },
});