import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react-native';
import { format } from 'date-fns';

export default function TransactionsScreen() {
  const transactions = [
    {
      id: 1,
      type: 'expense',
      title: 'Grocery Shopping',
      amount: 85.50,
      category: 'Food',
      date: new Date(2025, 2, 15),
    },
    {
      id: 2,
      type: 'income',
      title: 'Salary',
      amount: 3200.00,
      category: 'Income',
      date: new Date(2025, 2, 14),
    },
    {
      id: 3,
      type: 'expense',
      title: 'Netflix Subscription',
      amount: 15.99,
      category: 'Entertainment',
      date: new Date(2025, 2, 13),
    },
    {
      id: 4,
      type: 'expense',
      title: 'Gas Station',
      amount: 45.00,
      category: 'Transport',
      date: new Date(2025, 2, 12),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748B" />
            <Text style={styles.searchPlaceholder}>Search transactions...</Text>
          </View>
          <Pressable style={styles.filterButton}>
            <Filter size={20} color="#1E293B" />
          </Pressable>
        </View>
      </View>

      <ScrollView>
        {transactions.map((transaction) => (
          <Pressable key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionIcon}>
              {transaction.type === 'income' ? (
                <ArrowUpRight size={20} color="#22C55E" />
              ) : (
                <ArrowDownRight size={20} color="#EF4444" />
              )}
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.transactionCategory}>{transaction.category}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'income' ? styles.incomeText : styles.expenseText
              ]}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </Text>
              <Text style={styles.transactionDate}>
                {format(transaction.date, 'MMM d, yyyy')}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.addButtonContainer}>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Transaction</Text>
        </Pressable>
      </View>
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
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  transactionCategory: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  transactionDetails: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  incomeText: {
    color: '#22C55E',
  },
  expenseText: {
    color: '#EF4444',
  },
  transactionDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  addButtonContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
  },
});