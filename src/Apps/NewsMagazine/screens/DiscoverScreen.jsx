import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, TrendingUp } from 'lucide-react-native';

const TRENDING_TOPICS = ['AI', 'Climate Change', 'Space Exploration', 'Quantum Computing', 'Renewable Energy'];

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for topics, articles..."
            placeholderTextColor="#666666"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Trending Topics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TRENDING_TOPICS.map((topic) => (
              <TouchableOpacity key={topic} style={styles.trendingTopic}>
                <Text style={styles.trendingTopicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.recommendedCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000' }}
                style={styles.recommendedImage}
              />
              <View style={styles.recommendedContent}>
                <Text style={styles.recommendedCategory}>Science</Text>
                <Text style={styles.recommendedTitle}>
                  Breakthrough in Quantum Computing: A New Era of Technology
                </Text>
                <Text style={styles.recommendedExcerpt}>
                  Scientists achieve major milestone in quantum computing research...
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  trendingSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#000000',
    marginLeft: 8,
  },
  trendingTopic: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  trendingTopicText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
  },
  recommendedSection: {
    padding: 20,
  },
  recommendedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recommendedImage: {
    width: '100%',
    height: 200,
  },
  recommendedContent: {
    padding: 16,
  },
  recommendedCategory: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#007aff',
    marginBottom: 8,
  },
  recommendedTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  recommendedExcerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});