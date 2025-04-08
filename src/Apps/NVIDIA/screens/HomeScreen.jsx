import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1555618565-5e1b82b3f1af?q=80&w=1920' }}
          style={styles.heroImage}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Powering the AI Revolution</Text>
          <Text style={styles.heroSubtitle}>Leading the future of computing technology</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <View style={styles.newsCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1563770660941-671fb5e9acd9?q=80&w=800' }}
            style={styles.newsImage}
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>Next-Gen GPU Architecture</Text>
            <Text style={styles.newsDescription}>Discover our latest innovations in GPU technology</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Learn More</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.productCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=500' }}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>GeForce RTX 4090</Text>
              <Text style={styles.productDescription}>Ultimate Gaming Performance</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
  },
  newsDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#76B900',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  productsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  productCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#000000',
    padding: 12,
    paddingBottom: 4,
  },
  productDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});