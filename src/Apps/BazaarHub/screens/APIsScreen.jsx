import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Brain, MessageSquare, Image, Music } from 'lucide-react-native';

const API_CATEGORIES = [
  {
    id: 'llm',
    title: 'Language Models',
    description: 'GPT, BERT, and other text generation APIs',
    icon: MessageSquare,
    color: '#60a5fa',
  },
  {
    id: 'vision',
    title: 'Computer Vision',
    description: 'Image recognition and processing APIs',
    icon: Image,
    color: '#34d399',
  },
  {
    id: 'audio',
    title: 'Speech & Audio',
    description: 'Speech recognition and audio processing',
    icon: Music,
    color: '#f472b6',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'General machine learning and prediction APIs',
    icon: Brain,
    color: '#fbbf24',
  },
];

export default function APIsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>AI APIs</Text>
      <Text style={styles.subtitle}>
        Popular APIs for different AI capabilities
      </Text>
      
      {API_CATEGORIES.map((category) => {
        const Icon = category.icon;
        return (
          <Pressable key={category.id} style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
              <Icon size={24} color="#fff" />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{category.title}</Text>
              <Text style={styles.description}>{category.description}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
});