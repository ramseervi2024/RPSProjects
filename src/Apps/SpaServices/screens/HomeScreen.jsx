import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const featuredServices = [
  {
    id: 1,
    name: 'Swedish Massage',
    duration: '60 min',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Hot Stone Therapy',
    duration: '90 min',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80',
  },
];

const specialOffers = [
  {
    id: 1,
    title: 'Couples Package',
    description: 'Enjoy a relaxing massage together',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&auto=format&fit=crop&q=80',
  },
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>Serenity Spa</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredServices.map((service) => (
            <View key={service.id} href="/services" asChild>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{ uri: service.image }} style={styles.serviceImage} />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDetails}>
                    {service.duration} • {service.price}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        {specialOffers.map((offer) => (
          <View key={offer.id} href="/services" asChild>
            <TouchableOpacity style={styles.offerCard}>
              <Image source={{ uri: offer.image }} style={styles.offerImage} />
              <View style={styles.offerOverlay}>
                <Text style={styles.offerDiscount}>{offer.discount}</Text>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#F8F3EE',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9C6F44',
    marginTop: 4,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  serviceCard: {
    width: 240,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  serviceDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  offerCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
  offerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  offerDiscount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  offerDescription: {
    color: '#fff',
    fontSize: 14,
  },
});