import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';

const EXPLORE_POSTS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1707144960723-b81cacfca6e5',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1707144960723-b81cacfca6e5',
  },
  {
    id: '13',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
  },
  {
    id: '14',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
  },
  {
    id: '21',
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
  },
  {
    id: '22',
    image: 'https://images.unsplash.com/photo-1707144960723-b81cacfca6e5',
  },
  {
    id: '23',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
  },
  {
    id: '24',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
  },

];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      <FlatList
        data={EXPLORE_POSTS}
        renderItem={({ item }) => (
          <Pressable style={styles.gridItem}>
            <FastImage source={{ uri: item.image }} style={styles.gridImage} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  gridItem: {
    flex: 1 / 3,   // Ensure 3 columns in the grid
    aspectRatio: 1, // Ensures square aspect ratio for images
    padding: 1,    // Small padding between images
  },
  gridImage: {
    flex: 1,  // Makes the image take the full space of its container
    borderRadius: 8,  // Optional: add border radius to make the images look smoother
  },
});
