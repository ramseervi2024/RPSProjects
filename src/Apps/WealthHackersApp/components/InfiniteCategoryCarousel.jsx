import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ArrowRight, ShoppingBag } from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { getCategoryTheme, getCategoryImageUrl } from '../utils/mediaUtils';

const CARD_WIDTH = 220;
const CARD_MARGIN = 14;
const ITEM_FULL_WIDTH = CARD_WIDTH + CARD_MARGIN;
const REPEAT_FACTOR = 40;
const AUTO_PLAY_INTERVAL = 3000;

export default function InfiniteCategoryCarousel({
  categories = [],
  onCategoryPress,
}) {
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);
  const timerRef = useRef(null);
  const isUserInteractingRef = useRef(false);

  const numItems = categories.length;

  // Flattened virtual circular dataset
  const virtualData = useMemo(() => {
    if (numItems <= 1) return categories;
    const items = [];
    for (let r = 0; r < REPEAT_FACTOR; r++) {
      for (let i = 0; i < numItems; i++) {
        items.push({
          ...categories[i],
          virtualKey: `cat-loop-${r}-${categories[i].id || i}`,
          originalIndex: i,
        });
      }
    }
    return items;
  }, [categories, numItems]);

  const middleIndex = useMemo(() => {
    if (numItems <= 1) return 0;
    return Math.floor(REPEAT_FACTOR / 2) * numItems;
  }, [numItems]);

  const currentIndexRef = useRef(middleIndex);
  const [activeCircleIndex, setActiveCircleIndex] = useState(0);

  // Initialize scroll position to the center of virtual repetition
  useEffect(() => {
    currentIndexRef.current = middleIndex;
    setActiveCircleIndex(0);
    if (numItems > 1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: middleIndex * ITEM_FULL_WIDTH,
          animated: false,
        });
      }, 50);
    }
  }, [middleIndex, numItems]);

  // Infinite circular auto-play timer
  const startAutoScroll = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (numItems <= 1 || !isFocused) return;

    timerRef.current = setInterval(() => {
      if (isUserInteractingRef.current) return;

      const nextIndex = currentIndexRef.current + 1;
      currentIndexRef.current = nextIndex;
      setActiveCircleIndex(nextIndex % numItems);

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * ITEM_FULL_WIDTH,
        animated: true,
      });

      // Boundary safety: if reaching near the end, reset seamlessly to middle clone
      if (nextIndex >= (REPEAT_FACTOR - 4) * numItems) {
        setTimeout(() => {
          const normalized = nextIndex % numItems;
          const resetIndex = Math.floor(REPEAT_FACTOR / 2) * numItems + normalized;
          currentIndexRef.current = resetIndex;
          flatListRef.current?.scrollToOffset({
            offset: resetIndex * ITEM_FULL_WIDTH,
            animated: false,
          });
        }, 400);
      }
    }, AUTO_PLAY_INTERVAL);
  }, [numItems, isFocused]);

  const stopAutoScroll = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Manage timer lifecycle
  useEffect(() => {
    if (isFocused && numItems > 1) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return () => stopAutoScroll();
  }, [isFocused, numItems, startAutoScroll, stopAutoScroll]);

  // Touch and drag handlers
  const handleScrollBeginDrag = () => {
    isUserInteractingRef.current = true;
    stopAutoScroll();
  };

  const handleScrollEndDrag = () => {
    // Resume auto-scroll after user releases
    setTimeout(() => {
      isUserInteractingRef.current = false;
      startAutoScroll();
    }, 2000);
  };

  const handleMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_FULL_WIDTH);
    currentIndexRef.current = index;
    setActiveCircleIndex(index % numItems);

    // Seamless boundary normalization
    if (index >= (REPEAT_FACTOR - 4) * numItems || index <= 4 * numItems) {
      const normalized = index % numItems;
      const resetIndex = Math.floor(REPEAT_FACTOR / 2) * numItems + normalized;
      currentIndexRef.current = resetIndex;
      flatListRef.current?.scrollToOffset({
        offset: resetIndex * ITEM_FULL_WIDTH,
        animated: false,
      });
    }

    setTimeout(() => {
      isUserInteractingRef.current = false;
      startAutoScroll();
    }, 1500);
  };

  const handleDotPress = (idx) => {
    if (numItems <= 1) return;
    stopAutoScroll();
    const currentBase = Math.floor(currentIndexRef.current / numItems) * numItems;
    const targetIndex = currentBase + idx;
    currentIndexRef.current = targetIndex;
    setActiveCircleIndex(idx);

    flatListRef.current?.scrollToOffset({
      offset: targetIndex * ITEM_FULL_WIDTH,
      animated: true,
    });

    setTimeout(() => {
      startAutoScroll();
    }, 2500);
  };

  const [failedImages, setFailedImages] = useState({});

  const renderItem = ({ item, index }) => {
    const originalIdx = item.originalIndex != null ? item.originalIndex : index;
    const itemKey = item.id || item.slug || originalIdx;
    const imgUri = failedImages[itemKey] ? null : getCategoryImageUrl(item, originalIdx);
    const theme = getCategoryTheme(originalIdx);

    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => onCategoryPress && onCategoryPress(item)}
        activeOpacity={0.88}
      >
        <View style={styles.categoryBannerWrap}>
          {imgUri ? (
            <Image
              source={{ uri: imgUri }}
              style={styles.categoryImg}
              resizeMode="cover"
              onError={() => setFailedImages((prev) => ({ ...prev, [itemKey]: true }))}
            />
          ) : (
            <View style={[styles.categoryFallback, { backgroundColor: theme.bg }]}>
              <ShoppingBag size={28} color={theme.text} />
            </View>
          )}
        </View>

        <View style={styles.categoryCardBody}>
          <Text style={styles.categoryTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={styles.categoryDesc} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}

          <View style={styles.viewServicesRow}>
            <Text style={styles.viewServicesRowText}>View Services</Text>
            <ArrowRight size={13} color="#0F766E" strokeWidth={2.4} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={virtualData}
        keyExtractor={(item, index) => item.virtualKey || `cat-${item.id || index}`}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        snapToInterval={ITEM_FULL_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: ITEM_FULL_WIDTH,
          offset: ITEM_FULL_WIDTH * index,
          index,
        })}
        initialNumToRender={5}
        maxToRenderPerBatch={6}
        windowSize={7}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      {/* Circle Indicators for Infinite Loop */}
      {numItems > 1 && (
        <View style={styles.circleIndicatorRow}>
          {categories.map((cat, idx) => {
            const isActive = idx === activeCircleIndex;
            return (
              <TouchableOpacity
                key={`cat-dot-${cat.id || idx}`}
                onPress={() => handleDotPress(idx)}
                style={[
                  styles.circleDot,
                  isActive && styles.circleDotActive,
                ]}
                activeOpacity={0.7}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  carouselContent: {
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  categoryCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginRight: CARD_MARGIN,
  },
  categoryBannerWrap: {
    width: '100%',
    height: 125,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  categoryImg: {
    width: '100%',
    height: '100%',
  },
  categoryFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCardBody: {
    padding: 14,
  },
  categoryTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
    marginBottom: 4,
  },
  categoryDesc: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size11,
    color: '#64748B',
    lineHeight: fontSizes.size11 * 1.35,
    marginBottom: 12,
    minHeight: 30,
  },
  viewServicesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  viewServicesRowText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
    marginRight: 4,
  },
  circleIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  circleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  circleDotActive: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F766E',
  },
});
