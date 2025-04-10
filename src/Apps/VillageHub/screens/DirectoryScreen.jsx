import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Droplet, TrendingUp } from 'lucide-react-native';

const waterTechniques = [
  {
    id: 1,
    title: 'खाली (Khadin System)',
    description: 'Traditional Rajasthani runoff farming',
    details: 'Embankments are created to collect rainwater runoff from upland areas. The collected water slowly seeps into the soil, making it suitable for winter crops.',
    image: 'https://api.a0.dev/assets/image?text=khadin%20system%20traditional%20water%20harvesting%20rajasthan&aspect=16:9'
  },
  {
    id: 2,
    title: 'टांका (Tanka)',
    description: 'Underground water storage structure',
    details: 'A traditional cylindrical underground water storage structure, particularly useful for drinking water in areas with low rainfall.',
    image: 'https://api.a0.dev/assets/image?text=tanka%20water%20storage%20system%20rajasthan%20traditional&aspect=16:9'
  },
  {
    id: 3,
    title: 'बूँद-बूँद सिंचाई (Drip Irrigation)',
    description: 'Modern water-efficient irrigation',
    details: 'Water is delivered directly to plant roots through a network of pipes, valves, and emitters. Saves up to 60% water compared to traditional irrigation.',
    image: 'https://api.a0.dev/assets/image?text=drip%20irrigation%20system%20desert%20farming&aspect=16:9'
  },
  {
    id: 4,
    title: 'कुंड (Kund)',
    description: 'Traditional water harvesting structure',
    details: 'A saucer-shaped catchment area with a central circular opening leading to a deep well. Particularly effective in sandy areas.',
    image: 'https://api.a0.dev/assets/image?text=kund%20water%20harvesting%20structure%20rajasthan&aspect=16:9'
  }
];

export default function WaterManagement() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Water Management</Text>
          <Text style={styles.headerSubtitle}>जल प्रबंधन</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Droplet size={24} color="#2E7D32" />
            <Text style={styles.statNumber}>60%</Text>
            <Text style={styles.statLabel}>Water Savings</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp size={24} color="#2E7D32" />
            <Text style={styles.statNumber}>40%</Text>
            <Text style={styles.statLabel}>Yield Increase</Text>
          </View>
        </View>

        {waterTechniques.map((technique) => (
          <View key={technique.id} style={styles.techniqueCard}>
            <Image source={{ uri: technique.image }} style={styles.techniqueImage} />
            <View style={styles.techniqueContent}>
              <Text style={styles.techniqueTitle}>{technique.title}</Text>
              <Text style={styles.techniqueDescription}>{technique.description}</Text>
              <View style={styles.detailsContainer}>
                <Droplet size={20} color="#2E7D32" />
                <Text style={styles.detailsText}>{technique.details}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#E8F5E9',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 5,
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
  },
  techniqueCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  techniqueImage: {
    width: '100%',
    height: 200,
  },
  techniqueContent: {
    padding: 15,
  },
  techniqueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  techniqueDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsText: {
    flex: 1,
    marginLeft: 10,
    color: '#1B5E20',
    fontSize: 14,
  },
});