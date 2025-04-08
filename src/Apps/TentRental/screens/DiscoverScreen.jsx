import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  const featuredTents = [
    {
      id: 1,
      name: 'Wedding Marquee',
      image: 'https://images.unsplash.com/photo-1612700722193-f0410adb8949?auto=format&fit=crop&w=800&q=80',
      price: 499.99,
      capacity: '100-150',
    },
    {
      id: 2,
      name: 'Party Tent',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      price: 299.99,
      capacity: '50-75',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>Tent Rentals</Text>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Tents</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {featuredTents.map((tent) => (
            <View href={`/tents/${tent.id}`} key={tent.id} asChild>
              <TouchableOpacity style={styles.tentCard}>
                <Image source={{ uri: tent.image }} style={styles.tentImage} />
                <View style={styles.tentInfo}>
                  <Text style={styles.tentName}>{tent.name}</Text>
                  <Text style={styles.tentPrice}>${tent.price}/day</Text>
                  <Text style={styles.tentCapacity}>Capacity: {tent.capacity} guests</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.quickActions}>
        <View href="/bookings/new" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
        <View href="/tents" asChild>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>View All Tents</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  welcomeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6b7280',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#1f2937',
    marginTop: 4,
  },
  featuredSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 16,
  },
  featuredScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  tentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  tentImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tentInfo: {
    padding: 16,
  },
  tentName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1f2937',
  },
  tentPrice: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#3b82f6',
    marginTop: 4,
  },
  tentCapacity: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  quickActions: {
    padding: 24,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#ffffff',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  secondaryButtonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#1f2937',
    fontSize: 16,
  },
});