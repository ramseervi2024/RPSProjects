import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowUpRight, TrendingUp, Package, Truck } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Active Shipments</Text>
            <TrendingUp size={20} color="#007AFF" />
          </View>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statChange}>+12.5% from last week</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Completed</Text>
            <Package size={20} color="#34C759" />
          </View>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statChange}>+8.2% from last month</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Shipments</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ArrowUpRight size={16} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shipmentsList}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.shipmentCard}>
              <View style={styles.shipmentIcon}>
                <Truck size={24} color="#007AFF" />
              </View>
              <Text style={styles.shipmentId}>SHP-{item}234</Text>
              <Text style={styles.shipmentRoute}>New York → Los Angeles</Text>
              <View style={styles.shipmentStatus}>
                <View style={[styles.statusDot, { backgroundColor: '#34C759' }]} />
                <Text style={styles.statusText}>In Transit</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
  statChange: {
    fontSize: 12,
    color: '#34C759',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontFamily: 'Inter-Medium',
  },
  shipmentsList: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  shipmentCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  shipmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  shipmentId: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  shipmentRoute: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  shipmentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#34C759',
    fontFamily: 'Inter-Medium',
  },
});