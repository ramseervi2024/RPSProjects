import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Shield, Palette, Volume2, MessageSquare, Moon } from 'lucide-react-native';

const settingsSections = [
  {
    title: 'User Settings',
    items: [
      { icon: User, label: 'My Account', hasSwitch: false },
      { icon: Bell, label: 'Notifications', hasSwitch: true },
      { icon: Shield, label: 'Privacy & Safety', hasSwitch: false },
    ],
  },
  {
    title: 'App Settings',
    items: [
      { icon: Palette, label: 'Appearance', hasSwitch: false },
      { icon: Volume2, label: 'Voice & Video', hasSwitch: false },
      { icon: MessageSquare, label: 'Text & Images', hasSwitch: false },
      { icon: Moon, label: 'Dark Mode', hasSwitch: true },
    ],
  },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content}>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <Pressable key={itemIndex} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <item.icon size={20} color="#8e9297" />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                {item.hasSwitch && (
                  <Switch
                    trackColor={{ false: '#4f545c', true: '#7289da' }}
                    thumbColor="#fff"
                  />
                )}
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#8e9297',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginLeft: 12,
  },
});