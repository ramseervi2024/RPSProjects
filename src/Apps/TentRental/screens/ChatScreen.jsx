import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';

export default function TentsScreen() {
  const tents = [
    {
      id: 1,
      name: 'Wedding Marquee',
      image: 'https://images.unsplash.com/photo-1612700722193-f0410adb8949?auto=format&fit=crop&w=800&q=80',
      price: 499.99,
      capacity: '100-150',
      description: 'Elegant white marquee perfect for weddings and formal events.',
    },
    {
      id: 2,
      name: 'Party Tent',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      price: 299.99,
      capacity: '50-75',
      description: 'Versatile party tent suitable for outdoor celebrations.',
    },
    {
      id: 3,
      name: 'Garden Pavilion',
      image: 'https://images.unsplash.com/photo-1602513445803-d93c5ef3bc82?auto=format&fit=crop&w=800&q=80',
      price: 199.99,
      capacity: '25-40',
      description: 'Charming pavilion ideal for garden parties and intimate gatherings.',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Tents</Text>
      </View>

      <FlatList
        data={tents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View href={`/tents/${item.id}`} asChild>
            <TouchableOpacity style={styles.tentCard}>
              <Image source={{ uri: item.image }} style={styles.tentImage} />
              <View style={styles.tentInfo}>
                <View>
                  <Text style={styles.tentName}>{item.name}</Text>
                  <Text style={styles.tentDescription}>{item.description}</Text>
                </View>
                <View style={styles.tentDetails}>
                  <View style={styles.capacityContainer}>
                    <Users size={16} color="#6b7280" />
                    <Text style={styles.capacityText}>{item.capacity} guests</Text>
                  </View>
                  <Text style={styles.priceText}>${item.price}/day</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#1f2937',
  },
  listContent: {
    padding: 16,
  },
  tentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  tentImage: {
    width: '100%',
    height: 200,
  },
  tentInfo: {
    padding: 16,
  },
  tentName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 4,
  },
  tentDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  tentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  capacityText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  priceText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#3b82f6',
  },
});