import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const leaderboardData = [
  {
    id: '1',
    rank: 1,
    username: 'ProGamer123',
    score: 15000,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    rank: 2,
    username: 'GameMaster',
    score: 14500,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    rank: 3,
    username: 'PixelWarrior',
    score: 14000,
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&auto=format&fit=crop&q=60',
  },
];

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top Players</Text>
      </View>

      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>#{item.rank}</Text>
            </View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.playerInfo}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.score}>{item.score.toLocaleString()} pts</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2c2d31',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 24,
    color: '#fffffe',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94a1b2',
  },
  list: {
    padding: 20,
    gap: 16,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2d31',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  rankContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#7f5af0',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rank: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fffffe',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  playerInfo: {
    flex: 1,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fffffe',
    marginBottom: 4,
  },
  score: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7f5af0',
  },
});