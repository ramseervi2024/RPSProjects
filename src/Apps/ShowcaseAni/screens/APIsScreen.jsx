import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { X, Star } from 'lucide-react-native';

export default function SharedElementTransition({ onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = useSharedValue(0);

  const toggleExpanded = () => {
    const newValue = isExpanded ? 0 : 1;
    progress.value = withSpring(newValue, { damping: 15, stiffness: 150 });
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    progress.value = withSpring(0, { damping: 15, stiffness: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 1.05]);
    const translateY = interpolate(progress.value, [0, 1], [0, -50]);
    
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const expandedContentStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.8, 1]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shared Element Transition</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={toggleExpanded} activeOpacity={0.9}>
          <Animated.View style={[styles.card, cardStyle]}>
            <View style={styles.cardHeader}>
              <Animated.View style={iconStyle}>
                <Star size={32} color="#F59E0B" fill="#F59E0B" />
              </Animated.View>
              <Text style={styles.cardTitle}>Shared Element Card</Text>
            </View>
            
            <Text style={styles.cardSubtitle}>
              Tap to see shared element transition
            </Text>

            <Animated.View style={[styles.expandedContent, expandedContentStyle]}>
              <Text style={styles.expandedText}>
                This content appears with a smooth transition when the card expands. 
                The star icon rotates and the card scales up creating a shared element effect.
              </Text>
              <View style={styles.metrics}>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>85%</Text>
                  <Text style={styles.metricLabel}>Performance</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>120ms</Text>
                  <Text style={styles.metricLabel}>Duration</Text>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 12,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  expandedContent: {
    marginTop: 16,
  },
  expandedText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 20,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B82F6',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});