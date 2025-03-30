import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

export default function Patients() {
  const patients = [
    {
      name: 'John Doe',
      age: 45,
      condition: 'Hypertension',
      lastVisit: '2024-02-15',
    },
    {
      name: 'Jane Smith',
      age: 32,
      condition: 'Diabetes Type 2',
      lastVisit: '2024-02-14',
    },
    {
      name: 'Robert Johnson',
      age: 58,
      condition: 'Arthritis',
      lastVisit: '2024-02-10',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patients</Text>
        <Text style={styles.subtitle}>Manage your patient records</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients..."
            placeholderTextColor="#6b7280"
          />
        </View>
        <Pressable style={styles.filterButton}>
          <Filter size={20} color="#6b7280" />
        </Pressable>
      </View>

      <ScrollView style={styles.patientsList}>
        {patients.map((patient, index) => (
          <Pressable key={index} style={styles.patientCard}>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientDetails}>
                Age: {patient.age} • {patient.condition}
              </Text>
              <Text style={styles.lastVisit}>Last visit: {patient.lastVisit}</Text>
            </View>
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
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter_400Regular',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientsList: {
    padding: 16,
  },
  patientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  patientInfo: {
    gap: 4,
  },
  patientName: {
    fontSize: 18,
    color: '#111827',
    fontFamily: 'Inter_500Medium',
  },
  patientDetails: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
  lastVisit: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});