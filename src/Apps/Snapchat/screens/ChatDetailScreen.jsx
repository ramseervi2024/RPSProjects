import { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { 
  ChevronLeft, 
  Send, 
  Phone, 
  Video, 
  Camera,
  Smile,
  Paperclip,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';



const MESSAGES = [
  { 
    id: '1', 
    text: 'Hey there!', 
    sent: true, 
    time: '2:30 PM',
    status: 'read',
    type: 'text',
  },
  { 
    id: '2', 
    text: 'Hi! How are you?', 
    sent: false, 
    time: '2:31 PM',
    status: 'read',
    type: 'text',
  },
  {
    id: '3',
    text: 'Check out this photo!',
    sent: true,
    time: '2:32 PM',
    status: 'delivered',
    type: 'image',
    media: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  },
  {
    id: '4',
    text: 'New snap!',
    sent: false,
    time: '2:35 PM',
    status: 'sent',
    type: 'snap',
    duration: 10,
  },
];

export default function ChatDetailScreen() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef();
  const scrollViewRef = useRef(null);
  const [showActions, setShowActions] = useState(false);
  const actionAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  const handleTyping = (text) => {
    setMessage(text);
    setIsTyping(true);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const toggleActions = () => {
    const toValue = showActions ? 0 : 1;
    setShowActions(!showActions);
    Animated.spring(actionAnimation, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const renderMessage = ({ item }) => {
    if (item.type === 'snap') {
      return (
        <View style={[styles.messageContainer, item.sent ? styles.sent : styles.received]}>
          <View style={styles.snapContainer}>
            <Camera color="#fff" size={24} />
            <Text style={styles.snapText}>Snap • {item.duration}s</Text>
          </View>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      );
    }

    if (item.type === 'image') {
      return (
        <View style={[styles.messageContainer, item.sent ? styles.sent : styles.received]}>
          <Image source={{ uri: item.media }} style={styles.messageImage} />
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.messageContainer, item.sent ? styles.sent : styles.received]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <View style={styles.messageFooter}>
          <Text style={styles.messageTime}>{item.time}</Text>
          {item.sent && (
            <Text style={styles.messageStatus}>
              {item.status === 'read' ? '✓✓' : item.status === 'delivered' ? '✓✓' : '✓'}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a1a']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {}}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>John Doe</Text>
          {isTyping && (
            <Text style={styles.typingIndicator}>typing...</Text>
          )}
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Phone color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Video color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={scrollViewRef}
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={renderMessage}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={toggleActions}>
          <Paperclip color="#fff" size={24} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Send a chat..."
          placeholderTextColor="#666"
          value={message}
          onChangeText={handleTyping}
          multiline
        />

        <TouchableOpacity style={styles.actionButton}>
          <Smile color="#fff" size={24} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sendButton, message.length > 0 && styles.sendButtonActive]}>
          <Send color={message.length > 0 ? '#000' : '#fff'} size={20} />
        </TouchableOpacity>
      </View>

      {/* Action Sheet */}
      <Animated.View 
        style={[
          styles.actionSheet,
          {
            transform: [{
              translateY: actionAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            }],
          },
        ]}>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: '#ff6b6b' }]}>
              <Camera color="#fff" size={24} />
            </View>
            <Text style={styles.actionText}>Camera</Text>
          </TouchableOpacity>
          {/* Add more action items here */}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  typingIndicator: {
    color: '#fffc00',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  messageList: {
    padding: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  sent: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  received: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  messageTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  messageStatus: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginLeft: 4,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  snapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 10,
  },
  snapText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#fffc00',
  },
  actionSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});