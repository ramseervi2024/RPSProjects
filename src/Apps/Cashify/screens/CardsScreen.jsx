import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Plus } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function CardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cards</Text>
          <Pressable style={styles.addButton}>
            <Plus size={24} color="#007AFF" />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          {[
            { type: 'Visa', number: '****4582', gradient: ['#007AFF', '#0055FF'] },
            { type: 'Mastercard', number: '****7890', gradient: ['#FF3B30', '#FF2D55'] },
          ].map((card, index) => (
            <LinearGradient
              key={index}
              colors={card.gradient}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardType}>{card.type}</Text>
                <CreditCard size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.cardNumber}>{card.number}</Text>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.cardLabel}>Card Holder</Text>
                  <Text style={styles.cardValue}>John Doe</Text>
                </View>
                <View>
                  <Text style={styles.cardLabel}>Expires</Text>
                  <Text style={styles.cardValue}>12/25</Text>
                </View>
              </View>
            </LinearGradient>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionsList}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.transaction}>
              <View style={styles.transactionIcon}>
                <CreditCard size={24} color="#007AFF" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Amazon</Text>
                <Text style={styles.transactionCard}>Visa ****4582</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={styles.amount}>-$49.99</Text>
                <Text style={styles.date}>Mar 15</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Inter_700Bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  card: {
    width: 300,
    height: 180,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  cardNumber: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 40,
    fontFamily: 'Inter_400Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardLabel: {
    fontSize: 12,
    color: '#FFFFFF80',
    marginBottom: 4,
    fontFamily: 'Inter_400Regular',
  },
  cardValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  transactionsList: {
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
  transactionCard: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    color: '#FF3B30',
    fontFamily: 'Inter_600SemiBold',
  },
  date: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
});