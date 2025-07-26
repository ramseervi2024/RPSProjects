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

export function SlideButton() {
  const translateX = useSharedValue(0);
  const autoSlide = useSharedValue(0);

  useEffect(() => {
    // Continuous subtle sliding motion
    autoSlide.value = withRepeat(
      withSequence(
        withTiming(8, { duration: 1800 }),
        withTiming(-8, { duration: 1800 })
      ),
      -1,
      false
    );
  }, []);

  const handlePress = () => {
    translateX.value = withSequence(
      withSpring(20, { duration: 200 }),
      withSpring(-20, { duration: 200 }),
      withSpring(0, { duration: 200 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + autoSlide.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.button, styles.slideButton, styles.glowEffect, animatedStyle]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Slide Animation</Text>
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
  slideButton: {
    backgroundColor: '#d97706',
  },
  glowEffect: {
    shadowColor: '#d97706',
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