import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Calendar as CalendarIcon, Trophy } from 'lucide-react-native';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Keep up the great work!</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock size={24} color="#A7B0FF" />
            <Text style={styles.statValue}>126</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>

          <View style={styles.statCard}>
            <CalendarIcon size={24} color="#A7B0FF" />
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>

          <View style={styles.statCard}>
            <Trophy size={24} color="#A7B0FF" />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.sessionCard}>
              <View>
                <Text style={styles.sessionTitle}>Morning Calm</Text>
                <Text style={styles.sessionDate}>Today, 8:30 AM</Text>
              </View>
              <Text style={styles.sessionDuration}>10 min</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2A',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7B0FF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    flex: 1,
    margin: 4,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#2A2A36',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#A7B0FF',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2A2A36',
    borderRadius: 12,
    marginBottom: 12,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 14,
    color: '#A7B0FF',
  },
  sessionDuration: {
    fontSize: 14,
    color: '#A7B0FF',
  },
});