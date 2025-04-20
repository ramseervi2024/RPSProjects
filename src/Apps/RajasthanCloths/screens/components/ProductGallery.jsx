import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList, Pressable } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderImage = ({ item, index }) => (
    <Image
      source={{ uri: item }}
      style={styles.mainImage}
      resizeMode="cover"
    />
  );

  const renderThumbnail = ({ item, index }) => (
    <Pressable onPress={() => setActiveIndex(index)}>
      <Image
        source={{ uri: item }}
        style={[
          styles.thumbnail,
          activeIndex === index && styles.activeThumbnail,
        ]}
        resizeMode="cover"
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setActiveIndex(newIndex);
        }}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
      <FlatList
        data={images}
        renderItem={renderThumbnail}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailContainer}
        contentContainerStyle={styles.thumbnailContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: width * 1.2,
  },
  mainImage: {
    width,
    height: width,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 3,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 10,
    height: 70,
  },
  thumbnailContent: {
    paddingHorizontal: 10,
    gap: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: 'white',
  },
});
