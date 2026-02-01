import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { agents } from '../data/agents';

const ChatScreen = () => {
    // creating some dummy chats from agents
    const chats = [
        {
            id: '1',
            name: agents[0].name,
            lastMessage: 'Is the property in Pali still available?',
            time: '10:30 AM',
            unread: 2,
            avatar: agents[0].profileImage
        },
        {
            id: '2',
            name: 'Rajesh Kumar',
            lastMessage: 'I can offer 42 Lakhs.',
            time: 'Yesterday',
            unread: 0,
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100'
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.msgRow}>
                    <Text style={[styles.message, item.unread > 0 && styles.unreadMsg]} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Messages" showLocation={false} />
            <FlatList
                data={chats}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        padding: 20,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 16,
        backgroundColor: '#f0f0f0',
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    msgRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        marginRight: 10,
    },
    unreadMsg: {
        color: '#333',
        fontWeight: '600',
    },
    badge: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default ChatScreen;
