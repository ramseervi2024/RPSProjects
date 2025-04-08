import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChartLine as LineChart, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

export default function PortfolioScreen() {
  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', amount: '0.45', value: '19,605.55', change: '+5.2%', isPositive: true },
    { symbol: 'ETH', name: 'Ethereum', amount: '2.8', value: '6,567.88', change: '+3.8%', isPositive: true },
    { symbol: 'SOL', name: 'Solana', amount: '45.6', value: '4,503.46', change: '-2.1%', isPositive: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Value</Text>
        <Text style={styles.balanceAmount}>$30,676.89</Text>
        <View style={styles.profitContainer}>
          <ArrowUpRight size={16} color="#10b981" />
          <Text style={styles.profitText}>+12.4% all time</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Portfolio Performance</Text>
          <View style={styles.timeframeContainer}>
            {['1D', '1W', '1M', '1Y', 'All'].map((period, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.timeframeButton, index === 2 && styles.timeframeActive]}>
                <Text
                  style={[
                    styles.timeframeText,
                    index === 2 && styles.timeframeTextActive,
                  ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.chart}>
          <LineChart size={280} color="#2563eb" />
        </View>
      </View>

      <Text style={styles.assetsTitle}>Your Assets</Text>
      <ScrollView style={styles.assetsList}>
        {assets.map((asset, index) => (
          <TouchableOpacity key={index} style={styles.assetItem}>
            <View style={styles.assetMain}>
              <View style={styles.assetInfo}>
                <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                <Text style={styles.assetName}>{asset.name}</Text>
              </View>
              <View style={styles.assetValue}>
                <Text style={styles.valueText}>${asset.value}</Text>
                <View
                  style={[
                    styles.changeContainer,
                    asset.isPositive ? styles.positive : styles.negative,
                  ]}>
                  {asset.isPositive ? (
                    <ArrowUpRight size={16} color="#10b981" />
                  ) : (
                    <ArrowDownRight size={16} color="#ef4444" />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      asset.isPositive ? styles.positiveText : styles.negativeText,
                    ]}>
                    {asset.change}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.assetAmount}>
              {asset.amount} {asset.symbol}
            </Text>
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
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    color: '#1f2937',
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
  chartContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 12,
  },
  timeframeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  timeframeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  timeframeActive: {
    backgroundColor: '#2563eb',
  },
  timeframeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#64748b',
  },
  timeframeTextActive: {
    color: '#ffffff',
  },
  chart: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  assetsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  assetsList: {
    flex: 1,
  },
  assetItem: {
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
  assetMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1f2937',
  },
  assetName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  assetValue: {
    alignItems: 'flex-end',
  },
  valueText: {
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
  assetAmount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
});