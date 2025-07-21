import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const emojis = ['🎉', '❤️', '🚀', '⭐', '🎯', '💫', '🔥', '💎'];

export default function EmojiPopScreen() {
  const [particles, setParticles] = useState([]);

  const createBurst = () => {
    const newParticles = [];
    
    for (let i = 0; i < 8; i++) {
      const particle= {
        id: Math.random().toString(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        translateX: useSharedValue(0),
        translateY: useSharedValue(0),
        scale: useSharedValue(0),
        opacity: useSharedValue(1),
      };
      
      newParticles.push(particle);
    }
    
    setParticles(newParticles);
    
    // Animate particles
    newParticles.forEach((particle, index) => {
      const angle = (index / newParticles.length) * Math.PI * 2;
      const distance = 150;
      
      particle.translateX.value = withTiming(
        Math.cos(angle) * distance,
        { duration: 1500, easing: Easing.out(Easing.quad) }
      );
      
      particle.translateY.value = withTiming(
        Math.sin(angle) * distance,
        { duration: 1500, easing: Easing.out(Easing.quad) }
      );
      
      particle.scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(0.8, { duration: 1300 })
      );
      
      particle.opacity.value = withDelay(
        800,
        withTiming(0, { duration: 700 }, () => {
          if (index === 0) {
            runOnJS(() => setParticles([]))();
          }
        })
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emoji Pop Burst</Text>
      <Text style={styles.subtitle}>Tap the button to create an emoji explosion</Text>
      
      <View style={styles.center}>
        <Pressable style={styles.button} onPress={createBurst}>
          <Text style={styles.buttonText}>🎆 Burst!</Text>
        </Pressable>
        
        {particles.map((particle) => (
          <EmojiParticle key={particle.id} particle={particle} />
        ))}
      </View>
    </View>
  );
}

function EmojiParticle({ particle }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: particle.translateX.value },
      { translateY: particle.translateY.value },
      { scale: particle.scale.value },
    ],
    opacity: particle.opacity.value,
  }));

  return (
    <Animated.View style={[styles.particle, animatedStyle]}>
      <Text style={styles.emojiText}>{particle.emoji}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
    paddingTop: 60,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  particle: {
    position: 'absolute',
  },
  emojiText: {
    fontSize: 24,
  },
});