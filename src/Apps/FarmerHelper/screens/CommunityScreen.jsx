import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, TrendingUp, TrendingDown, Clock, BarChart2, ChevronRight } from 'lucide-react-native';

export default function MarketPrices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [commodities] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      currentPrice: 2.50,
      unit: 'kg',
      change: 0.30,
      trend: 'up',
      lastUpdated: '2 hours ago',
      forecast: 'Rising demand expected'
    },
    {
      id: 2,
      name: 'Corn',
      currentPrice: 1.75,
      unit: 'kg',
      change: -0.15,
      trend: 'down',
      lastUpdated: '1 hour ago',
      forecast: 'Stable prices expected'
    },
    {
      id: 3,
      name: 'Potatoes',
      currentPrice: 1.20,
      unit: 'kg',
      change: 0.10,
      trend: 'up',
      lastUpdated: '3 hours ago',
      forecast: 'Slight increase expected'
    },
    {
      id: 4,
      name: 'Wheat',
      currentPrice: 3.25,
      unit: 'kg',
      change: -0.25,
      trend: 'down',
      lastUpdated: '30 mins ago',
      forecast: 'Price may decrease further'
    }
  ]);

  const filteredCommodities = commodities.filter(commodity =>
    commodity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search commodities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.marketSummary}>
        <Text style={styles.summaryTitle}>Market Summary</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <TrendingUp size={24} color="#2ECC71" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Rising</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingDown size={24} color="#E74C3C" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Falling</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={24} color="#3498DB" />
            <Text style={styles.statLabel}>Last Updated</Text>
            <Text style={styles.statTime}>30m ago</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.commoditiesList}>
        {filteredCommodities.map((commodity) => (
          <View key={commodity.id} style={styles.commodityCard}>
            <View style={styles.commodityHeader}>
              <Text style={styles.commodityName}>{commodity.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>
                  ${commodity.currentPrice.toFixed(2)}/{commodity.unit}
                </Text>
                <View style={[
                  styles.changeBadge,
                  { backgroundColor: commodity.trend === 'up' ? '#E8F8F1' : '#FDEBE9' }
                ]}>
                  {commodity.trend === 'up' ? (
                    <TrendingUp size={16} color="#2ECC71" />
                  ) : (
                    <TrendingDown size={16} color="#E74C3C" />
                  )}
                  <Text style={[
                    styles.changeText,
                    { color: commodity.trend === 'up' ? '#2ECC71' : '#E74C3C' }
                  ]}>
                    {commodity.change > 0 ? '+' : ''}{commodity.change.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.commodityDetails}>
              <View style={styles.detailRow}>
                <Clock size={16} color="#666" />
                <Text style={styles.detailText}>Updated {commodity.lastUpdated}</Text>
              </View>
              <View style={styles.detailRow}>
                <BarChart2 size={16} color="#666" />
                <Text style={styles.detailText}>{commodity.forecast}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Historical Data</Text>
              <ChevronRight size={16} color="#FF715B" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  marketSummary: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
  },
  statTime: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: 'bold',
  },
  commoditiesList: {
    flex: 1,
  },
  commodityCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  commodityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  commodityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginTop: 5,
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  commodityDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  viewDetailsText: {
    color: '#FF715B',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
});