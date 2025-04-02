import { View, Text, StyleSheet, TextInput, ScrollView, Image, Dimensions } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';

const images = [
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1682687221038-404670d5f335?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1682687982183-c2937a74df55?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1682687982502-b05f0565753a?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1682687982468-f0b9ed5eaa6c?w=300&h=300&fit=crop',
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

      <ScrollView>
        <View style={styles.grid}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.gridImage}
            />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: tileSize,
    height: tileSize,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
});