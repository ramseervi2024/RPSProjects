import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const messages = [
  {
    id: '1',
    name: 'Sarah',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Hey! How are you?',
    time: '5m ago',
    unread: true,
  },
  {
    id: '2',
    name: 'Michael',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastMessage: 'Would you like to grab coffee sometime?',
    time: '2h ago',
    unread: false,
  },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageCard}>
            <Image
              source={{ uri: `${message.image}?w=200` }}
              style={styles.avatar}
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.name}>{message.name}</Text>
                <Text style={styles.time}>{message.time}</Text>
              </View>
              <View style={styles.messagePreview}>
                <Text
                  style={[
                    styles.lastMessage,
                    message.unread && styles.unreadMessage,
                  ]}
                  numberOfLines={1}>
                  {message.lastMessage}
                </Text>
                {message.unread && <View style={styles.unreadDot} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1F2937',
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  unreadMessage: {
    color: '#1F2937',
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4B6E',
    marginLeft: 8,
  },
});