import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ChevronRight, Settings, ShoppingBag, Heart, Gift } from 'lucide-react-native';

export default function AccountScreen() {
  const menuItems = [
    { icon: ShoppingBag, title: 'Orders', subtitle: 'View your order history' },
    { icon: Heart, title: 'Favorites', subtitle: 'Your saved items' },
    { icon: Gift, title: 'Apple Card', subtitle: 'Manage your card' },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>

      <View style={styles.profile}>
        <View style={styles.profileInitials}>
          <Text style={styles.initialsText}>JD</Text>
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <item.icon size={24} color="#000000" />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#666666" />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 32,
    color: '#000000',
  },
  profile: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileInitials: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  initialsText: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'SF-Pro-Display-SemiBold',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Display-SemiBold',
    color: '#000000',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display',
    color: '#666666',
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-SemiBold',
    color: '#000000',
  },
  menuItemSubtitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Display',
    color: '#666666',
    marginTop: 2,
  },
  signOutButton: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-SemiBold',
    color: '#ff3b30',
  },
});