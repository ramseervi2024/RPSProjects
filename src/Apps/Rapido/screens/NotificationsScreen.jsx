import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Bell, Package, CreditCard, CircleAlert as AlertCircle } from 'lucide-react-native';

const notifications = [
  {
    id: '1',
    title: 'Order Delivered',
    message: 'Your food order has been delivered successfully',
    time: '2 min ago',
    type: 'delivery',
  },
  {
    id: '2',
    title: 'Payment Successful',
    message: 'Payment of $25.50 has been processed',
    time: '1 hour ago',
    type: 'payment',
  },
  {
    id: '3',
    title: 'New Offer',
    message: 'Get 20% off on your next delivery',
    time: '2 hours ago',
    type: 'offer',
  },
];

export default function NotificationsScreen() {
  const getIcon = (type) => {
    switch (type) {
      case 'delivery':
        return <Package size={24} color="#FF3B30" />;
      case 'payment':
        return <CreditCard size={24} color="#34C759" />;
      case 'offer':
        return <AlertCircle size={24} color="#FF9500" />;
      default:
        return <Bell size={24} color="#FF3B30" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Updates</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>{getIcon(item.type)}</View>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
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
  notificationCard: {
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
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationInfo: {
    marginLeft: 16,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 8,
  },
});