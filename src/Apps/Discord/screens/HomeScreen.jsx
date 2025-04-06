import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hash, ChevronDown, Bell, Pin, Users, Settings } from 'lucide-react-native';

const channels = [
  { id: 1, name: 'general', unread: true },
  { id: 2, name: 'announcements', unread: false },
  { id: 3, name: 'off-topic', unread: true },
  { id: 4, name: 'development', unread: false },
  { id: 5, name: 'design', unread: false },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Pressable style={styles.serverButton}>
          <Text style={styles.serverName}>Discord App</Text>
          <ChevronDown size={20} color="#fff" />
        </Pressable>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.channelHeader}>
          <View style={styles.channelInfo}>
            <Hash size={24} color="#8e9297" />
            <Text style={styles.channelName}>general</Text>
          </View>
          <View style={styles.channelActions}>
            <Bell size={20} color="#8e9297" style={styles.actionIcon} />
            <Pin size={20} color="#8e9297" style={styles.actionIcon} />
            <Users size={20} color="#8e9297" style={styles.actionIcon} />
            <Settings size={20} color="#8e9297" style={styles.actionIcon} />
          </View>
        </View>

        <ScrollView style={styles.channelList}>
          <Text style={styles.channelCategory}>TEXT CHANNELS</Text>
          {channels.map(channel => (
            <Pressable key={channel.id} style={styles.channelItem}>
              <Hash size={20} color="#8e9297" />
              <Text style={[
                styles.channelItemName,
                channel.unread && styles.channelItemUnread
              ]}>
                {channel.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  header: {
    backgroundColor: '#2f3136',
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  serverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  serverName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginRight: 4,
  },
  content: {
    flex: 1,
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  channelActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 16,
  },
  channelList: {
    flex: 1,
    padding: 16,
  },
  channelCategory: {
    color: '#8e9297',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  channelItemName: {
    color: '#8e9297',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginLeft: 8,
  },
  channelItemUnread: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
  },
});