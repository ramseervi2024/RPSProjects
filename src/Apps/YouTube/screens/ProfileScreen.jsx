import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, UserPlus, Share2, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';

const menuItems = [
  { id: '1', icon: UserPlus, title: 'Switch account' },
  { id: '2', icon: Settings, title: 'Settings' },
  { id: '3', icon: Shield, title: 'Your data in YouTube' },
  { id: '4', icon: HelpCircle, title: 'Help & feedback' },
  { id: '5', icon: Share2, title: 'Share YouTube' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage your Google Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <IconComponent size={24} color="#000" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsText}>Privacy Policy • Terms of Service</Text>
        </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 8,
  },
  manageButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  manageButtonText: {
    color: '#065fd4',
    fontSize: 14,
  },
  menuSection: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
  },
  termsSection: {
    padding: 16,
    alignItems: 'center',
  },
  termsText: {
    color: '#606060',
    fontSize: 14,
  },
});