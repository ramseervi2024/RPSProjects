import { View, Text, ScrollView, StyleSheet } from 'react-native';

const SCHEDULE = [
  {
    time: '08:00 AM',
    subject: 'Mathematics',
    teacher: 'Dr. Smith',
    room: 'Room 101',
  },
  {
    time: '09:30 AM',
    subject: 'Physics',
    teacher: 'Prof. Johnson',
    room: 'Room 203',
  },
  {
    time: '11:00 AM',
    subject: 'English Literature',
    teacher: 'Ms. Davis',
    room: 'Room 305',
  },
  {
    time: '01:00 PM',
    subject: 'Chemistry',
    teacher: 'Dr. Wilson',
    room: 'Lab 102',
  },
];

export default function Schedule() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>Monday, October 16</Text>
      </View>

      <View style={styles.timeline}>
        {SCHEDULE.map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{item.time}</Text>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.classCard}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.teacher}>{item.teacher}</Text>
              <Text style={styles.room}>{item.room}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  date: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  timeline: {
    padding: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeContainer: {
    width: 100,
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#e5e7eb',
    position: 'absolute',
    top: 25,
    left: '50%',
  },
  classCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subject: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  teacher: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 4,
  },
  room: {
    fontSize: 14,
    color: '#6b7280',
  },
});