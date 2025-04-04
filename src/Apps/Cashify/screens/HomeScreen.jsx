import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Wallet size={24} color="#007AFF" />
            <Text style={styles.balanceTitle}>Total Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>$12,750.86</Text>
          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <ArrowUpRight size={20} color="#34C759" />
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statAmount}>$2,450.00</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <ArrowDownRight size={20} color="#FF3B30" />
              <View>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={styles.statAmount}>$1,250.00</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionList}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.transaction}>
              <View style={styles.transactionIcon}>
                <Wallet size={24} color="#007AFF" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Grocery Shopping</Text>
                <Text style={styles.transactionDate}>Today, 2:30 PM</Text>
              </View>
              <Text style={styles.transactionAmount}>-$85.00</Text>
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
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4,
    fontFamily: 'Inter_700Bold',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 8,
    fontFamily: 'Inter_400Regular',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    fontFamily: 'Inter_700Bold',
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
    fontFamily: 'Inter_400Regular',
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  transactionList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    fontFamily: 'Inter_600SemiBold',
  },
});