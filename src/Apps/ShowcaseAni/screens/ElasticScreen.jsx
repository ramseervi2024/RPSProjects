import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { X, Info, Heart, Star, Bookmark } from 'lucide-react-native';

const tooltipButtons = [
  { id: 1, icon: Heart, tooltip: 'Add to favorites', color: '#EF4444' },
  { id: 2, icon: Star, tooltip: 'Rate this item', color: '#F59E0B' },
  { id: 3, icon: Bookmark, tooltip: 'Save for later', color: '#3B82F6' },
  { id: 4, icon: Info, tooltip: 'More information', color: '#10B981' },
];

export default function TooltipAnimation({ onClose }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleClose = () => {
    runOnJS(onClose)();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tooltip Appear Animation</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Long press any button below to see tooltip animations
        </Text>
        
        <View style={styles.buttonContainer}>
          {tooltipButtons.map((button) => (
            <TooltipButton
              key={button.id}
              button={button}
              isActive={activeTooltip === button.id}
              onShow={() => setActiveTooltip(button.id)}
              onHide={() => setActiveTooltip(null)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function TooltipButton({ button, isActive, onShow, onHide }: any) {
  const tooltipProgress = useSharedValue(0);
  const IconComponent = button.icon;

  React.useEffect(() => {
    tooltipProgress.value = withDelay(
      isActive ? 300 : 0,
      withSpring(isActive ? 1 : 0, { damping: 15, stiffness: 150 })
    );
  }, [isActive]);

  const tooltipStyle = useAnimatedStyle(() => ({
    opacity: tooltipProgress.value,
    transform: [
      { scale: interpolate(tooltipProgress.value, [0, 1], [0.8, 1]) },
      { translateY: interpolate(tooltipProgress.value, [0, 1], [10, 0]) }
    ],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(tooltipProgress.value, [0, 1], [1, 1.1]) }],
  }));

  return (
    <View style={styles.tooltipContainer}>
      <Animated.View style={[styles.tooltip, tooltipStyle]}>
        <Text style={styles.tooltipText}>{button.tooltip}</Text>
        <View style={styles.tooltipArrow} />
      </Animated.View>
      
      <Animated.View style={buttonStyle}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: button.color }]}
          onPressIn={onShow}
          onPressOut={onHide}
          delayPressIn={300}
        >
          <IconComponent size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>
    </View>
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
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  tooltipContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tooltip: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
    position: 'relative',
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    marginLeft: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1F2937',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});