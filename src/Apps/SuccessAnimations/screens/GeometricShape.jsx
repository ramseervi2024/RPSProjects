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
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FireworkEmoji = ({ delay, position }: { delay: number; position: { x: number; y: number } }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 10, stiffness: 100 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    rotation.value = withDelay(delay, withTiming(360, { duration: 1000 }));
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
        styles.firework,
        { left: position.x, top: position.y },
        animatedStyle,
      ]}
    >
      <Text style={styles.fireworkEmoji}>🎉</Text>
    </Animated.View>
  );
};

export default function WelcomeBonusSuccess() {
  const contentTranslateY = useSharedValue(300);
  const contentOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);

  useEffect(() => {
    // Content slides up
    contentOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));
    contentTranslateY.value = withDelay(
      200,
      withSpring(0, { damping: 15, stiffness: 100 })
    );

    // Title bounces
    titleScale.value = withDelay(
      600,
      withSpring(1, { damping: 10, stiffness: 150 })
    );

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const fireworkPositions = [
    { x: 50, y: 120 },
    { x: 300, y: 100 },
    { x: 150, y: 80 },
    { x: 250, y: 140 },
    { x: 100, y: 160 },
    { x: 320, y: 180 },
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

      {/* Firework emojis */}
      {fireworkPositions.map((position, index) => (
        <FireworkEmoji
          key={index}
          delay={800 + index * 150}
          position={position}
        />
      ))}

      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <View style={styles.emojiContainer}>
          <Text style={styles.welcomeEmoji}>🎊</Text>
        </View>

        <Animated.View style={titleAnimatedStyle}>
          <Text style={styles.title}>Welcome Bonus!</Text>
        </Animated.View>

        <Text style={styles.subtitle}>
          Welcome to our amazing app!{'\n'}Here's a special bonus just for you
        </Text>

        <View style={styles.bonusContainer}>
          <Text style={styles.bonusTitle}>Your Welcome Bonus</Text>
          <View style={styles.bonusDetails}>
            <View style={styles.bonusItem}>
              <Text style={styles.bonusEmoji}>💰</Text>
              <Text style={styles.bonusText}>$10 Credit</Text>
            </View>
            <View style={styles.bonusItem}>
              <Text style={styles.bonusEmoji}>🚚</Text>
              <Text style={styles.bonusText}>Free Shipping</Text>
            </View>
            <View style={styles.bonusItem}>
              <Text style={styles.bonusEmoji}>⭐</Text>
              <Text style={styles.bonusText}>VIP Status</Text>
            </View>
          </View>
        </View>
      </Animated.View>
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
  emojiContainer: {
    marginBottom: 24,
  },
  welcomeEmoji: {
    fontSize: 80,
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
  bonusContainer: {
    backgroundColor: '#EC489915',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#EC489930',
  },
  bonusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EC4899',
    textAlign: 'center',
    marginBottom: 20,
  },
  bonusDetails: {
    gap: 16,
  },
  bonusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bonusEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  bonusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  firework: {
    position: 'absolute',
  },
  fireworkEmoji: {
    fontSize: 32,
  },
});