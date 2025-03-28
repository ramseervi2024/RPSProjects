import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChartBar as BarChart3, TrendingUp, TrendingDown } from 'lucide-react-native';

const locale = 'en'

export default function AnalyticsScreen() {

  const metrics = [
    { title: 'Total Revenue', value: '$45,231', change: '+12.5%', isPositive: true },
    { title: 'Total Orders', value: '1,243', change: '+8.3%', isPositive: true },
    { title: 'Average Order', value: '$36.40', change: '-2.1%', isPositive: false },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BarChart3 size={24} color="#1A1A1A" />
        <Text style={[styles.headerTitle, { fontFamily: locale === 'ar' ? 'Cairo-Bold' : 'Inter-Bold' }]}>
          Analytics Overview
        </Text>
      </View>

      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <Text style={[styles.metricTitle, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
              {metric.title}
            </Text>
            <Text style={[styles.metricValue, { fontFamily: locale === 'ar' ? 'Cairo-Bold' : 'Inter-Bold' }]}>
              {metric.value}
            </Text>
            <View style={styles.changeContainer}>
              {metric.isPositive ? (
                <TrendingUp size={16} color="#4CAF50" />
              ) : (
                <TrendingDown size={16} color="#F44336" />
              )}
              <Text
                style={[
                  styles.changeText,
                  { color: metric.isPositive ? '#4CAF50' : '#F44336' },
                  { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' },
                ]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.chartPlaceholder}>
        <Text style={[styles.chartText, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
          Revenue Chart
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 12,
    color: '#1A1A1A',
  },
  metricsContainer: {
    padding: 20,
  },
  metricCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    marginLeft: 4,
  },
  chartPlaceholder: {
    backgroundColor: '#fff',
    margin: 20,
    height: 300,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartText: {
    fontSize: 16,
    color: '#666',
  },
});