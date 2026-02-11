import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Send, X } from 'lucide-react-native';
import MessageBubble from './components/MessageBubble';
import SessionRatingModal from './components/SessionRatingModal';

const INITIAL_MESSAGES = [
  {
    "id": "1",
    "sender": "system",
    "text": "Your session with Astrologer Vikram has started.",
    "timestamp": 1734681480000,
    "type": "event"
  },
  {
    "id": "2",
    "sender": "user",
    "text": "Namaste. I am feeling very anxious about my current job. Can you look at my chart?",
    "timestamp": 1734681600000,
    "type": "text"
  },
  {
    "id": "3",
    "sender": "ai_astrologer",
    "text": "Namaste! I am analyzing your birth details. Currently, you are running through Shani Mahadasha. This often brings pressure but builds resilience.",
    "timestamp": 1734681660000,
    "type": "ai",
    "hasFeedback": true,
    "feedbackType": "liked"
  },
  {
    "id": "4",
    "sender": "human_astrologer",
    "text": "I see the same. Look at your 6th house; Saturn is transiting there. This is why you feel the workload is heavy.",
    "timestamp": 1734681720000,
    "type": "human"
  },
  {
    "id": "5",
    "sender": "user",
    "text": "Is there any remedy for this? I find it hard to focus.",
    "timestamp": 1734681780000,
    "type": "text",
    "replyTo": "4"
  },
  {
    "id": "6",
    "sender": "ai_astrologer",
    "text": "I suggest chanting the Shani Mantra 108 times on Saturdays. Would you like the specific mantra text?",
    "timestamp": 1734681840000,
    "type": "ai",
    "hasFeedback": false
  }
];

export default function ChatScreenFeatures() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: Date.now(),
      type: 'text',
      replyTo: replyingTo ? replyingTo.id : null,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setReplyingTo(null);

    // Simulate AI response for demo
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'ai_astrologer',
        text: "That is a great question. Let me consult the charts further.",
        timestamp: Date.now(),
        type: 'ai',
        hasFeedback: false
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleReply = useCallback((message) => {
    setReplyingTo(message);
    // Ideally focus input here
  }, []);

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleEndSession = () => {
    setIsSessionEnded(true);
  };

  const handleReaction = useCallback((messageId, reaction) => {
    setMessages(prevMessages => prevMessages.map(msg =>
      msg.id === messageId ? { ...msg, reaction } : msg
    ));
  }, []);

  const handleFeedback = useCallback((messageId, feedbackType, feedbackTags = []) => {
    setMessages(prevMessages => prevMessages.map(msg =>
      msg.id === messageId ? { ...msg, feedbackType, feedbackTags } : msg
    ));
  }, []);

  const renderItem = useCallback(({ item }) => (
    <MessageBubble
      message={item}
      onReply={handleReply}
      onReact={handleReaction}
      onFeedback={handleFeedback}
      replyMessage={item.replyTo ? messages.find(m => m.id === item.replyTo) : null}
    />
  ), [handleReply, handleReaction, handleFeedback, messages]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Astrologer Vikram</Text>
          <TouchableOpacity onPress={handleEndSession} style={styles.endButton}>
            <Text style={styles.endButtonText}>End Chat</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          {replyingTo && (
            <Animated.View style={styles.replyPreview}>
              <View style={styles.replyBarLines} />
              <View style={styles.replyContent}>
                <Text style={styles.replyingToText}>Replying to {replyingTo.sender === 'user' ? 'You' : 'Astrologer'}</Text>
                <Text numberOfLines={1} style={styles.replyMessageText}>{replyingTo.text}</Text>
              </View>
              <TouchableOpacity onPress={handleCancelReply}>
                <X size={20} color="#666" />
              </TouchableOpacity>
            </Animated.View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={!inputText.trim()}>
              <Send size={24} color={inputText.trim() ? "#6C63FF" : "#ccc"} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {isSessionEnded && (
          <SessionRatingModal
            visible={isSessionEnded}
            onClose={() => setIsSessionEnded(false)}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Light, airy background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  endButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFE5E5',
    borderRadius: 16,
  },
  endButtonText: {
    color: '#D93025', // Red for end action
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
    color: '#333',
  },
  sendButton: {
    padding: 8,
  },
  replyPreview: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyBarLines: {
    width: 4,
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2,
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
  },
  replyingToText: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '600',
    marginBottom: 2,
  },
  replyMessageText: {
    fontSize: 14,
    color: '#666',
  }
});