import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, CreditCard, Gift, Bell, ChevronRight } from 'lucide-react-native';

const menuItems = [
  {
    id: '1',
    title: 'Payment Methods',
    icon: CreditCard,
    color: '#2196F3',
  },
  {
    id: '2',
    title: 'MyMcDonald\'s Rewards',
    icon: Gift,
    color: '#FFC107',
  },
  {
    id: '3',
    title: 'Notifications',
    icon: Bell,
    color: '#4CAF50',
  },
  {
    id: '4',
    title: 'Settings',
    icon: Settings,
    color: '#9E9E9E',
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.rewardsCard}>
        <Text style={styles.rewardsTitle}>MyMcDonald's Rewards</Text>
        <Text style={styles.rewardsPoints}>2,500 points</Text>
        <TouchableOpacity style={styles.rewardsButton}>
          <Text style={styles.rewardsButtonText}>View Rewards</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuList}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: item.color + '20' }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <ChevronRight size={20} color="#666666" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#333333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  rewardsCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFC72C',
    borderRadius: 12,
  },
  rewardsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 8,
  },
  rewardsPoints: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#333333',
    marginBottom: 16,
  },
  rewardsButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rewardsButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  menuList: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
  },
});