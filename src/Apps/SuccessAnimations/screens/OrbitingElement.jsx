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
import { Gift, ArrowLeft, Sparkles } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SparkleEffect = ({ delay, position }: { delay: number; position: { x: number; y: number } }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(800, withTiming(0, { duration: 400 }))
      )
    );
    scale.value = withDelay(
      delay,
      withSequence(
        withSpring(1, { damping: 10, stiffness: 100 }),
        withDelay(800, withTiming(0, { duration: 400 }))
      )
    );
    rotation.value = withDelay(
      delay,
      withTiming(360, { duration: 1200 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.sparkle,
        { left: position.x, top: position.y },
        animatedStyle,
      ]}
    >
      <Sparkles size={16} color="#FFD700" />
    </Animated.View>
  );
};

export default function RewardUnlockedSuccess() {
  const giftScale = useSharedValue(0.5);
  const giftRotation = useSharedValue(-10);
  const lidTranslateY = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(30);

  useEffect(() => {
    // Gift box appears and opens
    giftScale.value = withDelay(
      300,
      withSpring(1, { damping: 12, stiffness: 150 })
    );
    giftRotation.value = withDelay(
      300,
      withSpring(0, { damping: 15, stiffness: 100 })
    );

    // Lid opens
    lidTranslateY.value = withDelay(1000, withSpring(-30, { damping: 15, stiffness: 100 }));

    // Message appears
    messageOpacity.value = withDelay(1500, withTiming(1, { duration: 500 }));
    messageTranslateY.value = withDelay(1500, withSpring(0, { damping: 15, stiffness: 100 }));

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const giftAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: giftScale.value },
      { rotate: `${giftRotation.value}deg` },
    ],
  }));

  const lidAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: lidTranslateY.value }],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  const sparklePositions = [
    { x: 80, y: 100 },
    { x: 250, y: 80 },
    { x: 120, y: 60 },
    { x: 280, y: 120 },
    { x: 200, y: 50 },
    { x: 160, y: 140 },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color="#64748b" />
      </TouchableOpacity>

      {/* Sparkles */}
      {sparklePositions.map((position, index) => (
        <SparkleEffect
          key={index}
          delay={1000 + index * 100}
          position={position}
        />
      ))}

      <View style={styles.content}>
        <View style={styles.giftContainer}>
          <Animated.View style={[styles.giftBox, giftAnimatedStyle]}>
            <Gift size={100} color="#8B5CF6" />
            <Animated.View style={[styles.lid, lidAnimatedStyle]} />
          </Animated.View>
        </View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Reward Unlocked!</Text>
          <Text style={styles.subtitle}>
            Congratulations! You've unlocked{'\n'}a special reward
          </Text>
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardTitle}>Free Premium Upgrade</Text>
            <Text style={styles.rewardDescription}>
              Enjoy 1 month of premium features at no cost
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
  giftContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  giftBox: {
    backgroundColor: '#F3E8FF',
    padding: 30,
    borderRadius: 30,
    position: 'relative',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  lid: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    height: 40,
    backgroundColor: '#A855F7',
    borderRadius: 25,
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
  rewardContainer: {
    backgroundColor: '#8B5CF615',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B5CF630',
  },
  rewardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#6B46C1',
    textAlign: 'center',
    lineHeight: 20,
  },
  sparkle: {
    position: 'absolute',
  },
});