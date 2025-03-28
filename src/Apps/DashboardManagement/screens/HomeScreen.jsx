import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DollarSign, Package, Users } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
const locale = 'en'
export default function HomeScreen() {
  const { t, i18n } = useTranslation();


  const stats = [
    { icon: DollarSign, value: '$12,543', label: t('dashboard.revenue'), color: '#4CAF50' },
    { icon: Package, value: '164', label: t('dashboard.orders'), color: '#2196F3' },
    { icon: Users, value: '1,893', label: t('dashboard.customers'), color: '#9C27B0' },
  ];

  const recentOrders = [
    { id: '1', customer: 'John Doe', amount: '$230', status: 'Completed' },
    { id: '2', customer: 'Sarah Smith', amount: '$180', status: 'Processing' },
    { id: '3', customer: 'Mike Johnson', amount: '$350', status: 'Pending' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { fontFamily: locale === 'ar' ? 'Cairo-Bold' : 'Inter-Bold' }]}>
          {t('dashboard.welcome')}
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { fontFamily: locale === 'ar' ? 'Cairo-SemiBold' : 'Inter-SemiBold' }]}>
        {t('dashboard.todayStats')}
      </Text>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { fontFamily: locale === 'ar' ? 'Cairo-Bold' : 'Inter-Bold' }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.recentOrdersHeader}>
        <Text style={[styles.sectionTitle, { fontFamily: locale === 'ar' ? 'Cairo-SemiBold' : 'Inter-SemiBold' }]}>
          {t('dashboard.recentOrders')}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
            {t('dashboard.viewAll')}
          </Text>
        </TouchableOpacity>
      </View>

      {recentOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={[styles.orderCustomer, { fontFamily: locale === 'ar' ? 'Cairo-SemiBold' : 'Inter-SemiBold' }]}>
            {order.customer}
          </Text>
          <View style={styles.orderDetails}>
            <Text style={[styles.orderAmount, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
              {order.amount}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
              <Text style={[styles.statusText, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
                {order.status}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'Completed':
      return '#E8F5E9';
    case 'Processing':
      return '#E3F2FD';
    case 'Pending':
      return '#FFF3E0';
    default:
      return '#F5F5F5';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  welcomeText: {
    fontSize: 24,
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    marginTop: 20,
    marginHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    color: '#1A1A1A',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  recentOrdersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  viewAll: {
    color: '#007AFF',
    fontSize: 14,
  },
  orderCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderCustomer: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  orderAmount: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: '#1A1A1A',
  },
});