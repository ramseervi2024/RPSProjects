import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const popularSearches = [
    {
      title: 'Stranger Things',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=169'
    },
    {
      title: 'The Crown',
      image: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=300&h=169'
    },
    {
      title: 'Bridgerton',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=169'
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon color="#666" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a show, movie, genre, etc."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        {popularSearches.map((item, index) => (
          <View key={index} style={styles.searchItem}>
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  thumbnail: {
    width: width * 0.3,
    height: (width * 0.3) * 9/16,
    borderRadius: 4,
    marginRight: 12,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});