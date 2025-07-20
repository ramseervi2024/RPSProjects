import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withDelay, 
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';

const items = [
  { id: 1, title: 'Animation Item 1', subtitle: 'Staggered entrance' },
  { id: 2, title: 'Animation Item 2', subtitle: 'Delayed by 100ms' },
  { id: 3, title: 'Animation Item 3', subtitle: 'Delayed by 200ms' },
  { id: 4, title: 'Animation Item 4', subtitle: 'Delayed by 300ms' },
  { id: 5, title: 'Animation Item 5', subtitle: 'Delayed by 400ms' },
  { id: 6, title: 'Animation Item 6', subtitle: 'Final item' },
];

export default function StaggeredListAnimation({ onClose }) {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
    opacity.value = withSpring(1, { damping: 15, stiffness: 150 });
  }, []);

  const handleClose = () => {
    translateY.value = withSpring(50, { damping: 15, stiffness: 150 });
    opacity.value = withSpring(0, { damping: 15, stiffness: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
      }))]}>
        <Text style={styles.title}>Staggered List Animation</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <StaggeredItem 
            key={item.id} 
            item={item} 
            index={index} 
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

function StaggeredItem({ item, index }) {
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    translateY.value = withDelay(
      index * 100,
      withSpring(0, { damping: 12, stiffness: 120 })
    );
    opacity.value = withDelay(
      index * 100,
      withSpring(1, { damping: 12, stiffness: 120 })
    );
    scale.value = withDelay(
      index * 100,
      withSpring(1, { damping: 12, stiffness: 120 })
    );
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
    </Animated.View>
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
  listContainer: {
    flex: 1,
    padding: 24,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});