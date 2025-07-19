import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';

function LiquidDrop({ delay, size, color }) {
  const scale = useSharedValue(0);
  const scaleY = useSharedValue(0);
  const borderRadius = useSharedValue(size / 2);

  const animatedStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    backgroundColor: color,
    transform: [
      { scale: scale.value },
      { scaleY: scaleY.value },
    ],
    borderRadius: borderRadius.value,
  }));

  useEffect(() => {
    const animate = () => {
      scale.value = 0;
      scaleY.value = 1;
      borderRadius.value = size / 2;

      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1, { duration: 400, easing: Easing.out(Easing.bounce) }),
          withRepeat(
            withSequence(
              withTiming(1.1, { duration: 300 }),
              withTiming(1, { duration: 300 })
            ),
            2,
            true
          )
        )
      );

      scaleY.value = withDelay(
        delay,
        withSequence(
          withTiming(0.8, { duration: 200 }),
          withTiming(1.2, { duration: 200 }),
          withTiming(1, { duration: 200 })
        )
      );

      borderRadius.value = withDelay(
        delay + 300,
        withSequence(
          withTiming(size * 0.3, { duration: 200 }),
          withTiming(size / 2, { duration: 400 })
        )
      );
    };

    animate();
  }, [delay, size]);

  return <Animated.View style={[styles.drop, animatedStyle]} />;
}

export default function LiquidScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const drops = [
    { delay: 0, size: 40, color: 'rgba(255, 255, 255, 0.4)' },
    { delay: 150, size: 60, color: 'rgba(255, 255, 255, 0.3)' },
    { delay: 300, size: 80, color: 'rgba(255, 255, 255, 0.2)' },
    { delay: 450, size: 100, color: 'rgba(255, 255, 255, 0.1)' },
  ];

  const startAnimation = () => {
    setIsPlaying(true);

    logoOpacity.value = 0;
    logoScale.value = 0;
    textOpacity.value = 0;

    logoOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 400 })
    );

    logoScale.value = withDelay(
      600,
      withSequence(
        withTiming(1.3, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 200, easing: Easing.bounce })
      )
    );

    textOpacity.value = withDelay(
      1000,
      withTiming(1, { duration: 600 })
    );

    setTimeout(() => setIsPlaying(false), 2000);
  };

  useEffect(() => {
    // No dynamic font loading, assume fonts are linked via assets
    setFontsLoaded(true);

    if (fontsLoaded) {
      const timer = setTimeout(startAnimation, 500);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GradientBackground colors={['#ff9a9e', '#fecfef']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            {drops.map((drop, index) => (
              <LiquidDrop
                key={index}
                delay={drop.delay}
                size={drop.size}
                color={drop.color}
              />
            ))}

            <Animated.View style={[styles.logo, animatedLogoStyle]}>
              <Text style={styles.logoText}>💧</Text>
            </Animated.View>
          </View>

          <Animated.View style={animatedTextStyle}>
            <Text style={styles.title}>LiquidFlow</Text>
            <Text style={styles.subtitle}>Liquid Animation</Text>
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
    position: 'absolute',
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
    zIndex: 10,
  },
  logoText: {
    fontSize: 48,
  },
  drop: {
    position: 'absolute',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});
