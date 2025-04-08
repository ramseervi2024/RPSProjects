import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ArrowUpRight, TrendingUp, Bell } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.nameText}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$24,563.82</Text>
        <View style={styles.profitContainer}>
          <TrendingUp size={16} color="#10b981" />
          <Text style={styles.profitText}>+2.4% today</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Trending Markets</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marketsScroll}>
        {[
          { symbol: 'BTC', name: 'Bitcoin', price: '43,567.89', change: '+5.2%', image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=64&h=64&fit=crop' },
          { symbol: 'ETH', name: 'Ethereum', price: '2,345.67', change: '+3.8%', image: 'https://images.unsplash.com/photo-1649743068825-5f45f2545f64?w=64&h=64&fit=crop' },
          { symbol: 'SOL', name: 'Solana', price: '98.76', change: '+7.1%', image: 'https://images.unsplash.com/photo-1677696793304-96d1a4cca2ce?w=64&h=64&fit=crop' },
        ].map((market, index) => (
          <TouchableOpacity key={index} style={styles.marketCard}>
            <Image source={{ uri: market.image }} style={styles.marketIcon} />
            <View style={styles.marketInfo}>
              <Text style={styles.marketSymbol}>{market.symbol}</Text>
              <Text style={styles.marketName}>{market.name}</Text>
              <Text style={styles.marketPrice}>${market.price}</Text>
              <Text style={styles.marketChange}>{market.change}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {['Deposit', 'Withdraw', 'Trade', 'History'].map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <ArrowUpRight size={24} color="#2563eb" />
            <Text style={styles.actionText}>{action}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  welcomeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#64748b',
  },
  nameText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#1f2937',
    marginTop: 4,
  },
  notificationButton: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceCard: {
    margin: 20,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#64748b',
  },
  balanceAmount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#1f2937',
    marginTop: 8,
  },
  profitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  profitText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#10b981',
    marginLeft: 4,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  marketsScroll: {
    paddingLeft: 20,
  },
  marketCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  marketIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 12,
  },
  marketInfo: {
    gap: 4,
  },
  marketSymbol: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1f2937',
  },
  marketName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  marketPrice: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#1f2937',
    marginTop: 4,
  },
  marketChange: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#10b981',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#1f2937',
    marginTop: 8,
  },
});