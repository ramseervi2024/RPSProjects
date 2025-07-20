import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Check, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ConfettiPiece = ({ delay, color }: { delay: number; color: string }) => {
  const translateY = useSharedValue(-100);
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(600, { duration: 2000 })
    );
    translateX.value = withDelay(
      delay,
      withTiming(Math.random() * 200 - 100, { duration: 2000 })
    );
    rotation.value = withDelay(
      delay,
      withTiming(Math.random() * 360, { duration: 2000 })
    );
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: 100 }),
        withDelay(1500, withTiming(0, { duration: 500 }))
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.confetti,
        { backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
};

export default function OrderPlacedSuccess() {
  const checkScale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);

  useEffect(() => {
    // Checkmark animation
    checkOpacity.value = withDelay(300, withTiming(1, { duration: 300 }));
    checkScale.value = withDelay(
      300,
      withSequence(
        withSpring(1.2, { damping: 10, stiffness: 100 }),
        withSpring(1, { damping: 15, stiffness: 150 })
      )
    );

    // Title animation
    titleOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
    titleTranslateY.value = withDelay(800, withSpring(0, { damping: 15, stiffness: 100 }));

    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color="#64748b" />
      </TouchableOpacity>

      {/* Confetti */}
      {Array.from({ length: 20 }).map((_, index) => (
        <ConfettiPiece
          key={index}
          delay={index * 50}
          color={confettiColors[index % confettiColors.length]}
        />
      ))}

      <View style={styles.content}>
        <Animated.View style={[styles.checkContainer, checkAnimatedStyle]}>
          <Check size={60} color="#ffffff" strokeWidth={3} />
        </Animated.View>

        <Animated.View style={titleAnimatedStyle}>
          <Text style={styles.title}>Order Placed!</Text>
          <Text style={styles.subtitle}>
            Your order has been successfully placed{'\n'}and is being processed
          </Text>
          <Text style={styles.orderNumber}>Order #12345</Text>
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
  checkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
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
    marginBottom: 24,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    textAlign: 'center',
    backgroundColor: '#10B98115',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    top: -100,
    left: '50%',
  },
});