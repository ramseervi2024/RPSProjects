import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence,
  interpolate,
  Easing,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { Package, Clock, Truck, MapPin, CircleCheck as CheckCircle, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const orderPhases = [
  { id: 1, title: 'Order Placed', icon: Package, color: '#8B5CF6' },
  { id: 2, title: 'Processing', icon: Clock, color: '#F59E0B' },
  { id: 3, title: 'Shipped', icon: Truck, color: '#3B82F6' },
  { id: 4, title: 'Delivering', icon: MapPin, color: '#06B6D4' },
  { id: 5, title: 'Completed', icon: CheckCircle, color: '#10B981' },
];

// Generate random particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * 300,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 2 + 1,
    color: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#06B6D4'][Math.floor(Math.random() * 5)],
  }));
};

export default function ParticlesAnimation() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [particles] = useState(() => generateParticles(50));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase(prev => {
        const next = prev + 1;
        if (next >= orderPhases.length) {
          return 0;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const Particle = ({ particle, index }: { particle: any; index: number }) => {
    const translateX = useSharedValue(particle.x);
    const translateY = useSharedValue(particle.y);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0);

    useEffect(() => {
      const delay = index * 50;
      
      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 1000 }),
            withTiming(0.3, { duration: 1000 }),
            withTiming(1, { duration: 1000 })
          ),
          -1,
          true
        )
      );

      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
            withTiming(0.5, { duration: 2000, easing: Easing.inOut(Easing.sin) })
          ),
          -1,
          true
        )
      );

      // Floating movement
      translateY.value = withRepeat(
        withSequence(
          withTiming(particle.y - 20, { duration: 3000 + index * 100 }),
          withTiming(particle.y + 20, { duration: 3000 + index * 100 })
        ),
        -1,
        true
      );

      translateX.value = withRepeat(
        withSequence(
          withTiming(particle.x + 30, { duration: 4000 + index * 50 }),
          withTiming(particle.x - 30, { duration: 4000 + index * 50 })
        ),
        -1,
        true
      );
    }, []);

    const particleStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    }));

    return (
      <Animated.View 
        style={[
          styles.particle,
          {
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          },
          particleStyle
        ]} 
      />
    );
  };

  const PhaseCard = ({ phase, index }: { phase: any; index: number }) => {
    const scale = useSharedValue(0.9);
    const opacity = useSharedValue(0.5);
    const glowIntensity = useSharedValue(0);
    const rotateY = useSharedValue(0);

    const isActive = index <= currentPhase;
    const isCurrent = index === currentPhase;

    useEffect(() => {
      if (isCurrent) {
        scale.value = withSequence(
          withTiming(1.1, { duration: 300 }),
          withTiming(1.05, { duration: 300 })
        );
        opacity.value = withTiming(1, { duration: 400 });
        glowIntensity.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 1000 }),
            withTiming(0.3, { duration: 1000 })
          ),
          -1,
          true
        );
        rotateY.value = withSequence(
          withTiming(5, { duration: 200 }),
          withTiming(-5, { duration: 400 }),
          withTiming(0, { duration: 200 })
        );
      } else if (isActive) {
        scale.value = withTiming(1, { duration: 300 });
        opacity.value = withTiming(1, { duration: 400 });
        glowIntensity.value = withTiming(0.5, { duration: 300 });
        rotateY.value = withTiming(0, { duration: 300 });
      } else {
        scale.value = withTiming(0.9, { duration: 300 });
        opacity.value = withTiming(0.5, { duration: 400 });
        glowIntensity.value = withTiming(0, { duration: 300 });
        rotateY.value = withTiming(0, { duration: 300 });
      }
    }, [currentPhase]);

    const cardStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { rotateY: `${rotateY.value}deg` }
      ],
      opacity: opacity.value,
    }));

    const glowStyle = useAnimatedStyle(() => ({
      shadowOpacity: interpolate(glowIntensity.value, [0, 1], [0, 0.8]),
      shadowRadius: interpolate(glowIntensity.value, [0, 1], [0, 20]),
    }));

    const IconComponent = phase.icon;

    return (
      <Animated.View style={[styles.phaseCard, cardStyle, glowStyle]}>
        <View style={[styles.phaseIcon, { backgroundColor: phase.color }]}>
          <IconComponent size={24} color="#FFFFFF" />
        </View>
        <Text style={[
          styles.phaseTitle,
          { color: isActive ? '#FFFFFF' : '#64748B' }
        ]}>
          {phase.title}
        </Text>
        {isCurrent && (
          <View style={styles.currentIndicator}>
            <Sparkles size={16} color={phase.color} />
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Sparkles size={32} color="#F59E0B" />
        <Text style={styles.title}>Particle System</Text>
        <Text style={styles.subtitle}>Dynamic order visualization</Text>
      </View>

      <View style={styles.particleContainer}>
        {particles.map((particle, index) => (
          <Particle key={particle.id} particle={particle} index={index} />
        ))}
        
        <View style={styles.centerContent}>
          <Text style={styles.progressPercentage}>
            {Math.round(((currentPhase + 1) / orderPhases.length) * 100)}%
          </Text>
          <Text style={styles.progressStatus}>
            {orderPhases[currentPhase]?.title || 'Starting...'}
          </Text>
        </View>
      </View>

      <View style={styles.phasesContainer}>
        {orderPhases.map((phase, index) => (
          <PhaseCard key={phase.id} phase={phase} index={index} />
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.2</Text>
          <Text style={styles.statLabel}>Days Avg</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>98%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>24/7</Text>
          <Text style={styles.statLabel}>Tracking</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.resetButton}
        onPress={() => setCurrentPhase(0)}
      >
        <Text style={styles.resetButtonText}>Reset Particles</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
  },
  particleContainer: {
    height: 300,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    position: 'relative',
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressStatus: {
    fontSize: 18,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  phasesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 24,
  },
  phaseCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  phaseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  currentIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  resetButton: {
    backgroundColor: '#F59E0B',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});