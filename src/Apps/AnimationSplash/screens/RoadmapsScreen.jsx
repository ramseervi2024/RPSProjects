import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';


function Particle({ delay, startX, startY, endX, endY }) {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  useEffect(() => {
    const animate = () => {
      translateX.value = startX;
      translateY.value = startY;
      opacity.value = 0;
      scale.value = 0;

      opacity.value = withDelay(delay, withTiming(1, { duration: 200 }));
      scale.value = withDelay(delay, withTiming(1, { duration: 200 }));
      translateX.value = withDelay(
        delay,
        withTiming(endX, { duration: 800, easing: Easing.out(Easing.cubic) })
      );
      translateY.value = withDelay(
        delay,
        withTiming(endY, { duration: 800, easing: Easing.out(Easing.cubic) })
      );
    };

    animate();
  }, [delay, startX, startY, endX, endY]);

  return <Animated.View style={[styles.particle, animatedStyle]} />;
}

export default function ParticlesScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const particles = [
    { delay: 0, startX: -150, startY: -100, endX: -40, endY: -20 },
    { delay: 100, startX: 150, startY: -120, endX: 40, endY: -20 },
    { delay: 200, startX: -120, startY: 80, endX: -40, endY: 20 },
    { delay: 300, startX: 140, startY: 90, endX: 40, endY: 20 },
    { delay: 400, startX: 0, startY: -150, endX: 0, endY: -40 },
    { delay: 500, startX: 0, startY: 150, endX: 0, endY: 40 },
  ];

  const startAnimation = () => {
    setIsPlaying(true);

    logoOpacity.value = 0;
    textOpacity.value = 0;

    logoOpacity.value = withDelay(
      800,
      withTiming(1, { duration: 400 })
    );

    textOpacity.value = withDelay(
      1200,
      withTiming(1, { duration: 600 })
    );

    setTimeout(() => setIsPlaying(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground colors={['#4facfe', '#00f2fe']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            {particles.map((particle, index) => (
              <Particle
                key={index}
                delay={particle.delay}
                startX={particle.startX}
                startY={particle.startY}
                endX={particle.endX}
                endY={particle.endY}
              />
            ))}

            <Animated.View style={[styles.logo, animatedLogoStyle]}>
              <Text style={styles.logoText}>⚡</Text>
            </Animated.View>
          </View>

          <Animated.View style={animatedTextStyle}>
            <Text style={styles.title}>ParticleBurst</Text>
            <Text style={styles.subtitle}>Particle Animation</Text>
          </Animated.View>
        </View>

        <AnimationControls onReplay={startAnimation} isPlaying={isPlaying} />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    position: 'relative',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  logoText: {
    fontSize: 48,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});
