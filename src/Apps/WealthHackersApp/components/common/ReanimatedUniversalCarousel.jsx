import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';

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
  const { width } = useWindowDimensions();

  if (!data || data.length === 0) {
    return null;
  }

  const slideWidth = itemWidth || Math.round(width * 0.78);

  // Parallax animation config per react-native-reanimated-carousel documentation
  const resolvedLayout =
    layout !== undefined
      ? layout
      : {
          type: 'parallax',
          offset: 20,
          scale: 0.95,
          adjacentScale: 0.9,
        };

  const resolvedAnimation =
    animation !== undefined
      ? animation
      : {
          type: 'spring',
          damping: 20,
          stiffness: 90,
        };

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
      <Carousel
        style={{ width, height }}
        itemSize={slideWidth}
        data={data}
        renderItem={renderItem}
        autoplay={autoplay && data.length > 1}
        autoplayInterval={autoplayInterval}
        autoplayDirection={autoplayDirection}
        loop={loop && data.length > 1}
        layout={resolvedLayout}
        animation={resolvedAnimation}
        snapMode={snapMode}
      />
    </View>
  );
}

