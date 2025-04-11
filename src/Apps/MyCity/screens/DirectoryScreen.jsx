import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Clock, Leaf, Phone } from 'lucide-react-native';

const markets = [
  {
    id: 1,
    name: 'सोजत मेहंदी मंडी',
    location: 'Sojat Mehndi Market',
    schedule: 'Monday to Friday, 9 AM - 5 PM',
    products: ['Natural Mehndi Leaves', 'Henna Powder', 'Herbal Products'],
    contact: '+91 9876543213',
    image: 'https://api.a0.dev/assets/image?text=sojat%20mehndi%20market%20henna&aspect=16:9'
  },
  {
    id: 2,
    name: 'बाबा रामदेव बाजार',
    location: 'Baba Ramdev Market, Sojat',
    schedule: 'Daily, 8 AM - 8 PM',
    products: ['Spices', 'Handicrafts', 'Household Goods'],
    contact: '+91 9876543214',
    image: 'https://api.a0.dev/assets/image?text=sojat%20baba%20ramdev%20market&aspect=16:9'
  },
  {
    id: 3,
    name: 'सोजत रोड मंडी',
    location: 'Sojat Road Market',
    schedule: 'Daily, 7 AM - 6 PM',
    products: ['Local Produce', 'Textiles', 'Groceries'],
    contact: '+91 9876543215',
    image: 'https://api.a0.dev/assets/image?text=sojat%20road%20market%20local%20produce&aspect=16:9'
  },
  {
    id: 4,
    name: 'कृषि उपज मंडी',
    location: 'Krishi Upaj Mandi, Sojat',
    schedule: 'Monday to Saturday, 7 AM - 4 PM',
    products: ['Grains', 'Vegetables', 'Agri Products'],
    contact: '+91 9876543216',
    image: 'https://api.a0.dev/assets/image?text=sojat%20krishi%20mandi%20farmers&aspect=16:9'
  },
  {
    id: 5,
    name: 'हर्बल उत्पाद बाजार',
    location: 'Herbal Products Market, Sojat',
    schedule: 'Weekly, Tuesday & Friday, 10 AM - 5 PM',
    products: ['Herbal Extracts', 'Natural Oils', 'Cosmetic Herbs'],
    contact: '+91 9876543217',
    image: 'https://api.a0.dev/assets/image?text=sojat%20herbal%20products%20market&aspect=16:9'
  },
  {
    id: 6,
    name: 'हाथकरघा वस्त्र बाजार',
    location: 'Handloom Fabric Market, Sojat',
    schedule: 'Every Wednesday, 9 AM - 3 PM',
    products: ['Handloom Sarees', 'Cotton Fabric', 'Dyeing Material'],
    contact: '+91 9876543218',
    image: 'https://api.a0.dev/assets/image?text=sojat%20handloom%20textile%20market&aspect=16:9'
  },
  {
    id: 7,
    name: 'स्थानीय शिल्प हाट',
    location: 'Local Handicraft Bazaar, Sojat',
    schedule: 'Sunday, 10 AM - 6 PM',
    products: ['Wood Crafts', 'Metal Art', 'Rajasthani Decor'],
    contact: '+91 9876543219',
    image: 'https://api.a0.dev/assets/image?text=sojat%20handicrafts%20bazaar&aspect=16:9'
  },
  {
    id: 8,
    name: 'ग्रामिण उत्पाद मंडी',
    location: 'Rural Produce Market, Sojat',
    schedule: 'Monday to Friday, 7 AM - 2 PM',
    products: ['Pulses', 'Oilseeds', 'Dry Vegetables'],
    contact: '+91 9876543220',
    image: 'https://api.a0.dev/assets/image?text=sojat%20rural%20produce%20market&aspect=16:9'
  },
  {
    id: 9,
    name: 'मेहंदी निर्यात केंद्र',
    location: 'Henna Export Hub, Sojat',
    schedule: 'Weekdays, 10 AM - 6 PM',
    products: ['Bulk Henna Powder', 'Packaging Materials', 'Organic Certification Help'],
    contact: '+91 9876543221',
    image: 'https://api.a0.dev/assets/image?text=sojat%20henna%20export%20center&aspect=16:9'
  },
  {
    id: 10,
    name: 'कपड़ा एवं बर्तन बाजार',
    location: 'Textile & Utensil Market, Sojat',
    schedule: 'Daily, 9 AM - 8 PM',
    products: ['Clothing', 'Steel Utensils', 'General Items'],
    contact: '+91 9876543222',
    image: 'https://api.a0.dev/assets/image?text=sojat%20textile%20utensil%20market&aspect=16:9'
  },
  {
    id: 11,
    name: 'जयपुर किसान मंडी',
    location: 'Jaipur Organic Farmers Market',
    schedule: 'Every Saturday, 6 AM - 12 PM',
    products: ['Organic Millets', 'Indigenous Cotton', 'Medicinal Herbs'],
    contact: '+91 9876543210',
    image: 'https://api.a0.dev/assets/image?text=jaipur%20organic%20farmers%20market%20traditional&aspect=16:9'
  },
  {
    id: 12,
    name: 'जोधपुर हरित बाजार',
    location: 'Jodhpur Green Market',
    schedule: 'Wednesday & Sunday, 7 AM - 1 PM',
    products: ['Desert Beans', 'Organic Spices', 'Local Fruits'],
    contact: '+91 9876543211',
    image: 'https://api.a0.dev/assets/image?text=jodhpur%20green%20market%20organic%20produce&aspect=16:9'
  },
  {
    id: 13,
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
    <View style={styles.container}>
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
    </View>
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
    paddingTop: 70
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