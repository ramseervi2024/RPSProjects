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

function MorphingShape({ delay, finalSize, color }) {
  const scale = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: finalSize,
    height: finalSize,
    backgroundColor: color,
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    borderRadius: borderRadius.value,
  }));

  useEffect(() => {
    const animate = () => {
      scale.value = 0;
      borderRadius.value = 0;
      rotation.value = 0;

      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1.2, { duration: 400, easing: Easing.out(Easing.cubic) }),
          withTiming(1, { duration: 200 })
        )
      );

      borderRadius.value = withDelay(
        delay + 200,
        withTiming(finalSize / 2, { duration: 600 })
      );

      rotation.value = withDelay(
        delay,
        withTiming(360, { duration: 800, easing: Easing.out(Easing.cubic) })
      );
    };

    animate();
  }, [delay, finalSize]);

  return <Animated.View style={[styles.shape, animatedStyle]} />;
}

export default function MorphingScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const shapes = [
    { delay: 0, finalSize: 60, color: 'rgba(255, 255, 255, 0.3)' },
    { delay: 200, finalSize: 80, color: 'rgba(255, 255, 255, 0.2)' },
    { delay: 400, finalSize: 100, color: 'rgba(255, 255, 255, 0.1)' },
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
    <GradientBackground colors={['#a8edea', '#fed6e3']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            {shapes.map((shape, index) => (
              <MorphingShape
                key={index}
                delay={shape.delay}
                finalSize={shape.finalSize}
                color={shape.color}
              />
            ))}

            <Animated.View style={[styles.logo, animatedLogoStyle]}>
              <Text style={styles.logoText}>🔮</Text>
            </Animated.View>
          </View>

          <Animated.View style={animatedTextStyle}>
            <Text style={styles.title}>MorphMagic</Text>
            <Text style={styles.subtitle}>Morphing Shapes</Text>
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
  shape: {
    position: 'absolute',
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
