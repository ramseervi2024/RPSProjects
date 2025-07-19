import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withDelay,
  interpolateColor,
  runOnJS
} from 'react-native-reanimated';
import { Package, Clock, Truck, MapPin, CircleCheck as CheckCircle, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orderStates = [
  {
    id: 1,
    title: 'Order Received',
    time: '2 hours ago',
    status: 'completed',
    icon: Package,
    color: '#10B981',
    description: 'Your order has been successfully placed and payment confirmed.',
    details: 'Order #ORD-001234'
  },
  {
    id: 2,
    title: 'Preparing Package',
    time: '1 hour ago',
    status: 'active',
    icon: Clock,
    color: '#F59E0B',
    description: 'Our team is carefully preparing your items for shipment.',
    details: 'Estimated: 30 minutes'
  },
  {
    id: 3,
    title: 'In Transit',
    time: 'Pending',
    status: 'pending',
    icon: Truck,
    color: '#6B7280',
    description: 'Package will be picked up by courier soon.',
    details: 'Tracking: TRK-567890'
  },
  {
    id: 4,
    title: 'Out for Delivery',
    time: 'Pending',
    status: 'pending',
    icon: MapPin,
    color: '#6B7280',
    description: 'Package is out for delivery to your address.',
    details: 'ETA: Tomorrow 2-4 PM'
  },
  {
    id: 5,
    title: 'Delivered',
    time: 'Pending',
    status: 'pending',
    icon: CheckCircle,
    color: '#6B7280',
    description: 'Package successfully delivered to your doorstep.',
    details: 'Signature required'
  },
];

export default function CardsAnimation() {
  const [currentState, setCurrentState] = useState(0);
  const [animatedStates, setAnimatedStates] = useState(orderStates);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentState(prev => {
        const next = prev + 1;
        if (next >= orderStates.length) {
          // Reset all to initial state
          setAnimatedStates(orderStates);
          return 0;
        }
        
        // Update states
        const updatedStates = orderStates.map((state, index) => ({
          ...state,
          status: index < next ? 'completed' : index === next ? 'active' : 'pending',
          time: index <= next ? (index === next ? 'Now' : state.time) : 'Pending'
        }));
        setAnimatedStates(updatedStates);
        
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const OrderCard = ({ order, index }) => {
    const scale = useSharedValue(0.95);
    const opacity = useSharedValue(0.6);
    const translateY = useSharedValue(10);
    const borderWidth = useSharedValue(0);
    const shadowOpacity = useSharedValue(0.1);

    const isCompleted = order.status === 'completed';
    const isActive = order.status === 'active';
    const isPending = order.status === 'pending';

    useEffect(() => {
      const delay = index * 100;
      
      if (isActive) {
        scale.value = withDelay(delay, withSpring(1.02, { damping: 8 }));
        opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
        translateY.value = withDelay(delay, withSpring(0, { damping: 6 }));
        borderWidth.value = withDelay(delay, withTiming(2, { duration: 300 }));
        shadowOpacity.value = withDelay(delay, withTiming(0.15, { duration: 300 }));
      } else if (isCompleted) {
        scale.value = withDelay(delay, withTiming(1, { duration: 300 }));
        opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
        translateY.value = withDelay(delay, withTiming(0, { duration: 300 }));
        borderWidth.value = withDelay(delay, withTiming(1, { duration: 300 }));
        shadowOpacity.value = withDelay(delay, withTiming(0.1, { duration: 300 }));
      } else {
        scale.value = withDelay(delay, withTiming(0.95, { duration: 300 }));
        opacity.value = withDelay(delay, withTiming(0.6, { duration: 400 }));
        translateY.value = withDelay(delay, withTiming(10, { duration: 300 }));
        borderWidth.value = withDelay(delay, withTiming(0, { duration: 300 }));
        shadowOpacity.value = withDelay(delay, withTiming(0.05, { duration: 300 }));
      }
    }, [order.status]);

    const cardStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
      opacity: opacity.value,
      borderWidth: borderWidth.value,
      borderColor: isActive ? '#3B82F6' : isCompleted ? '#10B981' : 'transparent',
      shadowOpacity: shadowOpacity.value,
    }));

    const iconBgStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        opacity.value,
        [0.6, 1],
        [isCompleted ? order.color : '#E5E7EB', order.color]
      ),
    }));

    const IconComponent = order.icon;

    return (
      <Animated.View style={[styles.card, cardStyle]}>
        <View style={styles.cardHeader}>
          <Animated.View style={[styles.iconContainer, iconBgStyle]}>
            <IconComponent 
              size={20} 
              color={isCompleted || isActive ? '#FFFFFF' : '#9CA3AF'} 
            />
          </Animated.View>
          <View style={styles.headerText}>
            <Text style={[
              styles.cardTitle,
              { color: isCompleted || isActive ? '#111827' : '#9CA3AF' }
            ]}>
              {order.title}
            </Text>
            <Text style={styles.cardTime}>{order.time}</Text>
          </View>
          {isActive && (
            <View style={styles.activeIndicator}>
              <View style={styles.pulse} />
            </View>
          )}
        </View>
        
        <Text style={[
          styles.cardDescription,
          { color: isCompleted || isActive ? '#6B7280' : '#9CA3AF' }
        ]}>
          {order.description}
        </Text>
        
        <Text style={styles.cardDetails}>{order.details}</Text>
        
        {isCompleted && (
          <View style={styles.completedBadge}>
            <CheckCircle size={16} color="#10B981" />
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Order Journey</Text>
          <View style={styles.rating}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>4.9 delivery rating</Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {animatedStates.map((order, index) => (
            <OrderCard key={order.id} order={order} index={index} />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.restartButton}
          onPress={() => {
            setCurrentState(0);
            setAnimatedStates(orderStates);
          }}
        >
          <Text style={styles.restartButtonText}>Restart Journey</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'relative',
    width: 12,
    height: 12,
  },
  pulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  restartButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 24,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});