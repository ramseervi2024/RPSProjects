import { View, Text, StyleSheet, TextInput, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';

const categories = [
  'For you',
  'Travel',
  'Architecture',
  'Food',
  'Nature',
  'Art',
  'Fashion',
  'Technology',
];

const images = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop',
    likes: '2.5k',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
    likes: '1.8k',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=600&fit=crop',
    likes: '3.2k',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&h=600&fit=crop',
    likes: '4.7k',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1682687221038-404670d5f335?w=600&h=600&fit=crop',
    likes: '2.1k',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop',
    likes: '5.9k',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1682687982502-b05f0565753a?w=600&h=600&fit=crop',
    likes: '1.4k',
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop',
    likes: '3.6k',
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1682687982468-f0b9ed5eaa6c?w=600&h=600&fit=crop',
    likes: '2.8k',
  },
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / numColumns;

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#8E8E8E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#8E8E8E"
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category}
            style={[styles.category, index === 0 && styles.activeCategory]}>
            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView>
        <View style={styles.grid}>
          {images.map((image, index) => (
            <TouchableOpacity key={image.id} style={styles.gridItem}>
              <Image
                source={{ uri: image.url }}
                style={[
                  styles.gridImage,
                  index % 3 === 0 && index < 3 && styles.largeImage,
                ]}
              />
              <View style={styles.likesOverlay}>
                <Text style={styles.likesText}>{image.likes}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    marginTop: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  categories: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#EFEFEF',
  },
  activeCategory: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    position: 'relative',
  },
  gridImage: {
    width: tileSize,
    height: tileSize,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  largeImage: {
    width: tileSize * 2,
    height: tileSize * 2,
  },
  likesOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  likesText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});