import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { Zap } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HoverGrowScreen() {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(1.1, { duration: 150 });
    rotation.value = withSequence(
      withTiming(-2, { duration: 75 }),
      withTiming(2, { duration: 75 }),
      withTiming(0, { duration: 75 })
    );
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hover Grow Animation</Text>
      <Text style={styles.subtitle}>Press and hold to see the scale effect</Text>
      
      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <AnimatedPressable
            key={item}
            style={[styles.card, animatedStyle]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Zap size={32} color="#6366F1" />
            <Text style={styles.cardText}>Item {item}</Text>
          </AnimatedPressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F1F5F9',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardText: {
    color: '#F1F5F9',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});