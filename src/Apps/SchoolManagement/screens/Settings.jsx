import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Bell, Lock, Moon, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Bell size={20} color="#6b7280" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch value={true} />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Moon size={20} color="#6b7280" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch value={false} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Lock size={20} color="#6b7280" />
            <Text style={styles.settingText}>Privacy Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <HelpCircle size={20} color="#6b7280" />
            <Text style={styles.settingText}>Help & Support</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginBottom: 40,
    padding: 16,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
});