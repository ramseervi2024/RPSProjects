import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight, User, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', hasSwitch: false },
        { icon: Bell, label: 'Notifications', hasSwitch: true },
        { icon: Shield, label: 'Security', hasSwitch: false },
      ],
    },
    {
      title: 'Payments',
      items: [
        { icon: CreditCard, label: 'Payment Methods', hasSwitch: false },
        { icon: ChevronRight, label: 'Transaction History', hasSwitch: false },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', hasSwitch: false },
        { icon: ChevronRight, label: 'Contact Support', hasSwitch: false },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                ]}>
                <View style={styles.settingMain}>
                  <item.icon size={20} color="#64748b" />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                {item.hasSwitch ? (
                  <Switch
                    trackColor={{ false: '#e2e8f0', true: '#93c5fd' }}
                    thumbColor={true ? '#2563eb' : '#94a3b8'}
                    ios_backgroundColor="#e2e8f0"
                    value={true}
                  />
                ) : (
                  <ChevronRight size={20} color="#64748b" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    color: '#1f2937',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#64748b',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 32,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#ef4444',
    marginLeft: 8,
  },
  version: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
});