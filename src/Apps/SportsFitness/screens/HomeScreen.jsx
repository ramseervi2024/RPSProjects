import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Platform } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = () => {
    if (Platform.OS !== 'web') {
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>John Doe</Text>
      </View>

      <Animated.View entering={FadeInDown.delay(200).duration(1000)}>
        <LinearGradient
          colors={['#6366f1', '#4f46e5']}
          style={styles.statsCard}>
          <View style={styles.statsContent}>
            <Text style={styles.statsTitle}>Today's Progress</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2,453</Text>
                <Text style={styles.statLabel}>Steps</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1.2</Text>
                <Text style={styles.statLabel}>Miles</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>284</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <Text style={styles.sectionTitle}>Featured Workouts</Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.workoutScroll}
      >
        {featuredWorkouts.map((workout, index) => (
          <Animated.View
            key={workout.id}
            entering={FadeInRight.delay(200 * index).duration(1000)}
          >
            <AnimatedPressable
              style={[styles.workoutCard, animatedStyle]}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <Image
                source={{ uri: workout.image }}
                style={styles.workoutImage}
              />
              <View intensity={80} style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDuration}>{workout.duration} min</Text>
              </View>
            </AnimatedPressable>
          </Animated.View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const featuredWorkouts = [
  {
    id: '1',
    title: 'Full Body HIIT',
    duration: 30,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    title: 'Yoga Flow',
    duration: 45,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    title: 'Strength Training',
    duration: 50,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#94a3b8',
    fontFamily: 'Poppins-Regular',
  },
  name: {
    fontSize: 24,
    color: '#f8fafc',
    fontFamily: 'Poppins-Bold',
  },
  statsCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsContent: {
    padding: 20,
  },
  statsTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    color: '#e2e8f0',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#f8fafc',
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  workoutScroll: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  workoutCard: {
    width: 280,
    height: 180,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  workoutInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  workoutDuration: {
    color: '#e2e8f0',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
});