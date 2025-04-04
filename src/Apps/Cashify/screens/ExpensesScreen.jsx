import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartPie as PieChart, ShoppingBag, Coffee, Car, Chrome as Home } from 'lucide-react-native';

export default function ExpensesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Expenses</Text>
          <Text style={styles.subtitle}>March 2025</Text>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Expenses</Text>
          <Text style={styles.totalAmount}>$3,250.00</Text>
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesList}>
          {[
            { icon: ShoppingBag, title: 'Shopping', amount: 850, color: '#007AFF' },
            { icon: Coffee, title: 'Food & Drinks', amount: 450, color: '#34C759' },
            { icon: Car, title: 'Transport', amount: 350, color: '#FF9500' },
            { icon: Home, title: 'Housing', amount: 1600, color: '#FF3B30' },
          ].map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <category.icon size={24} color={category.color} />
              </View>
              <View style={styles.categoryDetails}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryAmount}>${category.amount}</Text>
              </View>
              <View style={styles.categoryPercentage}>
                <Text style={styles.percentageText}>
                  {Math.round((category.amount / 3250) * 100)}%
                </Text>
              </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  totalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    marginTop: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Inter_700Bold',
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
  categoriesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryDetails: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
  },
  categoryPercentage: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter_600SemiBold',
  },
});