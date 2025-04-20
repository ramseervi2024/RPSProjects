import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native'; // Replacing MaterialIcons with Lucide React Native

export default function ProductCard({ title, price, originalPrice, imageUrl, onPress, item }) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const navigatetoproduct=()=>{
    navigation.navigate('ProductDetailsScreen', {type:title, item:item})
  }
  return (
    <TouchableOpacity style={styles.container} onPress={navigatetoproduct}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{price}</Text>
          <Text style={styles.originalPrice}>₹{originalPrice}</Text>
          <Text style={styles.discount}>{discount}% OFF</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.wishlistButton}>
        <Heart size={24} color="#FF406C" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discount: {
    fontSize: 14,
    color: '#00b852',
    fontWeight: '500',
  },
  wishlistButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
