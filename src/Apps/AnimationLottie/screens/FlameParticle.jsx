import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';



function FlameParticle({ delay, startX, intensity }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(startX);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const flickerX = interpolate(
      translateY.value,
      [0, -100],
      [0, (Math.random() - 0.5) * 20]
    );

    return {
      transform: [
        { translateX: translateX.value + flickerX },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
      backgroundColor: intensity > 0.7 ? '#ff6b35' : intensity > 0.4 ? '#f7931e' : '#ffd23f',
    };
  });

  useEffect(() => {
    const animate = () => {
      translateY.value = 0;
      translateX.value = startX;
      opacity.value = 0;
      scale.value = 0;

      opacity.value = withDelay(
        delay,
        withSequence(
          withTiming(intensity, { duration: 200 }),
          withRepeat(
            withSequence(
              withTiming(intensity * 0.7, { duration: 300 }),
              withTiming(intensity, { duration: 300 })
            ),
            -1,
            true
          )
        )
      );

      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1, { duration: 200 }),
          withRepeat(
            withSequence(
              withTiming(0.8, { duration: 300 }),
              withTiming(1, { duration: 300 })
            ),
            -1,
            true
          )
        )
      );

      translateY.value = withDelay(
        delay,
        withRepeat(
          withTiming(-100, {
            duration: 1000,
            easing: Easing.out(Easing.cubic),
          }),
          -1,
          false
        )
      );
    };

    animate();
  }, [delay, startX, intensity]);

  return <Animated.View style={[styles.flame, animatedStyle]} />;
}

export default function FireScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const glowIntensity = useSharedValue(0);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
    shadowOpacity: glowIntensity.value * 0.8,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const flameParticles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 100,
    startX: (Math.random() - 0.5) * 60,
    intensity: 0.3 + Math.random() * 0.7,
  }));

  const startAnimation = () => {
    setIsPlaying(true);

    logoScale.value = 0;
    logoOpacity.value = 0;
    textOpacity.value = 0;
    glowIntensity.value = 0;

    logoOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    logoScale.value = withDelay(
      800,
      withSequence(
        withTiming(1.2, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 200 })
      )
    );

    glowIntensity.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.6, { duration: 500 })
        ),
        -1,
        true
      )
    );

    textOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));

    setTimeout(() => setIsPlaying(false), 2500);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground colors={['#1a1a2e', '#16213e', '#0f3460']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.fireContainer}>
            {flameParticles.map((particle, index) => (
              <FlameParticle
                key={index}
                delay={particle.delay}
                startX={particle.startX}
                intensity={particle.intensity}
              />
            ))}

            <Animated.View style={[styles.logo, animatedLogoStyle]}>
              <Text style={styles.logoText}>🔥</Text>
            </Animated.View>
          </View>

          <Animated.View style={animatedTextStyle}>
            <Text style={styles.title}>FireForge</Text>
            <Text style={styles.subtitle}>Flame Animation</Text>
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
  fireContainer: {
    width: 200,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    position: 'absolute',
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 53, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 20,
  },
  logoText: {
    fontSize: 32,
  },
  flame: {
    position: 'absolute',
    bottom: 0,
    width: 8,
    height: 20,
    borderRadius: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(255, 107, 53, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});
