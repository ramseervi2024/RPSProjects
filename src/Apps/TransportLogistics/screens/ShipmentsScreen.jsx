import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, Filter, Package, ArrowRight } from 'lucide-react-native';

export default function ShipmentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shipments</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#8E8E93" />
            <TextInput
              placeholder="Search shipments..."
              style={styles.searchInput}
              placeholderTextColor="#8E8E93"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {[1, 2, 3, 4, 5].map((item) => (
          <TouchableOpacity key={item} style={styles.shipmentCard}>
            <View style={styles.shipmentHeader}>
              <View style={styles.shipmentIcon}>
                <Package size={24} color="#007AFF" />
              </View>
              <View style={styles.shipmentInfo}>
                <Text style={styles.shipmentId}>SHP-{item}234</Text>
                <Text style={styles.shipmentDate}>Created on Jan {item + 10}, 2024</Text>
              </View>
              <ArrowRight size={20} color="#8E8E93" />
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, { backgroundColor: '#34C759' }]} />
                <View>
                  <Text style={styles.routeLabel}>From</Text>
                  <Text style={styles.routeCity}>New York, NY</Text>
                </View>
              </View>
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, { backgroundColor: '#FF3B30' }]} />
                <View>
                  <Text style={styles.routeLabel}>To</Text>
                  <Text style={styles.routeCity}>Los Angeles, CA</Text>
                </View>
              </View>
            </View>

            <View style={styles.shipmentFooter}>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: '#34C759' }]} />
                <Text style={styles.statusText}>In Transit</Text>
              </View>
              <Text style={styles.price}>$1,{item}99.00</Text>
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
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  shipmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  shipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  shipmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  shipmentId: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  shipmentDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  routeContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
    paddingVertical: 16,
    gap: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  routeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  routeCity: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#000000',
  },
  shipmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  statusContainer: {
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
  price: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
});