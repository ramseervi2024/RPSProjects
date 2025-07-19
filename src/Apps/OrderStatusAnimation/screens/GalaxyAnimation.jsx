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
  interpolateColor,
  withDelay
} from 'react-native-reanimated';
import { Package, Clock, Truck, MapPin, CircleCheck as CheckCircle, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const galaxyStages = [
  { 
    id: 1, 
    title: 'Order Created', 
    icon: Package, 
    color: '#8B5CF6',
    constellation: 'Ursa Major',
    distance: 80
  },
  { 
    id: 2, 
    title: 'Processing', 
    icon: Clock, 
    color: '#F59E0B',
    constellation: 'Orion',
    distance: 120
  },
  { 
    id: 3, 
    title: 'In Transit', 
    icon: Truck, 
    color: '#3B82F6',
    constellation: 'Cassiopeia',
    distance: 160
  },
  { 
    id: 4, 
    title: 'Approaching', 
    icon: MapPin, 
    color: '#06B6D4',
    constellation: 'Andromeda',
    distance: 200
  },
  { 
    id: 5, 
    title: 'Delivered', 
    icon: CheckCircle, 
    color: '#10B981',
    constellation: 'Polaris',
    distance: 240
  },
];

// Generate stars for background
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleSpeed: Math.random() * 2000 + 1000,
  }));
};

