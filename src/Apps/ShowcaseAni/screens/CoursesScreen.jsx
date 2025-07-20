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
import { X, MoreVertical, Share, Edit, Trash } from 'lucide-react-native';

interface Props {
  onClose: () => void;
}

export default function PopoverAnimation({ onClose }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverProgress = useSharedValue(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const togglePopover = () => {
    const newValue = isPopoverOpen ? 0 : 1;
    popoverProgress.value = withSpring(newValue, { damping: 15, stiffness: 150 });
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleClose = () => {
    popoverProgress.value = withSpring(0, { damping: 15, stiffness: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  const popoverStyle = useAnimatedStyle(() => ({
    opacity: popoverProgress.value,
    transform: [
      { scale: interpolate(popoverProgress.value, [0, 1], [0.8, 1]) },
      { translateY: interpolate(popoverProgress.value, [0, 1], [-10, 0]) }
    ],
    pointerEvents: popoverProgress.value > 0 ? 'auto' : 'none',
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: popoverProgress.value * 0.3,
    pointerEvents: popoverProgress.value > 0 ? 'auto' : 'none',
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popover Fade Animation</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Sample Document</Text>
            <TouchableOpacity 
              style={styles.moreButton} 
              onPress={togglePopover}
            >
              <MoreVertical size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.cardDescription}>
            This is a sample document with a popover menu. Tap the three dots to see the fade animation.
          </Text>
        </View>

        {(isPopoverOpen || popoverProgress.value > 0) && (
          <>
            <Animated.View style={[styles.overlay, overlayStyle]}>
              <TouchableOpacity style={styles.overlayTouchable} onPress={togglePopover} />
            </Animated.View>

            <Animated.View style={[styles.popover, popoverStyle]}>
              <TouchableOpacity style={styles.popoverItem}>
                <Share size={16} color="#3B82F6" />
                <Text style={styles.popoverText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.popoverItem}>
                <Edit size={16} color="#10B981" />
                <Text style={styles.popoverText}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.popoverItem}>
                <Trash size={16} color="#EF4444" />
                <Text style={styles.popoverText}>Delete</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
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
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  moreButton: {
    padding: 8,
    borderRadius: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  overlayTouchable: {
    flex: 1,
  },
  popover: {
    position: 'absolute',
    top: 200,
    right: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 120,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  popoverText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
});