import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const featuredMeditations = [
  {
    id: '1',
    title: 'Morning Calm',
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Stress Relief',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Better Sleep',
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?q=80&w=600&auto=format&fit=crop',
  },
];

const categories = [
  { id: '1', name: 'Sleep', count: '12 sessions' },
  { id: '2', name: 'Anxiety', count: '8 sessions' },
  { id: '3', name: 'Stress', count: '10 sessions' },
  { id: '4', name: 'Focus', count: '6 sessions' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Sarah</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Meditations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            {featuredMeditations.map((meditation) => (
              <TouchableOpacity key={meditation.id} style={styles.featuredCard}>
                <Image source={{ uri: meditation.image }} style={styles.featuredImage} />
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>{meditation.title}</Text>
                  <Text style={styles.featuredDuration}>{meditation.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2A',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7B0FF',
  },
  featuredSection: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  featuredScroll: {
    paddingLeft: 20,
  },
  featuredCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: '#2A2A36',
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredDuration: {
    fontSize: 14,
    color: '#A7B0FF',
  },
  categoriesSection: {
    paddingVertical: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  categoryCard: {
    width: '45%',
    margin: 8,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#2A2A36',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  categoryCount: {
    fontSize: 14,
    color: '#A7B0FF',
  },
});