import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const progressData = [
  { id: '1', metric: 'Weight', value: '165 lbs', change: '+2 lbs', positive: true },
  { id: '2', metric: 'Body Fat', value: '18%', change: '-1.5%', positive: false },
  { id: '3', metric: 'Muscle Mass', value: '125 lbs', change: '+3 lbs', positive: true },
];

const weeklyActivity = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 60 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 45 },
  { day: 'Fri', minutes: 0 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 45 },
];

export default function ProgressScreen() {
  const maxMinutes = Math.max(...weeklyActivity.map(day => day.minutes));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e1b4b', '#0f172a']}
        style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Track your fitness journey</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200).duration(1000)}>
          <Text style={styles.sectionTitle}>Body Metrics</Text>
          <View style={styles.metricsGrid}>
            {progressData.map((metric) => (
              <View key={metric.id} style={styles.metricCard}>
                <Text style={styles.metricLabel}>{metric.metric}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={[
                  styles.metricChange,
                  metric.positive ? styles.positiveChange : styles.negativeChange
                ]}>
                  {metric.change}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(1000)} style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            {weeklyActivity.map((day, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.bar}>
                  <View 
                    style={[
                      styles.barFill,
                      { height: `${(day.minutes / maxMinutes) * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  metricCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 15,
  },
  metricLabel: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 5,
  },
  metricValue: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  positiveChange: {
    color: '#4ade80',
  },
  negativeChange: {
    color: '#f87171',
  },
  activitySection: {
    marginTop: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 30,
    height: 150,
    backgroundColor: '#1e293b',
    borderRadius: 15,
    overflow: 'hidden',
  },
  barFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 15,
  },
  dayLabel: {
    color: '#94a3b8',
    marginTop: 8,
    fontSize: 12,
  },
});