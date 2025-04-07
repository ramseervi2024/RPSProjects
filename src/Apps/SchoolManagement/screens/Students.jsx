import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

const STUDENTS = [
  {
    id: '1',
    name: 'Emma Thompson',
    grade: '10th Grade',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'James Wilson',
    grade: '11th Grade',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Sophia Chen',
    grade: '9th Grade',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
  },
];

export default function Students() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          placeholderTextColor="#6b7280"
        />
      </View>

      <FlatList
        data={STUDENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentGrade}>{item.grade}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  studentInfo: {
    marginLeft: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  studentGrade: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});