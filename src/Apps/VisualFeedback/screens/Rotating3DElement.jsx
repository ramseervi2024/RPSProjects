import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withSequence,
  withDelay,
  withSpring,
  interpolate,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { Coins, Plus, Star, Zap } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FallingCoin = ({ 
  startX, 
  delay, 
  onComplete 
}: { 
  startX: number; 
  delay: number; 
  onComplete: () => void;
}) => {
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(startX);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    const startAnimation = () => {
      // Initial appearance
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });

      // Rotation
      rotate.value = withTiming(720, { 
        duration: 1500, 
        easing: Easing.out(Easing.quad) 
      });

      // Fall down
      translateY.value = withTiming(screenHeight + 100, { 
        duration: 1500, 
        easing: Easing.out(Easing.quad) 
      }, (finished) => {
        if (finished) {
          runOnJS(onComplete)();
        }
      });

      // Slight horizontal drift
      translateX.value = withTiming(startX + (Math.random() - 0.5) * 50, {
        duration: 1500,
        easing: Easing.out(Easing.quad)
      });
    };

    setTimeout(startAnimation, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.coin, animatedStyle]}>
      <Coins size={24} color="#F59E0B" />
    </Animated.View>
  );
};

const PointsCounter = ({ 
  points, 
  animated = false 
}: { 
  points: number; 
  animated?: boolean;
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (animated) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 200, easing: Easing.out(Easing.back(1.7)) }),
        withTiming(1, { duration: 300 })
      );
    }
  }, [points, animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.pointsDisplay, animatedStyle]}>
      <Coins size={20} color="#F59E0B" />
      <Text style={styles.pointsText}>{points.toLocaleString()}</Text>
    </Animated.View>
  );
};

const FloatingText = ({ 
  text, 
  startY, 
  onComplete 
}: { 
  text: string; 
  startY: number; 
  onComplete: () => void;
}) => {
  const translateY = useSharedValue(startY);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    
    translateY.value = withTiming(startY - 80, { 
      duration: 1000, 
      easing: Easing.out(Easing.quad) 
    });
    
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(onComplete)();
        }
      });
    }, 700);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.floatingText, animatedStyle]}>
      <Text style={styles.floatingTextContent}>{text}</Text>
    </Animated.View>
  );
};

export default function CoinScreen() {
  const [points, setPoints] = useState(1250);
  const [coinKey, setCoinKey] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const addPoints = (amount: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPoints(prev => prev + amount);
    setCoinKey(prev => prev + 1);

    // Add floating text
    const newText = {
      id: Date.now(),
      text: `+${amount}`,
      y: screenHeight * 0.4
    };
    setFloatingTexts(prev => [...prev, newText]);

    setTimeout(() => setIsAnimating(false), 2000);
  };

  const removeFloatingText = (id: number) => {
    setFloatingTexts(prev => prev.filter(text => text.id !== id));
  };

  const removeCoin = () => {
    // This gets called when coin animation completes
  };

  const generateCoins = (count: number) => {
    const coins = [];
    for (let i = 0; i < count; i++) {
      const startX = screenWidth * 0.3 + Math.random() * (screenWidth * 0.4);
      coins.push(
        <FallingCoin
          key={`${coinKey}-${i}`}
          startX={startX}
          delay={i * 100}
          onComplete={removeCoin}
        />
      );
    }
    return coins;
  };

  const bonusActions = [
    { label: 'Daily Bonus', amount: 100, icon: Star, color: '#F59E0B' },
    { label: 'Achievement', amount: 250, icon: Zap, color: '#8B5CF6' },
    { label: 'Combo Bonus', amount: 500, icon: Plus, color: '#10B981' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Coins size={24} color="#F59E0B" />
        <Text style={styles.title}>Coin Drop & Points</Text>
      </View>

      <View style={styles.coinsContainer}>
        {isAnimating && generateCoins(8)}
      </View>

      <View style={styles.floatingContainer}>
        {floatingTexts.map(text => (
          <FloatingText
            key={text.id}
            text={text.text}
            startY={text.y}
            onComplete={() => removeFloatingText(text.id)}
          />
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Balance</Text>
          <PointsCounter points={points} animated={isAnimating} />
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Earn Points</Text>
          <View style={styles.actionGrid}>
            {bonusActions.map((action, index) => (
              <Pressable
                key={index}
                style={[styles.actionButton, { borderColor: action.color }]}
                onPress={() => addPoints(action.amount)}
                disabled={isAnimating}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Text style={styles.actionAmount}>+{action.amount}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Pressable 
              style={[styles.quickButton, isAnimating && styles.buttonDisabled]}
              onPress={() => addPoints(50)}
              disabled={isAnimating}
            >
              <Plus size={16} color="#ffffff" />
              <Text style={styles.quickButtonText}>+50</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.quickButton, isAnimating && styles.buttonDisabled]}
              onPress={() => addPoints(200)}
              disabled={isAnimating}
            >
              <Plus size={16} color="#ffffff" />
              <Text style={styles.quickButtonText}>+200</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.quickButton, isAnimating && styles.buttonDisabled]}
              onPress={() => addPoints(1000)}
              disabled={isAnimating}
            >
              <Plus size={16} color="#ffffff" />
              <Text style={styles.quickButtonText}>+1000</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  coinsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  coin: {
    position: 'absolute',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    alignItems: 'center',
  },
  floatingText: {
    position: 'absolute',
  },
  floatingTextContent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    textShadowColor: 'rgba(16, 185, 129, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionGrid: {
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  actionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    gap: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  quickButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});