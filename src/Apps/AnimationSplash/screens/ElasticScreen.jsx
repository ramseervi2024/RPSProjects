import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import AnimationControls from '../components/AnimationControls';



function ElasticElement({ delay, children, springConfig }) {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  useEffect(() => {
    const animate = () => {
      scale.value = 0;
      translateY.value = 50;
      opacity.value = 0;

      opacity.value = withDelay(delay, withTiming(1, { duration: 200 }));

      scale.value = withDelay(
        delay,
        withSpring(1, {
          damping: 8,
          stiffness: 100,
          mass: 1,
          ...springConfig,
        })
      );

      translateY.value = withDelay(
        delay,
        withSpring(0, {
          damping: 12,
          stiffness: 150,
          mass: 1,
        })
      );
    };

    animate();
  }, [delay]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export default function ElasticScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startAnimation = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2500);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground colors={['#ff6b6b', '#feca57']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ElasticElement delay={0} springConfig={{ damping: 6, stiffness: 80 }}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🎯</Text>
            </View>
          </ElasticElement>

          <ElasticElement delay={400}>
            <Text style={styles.title}>ElasticBounce</Text>
          </ElasticElement>

          <ElasticElement delay={600}>
            <Text style={styles.subtitle}>Spring Physics Animation</Text>
          </ElasticElement>

          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <ElasticElement 
                key={index} 
                delay={800 + index * 100}
                springConfig={{ damping: 10, stiffness: 200 }}
              >
                <View style={styles.dot} />
              </ElasticElement>
            ))}
          </View>
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
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
