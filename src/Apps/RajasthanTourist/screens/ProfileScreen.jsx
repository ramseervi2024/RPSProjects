import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, Heart, Map, Camera, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const profileStats = [
    { label: 'Places Visited', value: '12' },
    { label: 'Reviews', value: '28' },
    { label: 'Photos', value: '156' },
  ];

  const menuItems = [
    { icon: Heart, label: 'Favorite Places', count: '15' },
    { icon: Map, label: 'My Itineraries', count: '3' },
    { icon: Camera, label: 'My Photos', count: '156' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.location}>Travel Enthusiast</Text>
        
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <item.icon size={24} color="#1D3557" />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            {item.count && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{item.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#E63946" />
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F1FAEE',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1D3557',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#E63946',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1D3557',
    marginLeft: 16,
  },
  countBadge: {
    backgroundColor: '#F1FAEE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#E63946',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#E63946',
    marginLeft: 8,
  },
});