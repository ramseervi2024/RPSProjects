import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const friends = [
  {
    id: 1,
    name: 'Sarah Wilson',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    activity: 'Playing Valorant',
  },
  {
    id: 2,
    name: 'Michael Chen',
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    activity: 'Spotify',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    status: 'dnd',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    activity: 'Visual Studio Code',
  },
];

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Friends</Text>
          <View style={styles.tabs}>
            <Pressable style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Online</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>All</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>Pending</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>Blocked</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content}>
        {friends.map(friend => (
          <Pressable key={friend.id} style={styles.friendItem}>
            <Image
              source={{ uri: `${friend.avatar}?w=100` }}
              style={styles.avatar}
            />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <Text style={styles.friendActivity}>{friend.activity}</Text>
            </View>
            <View style={[styles.statusIndicator, styles[friend.status]]} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#4f545c',
  },
  tabText: {
    color: '#8e9297',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  friendActivity: {
    color: '#8e9297',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  online: {
    backgroundColor: '#43b581',
  },
  idle: {
    backgroundColor: '#faa61a',
  },
  dnd: {
    backgroundColor: '#f04747',
  },
});