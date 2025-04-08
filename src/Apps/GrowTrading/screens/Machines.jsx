import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

export default function MarketsScreen() {
  const markets = [
    { symbol: 'BTC/USD', name: 'Bitcoin', price: '43,567.89', change: '+5.2%', volume: '2.1B', isPositive: true },
    { symbol: 'ETH/USD', name: 'Ethereum', price: '2,345.67', change: '+3.8%', volume: '1.5B', isPositive: true },
    { symbol: 'SOL/USD', name: 'Solana', price: '98.76', change: '-2.1%', volume: '854M', isPositive: false },
    { symbol: 'ADA/USD', name: 'Cardano', price: '1.23', change: '+1.8%', volume: '423M', isPositive: true },
    { symbol: 'DOT/USD', name: 'Polkadot', price: '21.45', change: '-0.7%', volume: '312M', isPositive: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Markets</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        {['All', 'Gainers', 'Losers', 'Volume'].map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.filterButton, index === 0 && styles.filterButtonActive]}>
            <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.marketsList}>
        {markets.map((market, index) => (
          <TouchableOpacity key={index} style={styles.marketItem}>
            <View style={styles.marketMain}>
              <View style={styles.marketInfo}>
                <Text style={styles.marketSymbol}>{market.symbol}</Text>
                <Text style={styles.marketName}>{market.name}</Text>
              </View>
              <View style={styles.marketPrice}>
                <Text style={styles.priceText}>${market.price}</Text>
                <View style={[styles.changeContainer, market.isPositive ? styles.positive : styles.negative]}>
                  {market.isPositive ? (
                    <ArrowUpRight size={16} color="#10b981" />
                  ) : (
                    <ArrowDownRight size={16} color="#ef4444" />
                  )}
                  <Text style={[styles.changeText, market.isPositive ? styles.positiveText : styles.negativeText]}>
                    {market.change}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.volumeContainer}>
              <Text style={styles.volumeLabel}>Vol</Text>
              <Text style={styles.volumeText}>${market.volume}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    color: '#1f2937',
  },
  searchButton: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#64748b',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  marketsList: {
    flex: 1,
  },
  marketItem: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  marketMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  marketInfo: {
    flex: 1,
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
    marginTop: 4,
  },
  marketPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1f2937',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  positive: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  negative: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  positiveText: {
    color: '#10b981',
  },
  negativeText: {
    color: '#ef4444',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  volumeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#1f2937',
  },
});