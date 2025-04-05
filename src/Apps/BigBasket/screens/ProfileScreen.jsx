import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Settings, ShoppingBag, CreditCard, MapPin, Bell, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const menuItems = [
  { icon: ShoppingBag, label: 'My Orders' },
  { icon: CreditCard, label: 'Payment Methods' },
  { icon: MapPin, label: 'Delivery Addresses' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
  { icon: LogOut, label: 'Logout' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&q=80' }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>

          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <item.icon size={24} color="#64748b" />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1f2937',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1f2937',
  },
});