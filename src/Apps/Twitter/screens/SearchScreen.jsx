import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';

const trends = [
  {
    id: '1',
    category: 'Technology',
    topic: '#ReactNative',
    tweets: '24.5K',
  },
  {
    id: '2',
    category: 'Trending in US',
    topic: '#JavaScript',
    tweets: '18.2K',
  },
  {
    id: '3',
    category: 'Sports',
    topic: '#NBA',
    tweets: '125.4K',
  },
];

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#536471" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Twitter"
            placeholderTextColor="#536471"
          />
        </View>
      </View>
      <View style={styles.trendsContainer}>
        <Text style={styles.trendsTitle}>Trends for you</Text>
        <FlatList
          data={trends}
          renderItem={({ item }) => (
            <View style={styles.trendItem}>
              <Text style={styles.trendCategory}>{item.category}</Text>
              <Text style={styles.trendTopic}>{item.topic}</Text>
              <Text style={styles.trendTweets}>{item.tweets} Tweets</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF3F4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  trendsContainer: {
    flex: 1,
    padding: 16,
  },
  trendsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  trendItem: {
    marginBottom: 20,
  },
  trendCategory: {
    fontSize: 14,
    color: '#536471',
  },
  trendTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  trendTweets: {
    fontSize: 14,
    color: '#536471',
  },
});