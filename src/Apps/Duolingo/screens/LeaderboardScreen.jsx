import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEADERBOARD_DATA = [
  {
    id: '1',
    name: 'Sarah Johnson',
    points: 2500,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Michael Chen',
    points: 2350,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Emma Davis',
    points: 2200,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60',
  },
];

export default function LeaderboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Diamond League</Text>
      </View>

      <FlatList
        data={LEADERBOARD_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.points}>{item.points} XP</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#1CB0F6',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#fff',
    opacity: 0.8,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rank: {
    width: 30,
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#666',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  points: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#666',
  },
});