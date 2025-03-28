import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Lightbulb, Thermometer, Shield, Camera } from 'lucide-react-native';

export default function DevicesScreen() {
  const { t } = useTranslation();

  const devices = [
    {
      id: 'lights',
      icon: Lightbulb,
      color: '#FFB340',
      active: 4,
      total: 8,
    },
    {
      id: 'thermostat',
      icon: Thermometer,
      color: '#007AFF',
      active: 2,
      total: 3,
    },
    {
      id: 'security',
      icon: Shield,
      color: '#32ADE6',
      active: 1,
      total: 1,
    },
    {
      id: 'cameras',
      icon: Camera,
      color: '#FF375F',
      active: 2,
      total: 4,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {devices.map((device) => {
          const Icon = device.icon;
          return (
            <TouchableOpacity key={device.id} style={styles.deviceCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${device.color}15` }]}>
                <Icon size={32} color={device.color} />
              </View>
              <Text style={styles.deviceName}>{t(`devices.${device.id}`)}</Text>
              <Text style={styles.deviceStatus}>
                {device.active} / {device.total} active
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  deviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  deviceName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  deviceStatus: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
});