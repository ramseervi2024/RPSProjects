import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Heart } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const FavoriteItem = ({ image, title, brand, price }) => {
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
    <Animated.View
      style={[styles.favoriteItem, animatedStyle]}
      onTouchStart={onPressIn}
      onTouchEnd={onPressOut}>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemBrand}>{brand}</Text>
        <Text style={styles.itemPrice}>${price}</Text>
      </View>
    </Animated.View>
  );
};

export default function FavoritesScreen() {
  const favorites = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
      title: 'Summer Dress',
      brand: 'Eco Fashion',
      price: '89.99',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800',
      title: 'Casual Blazer',
      brand: 'Urban Style',
      price: '129.99',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800',
      title: 'Denim Collection',
      brand: 'Street Wear',
      price: '79.99',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Favorites</Text>
          <Heart size={24} color="#FF4785" fill="#FF4785" />
        </View>
        <Text style={styles.subtitle}>Your saved fashion items</Text>
      </View>

      <View style={styles.favoritesList}>
        {favorites.map((item) => (
          <FavoriteItem key={item.id} {...item} />
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
  favoritesList: {
    padding: 16,
    gap: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  itemImage: {
    width: 120,
    height: 120,
  },
  itemInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4785',
  },
});