import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react-native';
// import { VictoryPie } from 'victory-native';

export default function HomeScreen() {
  const sampleData = [
    { x: "Food", y: 35 },
    { x: "Transport", y: 20 },
    { x: "Shopping", y: 25 },
    { x: "Bills", y: 20 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>Alex</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$12,750.00</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ArrowUpRight color="#22C55E" size={20} />
              <Text style={[styles.statText, styles.incomeText]}>Income</Text>
              <Text style={styles.statAmount}>$3,240</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <ArrowDownRight color="#EF4444" size={20} />
              <Text style={[styles.statText, styles.expenseText]}>Expenses</Text>
              <Text style={styles.statAmount}>$2,140</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spending Overview</Text>
            <TrendingUp size={20} color="#007AFF" />
          </View>
          <View style={[styles.balanceCard, {margin: 0}]}>
            <View style={styles.statItem}>
              <ArrowDownRight color="#EF4444" size={20} />
              <Text style={[styles.statText, styles.expenseText]}>Expenses</Text>
              <Text style={styles.statAmount}>$2,140</Text>
            </View>
            {/* <VictoryPie
              data={sampleData}
              width={300}
              height={300}
              colorScale={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]}
              innerRadius={70}
              labelRadius={({ innerRadius }) => (innerRadius + 80)}
              style={{ labels: { fill: "white", fontSize: 14, fontWeight: "bold" } }}
            /> */}
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Add Income</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Add Expense</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#64748B',
  },
  name: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#1E293B',
    marginTop: 4,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#64748B',
  },
  balanceAmount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#1E293B',
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  statText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginTop: 8,
  },
  incomeText: {
    color: '#22C55E',
  },
  expenseText: {
    color: '#EF4444',
  },
  statAmount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  quickActions: {
    padding: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    fontSize: 14,
  },
});