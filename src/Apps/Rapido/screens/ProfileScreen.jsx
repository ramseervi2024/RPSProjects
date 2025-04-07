import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, CreditCard, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

const menuItems = [
  { icon: Settings, title: 'Settings', color: '#007AFF' },
  { icon: CreditCard, title: 'Payment Methods', color: '#34C759' },
  { icon: Bell, title: 'Notifications', color: '#FF9500' },
  { icon: Shield, title: 'Privacy & Security', color: '#FF3B30' },
  { icon: HelpCircle, title: 'Help & Support', color: '#5856D6' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://source.unsplash.com/random/200x200?portrait' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
              <item.icon size={24} color={item.color} />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    paddingVertical: 16,
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
});