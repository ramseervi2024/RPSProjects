import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withDelay,
  withSequence,
  interpolate,
  Easing
} from 'react-native-reanimated';
import { CheckCircle } from 'lucide-react-native';

export default function CheckmarkScreen() {
  const [isSuccess, setIsSuccess] = useState(false);
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const checkOpacity = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
  }));

  const triggerSuccess = () => {
    setIsSuccess(true);
    
    // Scale in animation
    scale.value = withSequence(
      withTiming(0, { duration: 0 }),
      withTiming(1.2, { duration: 300, easing: Easing.out(Easing.back(1.7)) }),
      withTiming(1, { duration: 200 })
    );

    // Rotation animation
    rotation.value = withSequence(
      withTiming(0, { duration: 0 }),
      withTiming(360, { duration: 800, easing: Easing.out(Easing.cubic) })
    );

    // Check opacity
    checkOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      scale.value = 0;
      rotation.value = 0;
      checkOpacity.value = 0;
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success Checkmark</Text>
      <Text style={styles.subtitle}>Tap the button to trigger success animation</Text>
      
      <View style={styles.animationContainer}>
        {isSuccess && (
          <Animated.View style={[styles.successCircle, animatedContainerStyle]}>
            <Animated.View style={animatedCheckStyle}>
              <CheckCircle size={80} color="#ffffff" />
            </Animated.View>
          </Animated.View>
        )}
      </View>

      <Pressable style={styles.triggerButton} onPress={triggerSuccess}>
        <Text style={styles.buttonText}>Trigger Success</Text>
      </Pressable>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status: {isSuccess ? 'Success!' : 'Ready'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 40,
    textAlign: 'center',
  },
  animationContainer: {
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  triggerButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});