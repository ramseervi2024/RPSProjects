import { useEffect, useState } from 'react';
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


function Rotating3DElement({ delay, children, axis }) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateX = axis === 'x' ? `${rotation.value}deg` : '0deg';
    const rotateY = axis === 'y' ? `${rotation.value}deg` : '0deg';
    const rotateZ = axis === 'z' ? `${rotation.value}deg` : '0deg';

    return {
      transform: [
        { perspective: 1000 },
        { rotateX },
        { rotateY },
        { rotateZ },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    const animate = () => {
      // Initial rotation values based on axis
      rotation.value = axis === 'y' ? 180 : axis === 'x' ? 90 : 360;
      scale.value = 0;
      opacity.value = 0;

      opacity.value = withDelay(delay, withTiming(1, { duration: 200 }));

      rotation.value = withDelay(
        delay,
        withTiming(0, {
          duration: 1000,
          easing: Easing.out(Easing.cubic),
        })
      );

      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1.1, { duration: 500, easing: Easing.out(Easing.cubic) }),
          withTiming(1, { duration: 200 })
        )
      );
    };

    animate();
  }, [delay, axis]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export default function Rotation3DScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const backgroundRotation = useSharedValue(0);

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${backgroundRotation.value}deg` },
    ],
  }));

  const startAnimation = () => {
    setIsPlaying(true);

    backgroundRotation.value = withTiming(360, {
      duration: 2000,
      easing: Easing.inOut(Easing.cubic),
    });

    setTimeout(() => {
      setIsPlaying(false);
      backgroundRotation.value = 0;
    }, 2500);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground colors={['#667eea', '#764ba2']}>
      <Animated.View style={[styles.container, backgroundStyle]}>
        <View style={styles.content}>
          <Rotating3DElement delay={0} axis="y">
            <View style={styles.logo}>
              <Text style={styles.logoText}>🎲</Text>
            </View>
          </Rotating3DElement>

          <Rotating3DElement delay={600} axis="x">
            <Text style={styles.title}>Rotate3D</Text>
          </Rotating3DElement>

          <Rotating3DElement delay={900} axis="z">
            <Text style={styles.subtitle}>3D Perspective Animation</Text>
          </Rotating3DElement>

          <View style={styles.cubesContainer}>
            {['x', 'y', 'z'].map((axis, index) => (
              <Rotating3DElement 
                key={axis} 
                delay={1200 + index * 150} 
                axis={'x' | 'y' | 'z'}
              >
                <View style={styles.cube} />
              </Rotating3DElement>
            ))}
          </View>
        </View>

        <AnimationControls onReplay={startAnimation} isPlaying={isPlaying} />
      </Animated.View>
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
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
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
    marginBottom: 30,
  },
  cubesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  cube: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 6,
  },
});
