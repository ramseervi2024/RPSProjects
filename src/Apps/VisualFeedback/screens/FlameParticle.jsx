import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function PathDrawingScreen() {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 1000 * (1 - progress.value),
  }));

  const startAnimation = () => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 3000,
      easing: Easing.inOut(Easing.quad),
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const heartPath = "M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Path Drawing Animation</Text>
      <Text style={styles.subtitle}>Watch the SVG path being drawn</Text>
      
      <View style={styles.svgContainer}>
        <Svg width="200" height="200" viewBox="0 0 24 24">
          <AnimatedPath
            d={heartPath}
            stroke="#F43F5E"
            strokeWidth="2"
            fill="none"
            strokeDasharray="1000"
            animatedProps={animatedProps}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      
      <Pressable style={styles.button} onPress={startAnimation}>
        <Text style={styles.buttonText}>Restart Animation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F1F5F9',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 40,
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F43F5E',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 40,
  },
  buttonText: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});