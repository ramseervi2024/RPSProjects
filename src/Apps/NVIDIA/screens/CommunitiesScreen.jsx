import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const products = [
  {
    id: '1',
    name: 'GeForce RTX 4090',
    category: 'Gaming GPUs',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=500',
    description: 'Ultimate gaming performance with ray tracing',
  },
  {
    id: '2',
    name: 'NVIDIA A100',
    category: 'Data Center',
    image: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?q=80&w=500',
    description: 'Accelerated computing for AI and HPC',
  },
  {
    id: '3',
    name: 'NVIDIA Drive',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=500',
    description: 'AI computing platform for autonomous vehicles',
  },
];

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  category: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#76B900',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
  },
});