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
import { Truck, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FreeShippingSuccess() {
  const truckTranslateX = useSharedValue(-300);
  const truckScale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(0.8);
  const messageOpacity = useSharedValue(0);

  useEffect(() => {
    // Truck appears and moves
    truckScale.value = withDelay(
      300,
      withSpring(1, { damping: 12, stiffness: 150 })
    );
    truckTranslateX.value = withDelay(
      500,
      withSpring(0, { damping: 15, stiffness: 100 })
    );

    // Text reveals
    textOpacity.value = withDelay(1200, withTiming(1, { duration: 400 }));
    textScale.value = withDelay(
      1200,
      withSpring(1, { damping: 10, stiffness: 150 })
    );

    // Message appears
    messageOpacity.value = withDelay(1800, withTiming(1, { duration: 500 }));

    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const truckAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: truckTranslateX.value },
      { scale: truckScale.value },
    ],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
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
            <Truck size={80} color="#10B981" />
          </Animated.View>

          <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
            <Text style={styles.freeText}>FREE</Text>
            <Text style={styles.shippingText}>SHIPPING</Text>
          </Animated.View>
        </View>

        <Animated.View style={messageAnimatedStyle}>
          <Text style={styles.title}>Free Shipping Unlocked!</Text>
          <Text style={styles.subtitle}>
            Congratulations! You've earned{'\n'}free shipping on all orders
          </Text>
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🚚</Text>
              <Text style={styles.benefitText}>No delivery charges</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>⚡</Text>
              <Text style={styles.benefitText}>Fast & reliable delivery</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📦</Text>
              <Text style={styles.benefitText}>All future orders included</Text>
            </View>
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
    backgroundColor: '#ECFDF5',
    padding: 30,
    borderRadius: 50,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  textContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    transform: [{ rotate: '-5deg' }],
  },
  freeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 20,
  },
  shippingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 2,
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
    marginBottom: 32,
  },
  benefitsContainer: {
    backgroundColor: '#10B98115',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#10B98130',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  benefitText: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '500',
    flex: 1,
  },
});