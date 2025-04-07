import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Search, MapPin } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={20} color="#FF3B30" />
          <Text style={styles.location}>Current Location</Text>
        </View>
        <Text style={styles.address}>123 Main Street, New York</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" />
        <Text style={styles.searchPlaceholder}>Search for services...</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          {['Food Delivery', 'Groceries', 'Pharmacy', 'Express'].map((service, index) => (
            <TouchableOpacity key={index} style={styles.serviceCard}>
              <Image
                source={{ uri: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80` }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>{service}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {['Pizza', 'Groceries', 'Medicine'].map((order, index) => (
          <TouchableOpacity key={index} style={styles.orderCard}>
            <Image
              source={{ uri: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80` }}
              style={styles.orderImage}
            />
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>{order}</Text>
              <Text style={styles.orderStatus}>Delivered • Yesterday</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#8E8E93',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  servicesScroll: {
    paddingLeft: 20,
    marginBottom: 30,
  },
  serviceCard: {
    marginRight: 16,
    width: 140,
  },
  serviceImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  serviceTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  orderInfo: {
    marginLeft: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderStatus: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
});