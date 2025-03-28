import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

const categories = [
  "All", "Development", "Design", "Business", "Marketing"
];

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    level: "Beginner",
    rating: 4.8,
    students: 12453,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    level: "Intermediate",
    rating: 4.9,
    students: 8762,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    instructor: "Emily Parker",
    level: "Advanced",
    rating: 4.7,
    students: 6234,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
  }
];

export default function CoursesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Courses</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748b" />
            <Text style={styles.searchPlaceholder}>Search courses...</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.categoryButton,
              index === 0 && styles.categoryButtonActive
            ]}
          >
            <Text style={[
              styles.categoryText,
              index === 0 && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.coursesContainer}>
        {courses.map(course => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseContent}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{course.level}</Text>
              </View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.instructorName}>{course.instructor}</Text>
              <View style={styles.courseStats}>
                <Text style={styles.rating}>★ {course.rating}</Text>
                <Text style={styles.students}>{course.students.toLocaleString()} students</Text>
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
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1e293b',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Poppins_400Regular',
    color: '#64748b',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginTop: 24,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    fontFamily: 'Poppins_500Medium',
    color: '#64748b',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  coursesContainer: {
    padding: 24,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseContent: {
    padding: 16,
  },
  levelBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  levelText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#64748b',
  },
  courseTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 4,
  },
  instructorName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rating: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#f59e0b',
  },
  students: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
});