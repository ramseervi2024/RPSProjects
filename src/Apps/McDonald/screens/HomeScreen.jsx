import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
  const promotions = [
    {
      id: '1',
      title: 'Big Mac® Combo',
      description: 'Get a Big Mac, fries and drink for just $8.99',
      image: 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'New! Spicy McNuggets',
      description: 'Try our new Spicy McNuggets today!',
      image: 'https://images.unsplash.com/photo-1585922676242-a4027c1b6d6e?q=80&w=1080&auto=format&fit=crop',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#DA291C', '#FFC72C']}
        style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to McDonald's</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Today's Deals</Text>
        {promotions.map((promo) => (
          <TouchableOpacity key={promo.id} style={styles.promoCard}>
            <Image
              source={{ uri: promo.image }}
              style={styles.promoImage}
            />
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDescription}>{promo.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Order Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
            <Text style={styles.actionButtonTextSecondary}>Find Restaurant</Text>
          </TouchableOpacity>
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
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  welcomeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promoImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  promoContent: {
    padding: 16,
  },
  promoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 8,
  },
  promoDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  quickActions: {
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#DA291C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DA291C',
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  actionButtonTextSecondary: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#DA291C',
  },
});