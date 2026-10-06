import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';

const REPEAT_FACTOR = 30;

export default function ReanimatedUniversalCarousel({
  data = [],
  renderItem,
  height = 220,
  itemWidth,
  autoplay = true,
  autoplayInterval = 3200,
  autoplayDirection = 'forward',
  loop = true,
  layout,
  animation,
  snapMode = 'page',
  style,
}) {
  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = useRef(null);
  const timerRef = useRef(null);
  const isInteractingRef = useRef(false);

  const numItems = data ? data.length : 0;
  const slideWidth = itemWidth || Math.round(screenWidth * 0.78);
  const itemFullWidth = slideWidth;

  // Flattened virtual loop dataset if loop is enabled
  const shouldLoop = loop && numItems > 1;

  const virtualData = useMemo(() => {
    if (!shouldLoop) return data;
    const items = [];
    for (let r = 0; r < REPEAT_FACTOR; r++) {
      for (let i = 0; i < numItems; i++) {
        items.push({
          itemData: data[i],
          virtualKey: `uc-loop-${r}-${data[i]?.id ?? i}`,
          originalIndex: i,
          virtualIndex: r * numItems + i,
        });
      }
    }
    return items;
  }, [data, numItems, shouldLoop]);

  const middleIndex = useMemo(() => {
    if (!shouldLoop) return 0;
    return Math.floor(REPEAT_FACTOR / 2) * numItems;
  }, [numItems, shouldLoop]);

  const currentIndexRef = useRef(middleIndex);

  // Initialize scroll position to the center of virtual repetition
  useEffect(() => {
    if (!shouldLoop) {
      currentIndexRef.current = 0;
      return;
    }
    currentIndexRef.current = middleIndex;
    const initTimer = setTimeout(() => {
      if (flatListRef.current && middleIndex > 0) {
        flatListRef.current.scrollToOffset({
          offset: middleIndex * itemFullWidth,
          animated: false,
        });
      }
    }, 50);

    return () => clearTimeout(initTimer);
  }, [middleIndex, itemFullWidth, shouldLoop]);

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!autoplay || numItems <= 1) return;

    timerRef.current = setInterval(() => {
      if (isInteractingRef.current || !flatListRef.current) return;

      const directionMultiplier = autoplayDirection === 'backward' ? -1 : 1;
      let nextIndex = currentIndexRef.current + directionMultiplier;

      if (shouldLoop) {
        const totalItems = virtualData.length;
        if (nextIndex >= totalItems - numItems || nextIndex < numItems) {
          nextIndex = middleIndex;
          flatListRef.current.scrollToOffset({
            offset: nextIndex * itemFullWidth,
            animated: false,
          });
        } else {
          flatListRef.current.scrollToOffset({
            offset: nextIndex * itemFullWidth,
            animated: true,
          });
        }
      } else {
        if (nextIndex >= numItems) nextIndex = 0;
        else if (nextIndex < 0) nextIndex = numItems - 1;
        flatListRef.current.scrollToOffset({
          offset: nextIndex * itemFullWidth,
          animated: true,
        });
      }

      currentIndexRef.current = nextIndex;
    }, autoplayInterval);
  }, [autoplay, autoplayInterval, autoplayDirection, numItems, shouldLoop, virtualData.length, middleIndex, itemFullWidth]);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleScrollBeginDrag = useCallback(() => {
    isInteractingRef.current = true;
    stopAutoplay();
  }, [stopAutoplay]);

  const handleScrollEndDrag = useCallback(() => {
    setTimeout(() => {
      isInteractingRef.current = false;
      startAutoplay();
    }, 1200);
  }, [startAutoplay]);

  const handleMomentumScrollEnd = useCallback(
    (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const calculatedIndex = Math.round(offsetX / itemFullWidth);
      currentIndexRef.current = calculatedIndex;

      // Wrap around seamlessly if close to boundaries
      if (shouldLoop) {
        const totalItems = virtualData.length;
        if (calculatedIndex >= totalItems - numItems || calculatedIndex <= numItems) {
          const originalIdx = calculatedIndex % numItems;
          const resetIndex = middleIndex + originalIdx;
          currentIndexRef.current = resetIndex;
          flatListRef.current?.scrollToOffset({
            offset: resetIndex * itemFullWidth,
            animated: false,
          });
        }
      }

      isInteractingRef.current = false;
    },
    [itemFullWidth, shouldLoop, virtualData.length, numItems, middleIndex]
  );

  const renderFlatListItem = useCallback(
    ({ item, index }) => {
      const targetItem = shouldLoop ? item.itemData : item;
      const originalIdx = shouldLoop ? item.originalIndex : index;

      return (
        <View style={{ width: slideWidth, height }}>
          {renderItem({ item: targetItem, index: originalIdx })}
        </View>
      );
    },
    [shouldLoop, slideWidth, height, renderItem]
  );

  const keyExtractor = useCallback(
    (item, index) => {
      if (shouldLoop) return item.virtualKey;
      return `uc-single-${item?.id ?? index}`;
    },
    [shouldLoop]
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: itemFullWidth,
      offset: itemFullWidth * index,
      index,
    }),
    [itemFullWidth]
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        {
          height,
          overflow: 'hidden',
          marginHorizontal: -16,
          marginBottom: 2,
        },
        style,
      ]}
    >
      <FlatList
        ref={flatListRef}
        data={shouldLoop ? virtualData : data}
        renderItem={renderFlatListItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemFullWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        getItemLayout={getItemLayout}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        initialNumToRender={5}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
}
