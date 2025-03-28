import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = ['All', 'Technology', 'Business', 'Science', 'Health', 'Entertainment'];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
        <Text style={styles.title}>Daily News</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.content}>
        <View style={styles.featuredArticle}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000' }}
            style={styles.featuredImage}
          />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTag}>Featured</Text>
            <Text style={styles.featuredTitle}>The Future of AI in Journalism</Text>
            <Text style={styles.featuredExcerpt}>
              How artificial intelligence is transforming the way we consume and create news...
            </Text>
          </View>
        </View>

        <View style={styles.articlesList}>
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity key={item} style={styles.articleCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000' }}
                style={styles.articleImage}
              />
              <View style={styles.articleContent}>
                <Text style={styles.articleCategory}>Technology</Text>
                <Text style={styles.articleTitle}>Latest Innovations in Tech Industry</Text>
                <Text style={styles.articleExcerpt}>
                  Breaking down the most significant technological advancements of 2025...
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
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    color: '#000000',
    marginTop: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    height:40
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    // height:40
  },
  selectedCategory: {
    backgroundColor: '#000000',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  content: {
    // flex: 1,
  },
  featuredArticle: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTag: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#ff3b30',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  featuredTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 8,
  },
  featuredExcerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  articlesList: {
    padding: 20,
  },
  articleCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleContent: {
    flex: 1,
    padding: 12,
  },
  articleCategory: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#007aff',
    marginBottom: 4,
  },
  articleTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  articleExcerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
});