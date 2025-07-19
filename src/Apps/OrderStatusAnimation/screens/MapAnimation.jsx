import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withSequence,
  interpolate,
  withDelay
} from 'react-native-reanimated';
import { MapPin, Navigation, Truck, Chrome as Home, Package } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const locations = [
  { id: 1, name: 'Warehouse', icon: Package, x: 50, y: 400, color: '#8B5CF6' },
  { id: 2, name: 'Sorting Center', icon: Navigation, x: 150, y: 350, color: '#F59E0B' },
  { id: 3, name: 'Local Hub', icon: Truck, x: 250, y: 250, color: '#3B82F6' },
  { id: 4, name: 'Your Location', icon: Home, x: 300, y: 150, color: '#10B981' },
];

const routePath = [
  { x: 50, y: 400 },
  { x: 150, y: 350 },
  { x: 250, y: 250 },
  { x: 300, y: 150 },
];

export default function MapAnimation() {
  const [currentLocation, setCurrentLocation] = useState(0);
  const truckPosition = useSharedValue({ x: 50, y: 400 });
  const routeProgress = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLocation(prev => {
        const next = prev + 1;
        if (next >= locations.length) {
          return 0; // Reset
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentLocation === 0) {
      // Reset animation
      truckPosition.value = { x: 50, y: 400 };
      routeProgress.value = 0;
    } else {
      const targetLocation = routePath[currentLocation];
      
      truckPosition.value = withTiming(
        targetLocation,
        { duration: 1500 }
      );
      
      routeProgress.value = withTiming(
        currentLocation / (locations.length - 1),
        { duration: 1500 }
      );
    }
  }, [currentLocation]);

  const LocationPin = ({ location, index }) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0.4);
    const pulseScale = useSharedValue(1);

    const isVisited = index <= currentLocation;
    const isCurrent = index === currentLocation;

    useEffect(() => {
      if (isVisited) {
        scale.value = withSpring(1, { damping: 6 });
        opacity.value = withTiming(1, { duration: 400 });
        
        if (isCurrent) {
          pulseScale.value = withSequence(
            withTiming(1.3, { duration: 600 }),
            withTiming(1, { duration: 600 })
          );
        }
      } else {
        scale.value = withTiming(0.8, { duration: 300 });
        opacity.value = withTiming(0.4, { duration: 300 });
        pulseScale.value = withTiming(1, { duration: 300 });
      }
    }, [currentLocation]);

    const pinStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { translateX: -15 },
        { translateY: -15 }
      ],
      opacity: opacity.value,
    }));

    const pulseStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: pulseScale.value },
        { translateX: -20 },
        { translateY: -20 }
      ],
      opacity: isCurrent ? 0.3 : 0,
    }));

    const IconComponent = location.icon;

    return (
      <View style={[styles.locationContainer, { left: location.x, top: location.y }]}>
        <Animated.View 
          style={[
            styles.pulseBg, 
            { backgroundColor: location.color },
            pulseStyle
          ]} 
        />
        <Animated.View 
          style={[
            styles.locationPin,
            { backgroundColor: location.color },
            pinStyle
          ]}
        >
          <IconComponent size={16} color="#FFFFFF" />
        </Animated.View>
        <Text style={[
          styles.locationName,
          { color: isVisited ? '#111827' : '#9CA3AF' }
        ]}>
          {location.name}
        </Text>
      </View>
    );
  };

  const TruckMarker = () => {
    const rotation = useSharedValue(0);

    useEffect(() => {
      // Calculate rotation based on movement direction
      if (currentLocation > 0) {
        const from = routePath[currentLocation - 1];
        const to = routePath[currentLocation];
        const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
        rotation.value = withTiming(angle, { duration: 500 });
      }
    }, [currentLocation]);

    const truckStyle = useAnimatedStyle(() => ({
      left: truckPosition.value.x - 20,
      top: truckPosition.value.y - 20,
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
      <Animated.View style={[styles.truckMarker, truckStyle]}>
        <View style={styles.truckContainer}>
          <Truck size={24} color="#FFFFFF" />
        </View>
      </Animated.View>
    );
  };

  const RouteLines = () => {
    const pathOpacity = useSharedValue(0);

    useEffect(() => {
      pathOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    }, []);

    const pathStyle = useAnimatedStyle(() => ({
      opacity: pathOpacity.value,
    }));

    return (
      <Animated.View style={[styles.routeContainer, pathStyle]}>
        {routePath.slice(0, -1).map((point, index) => {
          const nextPoint = routePath[index + 1];
          const length = Math.sqrt(
            Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2)
          );
          const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

          const lineProgress = useSharedValue(0);

          useEffect(() => {
            if (currentLocation > index) {
              lineProgress.value = withTiming(1, { duration: 800 });
            } else {
              lineProgress.value = withTiming(0, { duration: 400 });
            }
          }, [currentLocation]);

          const lineStyle = useAnimatedStyle(() => ({
            width: interpolate(lineProgress.value, [0, 1], [0, length]),
          }));

          return (
            <View
              key={index}
              style={[
                styles.routeLine,
                {
                  left: point.x,
                  top: point.y,
                  transform: [{ rotate: `${angle}deg` }],
                }
              ]}
            >
              <Animated.View style={[styles.activeRouteLine, lineStyle]} />
            </View>
          );
        })}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Tracking</Text>
        <Text style={styles.subtitle}>Follow your package journey</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapBackground}>
          <RouteLines />
          
          {locations.map((location, index) => (
            <LocationPin key={location.id} location={location} index={index} />
          ))}
          
          <TruckMarker />
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Current Status</Text>
          <Text style={styles.statusText}>
            {currentLocation < locations.length 
              ? `En route to ${locations[currentLocation]?.name}`
              : 'Delivered!'
            }
          </Text>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: `${(currentLocation / (locations.length - 1)) * 100}%`
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.resetButton}
        onPress={() => setCurrentLocation(0)}
      >
        <Text style={styles.resetButtonText}>Reset Journey</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
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
  mapContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  mapBackground: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  routeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  routeLine: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  activeRouteLine: {
    height: 3,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  locationContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  locationPin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pulseBg: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  locationName: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  truckMarker: {
    position: 'absolute',
    zIndex: 10,
  },
  truckContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  statusContainer: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  resetButton: {
    backgroundColor: '#3B82F6',
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