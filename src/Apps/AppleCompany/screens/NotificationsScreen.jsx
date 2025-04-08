import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';

const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 'From $999',
    image: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800',
  },
  {
    id: '2',
    name: 'MacBook Pro',
    price: 'From $1299',
    image: 'https://images.unsplash.com/photo-1696447160307-a14fb9cc91e1?q=80&w=800',
  },
  {
    id: '3',
    name: 'iPad Pro',
    price: 'From $799',
    image: 'https://images.unsplash.com/photo-1696447160456-1d37aaf7c116?q=80&w=800',
  },
  {
    id: '4',
    name: 'Apple Watch',
    price: 'From $399',
    image: 'https://images.unsplash.com/photo-1696447160307-a14fb9cc91e1?q=80&w=800',
  },
];

export default function StoreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Store</Text>
      </View>

      <View style={styles.grid}>
        {products.map((product) => (
          <Pressable key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 32,
    color: '#000000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  productCard: {
    width: '50%',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productName: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
  },
  productPrice: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});