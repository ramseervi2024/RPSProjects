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

export function RotationButton() {
  const rotation = useSharedValue(0);
  const autoRotation = useSharedValue(0);

  useEffect(() => {
    // Continuous gentle rotation
    autoRotation.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 2000 }),
        withTiming(-5, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  const handlePress = () => {
    rotation.value = withSequence(
      withSpring(15, { duration: 150 }),
      withSpring(-15, { duration: 150 }),
      withSpring(0, { duration: 150 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value + autoRotation.value}deg` }],
  }));

  return (
    <AnimatedPressable
      style={[styles.button, styles.rotationButton, styles.glowEffect, animatedStyle]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Rotation Animation</Text>
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
  rotationButton: {
    backgroundColor: '#059669',
  },
  glowEffect: {
    shadowColor: '#059669',
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