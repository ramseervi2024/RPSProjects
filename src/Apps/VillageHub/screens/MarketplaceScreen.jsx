import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Clock, Leaf, Phone } from 'lucide-react-native';

const markets = [
  {
    id: 1,
    name: 'जयपुर किसान मंडी',
    location: 'Jaipur Organic Farmers Market',
    schedule: 'Every Saturday, 6 AM - 12 PM',
    products: ['Organic Millets', 'Indigenous Cotton', 'Medicinal Herbs'],
    contact: '+91 9876543210',
    image: 'https://api.a0.dev/assets/image?text=jaipur%20organic%20farmers%20market%20traditional&aspect=16:9'
  },
  {
    id: 2,
    name: 'जोधपुर हरित बाजार',
    location: 'Jodhpur Green Market',
    schedule: 'Wednesday & Sunday, 7 AM - 1 PM',
    products: ['Desert Beans', 'Organic Spices', 'Local Fruits'],
    contact: '+91 9876543211',
    image: 'https://api.a0.dev/assets/image?text=jodhpur%20green%20market%20organic%20produce&aspect=16:9'
  },
  {
    id: 3,
    name: 'उदयपुर जैविक मंडी',
    location: 'Udaipur Organic Market',
    schedule: 'Daily, 8 AM - 6 PM',
    products: ['Organic Vegetables', 'Traditional Grains', 'Dairy Products'],
    contact: '+91 9876543212',
    image: 'https://api.a0.dev/assets/image?text=udaipur%20organic%20market%20traditional%20produce&aspect=16:9'
  }
];

export default function LocalMarkets() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Local Markets</Text>
          <Text style={styles.headerSubtitle}>स्थानीय मंडियां</Text>
        </View>

        <View style={styles.infoBox}>
          <Info size={24} color="#2E7D32" />
          <Text style={styles.infoText}>
            Connect directly with organic markets and buyers. All products are certified organic and locally sourced.
          </Text>
        </View>

        {markets.map((market) => (
          <View key={market.id} style={styles.marketCard}>
            <Image source={{ uri: market.image }} style={styles.marketImage} />
            <View style={styles.marketContent}>
              <Text style={styles.marketName}>{market.name}</Text>
              <Text style={styles.marketLocation}>{market.location}</Text>
              
              <View style={styles.scheduleContainer}>
                <Clock size={20} color="#2E7D32" />
                <Text style={styles.scheduleText}>{market.schedule}</Text>
              </View>

              <View style={styles.productsContainer}>
                <Text style={styles.productsTitle}>Available Products:</Text>
                {market.products.map((product, index) => (
                  <View key={index} style={styles.productItem}>
                    <Leaf size={16} color="#2E7D32" />
                    <Text style={styles.productText}>{product}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.contactButton}>
                <Phone size={20} color="white" />
                <Text style={styles.contactButtonText}>{market.contact}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#E8F5E9',
    marginTop: 5,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: '#1B5E20',
    fontSize: 14,
  },
  marketCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  marketImage: {
    width: '100%',
    height: 200,
  },
  marketContent: {
    padding: 15,
  },
  marketName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  marketLocation: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 8,
  },
  scheduleText: {
    marginLeft: 8,
    color: '#1B5E20',
    fontSize: 14,
  },
  productsContainer: {
    marginTop: 15,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  productText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});