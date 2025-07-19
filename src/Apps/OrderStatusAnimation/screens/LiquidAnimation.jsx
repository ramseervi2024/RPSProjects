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
  interpolateColor
} from 'react-native-reanimated';
import { Package, Clock, Truck, MapPin, CircleCheck as CheckCircle, Droplets } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const liquidStages = [
  { 
    id: 1, 
    title: 'Order Placed', 
    icon: Package, 
    color: '#8B5CF6',
    liquidColor: '#C4B5FD',
    level: 20
  },
  { 
    id: 2, 
    title: 'Processing', 
    icon: Clock, 
    color: '#F59E0B',
    liquidColor: '#FCD34D',
    level: 40
  },
  { 
    id: 3, 
    title: 'Shipped', 
    icon: Truck, 
    color: '#3B82F6',
    liquidColor: '#93C5FD',
    level: 60
  },
  { 
    id: 4, 
    title: 'Out for Delivery', 
    icon: MapPin, 
    color: '#06B6D4',
    liquidColor: '#67E8F9',
    level: 80
  },
  { 
    id: 5, 
    title: 'Delivered', 
    icon: CheckCircle, 
    color: '#10B981',
    liquidColor: '#6EE7B7',
    level: 100
  },
];

export default function LiquidAnimation() {
  const [currentStage, setCurrentStage] = useState(0);
  
  // Liquid animation values
  const liquidLevel = useSharedValue(0);
  const wave1 = useSharedValue(0);
  const wave2 = useSharedValue(0);
  const wave3 = useSharedValue(0);
  const bubbleAnimation = useSharedValue(0);
  const containerGlow = useSharedValue(0);

  useEffect(() => {
    // Continuous wave animations
    wave1.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    wave2.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    wave3.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );

    // Bubble animation
    bubbleAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      false
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        const next = prev + 1;
        if (next >= liquidStages.length) {
          return 0;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targetLevel = liquidStages[currentStage]?.level || 0;
    
    liquidLevel.value = withTiming(
      targetLevel / 100,
      { duration: 1500, easing: Easing.inOut(Easing.cubic) }
    );

    containerGlow.value = withSequence(
      withTiming(1, { duration: 500 }),
      withTiming(0.3, { duration: 1000 })
    );
  }, [currentStage]);

  const LiquidContainer = () => {
    const liquidStyle = useAnimatedStyle(() => {
      const currentStageData = liquidStages[currentStage] || liquidStages[0];
      
      return {
        height: interpolate(liquidLevel.value, [0, 1], [0, 300]),
        backgroundColor: currentStageData.liquidColor,
      };
    });

    const wave1Style = useAnimatedStyle(() => ({
      transform: [
        { 
          translateY: interpolate(
            wave1.value,
            [0, 1],
            [0, -10]
          )
        }
      ],
    }));

    const wave2Style = useAnimatedStyle(() => ({
      transform: [
        { 
          translateY: interpolate(
            wave2.value,
            [0, 1],
            [0, -15]
          )
        }
      ],
    }));

    const wave3Style = useAnimatedStyle(() => ({
      transform: [
        { 
          translateY: interpolate(
            wave3.value,
            [0, 1],
            [0, -8]
          )
        }
      ],
    }));

    const containerStyle = useAnimatedStyle(() => {
      const currentStageData = liquidStages[currentStage] || liquidStages[0];
      
      return {
        shadowColor: currentStageData.color,
        shadowOpacity: interpolate(containerGlow.value, [0, 1], [0.1, 0.4]),
        shadowRadius: interpolate(containerGlow.value, [0, 1], [8, 20]),
      };
    });

    return (
      <Animated.View style={[styles.liquidContainer, containerStyle]}>
        <View style={styles.liquidBackground}>
          <Animated.View style={[styles.liquidFill, liquidStyle]}>
            <Animated.View style={[styles.wave, styles.wave1, wave1Style]} />
            <Animated.View style={[styles.wave, styles.wave2, wave2Style]} />
            <Animated.View style={[styles.wave, styles.wave3, wave3Style]} />
          </Animated.View>
        </View>
        
        <View style={styles.liquidOverlay}>
          <Text style={styles.percentageText}>
            {liquidStages[currentStage]?.level || 0}%
          </Text>
          <Text style={styles.statusText}>
            {liquidStages[currentStage]?.title || 'Starting...'}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const Bubble = ({ delay, size, color }: { delay: number; size: number; color: string }) => {
    const bubbleY = useSharedValue(300);
    const bubbleOpacity = useSharedValue(0);
    const bubbleScale = useSharedValue(0);

    useEffect(() => {
      const animateBubble = () => {
        bubbleY.value = 300;
        bubbleOpacity.value = 0;
        bubbleScale.value = 0;
        
        bubbleY.value = withTiming(-50, { duration: 4000 + delay * 100 });
        bubbleOpacity.value = withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0, { duration: 3500 + delay * 100 })
        );
        bubbleScale.value = withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.5, { duration: 3500 + delay * 100 })
        );
      };

      const interval = setInterval(animateBubble, 5000 + delay * 200);
      animateBubble();

      return () => clearInterval(interval);
    }, []);

    const bubbleStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: bubbleY.value },
        { scale: bubbleScale.value }
      ],
      opacity: bubbleOpacity.value,
    }));

    return (
      <Animated.View 
        style={[
          styles.bubble,
          {
            width: size,
            height: size,
            backgroundColor: color,
            left: Math.random() * (width - 60) + 30,
          },
          bubbleStyle
        ]} 
      />
    );
  };

  const StageProgress = ({ stage, index }: { stage: any; index: number }) => {
    const progressScale = useSharedValue(0.8);
    const progressOpacity = useSharedValue(0.4);

    const isActive = index <= currentStage;
    const isCurrent = index === currentStage;

    useEffect(() => {
      if (isCurrent) {
        progressScale.value = withSequence(
          withTiming(1.2, { duration: 300 }),
          withTiming(1.1, { duration: 300 })
        );
        progressOpacity.value = withTiming(1, { duration: 400 });
      } else if (isActive) {
        progressScale.value = withTiming(1, { duration: 300 });
        progressOpacity.value = withTiming(1, { duration: 400 });
      } else {
        progressScale.value = withTiming(0.8, { duration: 300 });
        progressOpacity.value = withTiming(0.4, { duration: 400 });
      }
    }, [currentStage]);

    const progressStyle = useAnimatedStyle(() => ({
      transform: [{ scale: progressScale.value }],
      opacity: progressOpacity.value,
    }));

    const IconComponent = stage.icon;

    return (
      <Animated.View style={[styles.stageProgress, progressStyle]}>
        <View style={[
          styles.stageIcon,
          { backgroundColor: isActive ? stage.color : '#374151' }
        ]}>
          <IconComponent 
            size={16} 
            color={isActive ? '#FFFFFF' : '#9CA3AF'} 
          />
        </View>
        <Text style={[
          styles.stageLabel,
          { color: isActive ? '#FFFFFF' : '#6B7280' }
        ]}>
          {stage.title}
        </Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Droplets size={32} color="#06B6D4" />
        <Text style={styles.title}>Liquid Progress</Text>
        <Text style={styles.subtitle}>Fluid order tracking</Text>
      </View>

      <LiquidContainer />

      {/* Floating bubbles */}
      <View style={styles.bubblesContainer}>
        {Array.from({ length: 8 }, (_, i) => (
          <Bubble 
            key={i}
            delay={i * 500}
            size={Math.random() * 20 + 10}
            color={liquidStages[currentStage]?.liquidColor || '#93C5FD'}
          />
        ))}
      </View>

      <View style={styles.stagesContainer}>
        {liquidStages.map((stage, index) => (
          <StageProgress key={stage.id} stage={stage} index={index} />
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.resetButton,
          { backgroundColor: liquidStages[currentStage]?.color || '#3B82F6' }
        ]}
        onPress={() => setCurrentStage(0)}
      >
        <Text style={styles.resetButtonText}>Reset Liquid</Text>
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
  liquidContainer: {
    height: 300,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  liquidBackground: {
    flex: 1,
    backgroundColor: '#1E293B',
    position: 'relative',
  },
  liquidFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  wave: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 20,
    borderRadius: 10,
  },
  wave1: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  wave2: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    top: -15,
  },
  wave3: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -5,
  },
  liquidOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  bubblesContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 5,
  },
  bubble: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.6,
  },
  stagesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 24,
  },
  stageProgress: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
  },
  stageIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  resetButton: {
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