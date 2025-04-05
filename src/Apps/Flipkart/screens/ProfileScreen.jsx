import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ChevronRight, Package, Heart, Wallet, Settings, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

const MENU_ITEMS = [
  { icon: Package, label: 'My Orders', color: '#2874F0' },
  { icon: Heart, label: 'My Wishlist', color: '#ff6161' },
  { icon: Wallet, label: 'My Wallet', color: '#2874F0' },
  { icon: Settings, label: 'Settings', color: '#666' },
  { icon: HelpCircle, label: 'Help Center', color: '#666' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <item.icon size={24} color={item.color} />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            <ChevronRight size={20} color="#666" />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton}>
        <LogOut size={24} color="#ff6161" />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  header: {
    backgroundColor: '#2874F0',
    padding: 20,
  },
  userInfo: {
    marginTop: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff6161',
    marginLeft: 12,
  },
});