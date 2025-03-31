import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ChevronRight, Key, Bell, Globe, Shield, Phone, CircleHelp } from 'lucide-react-native';

const SETTINGS_OPTIONS = [
  { icon: Key, label: 'Account', color: '#128C7E' },
  { icon: Bell, label: 'Notifications', color: '#FF9500' },
  { icon: Globe, label: 'Language', color: '#007AFF' },
  { icon: Shield, label: 'Privacy', color: '#5856D6' },
  { icon: Phone, label: 'Linked Devices', color: '#FF2D55' },
  { icon: CircleHelp, label: 'Help', color: '#4CD964' },
];

export default function SettingsScreen() {
  const renderSettingItem = ({ icon: Icon, label, color }) => (
    <TouchableOpacity key={label} style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={20} color="white" />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.status}>Available</Text>
        </View>
      </View>

      <View style={styles.settingsList}>
        {SETTINGS_OPTIONS.map(renderSettingItem)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  profile: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  settingsList: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#000',
  },
});