import React, { useEffect } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PulseButton() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const autoPulse = useSharedValue(1);
  const autoOpacity = useSharedValue(1);

  useEffect(() => {
    // Continuous pulsing animation
    autoPulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      false
    );
    
    autoOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      false
    );
  }, []);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.2, { duration: 200 }),
      withSpring(0.9, { duration: 200 }),
      withSpring(1, { duration: 200 })
    );
    
    opacity.value = withSequence(
      withSpring(0.7, { duration: 200 }),
      withSpring(1, { duration: 300 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * autoPulse.value }],
    opacity: opacity.value * autoOpacity.value,
  }));

  return (
    <AnimatedPressable
      style={[styles.button, styles.pulseButton, styles.glowEffect, animatedStyle]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Pulse Animation</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pulseButton: {
    backgroundColor: '#7c3aed',
  },
  glowEffect: {
    shadowColor: '#7c3aed',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});