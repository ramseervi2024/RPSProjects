import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';

const { width, height } = Dimensions.get('window');

export default function Rotating3DElement() {
  const [isPlaying, setIsPlaying] = useState(false);
  const logoX = useSharedValue(-width);
  const logoY = useSharedValue(-height);
  const logoOpacity = useSharedValue(0);
  const textX = useSharedValue(width);
  const textOpacity = useSharedValue(0);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: logoX.value },
      { translateY: logoY.value },
    ],
    opacity: logoOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: textX.value }],
    opacity: textOpacity.value,
  }));

  const startAnimation = () => {
    setIsPlaying(true);

    // Reset values
    logoX.value = -width;
    logoY.value = -height;
    logoOpacity.value = 0;
    textX.value = width;
    textOpacity.value = 0;

    // Animate logo
    logoOpacity.value = withTiming(1, { duration: 100 });
    logoX.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
    logoY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    // Animate text
    textOpacity.value = withDelay(400, withTiming(1, { duration: 100 }));
    textX.value = withDelay(
      400,
      withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      })
    );

    setTimeout(() => setIsPlaying(false), 1500);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground colors={['#f093fb', '#f5576c']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🚀</Text>
            </View>
          </Animated.View>

          <Animated.View style={[styles.textContainer, animatedTextStyle]}>
            <Text style={styles.title}>SlideMotion</Text>
            <Text style={styles.subtitle}>Sliding Animation</Text>
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
  textContainer: {
    alignItems: 'center',
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
