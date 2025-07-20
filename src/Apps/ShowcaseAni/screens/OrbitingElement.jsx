import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { X, Zap, Sparkles } from 'lucide-react-native';


export default function HeroAnimation({ onClose }) {
  const [isAnimated, setIsAnimated] = useState(false);
  
  const heroScale = useSharedValue(0.8);
  const heroOpacity = useSharedValue(0);
  const titleY = useSharedValue(50);
  const subtitleY = useSharedValue(50);
  const buttonY = useSharedValue(50);
  const iconRotation = useSharedValue(0);
  const sparkleScale = useSharedValue(0);

  useEffect(() => {
    // Hero entrance animation
    heroScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    heroOpacity.value = withSpring(1, { damping: 15, stiffness: 150 });
    
    // Staggered text animations
    titleY.value = withDelay(200, withSpring(0, { damping: 15, stiffness: 150 }));
    subtitleY.value = withDelay(400, withSpring(0, { damping: 15, stiffness: 150 }));
    buttonY.value = withDelay(600, withSpring(0, { damping: 15, stiffness: 150 }));
    
    // Icon animations
    iconRotation.value = withDelay(800, withSpring(360, { damping: 15, stiffness: 150 }));
    sparkleScale.value = withDelay(1000, withSpring(1, { damping: 15, stiffness: 150 }));
  }, []);

  const triggerHeroAnimation = () => {
    if (!isAnimated) {
      heroScale.value = withSpring(1.1, { damping: 15, stiffness: 150 }, () => {
        heroScale.value = withSpring(1, { damping: 15, stiffness: 150 });
      });
      iconRotation.value = withSpring(iconRotation.value + 360, { damping: 15, stiffness: 150 });
      sparkleScale.value = withSpring(1.2, { damping: 15, stiffness: 150 }, () => {
        sparkleScale.value = withSpring(1, { damping: 15, stiffness: 150 });
      });
      setIsAnimated(true);
    }
  };

  const handleClose = () => {
    heroOpacity.value = withSpring(0, { damping: 15, stiffness: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
    opacity: heroOpacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: interpolate(titleY.value, [50, 0], [0, 1]),
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleY.value }],
    opacity: interpolate(subtitleY.value, [50, 0], [0, 1]),
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonY.value }],
    opacity: interpolate(buttonY.value, [50, 0], [0, 1]),
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sparkleScale.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hero Animation</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.heroContainer, heroStyle]}>
          <View style={styles.iconContainer}>
            <Animated.View style={iconStyle}>
              <Zap size={64} color="#FFFFFF" fill="#FFFFFF" />
            </Animated.View>
            
            <Animated.View style={[styles.sparkle, styles.sparkle1, sparkleStyle]}>
              <Sparkles size={16} color="#FFD700" fill="#FFD700" />
            </Animated.View>
            
            <Animated.View style={[styles.sparkle, styles.sparkle2, sparkleStyle]}>
              <Sparkles size={12} color="#FFD700" fill="#FFD700" />
            </Animated.View>
            
            <Animated.View style={[styles.sparkle, styles.sparkle3, sparkleStyle]}>
              <Sparkles size={14} color="#FFD700" fill="#FFD700" />
            </Animated.View>
          </View>

          <Animated.Text style={[styles.heroTitle, titleStyle]}>
            Amazing App
          </Animated.Text>

          <Animated.Text style={[styles.heroSubtitle, subtitleStyle]}>
            Experience the future of mobile applications with smooth animations and delightful interactions.
          </Animated.Text>

          <Animated.View style={buttonStyle}>
            <TouchableOpacity style={styles.heroButton} onPress={triggerHeroAnimation}>
              <Text style={styles.heroButtonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 8,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: -10,
    right: -10,
  },
  sparkle2: {
    bottom: -8,
    left: -12,
  },
  sparkle3: {
    top: 10,
    left: -20,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    opacity: 0.9,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  heroButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#667eea',
  },
});