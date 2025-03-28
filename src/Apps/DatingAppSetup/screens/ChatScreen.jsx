import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react-native';

const messages = [
  {
    id: '1',
    text: 'Hey there!',
    sent: true,
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    text: 'Hi! How are you?',
    sent: false,
    timestamp: '10:01 AM',
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sarah</Text>
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