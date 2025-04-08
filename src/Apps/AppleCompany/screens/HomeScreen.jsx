import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>Apple</Text>
      </View>

      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800' }}
          style={styles.heroImage}
        />
        <Text style={styles.heroTitle}>iPhone 15 Pro</Text>
        <Text style={styles.heroSubtitle}>Titanium. So strong. So light. So Pro.</Text>
        <View href="/store" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          <View style={styles.productCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800' }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>MacBook Pro</Text>
            <Text style={styles.productPrice}>From $1299</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800' }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>iPad Pro</Text>
            <Text style={styles.productPrice}>From $799</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800' }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Apple Watch</Text>
            <Text style={styles.productPrice}>From $399</Text>
          </View>
        </ScrollView>
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
  logo: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 24,
    color: '#000000',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroImage: {
    width: '100%',
    height: 400,
    borderRadius: 20,
  },
  heroTitle: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 32,
    color: '#000000',
    marginTop: 20,
  },
  heroSubtitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 18,
    color: '#666666',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#000000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
  },
  featuredSection: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 20,
  },
  productScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  productCard: {
    marginRight: 20,
    width: 200,
  },
  productImage: {
    width: 200,
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