import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Coins, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CoinAnimation = ({ delay }: { delay: number }) => {
  const translateY = useSharedValue(-100);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 15, stiffness: 100 })
    );
    translateX.value = withDelay(
      delay,
      withTiming(Math.random() * 40 - 20, { duration: 800 })
    );
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    rotation.value = withDelay(
      delay,
      withTiming(Math.random() * 180, { duration: 800 })
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
    <Animated.View style={[styles.coin, animatedStyle]}>
      <Text style={styles.coinEmoji}>🪙</Text>
    </Animated.View>
  );
};

const CounterDigit = ({ value, delay }: { value: number; delay: number }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 10, stiffness: 150 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.counterDigit}>{value}</Text>
    </Animated.View>
  );
};

export default function PointsAddedSuccess() {
  const iconScale = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(30);

  useEffect(() => {
    // Icon appears
    iconScale.value = withDelay(
      300,
      withSpring(1, { damping: 12, stiffness: 150 })
    );

    // Message appears
    messageOpacity.value = withDelay(2000, withTiming(1, { duration: 500 }));
    messageTranslateY.value = withDelay(2000, withSpring(0, { damping: 15, stiffness: 100 }));

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  const pointsDigits = [2, 5, 0];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color="#64748b" />
      </TouchableOpacity>

      {/* Falling coins */}
      {Array.from({ length: 8 }).map((_, index) => (
        <CoinAnimation key={index} delay={800 + index * 100} />
      ))}

      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <Coins size={80} color="#F59E0B" />
        </Animated.View>

        <View style={styles.counterContainer}>
          <Text style={styles.plusSign}>+</Text>
          {pointsDigits.map((digit, index) => (
            <CounterDigit
              key={index}
              value={digit}
              delay={1200 + index * 200}
            />
          ))}
          <Text style={styles.pointsText}>Points</Text>
        </View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Points Added!</Text>
          <Text style={styles.subtitle}>
            Great job! You've earned{'\n'}250 loyalty points
          </Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>New Balance</Text>
            <Text style={styles.balanceAmount}>1,750 Points</Text>
            <Text style={styles.balanceNote}>
              You're 250 points away from your next reward!
            </Text>
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
  iconContainer: {
    backgroundColor: '#FEF3C7',
    padding: 30,
    borderRadius: 50,
    marginBottom: 32,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  plusSign: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginRight: 8,
  },
  counterDigit: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginHorizontal: 2,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 12,
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
  balanceContainer: {
    backgroundColor: '#F59E0B15',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F59E0B30',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 12,
  },
  balanceNote: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 20,
  },
  coin: {
    position: 'absolute',
    top: 150,
    left: '50%',
  },
  coinEmoji: {
    fontSize: 24,
  },
});