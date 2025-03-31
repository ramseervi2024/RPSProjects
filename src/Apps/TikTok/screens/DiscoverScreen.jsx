import { View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { Search } from 'lucide-react-native';

const TRENDING_TOPICS = [
  { id: '1', tag: '#dance', views: '1.2B views' },
  { id: '2', tag: '#comedy', views: '850M views' },
  { id: '3', tag: '#food', views: '620M views' },
  { id: '4', tag: '#travel', views: '450M views' },
];

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search color="#666" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Trending Topics</Text>
        <View style={styles.trendingList}>
          {TRENDING_TOPICS.map(topic => (
            <View key={topic.id} style={styles.trendingItem}>
              <Text style={styles.trendingTag}>{topic.tag}</Text>
              <Text style={styles.trendingViews}>{topic.views}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Popular Creators</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.creatorsScroll}>
          {[1, 2, 3, 4, 5].map(i => (
            <View key={i} style={styles.creatorCard}>
              <Image
                source={{ uri: `https://i.pravatar.cc/100?img=${i}` }}
                style={styles.creatorAvatar}
              />
              <Text style={styles.creatorName}>@creator{i}</Text>
              <Text style={styles.creatorFollowers}>1.2M followers</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 15,
  },
  trendingList: {
    marginBottom: 30,
  },
  trendingItem: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  trendingTag: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  trendingViews: {
    color: '#666',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  creatorsScroll: {
    marginBottom: 30,
  },
  creatorCard: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 8,
    marginRight: 15,
    alignItems: 'center',
    width: 120,
  },
  creatorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  creatorName: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  creatorFollowers: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});