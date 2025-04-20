import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Package, Heart, MapPin, CreditCard, Settings, HelpCircle } from 'lucide-react-native';

const MENU_ITEMS = [
  { icon: Package, label: 'My Orders', badge: '4' },
  { icon: Heart, label: 'Wishlist', badge: '12' },
  { icon: MapPin, label: 'Addresses' },
  { icon: CreditCard, label: 'Payment Methods' },
  { icon: Settings, label: 'Account Settings' },
  { icon: HelpCircle, label: 'Help & Support' },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500' }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>Sarah Johnson</Text>
              <Text style={styles.profileEmail}>sarah.j@example.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <item.icon size={24} color="#333333" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <ChevronRight size={20} color="#666666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // backgroundColor: '#E83E8C',
  },
  header: {
    padding: 16,
    backgroundColor: '#E83E8C',
    paddingTop:Platform.OS=='ios'? 70:50
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  profileText: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#ffffff',
  },
  profileEmail: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  editButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#E83E8C',
  },
  menuContainer: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    marginLeft: 16,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#E83E8C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#ffffff',
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#E83E8C',
  },
});