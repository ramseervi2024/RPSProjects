import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';



function OrbitingElement({ delay, radius, duration, size, color }) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const angle = (rotation.value * Math.PI) / 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return {
      transform: [
        { translateX: x },
        { translateY: y },
        { scale: scale.value },
      ],
      opacity: opacity.value,
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 2,
    };
  });

  useEffect(() => {
    const animate = () => {
      rotation.value = 0;
      scale.value = 0;
      opacity.value = 0;

      opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
      scale.value = withDelay(delay, withTiming(1, { duration: 300 }));

      rotation.value = withDelay(
        delay,
        withRepeat(
          withTiming(360, {
            duration,
            easing: Easing.linear,
          }),
          -1,
          false
        )
      );
    };

    animate();
  }, [delay, duration, radius]);

  return <Animated.View style={[styles.orbitingElement, animatedStyle]} />;
}

export default function OrbitalScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const orbitingElements = [
    { delay: 0, radius: 80, duration: 3000, size: 12, color: 'rgba(255, 255, 255, 0.8)' },
    { delay: 200, radius: 100, duration: 4000, size: 8, color: 'rgba(255, 255, 255, 0.6)' },
    { delay: 400, radius: 120, duration: 5000, size: 10, color: 'rgba(255, 255, 255, 0.7)' },
    { delay: 600, radius: 140, duration: 6000, size: 6, color: 'rgba(255, 255, 255, 0.5)' },
  ];

  const startAnimation = () => {
    setIsPlaying(true);

    logoScale.value = 0;
    logoOpacity.value = 0;
    textOpacity.value = 0;

    logoOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    logoScale.value = withDelay(
      800,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
      })
    );

    textOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));

    setTimeout(() => setIsPlaying(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground colors={['#2c3e50', '#3498db']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.orbitContainer}>
            {orbitingElements.map((element, index) => (
              <OrbitingElement
                key={index}
                delay={element.delay}
                radius={element.radius}
                duration={element.duration}
                size={element.size}
                color={element.color}
              />
            ))}

            <Animated.View style={[styles.logo, animatedLogoStyle]}>
              <Text style={styles.logoText}>🌍</Text>
            </Animated.View>
          </View>

          <Animated.View style={animatedTextStyle}>
            <Text style={styles.title}>OrbitalMotion</Text>
            <Text style={styles.subtitle}>Planetary Animation</Text>
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
  orbitContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 32,
  },
  orbitingElement: {
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
