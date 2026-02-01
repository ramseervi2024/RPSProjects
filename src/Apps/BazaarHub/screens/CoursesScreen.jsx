import { ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';

const COURSES = [
  {
    id: 'ml101',
    title: 'Machine Learning Basics',
    instructor: 'Dr. Sarah Chen',
    rating: 4.8,
    students: 12500,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'dl202',
    title: 'Deep Learning Fundamentals',
    instructor: 'Prof. Michael Brown',
    rating: 4.9,
    students: 8900,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'nlp301',
    title: 'Natural Language Processing',
    instructor: 'Dr. Emily Watson',
    rating: 4.7,
    students: 6300,
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'cv401',
    title: 'Computer Vision Advanced',
    instructor: 'Prof. James Lee',
    rating: 4.6,
    students: 5200,
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&auto=format&fit=crop&q=60',
  },
];

export default function CoursesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Featured Courses</Text>
      <Text style={styles.subtitle}>
        Learn from industry experts and top institutions
      </Text>
      
      {COURSES.map((course) => (
        <Pressable key={course.id} style={styles.card}>
          <Image source={{ uri: course.image }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.instructor}>{course.instructor}</Text>
            <View style={styles.stats}>
              <Text style={styles.rating}>★ {course.rating}</Text>
              <Text style={styles.students}>{course.students.toLocaleString()} students</Text>
            </View>
          </View>
        </Pressable>
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
    height: 160,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#fbbf24',
    marginRight: 12,
  },
  students: {
    fontSize: 14,
    color: '#888',
  },
});