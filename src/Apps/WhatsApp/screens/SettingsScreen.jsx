import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { 
  ChevronRight, 
  Key, 
  Bell, 
  Globe, 
  Shield, 
  Phone, 
  CircleHelp,
  MessageSquare,
  Database,
  Lock,
  Cloud,
  Smartphone
} from 'lucide-react-native';

const SETTINGS_OPTIONS = [
  { 
    id: 'account',
    icon: Key, 
    label: 'Account', 
    description: 'Security notifications, change number',
    color: '#128C7E' 
  },
  { 
    id: 'privacy',
    icon: Lock, 
    label: 'Privacy', 
    description: 'Block contacts, disappearing messages',
    color: '#5856D6' 
  },
  { 
    id: 'chats',
    icon: MessageSquare, 
    label: 'Chats',
    description: 'Theme, wallpapers, chat history',
    color: '#007AFF' 
  },
  { 
    id: 'notifications',
    icon: Bell, 
    label: 'Notifications', 
    description: 'Message, group & call tones',
    color: '#FF9500' 
  },
  { 
    id: 'storage',
    icon: Database, 
    label: 'Storage and Data',
    description: 'Network usage, auto-download',
    color: '#FF2D55' 
  },
  { 
    id: 'app-language',
    icon: Globe, 
    label: 'App Language', 
    description: 'English',
    color: '#5856D6' 
  },
  { 
    id: 'help',
    icon: CircleHelp, 
    label: 'Help',
    description: 'Help center, contact us, privacy policy',
    color: '#4CD964' 
  },
];

export default function SettingsScreen() {
  const renderSettingItem = ({ icon: Icon, label, description, color }) => (
    <TouchableOpacity key={label} style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={22} color="white" />
        </View>
        <View style={styles.settingTexts}>
          <Text style={styles.settingLabel}>{label}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.profile}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.status}>Living life one code at a time 🚀</Text>
        </View>
        <ChevronRight size={20} color="#666" />
      </TouchableOpacity>

      <View style={styles.section}>
        {SETTINGS_OPTIONS.map(renderSettingItem)}
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>WhatsApp from Meta</Text>
        <Text style={styles.version}>Version 2.25.1</Text>
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
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
    color: '#000',
  },
  status: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
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
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTexts: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
});