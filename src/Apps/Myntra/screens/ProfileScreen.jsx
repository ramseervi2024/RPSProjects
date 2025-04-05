import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { ChevronRight, Package, Heart, MapPin, CreditCard, Settings, CircleHelp as HelpCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MENU_ITEMS = [
  { icon: Package, label: 'Orders', route: '/orders' },
  { icon: Heart, label: 'Wishlist', route: '/wishlist' },
  { icon: MapPin, label: 'Addresses', route: '/addresses' },
  { icon: CreditCard, label: 'Payment Methods', route: '/payments' },
  { icon: Settings, label: 'Settings', route: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', route: '/help' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>Sarah Johnson</Text>
              <Text style={styles.profileEmail}>sarah.j@example.com</Text>
            </View>
          </View>
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Pressable key={index} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Icon size={24} color="#282C3F" />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ChevronRight size={24} color="#7E818C" />
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileText: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#282C3F',
  },
  profileEmail: {
    fontSize: 14,
    color: '#7E818C',
    marginTop: 4,
  },
  editButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF3F6C',
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#FF3F6C',
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#282C3F',
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f5f5f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FF3F6C',
    fontSize: 16,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    color: '#7E818C',
    fontSize: 12,
    marginBottom: 20,
  },
});