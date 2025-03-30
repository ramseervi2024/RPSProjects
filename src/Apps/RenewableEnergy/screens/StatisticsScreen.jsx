import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChartBar as BarChart, ChartLine as LineChart } from 'lucide-react-native';

const monthlyData = [
  { month: 'Jan', solar: 45, wind: 30, hydro: 25 },
  { month: 'Feb', solar: 50, wind: 35, hydro: 28 },
  { month: 'Mar', solar: 55, wind: 40, hydro: 30 },
  { month: 'Apr', solar: 60, wind: 45, hydro: 32 },
  { month: 'May', solar: 65, wind: 50, hydro: 35 },
];

export default function StatisticsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Text style={styles.headerSubtitle}>Energy production and consumption data</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <BarChart size={24} color="#22c55e" />
            <Text style={styles.cardTitle}>Monthly Production</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Month</Text>
              <Text style={styles.tableHeaderCell}>Solar</Text>
              <Text style={styles.tableHeaderCell}>Wind</Text>
              <Text style={styles.tableHeaderCell}>Hydro</Text>
            </View>
            {monthlyData.map((data, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.month}</Text>
                <Text style={styles.tableCell}>{data.solar}MW</Text>
                <Text style={styles.tableCell}>{data.wind}MW</Text>
                <Text style={styles.tableCell}>{data.hydro}MW</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LineChart size={24} color="#22c55e" />
            <Text style={styles.statTitle}>Total Output</Text>
            <Text style={styles.statValue}>256 MW</Text>
            <Text style={styles.statChange}>+12% from last month</Text>
          </View>

          <View style={styles.statCard}>
            <LineChart size={24} color="#22c55e" />
            <Text style={styles.statTitle}>Efficiency</Text>
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statChange}>+2% from last month</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#22c55e',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 12,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  statChange: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 4,
  },
});