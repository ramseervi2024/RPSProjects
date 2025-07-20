import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Truck, ArrowLeft, Package } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function OrderDeliveredSuccess() {
  const truckTranslateX = useSharedValue(-200);
  const packageOpacity = useSharedValue(0);
  const packageScale = useSharedValue(0.8);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(20);

  useEffect(() => {
    // Truck drives in
    truckTranslateX.value = withDelay(
      500,
      withSpring(0, { damping: 15, stiffness: 100 })
    );

    // Package appears
    packageOpacity.value = withDelay(1200, withTiming(1, { duration: 300 }));
    packageScale.value = withDelay(
      1200,
      withSpring(1, { damping: 12, stiffness: 150 })
    );

    // Message fades in
    messageOpacity.value = withDelay(1800, withTiming(1, { duration: 500 }));
    messageTranslateY.value = withDelay(1800, withSpring(0, { damping: 15, stiffness: 100 }));

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const truckAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: truckTranslateX.value }],
  }));

  const packageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: packageOpacity.value,
    transform: [{ scale: packageScale.value }],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color="#64748b" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.truckContainer, truckAnimatedStyle]}>
            <Truck size={60} color="#3B82F6" />
          </Animated.View>

          <Animated.View style={[styles.packageContainer, packageAnimatedStyle]}>
            <Package size={40} color="#10B981" />
          </Animated.View>
        </View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Delivered Successfully!</Text>
          <Text style={styles.subtitle}>
            Your order has been delivered{'\n'}to your doorstep
          </Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Package received</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  animationContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  truckContainer: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#EBF4FF',
    padding: 20,
    borderRadius: 50,
  },
  packageContainer: {
    position: 'absolute',
    right: 60,
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98115',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
});