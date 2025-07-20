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
import { Trophy, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MilestoneAchievedSuccess() {
  const trophyTranslateY = useSharedValue(-100);
  const trophyScale = useSharedValue(0.5);
  const progressWidth = useSharedValue(0);
  const messageOpacity = useSharedValue(0);

  useEffect(() => {
    // Trophy falls and bounces
    trophyTranslateY.value = withDelay(
      300,
      withSpring(0, { damping: 10, stiffness: 100 })
    );
    trophyScale.value = withDelay(
      300,
      withSpring(1, { damping: 12, stiffness: 150 })
    );

    // Progress bar fills
    progressWidth.value = withDelay(1200, withTiming(100, { duration: 1500 }));

    // Message appears
    messageOpacity.value = withDelay(2200, withTiming(1, { duration: 500 }));

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const trophyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: trophyTranslateY.value },
      { scale: trophyScale.value },
    ],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
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
        <Animated.View style={[styles.trophyContainer, trophyAnimatedStyle]}>
          <Trophy size={100} color="#F59E0B" />
        </Animated.View>

        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>10 Orders Milestone</Text>
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBar, progressAnimatedStyle]} />
          </View>
          <Text style={styles.progressText}>10 / 10 Orders Complete!</Text>
        </View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Milestone Achieved!</Text>
          <Text style={styles.subtitle}>
            Amazing! You've completed{'\n'}your first 10 orders with us
          </Text>
          <View style={styles.achievementContainer}>
            <Text style={styles.achievementTitle}>Achievement Unlocked</Text>
            <View style={styles.rewardsList}>
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>🏆</Text>
                <Text style={styles.rewardText}>Loyal Customer Badge</Text>
              </View>
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>🎁</Text>
                <Text style={styles.rewardText}>Special Discount Code</Text>
              </View>
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>⭐</Text>
                <Text style={styles.rewardText}>VIP Priority Support</Text>
              </View>
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
  trophyContainer: {
    backgroundColor: '#FEF3C7',
    padding: 40,
    borderRadius: 80,
    marginBottom: 32,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  progressSection: {
    width: '100%',
    marginBottom: 32,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    textAlign: 'center',
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
  achievementContainer: {
    backgroundColor: '#F59E0B15',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F59E0B30',
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 16,
  },
  rewardsList: {
    gap: 12,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  rewardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    flex: 1,
  },
});