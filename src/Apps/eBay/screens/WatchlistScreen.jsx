import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Trash2 } from 'lucide-react-native';

const WATCHLIST = [
  {
    id: '1',
    title: 'Apple MacBook Pro 14"',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    endTime: '2d 5h',
    bids: 23,
  },
  {
    id: '2',
    title: 'Canon EOS R5',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
    endTime: '1d 12h',
    bids: 15,
  },
];

export default function WatchlistScreen() {
  const renderWatchlistItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTime}>Ends in {item.endTime}</Text>
          <Text style={styles.itemBids}>{item.bids} bids</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Trash2 size={20} color="#e53238" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Watchlist</Text>
        <Heart size={24} color="#e53238" fill="#e53238" />
      </View>

      {WATCHLIST.length > 0 ? (
        <FlatList
          data={WATCHLIST}
          renderItem={renderWatchlistItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyState}>
          <Heart size={64} color="#ccc" />
          <Text style={styles.emptyText}>Your watchlist is empty</Text>
          <Text style={styles.emptySubtext}>
            Add items to your watchlist to keep track of products you're interested in
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53238',
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTime: {
    color: '#666',
    fontSize: 14,
  },
  itemBids: {
    color: '#666',
    fontSize: 14,
  },
  removeButton: {
    padding: 12,
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});