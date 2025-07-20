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
import { X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react-native';


const { width, height } = Dimensions.get('window');

const pages = [
  { 
    id: 1, 
    title: 'Page One', 
    content: 'This is the first page of our flipbook. Watch as the pages curl and flip with smooth animations.',
    color: '#3B82F6'
  },
  { 
    id: 2, 
    title: 'Page Two', 
    content: 'The second page shows how each transition creates a realistic page-turning effect.',
    color: '#8B5CF6'
  },
  { 
    id: 3, 
    title: 'Page Three', 
    content: 'Our third page demonstrates the depth and perspective changes during the flip animation.',
    color: '#10B981'
  },
  { 
    id: 4, 
    title: 'Final Page', 
    content: 'This final page completes our flipbook journey with a satisfying page curl animation.',
    color: '#F59E0B'
  },
];

export default function PageCurlAnimation({ onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const flipProgress = useSharedValue(0);
  const isFlipping = useSharedValue(false);

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping.value) {
      isFlipping.value = true;
      flipProgress.value = withSpring(1, { damping: 15, stiffness: 150 }, () => {
        runOnJS(setCurrentPage)(currentPage + 1);
        flipProgress.value = 0;
        isFlipping.value = false;
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping.value) {
      isFlipping.value = true;
      flipProgress.value = withSpring(-1, { damping: 15, stiffness: 150 }, () => {
        runOnJS(setCurrentPage)(currentPage - 1);
        flipProgress.value = 0;
        isFlipping.value = false;
      });
    }
  };

  const handleClose = () => {
    flipProgress.value = withSpring(0, { damping: 15, stiffness: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  const currentPageStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [0, -90]);
    const scale = interpolate(Math.abs(flipProgress.value), [0, 0.5, 1], [1, 0.9, 0.8]);
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale }
      ],
    };
  });

  const nextPageStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [90, 0]);
    const opacity = interpolate(flipProgress.value, [0, 0.5, 1], [0, 0.5, 1]);
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
      ],
      opacity,
    };
  });

  const shadowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(Math.abs(flipProgress.value), [0, 1], [0.1, 0.3]),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BookOpen size={24} color="#1F2937" />
        <Text style={styles.title}>Page Curl Animation</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.bookContainer}>
        <View style={styles.book}>
          {/* Shadow */}
          <Animated.View style={[styles.shadow, shadowStyle]} />
          
          {/* Current Page */}
          <Animated.View style={[styles.page, currentPageStyle]}>
            <PageContent page={pages[currentPage]} />
          </Animated.View>

          {/* Next Page (visible during flip) */}
          {flipProgress.value !== 0 && (
            <Animated.View style={[styles.page, styles.nextPage, nextPageStyle]}>
              <PageContent 
                page={pages[currentPage + (flipProgress.value > 0 ? 1 : -1)]} 
              />
            </Animated.View>
          )}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, currentPage === 0 && styles.controlButtonDisabled]}
            onPress={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={24} color={currentPage === 0 ? '#D1D5DB' : '#374151'} />
          </TouchableOpacity>
          
          <Text style={styles.pageIndicator}>
            {currentPage + 1} of {pages.length}
          </Text>
          
          <TouchableOpacity 
            style={[styles.controlButton, currentPage === pages.length - 1 && styles.controlButtonDisabled]}
            onPress={nextPage}
            disabled={currentPage === pages.length - 1}
          >
            <ChevronRight size={24} color={currentPage === pages.length - 1 ? '#D1D5DB' : '#374151'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function PageContent({ page }: { page: any }) {
  return (
    <View style={[styles.pageContent, { backgroundColor: page.color }]}>
      <Text style={styles.pageTitle}>{page.title}</Text>
      <Text style={styles.pageText}>{page.content}</Text>
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
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  book: {
    width: width - 80,
    height: height * 0.6,
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 12,
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
  page: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  nextPage: {
    zIndex: -1,
  },
  pageContent: {
    flex: 1,
    padding: 32,
    borderRadius: 12,
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  pageText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    opacity: 0.9,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 32,
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
  pageIndicator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});