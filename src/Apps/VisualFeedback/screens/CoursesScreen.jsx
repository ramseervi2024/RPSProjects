import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  interpolate
} from 'react-native-reanimated';
import { MessageCircle, Send } from 'lucide-react-native';

const TypingDots = ({ isVisible }: { isVisible: boolean }) => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  React.useEffect(() => {
    if (isVisible) {
      const animateDots = () => {
        dot1.value = withSequence(
          withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) }),
          withTiming(0.3, { duration: 400, easing: Easing.in(Easing.ease) })
        );
        dot2.value = withSequence(
          withDelay(150, withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) })),
          withTiming(0.3, { duration: 400, easing: Easing.in(Easing.ease) })
        );
        dot3.value = withSequence(
          withDelay(300, withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) })),
          withTiming(0.3, { duration: 400, easing: Easing.in(Easing.ease) })
        );
      };

      animateDots();
      const interval = setInterval(animateDots, 1200);
      return () => clearInterval(interval);
    } else {
      dot1.value = withTiming(0.3, { duration: 200 });
      dot2.value = withTiming(0.3, { duration: 200 });
      dot3.value = withTiming(0.3, { duration: 200 });
    }
  }, [isVisible]);

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1.value,
    transform: [{ 
      translateY: interpolate(dot1.value, [0.3, 1], [0, -8]) 
    }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2.value,
    transform: [{ 
      translateY: interpolate(dot2.value, [0.3, 1], [0, -8]) 
    }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3.value,
    transform: [{ 
      translateY: interpolate(dot3.value, [0.3, 1], [0, -8]) 
    }],
  }));

  return (
    <View style={styles.typingContainer}>
      <View style={styles.typingBubble}>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} />
        </View>
      </View>
    </View>
  );
};

const ChatMessage = ({ 
  message, 
  isUser, 
  delay 
}: { 
  message: string; 
  isUser: boolean; 
  delay: number;
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  React.useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.back(1.7)) });
    }, delay);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[
      styles.messageContainer,
      isUser ? styles.userMessage : styles.botMessage,
      animatedStyle
    ]}>
      <Text style={[
        styles.messageText,
        isUser ? styles.userText : styles.botText
      ]}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default function TypingScreen() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! 👋", isUser: false },
    { id: 2, text: "Hi! How are you?", isUser: true },
  ]);
  const [messageKey, setMessageKey] = useState(2);

  const simulateConversation = () => {
    if (isTyping) return;

    setIsTyping(true);

    const responses = [
      "I'm doing great, thanks for asking! 😊",
      "That's awesome to hear! What have you been up to?",
      "Sounds interesting! Tell me more about it.",
      "I love chatting with you! 💬",
      "This typing animation is pretty cool, right?",
    ];

    setTimeout(() => {
      setIsTyping(false);
      const newMessage = {
        id: messageKey + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false
      };
      setMessages(prev => [...prev, newMessage]);
      setMessageKey(prev => prev + 1);
    }, 2000 + Math.random() * 2000);
  };

  const sendUserMessage = () => {
    const userMessages = [
      "That's really cool!",
      "Tell me more!",
      "Interesting...",
      "I agree!",
      "What do you think?",
    ];

    const newMessage = {
      id: messageKey + 1,
      text: userMessages[Math.floor(Math.random() * userMessages.length)],
      isUser: true
    };
    setMessages(prev => [...prev, newMessage]);
    setMessageKey(prev => prev + 1);

    setTimeout(simulateConversation, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MessageCircle size={24} color="#3B82F6" />
        <Text style={styles.title}>Chat UI</Text>
      </View>
      
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            delay={index * 100}
          />
        ))}
        {isTyping && <TypingDots isVisible={isTyping} />}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Pressable style={styles.sendButton} onPress={sendUserMessage}>
          <Send size={20} color="#ffffff" />
          <Text style={styles.sendText}>Send Message</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.typingButton, isTyping && styles.buttonDisabled]} 
          onPress={simulateConversation}
          disabled={isTyping}
        >
          <Text style={styles.buttonText}>
            {isTyping ? 'Typing...' : 'Simulate Response'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    padding: 12,
    paddingHorizontal: 16,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#374151',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    padding: 12,
    paddingHorizontal: 16,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  botText: {
    color: '#ffffff',
  },
  typingContainer: {
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  typingBubble: {
    backgroundColor: '#374151',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    padding: 16,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
  },
  inputContainer: {
    padding: 20,
    gap: 12,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  sendText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  typingButton: {
    backgroundColor: '#6B7280',
    padding: 16,
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});