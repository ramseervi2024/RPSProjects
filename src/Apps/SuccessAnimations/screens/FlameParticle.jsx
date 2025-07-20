import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  runOnJS,
} from 'react-native-reanimated';
import { Heart, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ThankYouSuccess() {
  const heartScale = useSharedValue(0.8);
  const heartOpacity = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(20);

  useEffect(() => {
    // Heart beat animation
    heartOpacity.value = withDelay(300, withTiming(1, { duration: 300 }));
    heartScale.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withSpring(1.2, { damping: 8, stiffness: 150 }),
          withSpring(1, { damping: 12, stiffness: 200 })
        ),
        3,
        false
      )
    );

    // Message appears
    messageOpacity.value = withDelay(2000, withTiming(1, { duration: 500 }));
    messageTranslateY.value = withDelay(2000, withSpring(0, { damping: 15, stiffness: 100 }));

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heartOpacity.value,
    transform: [{ scale: heartScale.value }],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color="#64748b" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Animated.View style={[styles.heartContainer, heartAnimatedStyle]}>
          <Heart size={100} color="#EF4444" fill="#EF4444" />
        </Animated.View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.subtitle}>
            We truly appreciate your{'\n'}business and support
          </Text>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              "Your trust means the world to us. We're committed to providing you with the best experience possible."
            </Text>
            <Text style={styles.signature}>— The Team</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heartContainer: {
    backgroundColor: '#FEF2F2',
    padding: 40,
    borderRadius: 100,
    marginBottom: 40,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  messageContainer: {
    backgroundColor: '#EF444415',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  messageText: {
    fontSize: 16,
    color: '#374151',
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  signature: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
    textAlign: 'right',
  },
});