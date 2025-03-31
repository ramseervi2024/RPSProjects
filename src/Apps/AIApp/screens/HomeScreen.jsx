import { ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';

const AI_FIELDS = [
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Algorithms that improve through experience',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Processing and analyzing human language',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    description: 'Enabling computers to understand visual data',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'rl',
    title: 'Reinforcement Learning',
    description: 'Learning through interaction with environment',
    image: 'https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?w=800&auto=format&fit=crop&q=60',
  },
];

export default function AIFieldsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Explore AI Fields</Text>
      <Text style={styles.subtitle}>
        Discover different areas of Artificial Intelligence
      </Text>
      
      {AI_FIELDS.map((field) => (
        <View key={field.id} href={`/field/${field.id}`} asChild>
          <Pressable style={styles.card}>
            <Image source={{ uri: field.image }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{field.title}</Text>
              <Text style={styles.description}>{field.description}</Text>
            </View>
          </Pressable>
        </View>
      ))}
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
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
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
  },
});