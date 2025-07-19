import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  useAnimatedProps,
  withSequence
} from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';
import { Package, Truck, Check, Stamp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width } = Dimensions.get('window');

const stages = [
  { id: 1, title: 'Order Placed', icon: Package, color: '#3B82F6' },
  { id: 2, title: 'Processing', icon: Package, color: '#F59E0B' },
  { id: 3, title: 'Shipped', icon: Truck, color: '#8B5CF6' },
  { id: 4, title: 'Delivered', icon: Check, color: '#10B981' },
];

export default function CircularAnimation() {
  const [currentStage, setCurrentStage] = useState(0);
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const radius = 80;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        const next = prev + 1;
        if (next >= stages.length) {
          return 0; // Reset
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targetProgress = (currentStage + 1) / stages.length;
    
    progress.value = withTiming(targetProgress, { duration: 1000 });
    
    scale.value = withSequence(
      withTiming(1.1, { duration: 300 }),
      withSpring(1, { damping: 8 })
    );
    
    rotation.value = withTiming(targetProgress * 360, { duration: 1000 });
  }, [currentStage]);

  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (progress.value * circumference);
    return {
      strokeDashoffset,
    };
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const StageIndicator = ({ stage, index }) => {
    const opacity = useSharedValue(0.3);
    const indicatorScale = useSharedValue(0.8);

    const isActive = index <= currentStage;
    const isCurrent = index === currentStage;

    useEffect(() => {
      if (isActive) {
        opacity.value = withTiming(1, { duration: 500 });
        indicatorScale.value = withSpring(isCurrent ? 1.2 : 1, { damping: 6 });
      } else {
        opacity.value = withTiming(0.3, { duration: 300 });
        indicatorScale.value = withTiming(0.8, { duration: 300 });
      }
    }, [currentStage]);

    const indicatorStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ scale: indicatorScale.value }],
    }));

    const IconComponent = stage.icon;

    return (
      <Animated.View 
        style={[
          styles.stageIndicator,
          { backgroundColor: isActive ? stage.color : '#E5E7EB' },
          indicatorStyle
        ]}
      >
        <IconComponent 
          size={16} 
          color={isActive ? '#FFFFFF' : '#9CA3AF'} 
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Delivery Progress</Text>
          <Text style={styles.subtitle}>Real-time order tracking</Text>
        </View>

        <Animated.View style={[styles.circularContainer, containerStyle]}>
          <Svg width={200} height={200} style={styles.svg}>
            {/* Background circle */}
            <Circle
              cx={100}
              cy={100}
              r={radius}
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <AnimatedCircle
              cx={100}
              cy={100}
              r={radius}
              stroke={stages[currentStage]?.color || '#3B82F6'}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeLinecap="round"
              animatedProps={animatedCircleProps}
              transform={`rotate(-90 100 100)`}
            />
          </Svg>
          
          <View style={styles.centerContent}>
            <Animated.View style={[styles.centerIcon, iconRotationStyle]}>
            {stages[currentStage] && (
                <Stamp
                  size={32} 
                  color={stages[currentStage].color} 
                />
              )}
            </Animated.View>
            <Text style={styles.progressText}>
              {Math.round(((currentStage + 1) / stages.length) * 100)}%
            </Text>
            <Text style={styles.stageTitle}>
              {stages[currentStage]?.title || 'Starting...'}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.stagesContainer}>
          {stages.map((stage, index) => (
            <View key={stage.id} style={styles.stageItem}>
              <StageIndicator stage={stage} index={index} />
              <Text style={[
                styles.stageText,
                { color: index <= currentStage ? '#111827' : '#9CA3AF' }
              ]}>
                {stage.title}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.metrics}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>2.5</Text>
            <Text style={styles.metricLabel}>Days</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>85%</Text>
            <Text style={styles.metricLabel}>On Time</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>12</Text>
            <Text style={styles.metricLabel}>Updates</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => setCurrentStage(0)}
        >
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  circularContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcon: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  stageTitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  stagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  stageItem: {
    alignItems: 'center',
    flex: 1,
  },
  stageIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  resetButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
