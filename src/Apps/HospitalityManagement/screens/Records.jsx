import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { FileText, Download } from 'lucide-react-native';

export default function Records() {
  const records = [
    {
      id: '1',
      title: 'Blood Test Results',
      patient: 'Emma Thompson',
      date: '2024-02-15',
      type: 'Laboratory',
    },
    {
      id: '2',
      title: 'X-Ray Report',
      patient: 'Michael Chen',
      date: '2024-02-14',
      type: 'Radiology',
    },
    {
      id: '3',
      title: 'Consultation Notes',
      patient: 'Sarah Johnson',
      date: '2024-02-10',
      type: 'Clinical Notes',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical Records</Text>
        <Text style={styles.subtitle}>View and manage patient records</Text>
      </View>

      <ScrollView style={styles.recordsList}>
        {records.map((record) => (
          <Pressable key={record.id} style={styles.recordCard}>
            <View style={styles.recordIcon}>
              <FileText size={24} color="#0891b2" />
            </View>
            <View style={styles.recordInfo}>
              <Text style={styles.recordTitle}>{record.title}</Text>
              <Text style={styles.recordPatient}>{record.patient}</Text>
              <View style={styles.recordMeta}>
                <Text style={styles.recordDate}>{record.date}</Text>
                <Text style={styles.recordType}>{record.type}</Text>
              </View>
            </View>
            <Pressable style={styles.downloadButton}>
              <Download size={20} color="#6b7280" />
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
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
  title: {
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
  recordsList: {
    padding: 16,
  },
  recordCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recordIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInfo: {
    flex: 1,
    marginLeft: 16,
  },
  recordTitle: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter_500Medium',
  },
  recordPatient: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  recordMeta: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 8,
  },
  recordDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter_400Regular',
  },
  recordType: {
    fontSize: 12,
    color: '#0891b2',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
    fontFamily: 'Inter_500Medium',
  },
  downloadButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});