export default function GalaxyAnimation() {
  const [currentStage, setCurrentStage] = useState(0);
  const [stars] = useState(() => generateStars(100));
  
  // Galaxy center animation
  const galaxyRotation = useSharedValue(0);
  const galaxyPulse = useSharedValue(1);
  const warpSpeed = useSharedValue(0);

  useEffect(() => {
    // Continuous galaxy rotation
    galaxyRotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );

    // Galaxy pulse
    galaxyPulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        const next = prev + 1;
        if (next >= galaxyStages.length) {
          return 0;
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Warp speed effect when transitioning
    warpSpeed.value = withSequence(
      withTiming(1, { duration: 800 }),
      withTiming(0, { duration: 1200 })
    );
  }, [currentStage]);

  const StarField = () => {
    return (
      <View style={styles.starField}>
        {stars.map((star, index) => (
          <StarComponent key={star.id} star={star} index={index} />
        ))}
      </View>
    );
  };

  const StarComponent = ({ star, index }: { star: any; index: number }) => {
    const twinkle = useSharedValue(0);
    const warpStretch = useSharedValue(1);

    useEffect(() => {
      // Twinkling animation
      twinkle.value = withRepeat(
        withSequence(
          withTiming(1, { duration: star.twinkleSpeed }),
          withTiming(0.3, { duration: star.twinkleSpeed })
        ),
        -1,
        true
      );
    }, []);

    useEffect(() => {
      // Warp effect
      warpStretch.value = withSequence(
        withTiming(3, { duration: 400 }),
        withTiming(1, { duration: 600 })
      );
    }, [currentStage]);

    const starStyle = useAnimatedStyle(() => ({
      opacity: interpolate(twinkle.value, [0, 1], [star.opacity * 0.3, star.opacity]),
      transform: [
        { scaleX: interpolate(warpSpeed.value, [0, 1], [1, warpStretch.value]) }
      ],
    }));

    return (
      <Animated.View 
        style={[
          styles.star,
          {
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          },
          starStyle
        ]} 
      />
    );
  };

  const GalaxyCenter = () => {
    const centerStyle = useAnimatedStyle(() => ({
      transform: [
        { rotate: `${galaxyRotation.value}deg` },
        { scale: galaxyPulse.value }
      ],
    }));

    const currentStageData = galaxyStages[currentStage] || galaxyStages[0];

    return (
      <View style={styles.galaxyCenter}>
        <Animated.View style={[styles.galaxyCore, centerStyle]}>
          <View style={[styles.coreRing, styles.ring1, { borderColor: currentStageData.color }]} />
          <View style={[styles.coreRing, styles.ring2, { borderColor: currentStageData.color }]} />
          <View style={[styles.coreRing, styles.ring3, { borderColor: currentStageData.color }]} />
          
          <View style={[styles.centerIcon, { backgroundColor: currentStageData.color }]}>
            <currentStageData.icon size={24} color="#FFFFFF" />
          </View>
        </Animated.View>
      </View>
    );
  };

  const OrbitingStage = ({ stage, index }: { stage: any; index: number }) => {
    const orbitRotation = useSharedValue(0);
    const stageScale = useSharedValue(0.8);
    const stageOpacity = useSharedValue(0.4);
    const glowIntensity = useSharedValue(0);

    const isActive = index <= currentStage;
    const isCurrent = index === currentStage;

    useEffect(() => {
      // Orbital motion
      orbitRotation.value = withRepeat(
        withTiming(360, { 
          duration: 15000 + index * 2000, 
          easing: Easing.linear 
        }),
        -1,
        false
      );

      if (isCurrent) {
        stageScale.value = withSequence(
          withTiming(1.3, { duration: 600 }),
          withTiming(1.2, { duration: 400 })
        );
        stageOpacity.value = withTiming(1, { duration: 500 });
        glowIntensity.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 1000 }),
            withTiming(0.3, { duration: 1000 })
          ),
          -1,
          true
        );
      } else if (isActive) {
        stageScale.value = withTiming(1, { duration: 400 });
        stageOpacity.value = withTiming(1, { duration: 500 });
        glowIntensity.value = withTiming(0.5, { duration: 300 });
      } else {
        stageScale.value = withTiming(0.8, { duration: 400 });
        stageOpacity.value = withTiming(0.4, { duration: 500 });
        glowIntensity.value = withTiming(0, { duration: 300 });
      }
    }, [currentStage]);

    const orbitStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${orbitRotation.value}deg` }],
    }));

    const stageStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: stageScale.value },
        { rotate: `${-orbitRotation.value}deg` } // Counter-rotate to keep icon upright
      ],
      opacity: stageOpacity.value,
      shadowOpacity: interpolate(glowIntensity.value, [0, 1], [0, 0.8]),
      shadowRadius: interpolate(glowIntensity.value, [0, 1], [0, 15]),
    }));

    const IconComponent = stage.icon;

    return (
      <Animated.View 
        style={[
          styles.orbitContainer,
          { width: stage.distance * 2, height: stage.distance * 2 },
          orbitStyle
        ]}
      >
        <Animated.View 
          style={[
            styles.orbitingStage,
            { 
              backgroundColor: stage.color,
              shadowColor: stage.color,
            },
            stageStyle
          ]}
        >
          <IconComponent size={16} color="#FFFFFF" />
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarField />
      
      <View style={styles.header}>
        <Star size={32} color="#F59E0B" />
        <Text style={styles.title}>Galaxy Tracking</Text>
        <Text style={styles.subtitle}>Cosmic order journey</Text>
      </View>

      <View style={styles.galaxyContainer}>
        <GalaxyCenter />
        
        {galaxyStages.map((stage, index) => (
          <OrbitingStage key={stage.id} stage={stage} index={index} />
        ))}
      </View>

      <View style={styles.infoPanel}>
        <Text style={styles.currentStageTitle}>
          {galaxyStages[currentStage]?.title || 'Initializing...'}
        </Text>
        <Text style={styles.constellationText}>
          Constellation: {galaxyStages[currentStage]?.constellation || 'Unknown'}
        </Text>
        <Text style={styles.progressText}>
          {Math.round(((currentStage + 1) / galaxyStages.length) * 100)}% Journey Complete
        </Text>
      </View>

      <View style={styles.stagesList}>
        {galaxyStages.map((stage, index) => (
          <View key={stage.id} style={styles.stageItem}>
            <View style={[
              styles.stageIndicator,
              { 
                backgroundColor: index <= currentStage ? stage.color : '#374151',
                opacity: index <= currentStage ? 1 : 0.4
              }
            ]}>
              <stage.icon size={12} color="#FFFFFF" />
            </View>
            <Text style={[
              styles.stageItemText,
              { color: index <= currentStage ? '#FFFFFF' : '#6B7280' }
            ]}>
              {stage.title}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.resetButton,
          { backgroundColor: galaxyStages[currentStage]?.color || '#3B82F6' }
        ]}
        onPress={() => setCurrentStage(0)}
      >
        <Text style={styles.resetButtonText}>Reset Galaxy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000011',
  },
  starField: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
    zIndex: 10,
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
  galaxyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  galaxyCenter: {
    position: 'absolute',
    zIndex: 5,
  },
  galaxyCore: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coreRing: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 50,
    opacity: 0.6,
  },
  ring1: {
    width: 60,
    height: 60,
  },
  ring2: {
    width: 80,
    height: 80,
    opacity: 0.4,
  },
  ring3: {
    width: 100,
    height: 100,
    opacity: 0.2,
  },
  centerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  orbitContainer: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orbitingStage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  infoPanel: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  currentStageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  constellationText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  stagesList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  stageItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    padding: 8,
    borderRadius: 8,
  },
  stageIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stageItemText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  resetButton: {
    marginHorizontal: 20,
    marginBottom: 20,
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