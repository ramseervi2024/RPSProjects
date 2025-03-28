import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { Heart, TrendingUp } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TrendCard = ({ image, title, likes, category }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.trendCard, animatedStyle]}>
      <Image source={{ uri: image }} style={styles.trendImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}>
        <View style={styles.trendInfo}>
          <Text style={styles.trendTitle}>{title}</Text>
          <View style={styles.trendMeta}>
            <Text style={styles.trendCategory}>{category}</Text>
            <View style={styles.likesContainer}>
              <Heart size={16} color="#FF4785" />
              <Text style={styles.likesText}>{likes}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
};

export default function TrendsScreen() {
  const [trends] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      title: 'Sustainable Fashion',
      category: 'Eco-Friendly',
      likes: '2.5K',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      title: 'Street Style 2025',
      category: 'Urban',
      likes: '1.8K',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      title: 'Minimalist Chic',
      category: 'Casual',
      likes: '3.2K',
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trending Now</Text>
          <TrendingUp size={24} color="#FF4785" />
        </View>
        <Text style={styles.subtitle}>
          Discover the latest fashion trends powered by AI
        </Text>
      </View>

      <View style={styles.trendsList}>
        {trends.map((trend) => (
          <TrendCard key={trend.id} {...trend} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
  },
  trendsList: {
    padding: 16,
    gap: 16,
  },
  trendCard: {
    height: 400,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  trendImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    // padding: 24,
    alignItems: 'center',
  },
  trendInfo: {
    gap: 8,
  },
  trendTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  trendMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:20
  },
  trendCategory: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likesText: {
    fontSize: 16,
    color: '#fff',
  },
});