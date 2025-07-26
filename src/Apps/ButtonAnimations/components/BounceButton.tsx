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

export function BounceButton() {
  const translateY = useSharedValue(0);
  const autoBounce = useSharedValue(0);

  useEffect(() => {
    // Continuous gentle bouncing
    autoBounce.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 800 }),
        withTiming(0, { duration: 800 }),
        withTiming(-3, { duration: 600 }),
        withTiming(0, { duration: 600 })
      ),
      -1,
      false
    );
  }, []);

  const handlePress = () => {
    translateY.value = withSequence(
      withSpring(-15, { 
        damping: 2,
        stiffness: 300,
        duration: 150 
      }),
      withSpring(5, { 
        damping: 2,
        stiffness: 300,
        duration: 100 
      }),
      withSpring(0, { 
        damping: 8,
        stiffness: 300,
        duration: 150 
      })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value + autoBounce.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.button, styles.bounceButton, styles.glowEffect, animatedStyle]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Bounce Animation</Text>
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
  bounceButton: {
    backgroundColor: '#dc2626',
  },
  glowEffect: {
    shadowColor: '#dc2626',
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