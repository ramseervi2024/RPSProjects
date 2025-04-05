import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Heart, Star } from 'lucide-react-native';

export default function ProductDetails() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Premium Wireless Headphones</Text>
          <Heart color="#FF3B30" size={24} />
        </View>
        <View style={styles.ratingContainer}>
          <Star color="#FFB800" fill="#FFB800" size={18} />
          <Text style={styles.rating}>4.8 (2.5k reviews)</Text>
        </View>
        <Text style={styles.price}>$299.99</Text>
        <Text style={styles.description}>
          Experience premium sound quality with our latest wireless headphones. 
          Featuring active noise cancellation, 40-hour battery life, and premium 
          materials for ultimate comfort during long listening sessions.
        </Text>
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Key Features</Text>
          <Text style={styles.featureItem}>• Active Noise Cancellation</Text>
          <Text style={styles.featureItem}>• 40-hour Battery Life</Text>
          <Text style={styles.featureItem}>• Premium Memory Foam Cushions</Text>
          <Text style={styles.featureItem}>• Bluetooth 5.0 Connectivity</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    marginLeft: 8,
    color: '#666',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  features: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: '#333',
  },
});