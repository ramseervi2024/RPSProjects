import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Phone, PenTool as Tool, Truck, Chrome as Home, Scissors, Car, Book, Heart } from 'lucide-react-native';

const services = [
  { id: 1, name: 'Emergency', icon: Phone, color: '#E53935' },
  { id: 2, name: 'Repairs', icon: Tool, color: '#1E88E5' },
  { id: 3, name: 'Moving', icon: Truck, color: '#43A047' },
  { id: 4, name: 'Home', icon: Home, color: '#FB8C00' },
  { id: 5, name: 'Beauty', icon: Scissors, color: '#EC407A' },
  { id: 6, name: 'Auto', icon: Car, color: '#7CB342' },
  { id: 7, name: 'Education', icon: Book, color: '#8E24AA' },
  { id: 8, name: 'Health', icon: Heart, color: '#D81B60' },
];

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <Text style={styles.headerSubtitle}>Find trusted service providers</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <View style={[styles.iconContainer, { backgroundColor: service.color }]}>
                  <IconComponent size={24} color="#fff" />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});