import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const featuredGames = [
  {
    id: '1',
    title: 'Cyber Racer',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&auto=format&fit=crop&q=60',
    category: 'Racing',
  },
  {
    id: '2',
    title: 'Space Warriors',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=60',
    category: 'Action',
  },
  {
    id: '3',
    title: 'Puzzle Master',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&auto=format&fit=crop&q=60',
    category: 'Puzzle',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a1b1e', '#2c2d31']}
        style={styles.header}>
        <Text style={styles.title}>Gaming Hub</Text>
        <Text style={styles.subtitle}>Discover amazing games</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Games</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gamesScroll}>
          {featuredGames.map(game => (
            <TouchableOpacity key={game.id} style={styles.gameCard}>
              <Image source={{ uri: game.image }} style={styles.gameImage} />
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameCategory}>{game.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <View style={styles.categories}>
          {['Action', 'Racing', 'Puzzle', 'Strategy'].map(category => (
            <TouchableOpacity key={category} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 24,
    color: '#fffffe',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94a1b2',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#fffffe',
    marginBottom: 16,
  },
  gamesScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  gameCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#2c2d31',
    borderRadius: 16,
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: 160,
  },
  gameInfo: {
    padding: 16,
  },
  gameTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fffffe',
    marginBottom: 4,
  },
  gameCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94a1b2',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#2c2d31',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7f5af0',
  },
  categoryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7f5af0',
  },
});
