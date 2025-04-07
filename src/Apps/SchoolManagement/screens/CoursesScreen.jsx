import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Book, Users, Clock } from 'lucide-react-native';

const COURSES = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    students: 28,
    duration: '1 Semester',
    color: '#3b82f6',
  },
  {
    id: '2',
    name: 'World History',
    students: 32,
    duration: '1 Year',
    color: '#10b981',
  },
  {
    id: '3',
    name: 'Physics',
    students: 24,
    duration: '1 Semester',
    color: '#8b5cf6',
  },
  {
    id: '4',
    name: 'English Literature',
    students: 30,
    duration: '1 Year',
    color: '#f59e0b',
  },
];

export default function Courses() {
  return (
    <View style={styles.container}>
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard}>
            <View style={[styles.courseIcon, { backgroundColor: item.color }]}>
              <Book color="#ffffff" size={24} />
            </View>
            <View style={styles.courseInfo}>
              <Text style={styles.courseName}>{item.name}</Text>
              <View style={styles.courseDetails}>
                <View style={styles.detailItem}>
                  <Users size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{item.students} Students</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{item.duration}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContent: {
    padding: 16,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  courseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
  },
});