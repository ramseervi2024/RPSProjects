import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Package, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';

const deliveries = [
  {
    id: '1',
    title: 'Food Delivery',
    status: 'In Progress',
    time: '15 min',
    address: '456 Park Avenue',
  },
  {
    id: '2',
    title: 'Grocery Order',
    status: 'Completed',
    time: '2 hours ago',
    address: '789 Broadway',
  },
  {
    id: '3',
    title: 'Medicine Delivery',
    status: 'Completed',
    time: 'Yesterday',
    address: '321 5th Avenue',
  },
];

export default function DeliveriesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Deliveries</Text>
      </View>

      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deliveryCard}>
            <View style={styles.iconContainer}>
              <Package size={24} color="#FF3B30" />
            </View>
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTitle}>{item.title}</Text>
              <Text style={styles.deliveryAddress}>{item.address}</Text>
              <View style={styles.statusContainer}>
                {item.status === 'In Progress' ? (
                  <Clock size={16} color="#FF9500" />
                ) : (
                  <CheckCircle size={16} color="#34C759" />
                )}
                <Text
                  style={[
                    styles.statusText,
                    { color: item.status === 'In Progress' ? '#FF9500' : '#34C759' },
                  ]}>
                  {item.status} • {item.time}
                </Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  listContent: {
    padding: 20,
  },
  deliveryCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryInfo: {
    marginLeft: 16,
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 4,
  },
});