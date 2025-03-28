import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Thermometer, Droplets, Zap } from 'lucide-react-native';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>{t('home.welcome')}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Thermometer size={24} color="#007AFF" />
          <Text style={styles.statTitle}>{t('home.temperature')}</Text>
          <Text style={styles.statValue}>22°C</Text>
        </View>
        
        <View style={styles.statCard}>
          <Droplets size={24} color="#32ADE6" />
          <Text style={styles.statTitle}>{t('home.humidity')}</Text>
          <Text style={styles.statValue}>45%</Text>
        </View>
        
        <View style={styles.statCard}>
          <Zap size={24} color="#FFB340" />
          <Text style={styles.statTitle}>{t('home.energy')}</Text>
          <Text style={styles.statValue}>4.2kW</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
      <View style={styles.quickActions}>
        {['livingRoom', 'bedroom', 'kitchen'].map((room) => (
          <TouchableOpacity key={room} style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>{t(`rooms.${room}`)}</Text>
          </TouchableOpacity>
        ))}
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
  welcome: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
    marginTop: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
  },
});