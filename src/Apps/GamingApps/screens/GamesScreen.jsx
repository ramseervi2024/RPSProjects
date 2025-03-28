import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

const games = [
  {
    id: '1',
    title: 'Cyber Racer',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&auto=format&fit=crop&q=60',
    category: 'Racing',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Space Warriors',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=60',
    category: 'Action',
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Puzzle Master',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&auto=format&fit=crop&q=60',
    category: 'Puzzle',
    rating: 4.7,
  },
  {
    id: '4',
    title: 'Strategy Kings',
    image: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=800&auto=format&fit=crop&q=60',
    category: 'Strategy',
    rating: 4.6,
  },
];

export default function GamesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Games</Text>
        <View style={styles.searchBar}>
          <Search size={20} color="#94a1b2" />
          <Text style={styles.searchPlaceholder}>Search games...</Text>
        </View>
      </View>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gameCard}>
            <Image source={{ uri: item.image }} style={styles.gameImage} />
            <View style={styles.gameInfo}>
              <View>
                <Text style={styles.gameTitle}>{item.title}</Text>
                <Text style={styles.gameCategory}>{item.category}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{item.rating}</Text>
                <Text style={styles.ratingLabel}>Rating</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#fffffe',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1b1e',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94a1b2',
  },
  list: {
    padding: 20,
    gap: 16,
  },
  gameCard: {
    backgroundColor: '#2c2d31',
    borderRadius: 16,
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: 200,
  },
  gameInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fffffe',
    marginBottom: 4,
  },
  gameCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94a1b2',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#7f5af0',
  },
  ratingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94a1b2',
  },
});