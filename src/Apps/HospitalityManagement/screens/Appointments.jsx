import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { format } from 'date-fns';

export default function Appointments() {
  const today = new Date();
  const appointments = [
    {
      time: '09:00 AM',
      patient: 'Emma Thompson',
      type: 'Follow-up',
      status: 'Confirmed',
    },
    {
      time: '10:30 AM',
      patient: 'Michael Chen',
      type: 'New Patient',
      status: 'Checked In',
    },
    {
      time: '11:45 AM',
      patient: 'Sarah Johnson',
      type: 'Consultation',
      status: 'Waiting',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{format(today, 'EEEE, MMMM d')}</Text>
        <Text style={styles.subtitle}>3 appointments today</Text>
      </View>

      <View style={styles.timeline}>
        {appointments.map((appointment, index) => (
          <Pressable key={index} style={styles.appointmentCard}>
            <View style={styles.timeColumn}>
              <Text style={styles.time}>{appointment.time}</Text>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(appointment.status) }]} />
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.patientName}>{appointment.patient}</Text>
              <Text style={styles.appointmentType}>{appointment.type}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(appointment.status) }]}>
                <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                  {appointment.status}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'Confirmed':
      return '#059669';
    case 'Checked In':
      return '#0891b2';
    case 'Waiting':
      return '#d97706';
    default:
      return '#6b7280';
  }
}

function getStatusBgColor(status) {
  switch (status) {
    case 'Confirmed':
      return '#ecfdf5';
    case 'Checked In':
      return '#ecfeff';
    case 'Waiting':
      return '#fffbeb';
    default:
      return '#f3f4f6';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  date: {
    fontSize: 24,
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  timeline: {
    padding: 24,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  timeColumn: {
    width: 80,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  time: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter_500Medium',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  detailsColumn: {
    flex: 1,
    marginLeft: 16,
  },
  patientName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter_500Medium',
  },
  appointmentType: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
});