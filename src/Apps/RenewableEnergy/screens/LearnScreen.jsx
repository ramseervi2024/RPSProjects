import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BookOpen, Video, FileText } from 'lucide-react-native';

const resources = [
  {
    id: 1,
    title: 'Introduction to Solar Energy',
    type: 'Article',
    duration: '10 min read',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Wind Power Basics',
    type: 'Video',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Hydroelectric Power Guide',
    type: 'Course',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1481923387198-050ac1a2d81b?w=800&auto=format&fit=crop',
  },
];

export default function LearnScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.headerSubtitle}>Educational resources and guides</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryCard}>
            <BookOpen size={32} color="#22c55e" />
            <Text style={styles.categoryTitle}>Articles</Text>
            <Text style={styles.categoryCount}>24 items</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <Video size={32} color="#22c55e" />
            <Text style={styles.categoryTitle}>Videos</Text>
            <Text style={styles.categoryCount}>12 items</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <FileText size={32} color="#22c55e" />
            <Text style={styles.categoryTitle}>Courses</Text>
            <Text style={styles.categoryCount}>8 items</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Featured Resources</Text>
        
        {resources.map((resource) => (
          <TouchableOpacity key={resource.id} style={styles.resourceCard}>
            <Image source={{ uri: resource.image }} style={styles.resourceImage} />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceType}>{resource.type}</Text>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDuration}>{resource.duration}</Text>
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
  },
  categoryCount: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  resourceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resourceImage: {
    width: '100%',
    height: 160,
  },
  resourceContent: {
    padding: 16,
  },
  resourceType: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  resourceDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
});