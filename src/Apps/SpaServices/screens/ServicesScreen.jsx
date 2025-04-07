import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const services = [
  {
    id: 1,
    category: 'Massage Therapy',
    items: [
      {
        id: 1,
        name: 'Swedish Massage',
        duration: '60 min',
        price: '$85',
        description: 'Gentle, relaxing massage that promotes circulation and relieves tension',
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop&q=80',
      },
      {
        id: 2,
        name: 'Deep Tissue Massage',
        duration: '60 min',
        price: '$95',
        description: 'Targets deep muscle tension and chronic pain areas',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 2,
    category: 'Facial Treatments',
    items: [
      {
        id: 3,
        name: 'Classic Facial',
        duration: '60 min',
        price: '$75',
        description: 'Deep cleansing facial customized for your skin type',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
      },
      {
        id: 4,
        name: 'Anti-Aging Facial',
        duration: '75 min',
        price: '$110',
        description: 'Advanced treatment to reduce fine lines and improve skin texture',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80',
      },
    ],
  },
];

export default function Services() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Services</Text>
        <Text style={styles.subtitle}>Choose from our range of luxurious treatments</Text>
      </View>

      {services.map((category) => (
        <View key={category.id} style={styles.category}>
          <Text style={styles.categoryTitle}>{category.category}</Text>
          {category.items.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <Image source={{ uri: service.image }} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                </View>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9C6F44',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  category: {
    padding: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9C6F44',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: '#9C6F44',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});