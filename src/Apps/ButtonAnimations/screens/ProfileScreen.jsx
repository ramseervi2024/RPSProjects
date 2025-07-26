import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ChevronRight, Package, CreditCard, Heart, Settings, CircleHelp as HelpCircle } from 'lucide-react-native';

const MENU_ITEMS = [
  { icon: Package, title: 'Your Orders' },
  { icon: CreditCard, title: 'Your Payments' },
  { icon: Heart, title: 'Your Lists' },
  { icon: Settings, title: 'Settings' },
  { icon: HelpCircle, title: 'Customer Service' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60' }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon size={24} color="#111111" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <ChevronRight size={24} color="#111111" />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerText: {
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
    borderBottomColor: '#e0e0e0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
  },
  signOutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FF9900',
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});