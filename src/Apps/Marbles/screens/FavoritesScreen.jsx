import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';

const favorites = [
  {
    id: 1,
    name: 'Grey Night Marble',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Carrara White',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1586871372605-c3c87ef45af3?w=800&auto=format&fit=crop',
  },
];

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.favoritesList}>
        {favorites.map((item) => (
          <TouchableOpacity key={item.id} style={styles.favoriteCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.heartButton}>
              <Heart size={24} color="#ff4646" fill="#ff4646" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  favoritesList: {
    padding: 20,
  },
  favoriteCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  productInfo: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: '#1a1a1a',
  },
  productPrice: {
    fontFamily: 'InterBold',
    fontSize: 14,
    color: '#1a1a1a',
    marginTop: 4,
  },
  heartButton: {
    padding: 16,
  },
});