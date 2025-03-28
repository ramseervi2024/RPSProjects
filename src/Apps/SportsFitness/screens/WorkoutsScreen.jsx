import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import Animated, { 
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const workoutCategories = [
  {
    id: '1',
    title: 'Strength',
    workouts: 12,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    title: 'Cardio',
    workouts: 8,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    title: 'Flexibility',
    workouts: 6,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

export default function WorkoutsScreen() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1e1b4b', '#0f172a']}
        style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <Text style={styles.subtitle}>Find your perfect training</Text>
      </LinearGradient>

      <View style={styles.content}>
        {workoutCategories.map((category, index) => (
          <Animated.View
            key={category.id}
            entering={FadeInUp.delay(200 * index).duration(1000)}
            style={styles.categoryContainer}>
            <AnimatedPressable
              style={[styles.categoryCard, animatedStyle]}
              onPressIn={onPressIn}
              onPressOut={onPressOut}>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
              <View intensity={80} style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.workoutCount}>{category.workouts} workouts</Text>
              </View>
            </AnimatedPressable>
          </Animated.View>
        ))}
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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  workoutCount: {
    fontSize: 16,
    color: '#e2e8f0',
  },
});