import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StatusBar,
  Animated as RNAnimated,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { ChevronRight, X, Play, RefreshCw, ZoomIn } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from 'react-native-gesture-handler';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PAGE_WIDTH = SCREEN_WIDTH;
const COLUMN_1_WIDTH = PAGE_WIDTH * 0.6;
const COLUMN_2_WIDTH = PAGE_WIDTH * 0.4;
const TILE_HEIGHT = SCREEN_HEIGHT * 0.5; // Adjusted for gallery look

const CDN_BASE = "https://cdn.iamalive.app";
const PROCESSED_MOBILE_PREFIX = "/processed/mobile/";
const PREVIEW_PREFIX = "/processed/preview/";

const API_URL = "https://dev.iamalive.app/api/destinations/experience/learn-horse-riding-and-trot-down-a-private-forest-trail?fields=gallery";

/**
 * DETERMINISTIC PAGE BUILDER
 */
function buildPages(items, opts = {}) {
  const pages = [];
  const remaining = [...items];
  const TARGET_RATIO = 9 / 16; // 0.5625

  while (remaining.length > 0) {
    let videoIndex = -1;
    let minDiff = Infinity;

    // RULE 2 & 4: Find video closest to 9:16
    for (let i = 0; i < remaining.length; i++) {
      const item = remaining[i];
      if (item.type === 'video') {
        const diff = Math.abs((item.aspectRatio || 1) - TARGET_RATIO);
        if (diff < minDiff) {
          minDiff = diff;
          videoIndex = i;
        }
      }
    }

    let selectedVideo = null;
    if (videoIndex !== -1) {
      selectedVideo = remaining.splice(videoIndex, 1)[0];
    }

    // Identify images for current page
    const images = [];
    while (images.length < 3 && remaining.length > 0) {
      const nextItem = remaining[0];
      if (nextItem.type === 'image') {
        images.push(remaining.shift());
      } else {
        // It's another video, but we only allow 1 per page. 
        // We skip it for this page and keep it in remaining.
        break;
      }
    }

    // RULE 50: Fill the page (3 tiles total: 1 in Col1, 2 in Col2)
    // Preference: Col 1 = video, Col 2 = 2 images.

    let left = null;
    let rightTop = null;
    let rightBottom = null;

    if (selectedVideo) {
      if (images.length >= 2) {
        left = selectedVideo;
        rightTop = images.shift();
        rightBottom = images.shift();
      } else {
        // Fallback: limited images, video might go to Col 2? 
        // "The video should preferably be in Column 1. If there are not enough images to fill both stacked tiles in Column 2, then the video may fallback into Column 2 to keep the page complete."
        if (images.length === 1) {
          left = images.shift();
          rightTop = selectedVideo;
          // Need one more item for rightBottom to make 3
          if (remaining.length > 0 && remaining[0].type === 'image') {
            rightBottom = remaining.shift();
          }
        } else if (images.length === 0) {
          // Highly unlikely with global data but for robustness:
          left = selectedVideo;
          // If no images at all, we might have incomplete page or just wait.
          // Requirement says "Each page must render 3 tiles total".
          if (remaining.length >= 2) {
            rightTop = remaining.shift();
            rightBottom = remaining.shift();
          }
        }
      }
    } else {
      // No videos, just fill with images
      left = images.shift() || remaining.shift();
      rightTop = images.shift() || remaining.shift();
      rightBottom = images.shift() || remaining.shift();
    }

    if (left && rightTop && rightBottom) {
      pages.push({ left, rightTop, rightBottom });
    } else {
      // Handle trailing items that don't make a full page
      // For simplicity in this assignment, we only add full pages.
      break;
    }
  }

  return pages;
}

