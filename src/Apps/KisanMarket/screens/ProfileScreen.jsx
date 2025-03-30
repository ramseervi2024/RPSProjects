import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, Phone, MapPin, Package, FileText, CircleHelp as HelpCircle, Truck, Wallet, History, Star } from 'lucide-react-native';

const RECENT_TRANSACTIONS = [
  {
    id: '1',
    type: 'बिक्री',
    crop: 'गेहूं',
    amount: '₹48,000',
    quantity: '20 क्विंटल',
    date: '15 जनवरी 2024',
  },
  {
    id: '2',
    type: 'बिक्री',
    crop: 'सरसों',
    amount: '₹26,000',
    quantity: '5 क्विंटल',
    date: '10 जनवरी 2024',
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>राम सिंह</Text>
        <Text style={styles.location}>जयपुर, राजस्थान</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" />
          <Text style={styles.ratingText}>4.8</Text>
          <Text style={styles.ratingCount}>(120 रेटिंग)</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>₹1.2L</Text>
          <Text style={styles.statLabel}>कुल बिक्री</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>लेन-देन</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>खरीदार</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>खेती का क्षेत्र</Text>
          <Text style={styles.infoValue}>12 एकड़</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>मुख्य फसलें</Text>
          <Text style={styles.infoValue}>गेहूं, सरसों</Text>
        </View>
      </View>

      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>हाल के लेन-देन</Text>
        {RECENT_TRANSACTIONS.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionType}>{transaction.type}</Text>
              <Text style={styles.transactionAmount}>{transaction.amount}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionCrop}>{transaction.crop}</Text>
              <Text style={styles.transactionQuantity}>{transaction.quantity}</Text>
            </View>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
        ))}
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Wallet size={24} color="#212121" />
          <Text style={styles.menuText}>भुगतान</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <History size={24} color="#212121" />
          <Text style={styles.menuText}>लेन-देन इतिहास</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Truck size={24} color="#212121" />
          <Text style={styles.menuText}>परिवहन बुकिंग</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Package size={24} color="#212121" />
          <Text style={styles.menuText}>मेरी फसलें</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FileText size={24} color="#212121" />
          <Text style={styles.menuText}>दस्तावेज</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Settings size={24} color="#212121" />
          <Text style={styles.menuText}>सेटिंग्स</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <HelpCircle size={24} color="#212121" />
          <Text style={styles.menuText}>सहायता</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>लॉग आउट</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 12,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#E8F5E9',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  ratingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#212121',
    marginLeft: 4,
  },
  ratingCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#212121',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    elevation: 2,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  infoLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
  },
  infoValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
    marginTop: 4,
  },
  transactionsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 12,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionType: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#4CAF50',
  },
  transactionAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#212121',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  transactionCrop: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#212121',
  },
  transactionQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
  },
  transactionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#212121',
    marginLeft: 12,
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});