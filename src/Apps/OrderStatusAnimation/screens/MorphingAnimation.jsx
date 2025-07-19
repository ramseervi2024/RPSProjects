import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  interpolate,
  interpolateColor,
  Easing,
  withDelay
} from 'react-native-reanimated';
import { Package, Clock, Truck, MapPin, CircleCheck as CheckCircle, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const morphStages = [
  { 
    id: 1, 
    title: 'Order Received', 
    icon: Package, 
    color: '#8B5CF6',
    shape: 'circle',
    description: 'Processing your order'
  },
  { 
    id: 2, 
    title: 'Preparing', 
    icon: Clock, 
    color: '#F59E0B',
    shape: 'square',
    description: 'Getting items ready'
  },
  { 
    id: 3, 
    title: 'In Transit', 
    icon: Truck, 
    color: '#3B82F6',
    shape: 'triangle',
    description: 'On the way to you'
  },
  { 
    id: 4, 
    title: 'Nearby', 
    icon: MapPin, 
    color: '#06B6D4',
    shape: 'hexagon',
    description: 'Almost there'
  },
  { 
    id: 5, 
    title: 'Delivered', 
    icon: CheckCircle, 
    color: '#10B981',
    shape: 'star',
    description: 'Successfully delivered'
  },
];

export default function MorphingAnimation() {
  const [currentStage, setCurrentStage] = useState(0);
  
  // Morphing values
  const morphProgress = useSharedValue(0);
  const shapeRotation = useSharedValue(0);
  const shapeScale = useSharedValue(1);
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        const next = prev + 1;
        if (next >= morphStages.length) {
          return 0;
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Morphing animation
    morphProgress.value = withSequence(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.cubic) }),
      withTiming(0, { duration: 400 })
    );

    // Shape rotation
    shapeRotation.value = withTiming(
      currentStage * 72, // 360/5 = 72 degrees per stage
      { duration: 1000, easing: Easing.inOut(Easing.back(1.5)) }
    );

    // Scale animation
    shapeScale.value = withSequence(
      withTiming(1.3, { duration: 400 }),
      withTiming(1, { duration: 600 })
    );

    // Color transition
    colorProgress.value = withTiming(
      currentStage / (morphStages.length - 1),
      { duration: 1000 }
    );
  }, [currentStage]);

  const MorphingShape = () => {
    const shapeStyle = useAnimatedStyle(() => {
      const colors = morphStages.map(stage => stage.color);
      const backgroundColor = interpolateColor(
        colorProgress.value,
        [0, 0.25, 0.5, 0.75, 1],
        colors
      );

      return {
        backgroundColor,
        transform: [
          { rotate: `${shapeRotation.value}deg` },
          { scale: shapeScale.value }
        ],
        borderRadius: interpolate(
          morphProgress.value,
          [0, 0.5, 1],
          [60, 20, 60]
        ),
      };
    });

    const currentStageData = morphStages[currentStage];
    const IconComponent = currentStageData?.icon || Package;

    return (
      <View style={styles.morphContainer}>
        <Animated.View style={[styles.morphingShape, shapeStyle]}>
          <IconComponent size={32} color="#FFFFFF" />
        </Animated.View>
      </View>
    );
  };

  const StageIndicator = ({ stage, index }: { stage: any; index: number }) => {
    const indicatorScale = useSharedValue(0.8);
    const indicatorOpacity = useSharedValue(0.4);
    const pulseAnimation = useSharedValue(0);

    const isActive = index <= currentStage;
    const isCurrent = index === currentStage;

    useEffect(() => {
      if (isCurrent) {
        indicatorScale.value = withSequence(
          withTiming(1.2, { duration: 300 }),
          withTiming(1.1, { duration: 300 })
        );
        indicatorOpacity.value = withTiming(1, { duration: 400 });
        pulseAnimation.value = withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0, { duration: 600 })
        );
      } else if (isActive) {
        indicatorScale.value = withTiming(1, { duration: 300 });
        indicatorOpacity.value = withTiming(1, { duration: 400 });
        pulseAnimation.value = withTiming(0, { duration: 300 });
      } else {
        indicatorScale.value = withTiming(0.8, { duration: 300 });
        indicatorOpacity.value = withTiming(0.4, { duration: 400 });
        pulseAnimation.value = withTiming(0, { duration: 300 });
      }
    }, [currentStage]);

    const indicatorStyle = useAnimatedStyle(() => ({
      transform: [{ scale: indicatorScale.value }],
      opacity: indicatorOpacity.value,
    }));

    const pulseStyle = useAnimatedStyle(() => ({
      transform: [{ scale: interpolate(pulseAnimation.value, [0, 1], [1, 1.5]) }],
      opacity: interpolate(pulseAnimation.value, [0, 0.5, 1], [0, 0.3, 0]),
    }));

    const IconComponent = stage.icon;

    return (
      <View style={styles.stageIndicatorContainer}>
        <Animated.View 
          style={[
            styles.pulseBg,
            { backgroundColor: stage.color },
            pulseStyle
          ]} 
        />
        <Animated.View 
          style={[
            styles.stageIndicator,
            { backgroundColor: isActive ? stage.color : '#374151' },
            indicatorStyle
          ]}
        >
          <IconComponent 
            size={16} 
            color={isActive ? '#FFFFFF' : '#9CA3AF'} 
          />
        </Animated.View>
        <Text style={[
          styles.stageTitle,
          { color: isActive ? '#FFFFFF' : '#6B7280' }
        ]}>
          {stage.title}
        </Text>
        <Text style={styles.stageDescription}>
          {stage.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Zap size={32} color="#F59E0B" />
        <Text style={styles.title}>Morphing Progress</Text>
        <Text style={styles.subtitle}>Shape-shifting order states</Text>
      </View>

      <MorphingShape />

      <View style={styles.progressInfo}>
        <Text style={styles.currentStageTitle}>
          {morphStages[currentStage]?.title || 'Starting...'}
        </Text>
        <Text style={styles.progressPercentage}>
          {Math.round(((currentStage + 1) / morphStages.length) * 100)}% Complete
        </Text>
      </View>

      <View style={styles.stagesGrid}>
        {morphStages.map((stage, index) => (
          <StageIndicator key={stage.id} stage={stage} index={index} />
        ))}
      </View>

      <View style={styles.morphingBar}>
        <View style={styles.morphingBarBg} />
        <Animated.View 
          style={[
            styles.morphingBarFill,
            {
              width: `${((currentStage + 1) / morphStages.length) * 100}%`,
              backgroundColor: morphStages[currentStage]?.color || '#3B82F6'
            }
          ]} 
        />
      </View>

      <TouchableOpacity 
        style={[
          styles.resetButton,
          { backgroundColor: morphStages[currentStage]?.color || '#3B82F6' }
        ]}
        onPress={() => setCurrentStage(0)}
      >
        <Text style={styles.resetButtonText}>Reset Morphing</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
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
    color: '#9CA3AF',
  },
  morphContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  morphingShape: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  progressInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  currentStageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  stagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  stageIndicatorContainer: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  stageIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 2,
  },
  pulseBg: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 16,
  },
  stageTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  stageDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  morphingBar: {
    height: 8,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  morphingBarBg: {
    position: 'absolute',
    width: '100%',
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
  },
  morphingBarFill: {
    height: 8,
    borderRadius: 4,
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