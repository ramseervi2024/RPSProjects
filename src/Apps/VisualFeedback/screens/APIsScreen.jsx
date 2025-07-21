import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withDelay,
  withRepeat,
  withSequence,
  interpolate,
  Easing,
  runOnJS
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ConfettiPiece = ({ delay, color }) => {
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` }
    ],
    opacity: opacity.value,
  }));

  const startAnimation = () => {
    const randomX = (Math.random() - 0.5) * screenWidth * 0.8;
    const finalY = screenHeight + 100;

    opacity.value = withTiming(1, { duration: 100 });
    
    translateY.value = withTiming(finalY, { 
      duration: 3000 + Math.random() * 1000,
      easing: Easing.out(Easing.quad)
    });
    
    translateX.value = withTiming(randomX, {
      duration: 3000 + Math.random() * 1000,
      easing: Easing.out(Easing.quad)
    });
    
    rotate.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );

    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 });
      translateY.value = -50;
      translateX.value = 0;
      rotate.value = 0;
    }, 4000);
  };

  React.useEffect(() => {
    setTimeout(startAnimation, delay);
  }, [delay]);

  return (
    <Animated.View style={[styles.confettiPiece, { backgroundColor: color }, animatedStyle]} />
  );
};

export default function ConfettiScreen() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];

  const triggerConfetti = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setConfettiKey(prev => prev + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 5000);
  };

  const generateConfetti = () => {
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push(
        <ConfettiPiece
          key={`${confettiKey}-${i}`}
          delay={i * 30}
          color={colors[i % colors.length]}
        />
      );
    }
    return pieces;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confetti Burst</Text>
      <Text style={styles.subtitle}>Tap to celebrate with confetti!</Text>
      
      <View style={styles.confettiContainer}>
        {isAnimating && generateConfetti()}
      </View>

      <View style={styles.contentContainer}>
        <Pressable 
          style={[styles.celebrateButton, isAnimating && styles.buttonDisabled]} 
          onPress={triggerConfetti}
          disabled={isAnimating}
        >
          <Text style={styles.buttonText}>
            {isAnimating ? '🎉 Celebrating!' : '🎊 Celebrate!'}
          </Text>
        </Pressable>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Status: {isAnimating ? 'Party Mode!' : 'Ready to celebrate'}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 80,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 40,
    textAlign: 'center',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    alignItems: 'center',
  },
  confettiPiece: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  celebrateButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  statsText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});