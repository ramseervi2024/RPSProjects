import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Settings, Bell, BookOpen, Star, LogOut } from 'lucide-react-native';

const menuItems = [
  { id: 1, title: 'Settings', icon: Settings },
  { id: 2, title: 'Notifications', icon: Bell },
  { id: 3, title: 'My Bookings', icon: BookOpen },
  { id: 4, title: 'Reviews', icon: Star },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <IconComponent size={24} color="#333" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#E53935" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'Inter_600SemiBold',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
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
    color: '#333',
    fontFamily: 'Inter_400Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E53935',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#E53935',
    fontFamily: 'Inter_600SemiBold',
  },
});