import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Bell, Shield, CircleHelp as HelpCircle, ChevronRight, LogOut } from 'lucide-react-native';

const menuItems = [
  {
    id: '1',
    icon: CreditCard,
    title: 'Payment Methods',
    subtitle: 'Manage your payment options',
  },
  {
    id: '2',
    icon: Bell,
    title: 'Notifications',
    subtitle: 'Customize your notification preferences',
  },
  {
    id: '3',
    icon: Shield,
    title: 'Privacy & Security',
    subtitle: 'Manage your account security',
  },
  {
    id: '4',
    icon: HelpCircle,
    title: 'Help & Support',
    subtitle: 'Get help with your rides',
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400' }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
            </View>
          </View>
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Pressable key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <item.icon size={24} color="#666666" />
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#666666" />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logoutButton}>
          <LogOut size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileText: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1A1A1A',
  },
  email: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  menuItemSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 20,
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 8,
  },
});