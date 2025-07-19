import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withSequence,
  Easing
} from 'react-native-reanimated';
import { Check, Package, Truck, MapPin, Chrome as Home } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
  { id: 1, title: 'Order Placed', description: 'Your order has been confirmed', icon: Package },
  { id: 2, title: 'Processing', description: 'Preparing your items', icon: Package },
  { id: 3, title: 'Shipped', description: 'On the way to you', icon: Truck },
  { id: 4, title: 'Out for Delivery', description: 'Delivery in progress', icon: MapPin },
  { id: 5, title: 'Delivered', description: 'Successfully delivered', icon: Home },
];

export default function StepperAnimation() {
  const [currentStep, setCurrentStep] = useState(1);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length) {
          return prev + 1;
        }
        return 1; // Reset to start
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    progressWidth.value = withTiming(
      ((currentStep - 1) / (steps.length - 1)) * 100,
      { duration: 800, easing: Easing.bezier(0.4, 0, 0.2, 1) }
    );
  }, [currentStep]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const StepComponent = ({ step, index }) => {
    const scale = useSharedValue(1);
    const checkScale = useSharedValue(0);
    const iconOpacity = useSharedValue(1);
    
    const isCompleted = currentStep > step.id;
    const isCurrent = currentStep === step.id;

    useEffect(() => {
      if (isCurrent) {
        scale.value = withSequence(
          withTiming(1.2, { duration: 300 }),
          withSpring(1, { damping: 8, stiffness: 150 })
        );
      } else {
        scale.value = withTiming(1, { duration: 300 });
      }

      if (isCompleted) {
        checkScale.value = withSpring(1, { damping: 6, stiffness: 200 });
        iconOpacity.value = withTiming(0, { duration: 200 });
      } else {
        checkScale.value = withTiming(0, { duration: 200 });
        iconOpacity.value = withTiming(1, { duration: 200 });
      }
    }, [currentStep]);

    const stepStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const checkStyle = useAnimatedStyle(() => ({
      transform: [{ scale: checkScale.value }],
    }));

    const iconStyle = useAnimatedStyle(() => ({
      opacity: iconOpacity.value,
    }));

    const IconComponent = step.icon;

    return (
      <View style={styles.stepContainer}>
        <Animated.View 
          style={[
            styles.stepCircle,
            {
              backgroundColor: isCompleted ? '#10B981' : isCurrent ? '#3B82F6' : '#E5E7EB',
              borderColor: isCompleted ? '#10B981' : isCurrent ? '#3B82F6' : '#E5E7EB',
            },
            stepStyle
          ]}
        >
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <IconComponent 
              size={20} 
              color={isCurrent || isCompleted ? '#FFFFFF' : '#6B7280'} 
            />
          </Animated.View>
          <Animated.View style={[styles.checkContainer, checkStyle]}>
            <Check size={20} color="#FFFFFF" />
          </Animated.View>
        </Animated.View>
        <View style={styles.stepText}>
          <Text style={[
            styles.stepTitle,
            { color: isCompleted || isCurrent ? '#111827' : '#6B7280' }
          ]}>
            {step.title}
          </Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Order Status</Text>
          <Text style={styles.orderId}>Order #12345</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground} />
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <StepComponent key={step.id} step={step} index={index} />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => setCurrentStep(1)}
        >
          <Text style={styles.resetButtonText}>Reset Animation</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 24,
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
  orderId: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressContainer: {
    position: 'relative',
    height: 4,
    marginBottom: 32,
    marginHorizontal: 24,
  },
  progressBackground: {
    position: 'absolute',
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressBar: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  stepsContainer: {
    gap: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
  },
  checkContainer: {
    position: 'absolute',
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  resetButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 32,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});