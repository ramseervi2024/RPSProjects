import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Users, Calendar, Activity, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  const stats = [
    { icon: Users, label: 'Total Patients', value: '1,234', color: '#0891b2' },
    { icon: Calendar, label: 'Appointments', value: '48', color: '#0d9488' },
    { icon: Activity, label: 'Operations', value: '12', color: '#0284c7' },
    { icon: Clock, label: 'Waiting', value: '8', color: '#7c3aed' },
  ];

  return (
    <SafeAreaView  style={styles.topcontainer}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.name}>Dr. Sarah Wilson</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Pressable key={index} style={styles.statCard}>
            <stat.icon size={24} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Appointments</Text>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.appointmentCard}>
            <View style={styles.appointmentTime}>
              <Text style={styles.timeText}>09:30 AM</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.patientName}>John Doe</Text>
              <Text style={styles.appointmentType}>General Checkup</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
  name: {
    fontSize: 24,
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    color: '#111827',
    fontFamily: 'Inter_700Bold',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentTime: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter_500Medium',
  },
  appointmentDetails: {
    flex: 1,
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
});