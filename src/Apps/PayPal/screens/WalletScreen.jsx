import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Plus } from 'lucide-react-native';

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$2,456.89</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceButton}>
              <Text style={styles.balanceButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceButton}>
              <Text style={styles.balanceButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#0070BA" />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cards}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <CreditCard size={24} color="#1C2B33" />
                <Text style={styles.cardType}>Visa ending in 4242</Text>
              </View>
              <Text style={styles.cardExpiry}>Expires 12/24</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <CreditCard size={24} color="#1C2B33" />
                <Text style={styles.cardType}>Mastercard ending in 8888</Text>
              </View>
              <Text style={styles.cardExpiry}>Expires 09/25</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {[1, 2, 3].map((_, index) => (
            <View key={index} style={styles.transaction}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }}
                style={styles.transactionIcon}
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Coffee Shop</Text>
                <Text style={styles.transactionDate}>Mar 24, 2024</Text>
              </View>
              <Text style={styles.transactionAmount}>-$4.50</Text>
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
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#1C2B33',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    backgroundColor: '#0070BA',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  balanceAmount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  balanceButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  balanceButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#0070BA',
  },
  section: {
    marginBottom: 24,
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
    color: '#1C2B33',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#0070BA',
  },
  cards: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardType: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1C2B33',
  },
  cardExpiry: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6C7C8C',
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1C2B33',
  },
  transactionDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6C7C8C',
    marginTop: 2,
  },
  transactionAmount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#E74C3C',
  },
});