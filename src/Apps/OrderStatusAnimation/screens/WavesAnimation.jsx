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
  withDelay
} from 'react-native-reanimated';
import { Package, Clock, Truck, MapPin, CircleCheck as CheckCircle, Waves } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const orderSteps = [
  { id: 1, title: 'Order Confirmed', icon: Package, color: '#8B5CF6', time: '2:30 PM' },
  { id: 2, title: 'Preparing', icon: Clock, color: '#F59E0B', time: '3:15 PM' },
  { id: 3, title: 'Shipped', icon: Truck, color: '#3B82F6', time: '4:45 PM' },
  { id: 4, title: 'Out for Delivery', icon: MapPin, color: '#06B6D4', time: '10:30 AM' },
  { id: 5, title: 'Delivered', icon: CheckCircle, color: '#10B981', time: '2:15 PM' },
];

export default function WavesAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Wave animations
  const wave1 = useSharedValue(0);
  const wave2 = useSharedValue(0);
  const wave3 = useSharedValue(0);
  const wave4 = useSharedValue(0);

  useEffect(() => {
    // Continuous wave animations
    wave1.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    wave2.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    wave3.value = withRepeat(
      withTiming(1, { duration: 3500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    wave4.value = withRepeat(
      withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= orderSteps.length) {
          return 0;
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const WaveLayer = ({ waveValue, color, delay = 0 }: { waveValue: any; color: string; delay?: number }) => {
    const waveStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        waveValue.value,
        [0, 1],
        [0, -20]
      );
      
      return {
        transform: [{ translateY }],
        opacity: interpolate(waveValue.value, [0, 0.5, 1], [0.3, 0.8, 0.3]),
      };
    });

    return (
      <Animated.View 
        style={[
          styles.waveLayer,
          { backgroundColor: color },
          waveStyle
        ]} 
      />
    );
  };

  const StepIndicator = ({ step, index }: { step: any; index: number }) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0.4);
    const ripple = useSharedValue(0);

    const isActive = index <= currentStep;
    const isCurrent = index === currentStep;

    useEffect(() => {
      if (isActive) {
        scale.value = withTiming(1, { duration: 600 });
        opacity.value = withTiming(1, { duration: 400 });
        
        if (isCurrent) {
          ripple.value = withRepeat(
            withSequence(
              withTiming(1, { duration: 1000 }),
              withTiming(0, { duration: 100 })
            ),
            -1,
            false
          );
        } else {
          ripple.value = withTiming(0, { duration: 300 });
        }
      } else {
        scale.value = withTiming(0.8, { duration: 400 });
        opacity.value = withTiming(0.4, { duration: 400 });
        ripple.value = withTiming(0, { duration: 300 });
      }
    }, [currentStep]);

    const indicatorStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    const rippleStyle = useAnimatedStyle(() => ({
      transform: [{ scale: interpolate(ripple.value, [0, 1], [1, 2]) }],
      opacity: interpolate(ripple.value, [0, 0.5, 1], [0, 0.3, 0]),
    }));

    const IconComponent = step.icon;

    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepIndicatorContainer}>
          <Animated.View 
            style={[
              styles.rippleEffect,
              { backgroundColor: step.color },
              rippleStyle
            ]} 
          />
          <Animated.View 
            style={[
              styles.stepIndicator,
              { backgroundColor: isActive ? step.color : '#E5E7EB' },
              indicatorStyle
            ]}
          >
            <IconComponent 
              size={20} 
              color={isActive ? '#FFFFFF' : '#9CA3AF'} 
            />
          </Animated.View>
        </View>
        <View style={styles.stepInfo}>
          <Text style={[
            styles.stepTitle,
            { color: isActive ? '#111827' : '#9CA3AF' }
          ]}>
            {step.title}
          </Text>
          <Text style={styles.stepTime}>{step.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Waves size={32} color="#3B82F6" />
        <Text style={styles.title}>Wave Progress</Text>
        <Text style={styles.subtitle}>Fluid order tracking experience</Text>
      </View>

      <View style={styles.waveContainer}>
        <WaveLayer waveValue={wave1} color="#3B82F6" />
        <WaveLayer waveValue={wave2} color="#8B5CF6" />
        <WaveLayer waveValue={wave3} color="#06B6D4" />
        <WaveLayer waveValue={wave4} color="#10B981" />
        
        <View style={styles.waveOverlay}>
          <Text style={styles.progressText}>
            {Math.round(((currentStep + 1) / orderSteps.length) * 100)}%
          </Text>
          <Text style={styles.progressLabel}>Complete</Text>
        </View>
      </View>

      <View style={styles.stepsContainer}>
        {orderSteps.map((step, index) => (
          <StepIndicator key={step.id} step={step} index={index} />
        ))}
      </View>

      <TouchableOpacity 
        style={styles.resetButton}
        onPress={() => setCurrentStep(0)}
      >
        <Text style={styles.resetButtonText}>Reset Waves</Text>
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
  waveContainer: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E293B',
  },
  waveLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 20,
  },
  waveOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  progressText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 16,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  stepsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
  },
  stepIndicatorContainer: {
    position: 'relative',
    marginRight: 16,
  },
  stepIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  rippleEffect: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    top: 0,
    left: 0,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepTime: {
    fontSize: 14,
    color: '#64748B',
  },
  resetButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 20,
    marginTop: 24,
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