import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Clock, ArrowRight } from 'lucide-react-native';

const orders = [
  {
    id: '1',
    status: 'In Progress',
    items: ['Big Mac', '2x Large Fries', 'Coca-Cola'],
    total: '$15.99',
    time: '10 mins',
    restaurant: 'Downtown McDonald\'s',
  },
  {
    id: '2',
    status: 'Ready',
    items: ['Quarter Pounder', 'McNuggets', 'Sprite'],
    total: '$12.99',
    time: 'Ready for pickup',
    restaurant: 'Westfield Mall McDonald\'s',
  },
];

export default function OrdersScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <View style={styles.ordersList}>
        {orders.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={[styles.statusBadge, order.status === 'Ready' ? styles.readyBadge : styles.progressBadge]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
              <ArrowRight size={20} color="#666666" />
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.itemsList}>
                {order.items.map((item, index) => (
                  <Text key={index} style={styles.itemText}>{item}</Text>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <View style={styles.timeContainer}>
                  <Clock size={16} color="#666666" />
                  <Text style={styles.timeText}>{order.time}</Text>
                </View>
                <Text style={styles.totalText}>{order.total}</Text>
              </View>

              <Text style={styles.restaurantText}>{order.restaurant}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#333333',
  },
  ordersList: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  readyBadge: {
    backgroundColor: '#E8F5E9',
  },
  progressBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#2E7D32',
  },
  orderDetails: {
    padding: 16,
  },
  itemsList: {
    marginBottom: 12,
  },
  itemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  totalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  restaurantText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
});