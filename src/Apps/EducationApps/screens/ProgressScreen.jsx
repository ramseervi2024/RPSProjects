import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Clock, BookOpen, Award } from 'lucide-react-native';

const progressStats = {
  coursesCompleted: 4,
  hoursSpent: 28,
  currentStreak: 7
};

const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    progress: 85,
    totalLessons: 24,
    completedLessons: 20
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    progress: 60,
    totalLessons: 18,
    completedLessons: 11
  },
  {
    id: 3,
    title: "JavaScript Mastery",
    progress: 30,
    totalLessons: 32,
    completedLessons: 10
  }
];

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <BookOpen size={24} color="#6366f1" />
          <Text style={styles.statNumber}>{progressStats.coursesCompleted}</Text>
          <Text style={styles.statLabel}>Courses{'\n'}Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#6366f1" />
          <Text style={styles.statNumber}>{progressStats.hoursSpent}</Text>
          <Text style={styles.statLabel}>Hours{'\n'}Spent</Text>
        </View>
        <View style={styles.statCard}>
          <Award size={24} color="#6366f1" />
          <Text style={styles.statNumber}>{progressStats.currentStreak}</Text>
          <Text style={styles.statLabel}>Day{'\n'}Streak</Text>
        </View>
      </View>

      <View style={styles.coursesSection}>
        <Text style={styles.sectionTitle}>Current Courses</Text>
        {courses.map(course => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.progressText}>{course.progress}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
            </View>
            <Text style={styles.lessonsCount}>
              {course.completedLessons} of {course.totalLessons} lessons completed
            </Text>
          </View>
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
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  coursesSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  progressText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#6366f1',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  lessonsCount: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
});