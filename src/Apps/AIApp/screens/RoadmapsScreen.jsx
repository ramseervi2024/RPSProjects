import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { BookOpen, Code, Notebook as Robot, Database } from 'lucide-react-native';

const LEARNING_PATHS = [
  {
    id: 'basics',
    title: 'AI Fundamentals',
    description: 'Start with the basics of AI and ML',
    duration: '3 months',
    icon: BookOpen,
  },
  {
    id: 'programming',
    title: 'Programming for AI',
    description: 'Python, NumPy, Pandas essentials',
    duration: '2 months',
    icon: Code,
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Core ML concepts and algorithms',
    duration: '4 months',
    icon: Robot,
  },
  {
    id: 'data',
    title: 'Data Engineering',
    description: 'Data processing and engineering',
    duration: '3 months',
    icon: Database,
  },
];

export default function RoadmapsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Learning Roadmaps</Text>
      <Text style={styles.subtitle}>
        Structured paths to master AI development
      </Text>
      
      {LEARNING_PATHS.map((path) => {
        const Icon = path.icon;
        return (
          <Pressable key={path.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon size={24} color="#60a5fa" />
              <Text style={styles.duration}>{path.duration}</Text>
            </View>
            <Text style={styles.title}>{path.title}</Text>
            <Text style={styles.description}>{path.description}</Text>
            <View style={styles.progressBar}>
              <View style={styles.progress} />
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  duration: {
    fontSize: 14,
    color: '#60a5fa',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  progress: {
    width: '30%',
    height: '100%',
    backgroundColor: '#60a5fa',
    borderRadius: 2,
  },
});