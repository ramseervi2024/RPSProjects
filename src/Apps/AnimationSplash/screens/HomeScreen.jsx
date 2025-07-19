import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';

export default function FadeScaleScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);

  // Animations
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const animatedSubtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const startAnimation = () => {
    setIsPlaying(true);

    logoScale.value = 0;
    logoOpacity.value = 0;
    textOpacity.value = 0;
    subtitleOpacity.value = 0;

    logoScale.value = withSequence(
      withTiming(1.2, { duration: 600, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 200, easing: Easing.inOut(Easing.cubic) })
    );
    logoOpacity.value = withTiming(1, { duration: 600 });

    textOpacity.value = withDelay(
      400,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) })
    );

    subtitleOpacity.value = withDelay(
      800,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })
    );

    setTimeout(() => setIsPlaying(false), 2000);
  };

  useEffect(() => {
    // Option A: If fonts are manually linked via assets, skip loading
    setFontsLoaded(true);

    // Option B: If using `react-native-font-loader`
    // Font.loadFont('Inter-Bold', require('../assets/fonts/Inter-Bold.ttf'));
    // Font.loadFont('Inter-Regular', require('../assets/fonts/Inter-Regular.ttf'));
    // setFontsLoaded(true);

    const timer = setTimeout(() => {
      if (fontsLoaded) {
        startAnimation();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GradientBackground colors={['#667eea', '#764ba2']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>✨</Text>
            </View>
          </Animated.View>

          <Animated.Text style={[styles.title, animatedTextStyle]}>
            SplashMaster
          </Animated.Text>

          <Animated.Text style={[styles.subtitle, animatedSubtitleStyle]}>
            Fade & Scale Animation
          </Animated.Text>
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
