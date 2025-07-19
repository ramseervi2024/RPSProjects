import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSpring,
  interpolateColor
} from 'react-native-reanimated';
import { Check, Clock, Truck, Package, MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const timelineEvents = [
  {
    id: 1,
    title: 'Order Confirmed',
    time: '2:30 PM',
    date: 'Today',
    description: 'Your order has been placed and confirmed',
    icon: Package,
    color: '#10B981',
  },
  {
    id: 2,
    title: 'Payment Processed',
    time: '2:35 PM',
    date: 'Today',
    description: 'Payment has been successfully processed',
    icon: Check,
    color: '#10B981',
  },
  {
    id: 3,
    title: 'Being Prepared',
    time: '3:15 PM',
    date: 'Today',
    description: 'Your items are being prepared for shipment',
    icon: Clock,
    color: '#F59E0B',
  },
  {
    id: 4,
    title: 'Shipped',
    time: '5:20 PM',
    date: 'Today',
    description: 'Package has been shipped via FedEx',
    icon: Truck,
    color: '#6B7280',
  },
  {
    id: 5,
    title: 'Out for Delivery',
    time: '10:30 AM',
    date: 'Tomorrow',
    description: 'Package is out for delivery',
    icon: MapPin,
    color: '#6B7280',
  },
];

export default function TimelineAnimation() {
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEvent(prev => {
        if (prev < timelineEvents.length - 1) {
          return prev + 1;
        }
        return 0; // Reset
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const TimelineItem = ({ event, index }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);
    const lineHeight = useSharedValue(0);
    const iconScale = useSharedValue(0);
    const progress = useSharedValue(0);

    const isActive = index <= currentEvent;
    const isCurrent = index === currentEvent;

    useEffect(() => {
      if (isActive) {
        opacity.value = withDelay(index * 200, withTiming(1, { duration: 600 }));
        translateY.value = withDelay(index * 200, withSpring(0, { damping: 8 }));
        iconScale.value = withDelay(index * 300, withSpring(1, { damping: 6 }));
        lineHeight.value = withDelay(index * 400, withTiming(1, { duration: 500 }));
        progress.value = withTiming(isCurrent ? 1 : 0.5, { duration: 300 });
      } else {
        opacity.value = withTiming(0.4, { duration: 300 });
        translateY.value = withTiming(20, { duration: 300 });
        iconScale.value = withTiming(0.8, { duration: 300 });
        lineHeight.value = withTiming(0, { duration: 300 });
        progress.value = withTiming(0, { duration: 300 });
      }
    }, [currentEvent]);

    const itemStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }));

    const lineStyle = useAnimatedStyle(() => ({
      height: lineHeight.value * 60,
    }));

    const iconStyle = useAnimatedStyle(() => ({
      transform: [{ scale: iconScale.value }],
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        ['#E5E7EB', event.color, event.color]
      ),
    }));

    const IconComponent = event.icon;

    return (
      <View style={styles.timelineItem}>
        <View style={styles.timelineLeft}>
          <Animated.View style={[styles.timelineIcon, iconStyle]}>
            <IconComponent size={16} color="#FFFFFF" />
          </Animated.View>
          {index < timelineEvents.length - 1 && (
            <Animated.View style={[styles.timelineLine, lineStyle]} />
          )}
        </View>
        <Animated.View style={[styles.timelineContent, itemStyle]}>
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>{event.title}</Text>
            <Text style={styles.timelineTime}>{event.time}</Text>
          </View>
          <Text style={styles.timelineDate}>{event.date}</Text>
          <Text style={styles.timelineDescription}>{event.description}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Order Timeline</Text>
          <Text style={styles.subtitle}>Track your order progress</Text>
        </View>

        <View style={styles.timelineContainer}>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.restartButton}
          onPress={() => setCurrentEvent(0)}
        >
          <Text style={styles.restartButtonText}>Restart Timeline</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  timelineContainer: {
    paddingHorizontal: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 32,
    marginRight: 16,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  timelineTime: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  timelineDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  restartButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 24,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});