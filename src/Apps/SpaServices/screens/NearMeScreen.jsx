import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar as CalendarIcon, Clock } from 'lucide-react-native';

const upcomingAppointments = [
  {
    id: 1,
    service: 'Swedish Massage',
    date: 'Mon, Nov 15',
    time: '2:00 PM',
    therapist: 'Sarah Johnson',
  },
];

const pastAppointments = [
  {
    id: 2,
    service: 'Classic Facial',
    date: 'Oct 28',
    time: '11:00 AM',
    therapist: 'Emma Davis',
  },
];

export default function Appointments() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcomingAppointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.serviceName}>{appointment.service}</Text>
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.appointmentDetails}>
              <View style={styles.detailRow}>
                <CalendarIcon size={16} color="#666" />
                <Text style={styles.detailText}>{appointment.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color="#666" />
                <Text style={styles.detailText}>{appointment.time}</Text>
              </View>
            </View>
            <Text style={styles.therapistName}>with {appointment.therapist}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Appointments</Text>
        {pastAppointments.map((appointment) => (
          <View key={appointment.id} style={[styles.appointmentCard, styles.pastAppointment]}>
            <Text style={styles.serviceName}>{appointment.service}</Text>
            <View style={styles.appointmentDetails}>
              <View style={styles.detailRow}>
                <CalendarIcon size={16} color="#666" />
                <Text style={styles.detailText}>{appointment.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color="#666" />
                <Text style={styles.detailText}>{appointment.time}</Text>
              </View>
            </View>
            <Text style={styles.therapistName}>with {appointment.therapist}</Text>
            <TouchableOpacity style={styles.bookAgainButton}>
              <Text style={styles.bookAgainText}>Book Again</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#F8F3EE',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9C6F44',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  appointmentDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  therapistName: {
    color: '#666',
    fontSize: 14,
  },
  rescheduleButton: {
    backgroundColor: '#F8F3EE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rescheduleText: {
    color: '#9C6F44',
    fontSize: 14,
    fontWeight: '500',
  },
  pastAppointment: {
    opacity: 0.8,
  },
  bookAgainButton: {
    backgroundColor: '#9C6F44',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  bookAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});