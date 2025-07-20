import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface Props {
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

const cards = [
  { id: 1, title: 'Card One', color: '#3B82F6', description: 'First card in the stack' },
  { id: 2, title: 'Card Two', color: '#8B5CF6', description: 'Second card with different color' },
  { id: 3, title: 'Card Three', color: '#10B981', description: 'Third card in the sequence' },
  { id: 4, title: 'Card Four', color: '#F59E0B', description: 'Fourth and final card' },
];

export default function CardStackTransition({ onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      const newIndex = currentIndex + 1;
      translateX.value = withSpring(-newIndex * (CARD_WIDTH + 20), { damping: 15, stiffness: 150 });
      setCurrentIndex(newIndex);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      translateX.value = withSpring(-newIndex * (CARD_WIDTH + 20), { damping: 15, stiffness: 150 });
      setCurrentIndex(newIndex);
    }
  };

  const handleClose = () => {
    translateX.value = withSpring(0, { damping: 15, stiffness: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Card Stack Transition</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.cardStack, useAnimatedStyle(() => ({
            transform: [{ translateX: translateX.value }],
          }))]}>
            {cards.map((card, index) => (
              <CardItem 
                key={card.id} 
                card={card} 
                index={index}
                currentIndex={currentIndex}
              />
            ))}
          </Animated.View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, currentIndex === 0 && styles.controlButtonDisabled]}
            onPress={prevCard}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} color={currentIndex === 0 ? '#D1D5DB' : '#374151'} />
          </TouchableOpacity>
          
          <View style={styles.indicators}>
            {cards.map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.indicatorActive
                ]}
              />
            ))}
          </View>
          
          <TouchableOpacity 
            style={[styles.controlButton, currentIndex === cards.length - 1 && styles.controlButtonDisabled]}
            onPress={nextCard}
            disabled={currentIndex === cards.length - 1}
          >
            <ChevronRight size={24} color={currentIndex === cards.length - 1 ? '#D1D5DB' : '#374151'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function CardItem({ card, index, currentIndex }: any) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    const distance = Math.abs(index - currentIndex);
    scale.value = withSpring(1 - distance * 0.1, { damping: 15, stiffness: 150 });
    opacity.value = withSpring(1 - distance * 0.3, { damping: 15, stiffness: 150 });
  }, [currentIndex, index]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.card, { backgroundColor: card.color }, cardStyle]}>
      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardDescription}>{card.description}</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: 300,
    width: width,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStack: {
    flexDirection: 'row',
    height: 240,
  },
  card: {
    width: CARD_WIDTH,
    height: 240,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 40,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  controlButtonDisabled: {
    opacity: 0.5,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: '#3B82F6',
    width: 24,
  },
});