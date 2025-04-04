import { View, Text, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';

const categories = [
  { id: '1', name: 'Pop', color: '#FF4081' },
  { id: '2', name: 'Hip-Hop', color: '#7C4DFF' },
  { id: '3', name: 'Rock', color: '#FF5252' },
  { id: '4', name: 'Electronic', color: '#40C4FF' },
  { id: '5', name: 'Jazz', color: '#FFD740' },
  { id: '6', name: 'Classical', color: '#64FFDA' },
  { id: '7', name: 'R&B', color: '#FF6E40' },
  { id: '8', name: 'Metal', color: '#8D6E63' },
];

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#b3b3b3" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor="#b3b3b3"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Browse All</Text>
        <View style={styles.categories}>
          {categories.map(category => (
            <Pressable
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 100,
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});