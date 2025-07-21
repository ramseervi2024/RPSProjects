import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withDelay,
  withSequence,
  interpolate,
  Easing,
  runOnJS
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FireworkParticle = ({ 
  startX, 
  startY, 
  angle, 
  distance, 
  color, 
  delay 
}: { 
  startX: number; 
  startY: number; 
  angle: number; 
  distance: number; 
  color: string;
  delay: number;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: startX + translateX.value },
      { translateY: startY + translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const startAnimation = () => {
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    // Initial burst
    opacity.value = withTiming(1, { duration: 100 });
    scale.value = withSequence(
      withTiming(1.5, { duration: 200, easing: Easing.out(Easing.back(1.7)) }),
      withTiming(1, { duration: 300 })
    );

    // Particle movement
    translateX.value = withTiming(endX, { duration: 1000, easing: Easing.out(Easing.quad) });
    translateY.value = withTiming(endY + 100, { duration: 1000, easing: Easing.out(Easing.quad) });

    // Fade out
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 });
      scale.value = withTiming(0, { duration: 500 });
    }, 800);

    // Reset
    setTimeout(() => {
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 0;
      opacity.value = 0;
    }, 1500);
  };

  React.useEffect(() => {
    setTimeout(startAnimation, delay);
  }, [delay]);

  return (
    <Animated.View style={[styles.particle, { backgroundColor: color }, animatedStyle]} />
  );
};

const Firework = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
  const particles = [];

  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * (Math.PI / 180);
    const distance = 80 + Math.random() * 40;
    particles.push(
      <FireworkParticle
        key={i}
        startX={x}
        startY={y}
        angle={angle}
        distance={distance}
        color={colors[i % colors.length]}
        delay={delay}
      />
    );
  }

  return <>{particles}</>;
};

export default function FireworksScreen() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [fireworksKey, setFireworksKey] = useState(0);

  const triggerFireworks = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setFireworksKey(prev => prev + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 4000);
  };

  const generateFireworks = () => {
    const fireworks = [];
    const positions = [
      { x: screenWidth * 0.3, y: screenHeight * 0.3 },
      { x: screenWidth * 0.7, y: screenHeight * 0.2 },
      { x: screenWidth * 0.2, y: screenHeight * 0.5 },
      { x: screenWidth * 0.8, y: screenHeight * 0.4 },
      { x: screenWidth * 0.5, y: screenHeight * 0.25 },
    ];

    positions.forEach((pos, index) => {
      fireworks.push(
        <Firework
          key={`${fireworksKey}-${index}`}
          x={pos.x}
          y={pos.y}
          delay={index * 300}
        />
      );
    });

    return fireworks;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fireworks Show</Text>
      <Text style={styles.subtitle}>Launch a spectacular fireworks display!</Text>
      
      <View style={styles.fireworksContainer}>
        {isAnimating && generateFireworks()}
      </View>

      <View style={styles.contentContainer}>
        <Pressable 
          style={[styles.launchButton, isAnimating && styles.buttonDisabled]} 
          onPress={triggerFireworks}
          disabled={isAnimating}
        >
          <Text style={styles.buttonText}>
            {isAnimating ? '🎆 Launching!' : '🚀 Launch Fireworks'}
          </Text>
        </Pressable>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Status: {isAnimating ? 'Fireworks in progress...' : 'Ready to launch'}
          </Text>
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
  fireworksContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  launchButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
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
  infoContainer: {
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  infoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});