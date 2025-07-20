import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { Ticket, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CouponAppliedSuccess() {
  const ticketTranslateX = useSharedValue(-300);
  const ticketRotation = useSharedValue(-45);
  const percentageScale = useSharedValue(0);
  const percentageOpacity = useSharedValue(0);
  const messageOpacity = useSharedValue(0);

  useEffect(() => {
    // Ticket flies in
    ticketTranslateX.value = withDelay(
      300,
      withSpring(0, { damping: 15, stiffness: 100 })
    );
    ticketRotation.value = withDelay(
      300,
      withSpring(0, { damping: 20, stiffness: 120 })
    );

    // Percentage bounces
    percentageOpacity.value = withDelay(1000, withTiming(1, { duration: 200 }));
    percentageScale.value = withDelay(
      1000,
      withSequence(
        withSpring(1.3, { damping: 8, stiffness: 150 }),
        withSpring(1, { damping: 15, stiffness: 200 })
      )
    );

    // Message appears
    messageOpacity.value = withDelay(1500, withTiming(1, { duration: 500 }));

    // Auto-close after 3.5 seconds
    const timer = setTimeout(() => {
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const ticketAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: ticketTranslateX.value },
      { rotate: `${ticketRotation.value}deg` },
    ],
  }));

  const percentageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: percentageOpacity.value,
    transform: [{ scale: percentageScale.value }],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
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
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.ticketContainer, ticketAnimatedStyle]}>
            <Ticket size={80} color="#F97316" />
          </Animated.View>

          <Animated.View style={[styles.percentageContainer, percentageAnimatedStyle]}>
            <Text style={styles.percentageText}>15%</Text>
            <Text style={styles.offText}>OFF</Text>
          </Animated.View>
        </View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Coupon Applied!</Text>
          <Text style={styles.subtitle}>
            Great news! You saved $12.50{'\n'}on your order
          </Text>
          <View style={styles.savingsContainer}>
            <Text style={styles.savingsLabel}>Total Savings</Text>
            <Text style={styles.savingsAmount}>$12.50</Text>
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
  animationContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  ticketContainer: {
    position: 'absolute',
    backgroundColor: '#FEF3E2',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  percentageContainer: {
    position: 'absolute',
    backgroundColor: '#F97316',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    top: -20,
    right: 20,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 24,
  },
  offText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 2,
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
  savingsContainer: {
    backgroundColor: '#F9731615',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: 14,
    color: '#F97316',
    fontWeight: '500',
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F97316',
  },
});