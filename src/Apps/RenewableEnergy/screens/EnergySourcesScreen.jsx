import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const energySources = [
  {
    id: 1,
    title: 'Solar Power',
    description: 'Harness the power of the sun through photovoltaic cells and solar thermal collectors.',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&auto=format&fit=crop',
    efficiency: '15-20%',
    cost: '$$',
  },
  {
    id: 2,
    title: 'Wind Energy',
    description: 'Convert wind power into electricity using modern turbine technology.',
    image: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&auto=format&fit=crop',
    efficiency: '35-45%',
    cost: '$$$',
  },
  {
    id: 3,
    title: 'Hydropower',
    description: 'Generate electricity by harnessing the energy of flowing water.',
    image: 'https://images.unsplash.com/photo-1481923387198-050ac1a2d81b?w=800&auto=format&fit=crop',
    efficiency: '90%',
    cost: '$$$$',
  },
  {
    id: 4,
    title: 'Geothermal',
    description: 'Tap into Earth\'s internal heat for sustainable power generation.',
    image: 'https://images.unsplash.com/photo-1585516436284-8bc701a27c10?w=800&auto=format&fit=crop',
    efficiency: '70-80%',
    cost: '$$$',
  },
];

export default function EnergySourcesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Energy Sources</Text>
        <Text style={styles.headerSubtitle}>Explore different types of renewable energy</Text>
      </View>

      <View style={styles.content}>
        {energySources.map((source) => (
          <TouchableOpacity key={source.id} style={styles.card}>
            <Image source={{ uri: source.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{source.title}</Text>
              <Text style={styles.cardDescription}>{source.description}</Text>
              <View style={styles.cardStats}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Efficiency</Text>
                  <Text style={styles.statValue}>{source.efficiency}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Cost</Text>
                  <Text style={styles.statValue}>{source.cost}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#22c55e',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 24,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22c55e',
  },
});