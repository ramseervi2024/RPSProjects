import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const DEALS = [
  {
    id: '1',
    title: 'Smart LED TV',
    price: 15999,
    originalPrice: 25999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80'
  },
  {
    id: '2',
    title: 'Running Shoes',
    price: 999,
    originalPrice: 2499,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'
  },
  {
    id: '3',
    title: 'Wireless Earbuds',
    price: 1299,
    originalPrice: 2999,
    discount: 57,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80'
  }
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80' }}
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deal of the Day</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DEALS.map(deal => (
            <TouchableOpacity key={deal.id} style={styles.dealCard}>
              <Image source={{ uri: deal.image }} style={styles.dealImage} />
              <View style={styles.dealInfo}>
                <Text style={styles.dealTitle} numberOfLines={2}>{deal.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹{deal.price}</Text>
                  <Text style={styles.originalPrice}>₹{deal.originalPrice}</Text>
                  <Text style={styles.discount}>{deal.discount}% Off</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dealCard: {
    width: 160,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dealImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  dealInfo: {
    padding: 10,
  },
  dealTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e40046',
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discount: {
    fontSize: 14,
    color: '#00a650',
  },
});