import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react-native';

const users = [
  {
    id: '1',
    name: 'Sophia',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '2',
    name: 'Emma',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '3',
    name: 'Olivia',
    image: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '4',
    name: 'Lily',
    image: 'https://images.unsplash.com/photo-1553860214-87b92d6c1e22?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGdpcmxzfGVufDB8fDB8fHww',
  },
  {
    id: '5',
    name: 'Mia',
    image: 'https://images.unsplash.com/photo-1600600423621-70c9f4416ae9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdpcmxzfGVufDB8fDB8fHww',
  },
];

const messages = [
  {
    id: '1',
    text: 'Hey there, how’s your day going?',
    sent: true,
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    text: 'It’s going well, thanks for asking! How about you?',
    sent: false,
    timestamp: '10:01 AM',
  },
  {
    id: '3',
    text: 'Just started working on a new project. It’s exciting!',
    sent: true,
    timestamp: '10:05 AM',
  },
  {
    id: '4',
    text: 'That sounds awesome! What’s the project about?',
    sent: false,
    timestamp: '10:07 AM',
  },
  {
    id: '5',
    text: 'It’s about building a mobile app. I’m learning a lot!',
    sent: true,
    timestamp: '10:10 AM',
  },
];

export default function ChatScreen() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#fff',
      padding: 20,
      paddingTop: 60,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    headerText: {
      fontSize: 20,
      fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
      textAlign: isRTL ? 'right' : 'left',
    },
    messageList: {
      flex: 1,
      padding: 20,
    },
    message: {
      maxWidth: '80%',
      padding: 12,
      borderRadius: 16,
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    sentMessage: {
      backgroundColor: '#FF4B6E',
      alignSelf: 'flex-end',
    },
    receivedMessage: {
      backgroundColor: '#fff',
    },
    messageText: {
      color: '#fff',
      fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
      fontSize: 16,
    },
    receivedMessageText: {
      color: '#000',
    },
    timestamp: {
      fontSize: 12,
      color: '#666',
      marginTop: 4,
      textAlign: isRTL ? 'left' : 'right',
    },
    inputContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      padding: 16,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: isRTL ? 0 : 8,
      marginLeft: isRTL ? 8 : 0,
      fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
      textAlign: isRTL ? 'right' : 'left',
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#FF4B6E',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const currentUser = users[0]; // You can change the current user dynamically

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{currentUser.name}</Text>
      </View>
      <FlatList
        data={messages}
        style={styles.messageList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sent ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                !item.sent && styles.receivedMessageText,
              ]}
            >
              {item.text}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isRTL ? 'اكتب رسالة...' : 'Type a message...'}
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
