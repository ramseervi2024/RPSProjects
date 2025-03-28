import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Play, Clock } from 'lucide-react-native';

const featuredCourse = {
  title: "Introduction to Machine Learning",
  image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
  duration: "8 weeks",
  lessons: 24
};

const popularCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
    duration: "6 weeks"
  },
  {
    id: 2,
    title: "Mobile App Design",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
    duration: "4 weeks"
  },
  {
    id: 3,
    title: "Data Science Basics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    duration: "10 weeks"
  }
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student!</Text>
        <Text style={styles.subtitle}>What would you like to learn today?</Text>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Course</Text>
        <TouchableOpacity style={styles.featuredCard}>
          <Image source={{ uri: featuredCourse.image }} style={styles.featuredImage} />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>{featuredCourse.title}</Text>
            <View style={styles.featuredMeta}>
              <View style={styles.metaItem}>
                <Clock size={16} color="#6366f1" />
                <Text style={styles.metaText}>{featuredCourse.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Play size={16} color="#6366f1" />
                <Text style={styles.metaText}>{featuredCourse.lessons} lessons</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.popularSection}>
        <Text style={styles.sectionTitle}>Popular Courses</Text>
        {popularCourses.map(course => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <View style={styles.courseMeta}>
                <Clock size={14} color="#6366f1" />
                <Text style={styles.courseMetaText}>{course.duration}</Text>
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
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#64748b',
  },
  featuredSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 16,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  popularSection: {
    padding: 24,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  courseImage: {
    width: 100,
    height: 100,
  },
  courseContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  courseTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseMetaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
});