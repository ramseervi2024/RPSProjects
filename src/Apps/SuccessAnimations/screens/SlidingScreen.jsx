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
import { Award, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DiscountUnlockedSuccess() {
  const badgeScale = useSharedValue(0);
  const badgeRotation = useSharedValue(180);
  const badgeOpacity = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const messageOpacity = useSharedValue(0);

  useEffect(() => {
    // Badge zooms in with rotation
    badgeOpacity.value = withDelay(300, withTiming(1, { duration: 200 }));
    badgeScale.value = withDelay(
      300,
      withSequence(
        withSpring(1.2, { damping: 8, stiffness: 150 }),
        withSpring(1, { damping: 12, stiffness: 200 })
      )
    );
    badgeRotation.value = withDelay(
      300,
      withSpring(0, { damping: 15, stiffness: 100 })
    );

    // Glow effect
    glowOpacity.value = withDelay(
      800,
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.3, { duration: 600 }),
        withTiming(1, { duration: 400 }),
        withTiming(0.3, { duration: 600 })
      )
    );

    // Message appears
    messageOpacity.value = withDelay(1500, withTiming(1, { duration: 500 }));

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [
      { scale: badgeScale.value },
      { rotate: `${badgeRotation.value}deg` },
    ],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
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
        <View style={styles.badgeContainer}>
          <Animated.View style={[styles.glow, glowAnimatedStyle]} />
          
          <Animated.View style={[styles.badge, badgeAnimatedStyle]}>
            <Text style={styles.discountText}>20%</Text>
            <Text style={styles.offText}>OFF</Text>
            <Award
              size={24}
              color="#F59E0B"
              style={styles.badgeIcon}
            />
          </Animated.View>
        </View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Discount Unlocked!</Text>
          <Text style={styles.subtitle}>
            Amazing! You've earned a{'\n'}20% discount on your next order
          </Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Discount Code:</Text>
              <Text style={styles.detailValue}>SAVE20NOW</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Valid Until:</Text>
              <Text style={styles.detailValue}>Dec 31, 2024</Text>
            </View>
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
  badgeContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F59E0B',
    opacity: 0.2,
  },
  badge: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  discountText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 36,
  },
  offText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 4,
  },
  badgeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
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
  detailsContainer: {
    backgroundColor: '#F59E0B15',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F59E0B30',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: 'bold',
  },
});