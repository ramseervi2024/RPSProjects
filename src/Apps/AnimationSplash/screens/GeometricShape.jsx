import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';

// Replace with your own GradientBackground component or use react-native-linear-gradient
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';



function GeometricShape({ delay, size, color, shape, position }) {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius =
      shape === 'circle' ? size / 2 :
      shape === 'hexagon' ? size * 0.1 :
      shape === 'square' ? size * 0.1 : 0;

    return {
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    const animate = () => {
      scale.value = 0;
      rotation.value = 0;
      opacity.value = 0;
      translateX.value = position.x;
      translateY.value = position.y;

      opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));

      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1.2, { duration: 400, easing: Easing.out(Easing.cubic) }),
          withTiming(1, { duration: 200 })
        )
      );

      rotation.value = withDelay(
        delay,
        withTiming(360, { duration: 1000, easing: Easing.out(Easing.cubic) })
      );

      translateX.value = withDelay(
        delay + 500,
        withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) })
      );

      translateY.value = withDelay(
        delay + 500,
        withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) })
      );
    };

    animate();
  }, [delay, position]);

  return <Animated.View style={[styles.shape, animatedStyle]} />;
}

export default function GeometricScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  // Since useFonts is not available outside Expo, manually load fonts in react-native-cli:
  // 1. Place font files (Inter-Regular.ttf and Inter-Bold.ttf) in assets/fonts
  // 2. Link fonts in react-native.config.js
  // 3. Use fontFamily as 'Inter-Regular' and 'Inter-Bold' directly

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const shapes = [
    { delay: 0, size: 30, color: 'rgba(255, 255, 255, 0.8)', shape: 'triangle' , position: { x: -80, y: -80 } },
    { delay: 200, size: 25, color: 'rgba(255, 255, 255, 0.7)', shape: 'square' , position: { x: 80, y: -80 } },
    { delay: 400, size: 35, color: 'rgba(255, 255, 255, 0.6)', shape: 'hexagon' , position: { x: -80, y: 80 } },
    { delay: 600, size: 28, color: 'rgba(255, 255, 255, 0.9)', shape: 'circle' , position: { x: 80, y: 80 } },
    { delay: 800, size: 20, color: 'rgba(255, 255, 255, 0.5)', shape: 'triangle' , position: { x: 0, y: -100 } },
    { delay: 1000, size: 22, color: 'rgba(255, 255, 255, 0.6)', shape: 'square' , position: { x: 0, y: 100 } },
  ];

  const startAnimation = () => {
    setIsPlaying(true);

    logoScale.value = 0;
    logoOpacity.value = 0;
    textOpacity.value = 0;

    logoOpacity.value = withDelay(1800, withTiming(1, { duration: 400 }));
    logoScale.value = withDelay(
      1800,
      withSequence(
        withTiming(1.3, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 200 })
      )
    );

    textOpacity.value = withDelay(2200, withTiming(1, { duration: 600 }));

    setTimeout(() => setIsPlaying(false), 3000);
  };

  // Automatically start animation on mount
  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <GradientBackground colors={['#8360c3', '#2ebf91']}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.geometricContainer}>
              {shapes.map((shape, index) => (
                <GeometricShape
                  key={index}
                  delay={shape.delay}
                  size={shape.size}
                  color={shape.color}
                  shape={shape.shape}
                  position={shape.position}
                />
              ))}

              <Animated.View style={[styles.logo, animatedLogoStyle]}>
                <Text style={styles.logoText}>⬢</Text>
              </Animated.View>
            </View>

            <Animated.View style={animatedTextStyle}>
              <Text style={styles.title}>GeoForge</Text>
              <Text style={styles.subtitle}>Geometric Formation</Text>
            </Animated.View>
          </View>

          <AnimationControls onReplay={startAnimation} isPlaying={isPlaying} />
        </View>
      </GradientBackground>
    </>
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
  geometricContainer: {
    width: 200,
    height: 200,
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
    zIndex: 10,
  },
  logoText: {
    fontSize: 32,
    color: '#ffffff',
  },
  shape: {
    position: 'absolute',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold', // Ensure linked font is named exactly this in react-native.config.js
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular', // Ensure linked font is named exactly this
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});
