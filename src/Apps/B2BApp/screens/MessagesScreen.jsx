import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function MessagesScreen() {
  const messages = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      message: 'Hi, Id like to discuss your enterprise package',
      time: '10:30 AM',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Global Innovations',
      message: 'Thanks for the product demo yesterday',
      time: '9:15 AM',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Emily Davis',
      company: 'EcoSmart Systems',
      message: 'When can we schedule a follow-up call?',
      time: 'Yesterday',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <ScrollView style={styles.content}>
        {messages.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageCard}>
            <Image source={{ uri: message.avatar }} style={styles.avatar} />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.name}>{message.name}</Text>
                <Text style={styles.time}>{message.time}</Text>
              </View>
              <Text style={styles.company}>{message.company}</Text>
              <Text style={styles.messageText} numberOfLines={1}>
                {message.message}
              </Text>
            </View>
            {message.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
  },
  time: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
  },
  company: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  messageText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
});