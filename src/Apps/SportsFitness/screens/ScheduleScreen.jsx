import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Clock, Dumbbell } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const schedule = [
  {
    id: '1',
    time: '07:00 AM',
    title: 'Morning Yoga',
    duration: '45 min',
    type: 'Flexibility',
  },
  {
    id: '2',
    time: '12:30 PM',
    title: 'HIIT Cardio',
    duration: '30 min',
    type: 'Cardio',
  },
  {
    id: '3',
    time: '06:00 PM',
    title: 'Strength Training',
    duration: '60 min',
    type: 'Strength',
  },
];

export default function ScheduleScreen() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = () => {
    scale.value = withSpring(0.98);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e1b4b', '#0f172a']}
        style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>Your workout plan for today</Text>
      </LinearGradient>

      <View style={styles.content}>
        {schedule.map((session, index) => (
          <Animated.View
            key={session.id}
            entering={FadeInDown.delay(200 * index).duration(1000)}
          >
            <AnimatedPressable
              style={[styles.sessionCard, animatedStyle]}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <View style={styles.timeContainer}>
                <Clock size={20} color="#94a3b8" />
                <Text style={styles.time}>{session.time}</Text>
              </View>

              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <View style={styles.sessionDetails}>
                  <View style={styles.detail}>
                    <Dumbbell size={16} color="#94a3b8" />
                    <Text style={styles.detailText}>{session.type}</Text>
                  </View>
                  <Text style={styles.duration}>{session.duration}</Text>
                </View>
              </View>
            </AnimatedPressable>
          </Animated.View>
        ))}

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Tomorrow</Text>
          <Text style={styles.upcomingText}>3 workouts scheduled</Text>
        </View>
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
    // paddingTop: 60,
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
  sessionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  time: {
    color: '#94a3b8',
    fontSize: 14,
    marginLeft: 8,
  },
  sessionInfo: {
    gap: 8,
  },
  sessionTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sessionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  duration: {
    color: '#94a3b8',
    fontSize: 14,
  },
  upcomingSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#1e293b',
    borderRadius: 20,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  upcomingText: {
    color: '#94a3b8',
    fontSize: 16,
  },
});