const MediaTile = React.memo(({ item, style, onPress, isVisible }) => {
  const [status, setStatus] = useState('preview'); // preview, processed, original, error
  const [videoError, setVideoError] = useState(false);

  const getUri = (type) => {
    const src = item.src;
    if (item.type === 'video' && type !== 'video_file') {
      const thumb = src + ".webp";
      if (type === 'preview') return `${CDN_BASE}${PREVIEW_PREFIX}${thumb}`;
      if (type === 'processed') return `${CDN_BASE}${PROCESSED_MOBILE_PREFIX}${thumb}`;
      return `${CDN_BASE}/${thumb}`;
    }
    if (type === 'preview') return `${CDN_BASE}${PREVIEW_PREFIX}${src}`;
    if (type === 'processed') return `${CDN_BASE}${PROCESSED_MOBILE_PREFIX}${src}`;
    return `${CDN_BASE}/${src}`;
  };

  const handleImageError = () => {
    if (status === 'preview') setStatus('processed');
    else if (status === 'processed') setStatus('original');
    else setStatus('error');
  };

  if (item.type === 'video') {
    const poster = getUri('processed');
    return (
      <TouchableOpacity style={[styles.tile, style]} onPress={onPress} activeOpacity={0.9}>
        <Video
          source={{ uri: getUri('processed') }}
          poster={poster}
          posterResizeMode="cover"
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          muted={true}
          repeat={true}
          paused={!isVisible} // EXTRA 2: Viewability control
          onError={() => setVideoError(true)}
        />
        {videoError && (
          <View style={styles.errorOverlay}>
            <RefreshCw size={24} color="#fff" />
            <Text style={styles.errorText}>Tap to retry</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.tile, style]} onPress={onPress} activeOpacity={0.9}>
      <FastImage
        source={{ uri: getUri(status === 'error' ? 'original' : status) }}
        style={StyleSheet.absoluteFill}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={() => {
          if (status === 'preview') setStatus('processed');
        }}
        onError={handleImageError}
      />
    </TouchableOpacity>
  );
});

const ZoomableImage = ({ uri }) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
      } else {
        savedScale.value = scale.value;
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((e) => {
      if (scale.value !== 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
      } else {
        scale.value = withSpring(2);
        savedScale.value = 2;
        focalX.value = e.x;
        focalY.value = e.y;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
    ],
  }));

  const composed = Gesture.Race(pinchGesture, doubleTapGesture);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.fullMediaContainer, animatedStyle]}>
        <FastImage
          source={{ uri }}
          style={styles.fullMedia}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default function SmartHeroGallery() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNudge, setShowNudge] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const flatListRef = useRef(null);
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 60,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
      if (viewableItems[0].index > 0) setShowNudge(false);
    }
  }).current;


  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(API_URL);
      const galleryItems = response.data.data.gallery || [];
      const builtPages = buildPages(galleryItems);
      setPages(builtPages);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const allItems = useMemo(() => {
    const list = [];
    pages.forEach(p => {
      list.push(p.left, p.rightTop, p.rightBottom);
    });
    return list;
  }, [pages]);

  const handleTilePress = (item) => {
    const idx = allItems.findIndex(i => i.src === item.src);
    setSelectedItemIndex(idx);
    setModalVisible(true);
  };

  const handleNudgePress = () => {
    flatListRef.current?.scrollToIndex({ index: 1, animated: true });
    setShowNudge(false);
  };

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
      if (roundIndex > 0) setShowNudge(false);
    }
  }, [activeIndex]);

  const renderPage = ({ item, index }) => (
    <View style={styles.pageContainer}>
      <View style={styles.column1}>
        <MediaTile
          item={item.left}
          style={styles.heroTile}
          onPress={() => handleTilePress(item.left)}
          isVisible={index === activeIndex}
        />
      </View>
      <View style={styles.column2}>
        <MediaTile
          item={item.rightTop}
          style={styles.smallTile}
          onPress={() => handleTilePress(item.rightTop)}
          isVisible={index === activeIndex}
        />
        <MediaTile
          item={item.rightBottom}
          style={styles.smallTile}
          onPress={() => handleTilePress(item.rightBottom)}
          isVisible={index === activeIndex}
        />
      </View>

      {index === 0 && showNudge && (
        <TouchableOpacity style={styles.nudge} onPress={handleNudgePress}>
          <View style={styles.nudgeInner}>
            <ChevronRight color="#fff" size={24} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: PAGE_WIDTH,
          offset: PAGE_WIDTH * index,
          index,
        })}
      />

      <View style={styles.pagination}>
        {pages.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.4)' }
            ]}
          />
        ))}
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <X color="#fff" size={32} />
          </TouchableOpacity>
          <FlatList
            data={allItems}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedItemIndex}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            renderItem={({ item }) => (
              item.type === 'video' ? (
                <View style={styles.fullMediaContainer}>
                  <Video
                    source={{ uri: `${CDN_BASE}/${item.src}` }}
                    style={styles.fullMedia}
                    resizeMode="contain"
                    controls
                    repeat
                  />
                </View>
              ) : (
                <ZoomableImage uri={`${CDN_BASE}/${item.src}`} />
              )
            )}
            keyExtractor={(item) => item.src}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  pageContainer: {
    width: PAGE_WIDTH,
    height: SCREEN_HEIGHT,
    flexDirection: 'row',
    padding: 2,
  },
  column1: {
    width: COLUMN_1_WIDTH,
    height: '100%',
    padding: 2,
  },
  column2: {
    width: COLUMN_2_WIDTH,
    height: '100%',
    padding: 2,
  },
  tile: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  heroTile: {
    flex: 1,
  },
  smallTile: {
    flex: 1,
    marginBottom: 4,
  },
  nudge: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -25,
    zIndex: 10,
  },
  nudgeInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 56, 92, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pagination: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 100,
    padding: 10,
  },
  fullMediaContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullMedia: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
  }
});