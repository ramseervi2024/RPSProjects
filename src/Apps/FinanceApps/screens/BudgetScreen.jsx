import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle } from 'lucide-react-native';

export default function BudgetScreen() {
  const categories = [
    { name: 'Food & Dining', budget: 500, spent: 350, color: '#FF6B6B' },
    { name: 'Transportation', budget: 300, spent: 220, color: '#4ECDC4' },
    { name: 'Shopping', budget: 400, spent: 275, color: '#45B7D1' },
    { name: 'Bills & Utilities', budget: 800, spent: 750, color: '#96CEB4' },
    { name: 'Entertainment', budget: 200, spent: 150, color: '#FFD93D' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Budget</Text>
        <Text style={styles.subtitle}>March 2025</Text>
      </View>

      <ScrollView>
        <View style={styles.totalBudget}>
          <Text style={styles.totalLabel}>Total Budget</Text>
          <Text style={styles.totalAmount}>$2,200.00</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '75%' }]} />
          </View>
          <Text style={styles.remaining}>$550.00 remaining</Text>
        </View>

        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitleRow}>
                  <Circle size={12} fill={category.color} color={category.color} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>
                  ${category.spent} <Text style={styles.budgetOf}>of ${category.budget}</Text>
                </Text>
              </View>
              <View style={styles.categoryProgress}>
                <View 
                  style={[
                    styles.categoryProgressBar,
                    { 
                      width: `${(category.spent / category.budget) * 100}%`,
                      backgroundColor: category.color
                    }
                  ]} 
                />
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
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#1E293B',
  },
  subtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  totalBudget: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#64748B',
  },
  totalAmount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#1E293B',
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginTop: 16,
  },
  progress: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  remaining: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8,
  },
  categories: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  categoryAmount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  budgetOf: {
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  categoryProgress: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  categoryProgressBar: {
    height: '100%',
    borderRadius: 3,
  },
});