import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Bell, Moon, Globe, Lock, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Bell size={24} color="#333333" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: '#D1D1D1', true: '#76B900' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Moon size={24} color="#333333" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: '#D1D1D1', true: '#76B900' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Globe size={24} color="#333333" />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <Text style={styles.settingValue}>English</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Lock size={24} color="#333333" />
            <Text style={styles.settingText}>Privacy Settings</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <HelpCircle size={24} color="#333333" />
            <Text style={styles.settingText}>Help Center</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>About App</Text>
          <Text style={styles.infoText}>Version 1.0.0</Text>
          <Text style={styles.infoText}>© 2024 NVIDIA Corporation</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#333333',
  },
  settingValue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
  },
  infoBox: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  infoTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
});