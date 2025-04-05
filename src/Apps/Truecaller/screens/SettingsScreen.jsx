import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Settings as SettingsIcon, CircleHelp as HelpCircle, ChevronRight, Star, Share2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const MenuItem = ({ icon, title, description }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        {icon}
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {description && (
            <Text style={styles.menuItemDescription}>{description}</Text>
          )}
        </View>
      </View>
      <ChevronRight size={20} color="#666666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <MenuItem
            icon={<User size={24} color="#0066FF" />}
            title="My Profile"
            description="View and edit your profile"
          />
          <MenuItem
            icon={<Bell size={24} color="#FF9500" />}
            title="Notifications"
            description="Manage notification settings"
          />
          <MenuItem
            icon={<SettingsIcon size={24} color="#32C759" />}
            title="App Settings"
            description="General app configuration"
          />
        </View>

        <View style={styles.section}>
          <MenuItem
            icon={<Star size={24} color="#FF9500" />}
            title="Premium Features"
            description="Upgrade to Premium"
          />
          <MenuItem
            icon={<Share2 size={24} color="#0066FF" />}
            title="Share App"
            description="Invite friends to join"
          />
          <MenuItem
            icon={<HelpCircle size={24} color="#FF3B30" />}
            title="Help & Support"
            description="Get help and contact support"
          />
        </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 12,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  menuItemDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
    marginTop: 2,
  },
});