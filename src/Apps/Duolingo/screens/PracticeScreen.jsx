import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, Brain, Clock, Zap } from 'lucide-react-native';

const PRACTICE_MODES = [
  {
    id: '1',
    title: 'Hard Practice',
    description: 'Challenge yourself with difficult exercises',
    icon: Dumbbell,
    color: '#FF4B4B',
  },
  {
    id: '2',
    title: 'Mistakes Review',
    description: 'Practice lessons you struggled with',
    icon: Brain,
    color: '#1CB0F6',
  },
  {
    id: '3',
    title: 'Timed Challenge',
    description: 'Complete exercises against the clock',
    icon: Clock,
    color: '#FF9600',
  },
  {
    id: '4',
    title: 'Lightning Round',
    description: 'Quick practice session',
    icon: Zap,
    color: '#A560E8',
  },
];

export default function PracticeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice</Text>
        <Text style={styles.subtitle}>Choose your practice mode</Text>
      </View>

      <View style={styles.grid}>
        {PRACTICE_MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[styles.card, { borderColor: mode.color }]}>
            <mode.icon size={32} color={mode.color} />
            <Text style={styles.cardTitle}>{mode.title}</Text>
            <Text style={styles.cardDescription}>{mode.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    marginTop: 4,
  },
  grid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#666',
  },
});