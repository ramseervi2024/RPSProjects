import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, TriangleAlert as AlertTriangle, PhoneOff } from 'lucide-react-native';
import { useState } from 'react';

export default function BlockingScreen() {
  const [spamFilter, setSpamFilter] = useState(true);
  const [unknownCalls, setUnknownCalls] = useState(false);
  const [internationalCalls, setInternationalCalls] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blocking</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color="#0066FF" />
            <Text style={styles.sectionTitle}>Spam Protection</Text>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Spam Filter</Text>
              <Text style={styles.settingDescription}>
                Block calls identified as spam
              </Text>
            </View>
            <Switch
              value={spamFilter}
              onValueChange={setSpamFilter}
              trackColor={{ false: '#E5E5E5', true: '#0066FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color="#FF9500" />
            <Text style={styles.sectionTitle}>Call Filtering</Text>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Unknown Numbers</Text>
              <Text style={styles.settingDescription}>
                Block calls from numbers not in your contacts
              </Text>
            </View>
            <Switch
              value={unknownCalls}
              onValueChange={setUnknownCalls}
              trackColor={{ false: '#E5E5E5', true: '#0066FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <PhoneOff size={24} color="#FF3B30" />
            <Text style={styles.sectionTitle}>International Calls</Text>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Block International</Text>
              <Text style={styles.settingDescription}>
                Block calls from international numbers
              </Text>
            </View>
            <Switch
              value={internationalCalls}
              onValueChange={setInternationalCalls}
              trackColor={{ false: '#E5E5E5', true: '#0066FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginLeft: 12,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
});