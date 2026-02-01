import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { Send, MessageCircle, ChevronDown } from 'lucide-react-native';

const SupportScreen = () => {
    const faqs = [
        { id: 1, q: "How do I book a service?", a: "Select a service, choose a provider, pick a time, and confirm." },
        { id: 2, q: "Can I cancel my booking?", a: "Yes, you can cancel up to 24 hours before the scheduled time." },
        { id: 3, q: "How do I pay?", a: "We accept credit cards, digital wallets, and cash on service." },
    ];

    const dummyChat = [
        { id: 1, text: "Hi, I need help with my recent order.", sender: "user" },
        { id: 2, text: "Hello! Sure, please share your Order ID.", sender: "support" },
    ];

    return (
        <View style={styles.container}>
            <Header title="Support" />
            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                {faqs.map(faq => (
                    <View key={faq.id} style={styles.faqItem}>
                        <View style={styles.faqHeader}>
                            <Text style={styles.question}>{faq.q}</Text>
                            <ChevronDown size={20} color="#64748b" />
                        </View>
                        <Text style={styles.answer}>{faq.a}</Text>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Chat with Us</Text>
                <View style={styles.chatBox}>
                    {dummyChat.map(msg => (
                        <View key={msg.id} style={[
                            styles.messageBubble,
                            msg.sender === 'user' ? styles.userBubble : styles.supportBubble
                        ]}>
                            <Text style={[
                                styles.messageText,
                                msg.sender === 'user' ? styles.userText : styles.supportText
                            ]}>{msg.text}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#94a3b8"
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Send color="#fff" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 20,
        paddingBottom: 80,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 16,
        marginTop: 8,
    },
    faqItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    question: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1e293b',
        flex: 1,
        marginRight: 8,
    },
    answer: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
    },
    chatBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        minHeight: 200,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    userBubble: {
        backgroundColor: '#0284c7',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    supportBubble: {
        backgroundColor: '#f1f5f9',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 14,
    },
    userText: {
        color: '#fff',
    },
    supportText: {
        color: '#334155',
    },
    inputArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    input: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        marginRight: 12,
        color: '#0f172a',
    },
    sendButton: {
        backgroundColor: '#0284c7',
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SupportScreen;
