import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import { Send } from 'lucide-react-native';

const initialMessages = [
    { id: '1', text: 'Hi, are you available for a wedding shoot on Oct 24?', sender: 'me', time: '10:00 AM' },
    { id: '2', text: 'Hello! Yes, I have that date open. What package are you interested in?', sender: 'them', time: '10:05 AM' },
    { id: '3', text: 'I was looking at the Premium Wedding package.', sender: 'me', time: '10:10 AM' },
    { id: '4', text: 'Great choice! That includes a full day coverage and an engagement session.', sender: 'them', time: '10:12 AM' },
];

const ChatScreen = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: inputText,
                sender: 'me',
                time: 'Just now',
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Chat" />
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={[
                        styles.bubble,
                        item.sender === 'me' ? styles.bubbleMe : styles.bubbleThem
                    ]}>
                        <Text style={[
                            styles.messageText,
                            item.sender === 'me' ? styles.textMe : styles.textThem
                        ]}>{item.text}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                )}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#9CA3AF"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Send color="#0F172A" size={20} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    list: {
        padding: 20,
        paddingBottom: 20,
    },
    bubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: '80%',
        marginBottom: 12,
    },
    bubbleMe: {
        backgroundColor: '#FFD700',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    bubbleThem: {
        backgroundColor: '#1F2937',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
    },
    textMe: {
        color: '#0F172A',
    },
    textThem: {
        color: '#F3F4F6',
    },
    time: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
        opacity: 0.7,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#111827',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#1F2937',
        color: '#F3F4F6',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 24,
    },
});

export default ChatScreen;
