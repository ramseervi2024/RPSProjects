import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info } from 'lucide-react-native';

const techniques = [
  {
    id: 1,
    title: 'जैविक खाद (Organic Composting)',
    description: 'Learn traditional Rajasthani composting techniques using local materials',
    method: 'Mix cow dung, crop residue, and neem leaves. Layer with soil and maintain moisture.',
    image: 'https://api.a0.dev/assets/image?text=traditional%20rajasthani%20composting%20organic%20materials&aspect=16:9',
    difficulty: 'Beginner',
    duration: '30-45 days',
    success_rate: '95%',
    steps: [
      'Collect fresh cow dung and crop residue',
      'Create a 3x3 meter pit in shaded area',
      'Layer materials with soil every 10cm',
      'Maintain 60% moisture level',
      'Turn mixture every 15 days'
    ],
    tips: 'Best started before monsoon season',
    materials_needed: [
      'Fresh cow dung',
      'Crop residue',
      'Neem leaves',
      'Water',
      'Basic tools'
    ]
  },
  {
    id: 2,
    title: 'मिश्रित फसल (Mixed Cropping)',
    description: 'Indigenous companion planting methods for desert climate',
    method: 'Plant pearl millet with moth beans, or mustard with chickpea for optimal results.',
    image: 'https://api.a0.dev/assets/image?text=mixed%20cropping%20traditional%20rajasthan%20farm&aspect=16:9'
  },
  {
    id: 3,
    title: 'कीट नियंत्रण (Pest Control)',
    description: 'Natural pest management using local herbs',
    method: 'Use neem oil, buttermilk spray, and marigold as natural pest deterrents.',
    image: 'https://api.a0.dev/assets/image?text=natural%20pest%20control%20organic%20farming%20rajasthan&aspect=16:9'
  }
];

export default function OrganicTechniques() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Organic Techniques</Text>
          <Text style={styles.headerSubtitle}>जैविक खेती तकनीक</Text>
        </View>

        {techniques.map((technique) => (
          <View key={technique.id} style={styles.techniqueCard}>
            <Image source={{ uri: technique.image }} style={styles.techniqueImage} />
            <View style={styles.techniqueContent}>
              <Text style={styles.techniqueTitle}>{technique.title}</Text>
              <Text style={styles.techniqueDescription}>{technique.description}</Text>
              <View style={styles.methodContainer}>
                <Info size={24} color="#2E7D32" />
                <Text style={styles.methodText}>{technique.method}</Text>
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
    marginBottom: 10,
  },
  techniqueDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 10,
  },
  methodText: {
    flex: 1,
    marginLeft: 10,
    color: '#1B5E20',
    fontSize: 14,
  },
});