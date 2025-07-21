import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withSequence,
  withRepeat,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { AlertTriangle, X } from 'lucide-react-native';

export default function ShakeScreen() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const triggerError = (message: string) => {
    setErrorMessage(message);
    setShowError(true);

    // Fade in
    opacity.value = withTiming(1, { duration: 200 });

    // Shake animation
    translateX.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 50, easing: Easing.linear }),
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(-8, { duration: 50, easing: Easing.linear }),
        withTiming(8, { duration: 50, easing: Easing.linear }),
        withTiming(-6, { duration: 50, easing: Easing.linear }),
        withTiming(6, { duration: 50, easing: Easing.linear }),
        withTiming(-4, { duration: 50, easing: Easing.linear }),
        withTiming(4, { duration: 50, easing: Easing.linear }),
        withTiming(0, { duration: 50, easing: Easing.linear })
      ),
      2,
      false
    );

    // Auto hide after 4 seconds
    setTimeout(() => {
      hideError();
    }, 4000);
  };

  const hideError = () => {
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setShowError)(false);
    });
  };

  const errorExamples = [
    'Invalid email address',
    'Password too weak',
    'Network connection failed',
    'Invalid credentials',
    'Session expired'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error Shake Animation</Text>
      <Text style={styles.subtitle}>Tap any button to trigger an error shake</Text>
      
      <View style={styles.errorContainer}>
        {showError && (
          <Animated.View style={[styles.errorBox, animatedStyle]}>
            <View style={styles.errorContent}>
              <AlertTriangle size={20} color="#EF4444" />
              <Text style={styles.errorText}>{errorMessage}</Text>
              <Pressable onPress={hideError} style={styles.closeButton}>
                <X size={16} color="#EF4444" />
              </Pressable>
            </View>
          </Animated.View>
        )}
      </View>

      <View style={styles.buttonGroup}>
        {errorExamples.map((error, index) => (
          <Pressable
            key={index}
            style={styles.errorButton}
            onPress={() => triggerError(error)}
          >
            <Text style={styles.buttonText}>Trigger: {error}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 40,
    textAlign: 'center',
  },
  errorContainer: {
    height: 80,
    marginBottom: 40,
    justifyContent: 'center',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 16,
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  buttonGroup: {
    gap: 12,
  },
  errorButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});