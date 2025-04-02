import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp as Trending, Music, LampCeiling as Gaming, Newspaper as News, FileWarning as Learning } from 'lucide-react-native';

const categories = [
  { id: '1', name: 'Trending', icon: Trending, color: '#FF0000' },
  { id: '2', name: 'Music', icon: Music, color: '#4285F4' },
  { id: '3', name: 'Gaming', icon: Gaming, color: '#34A853' },
  { id: '4', name: 'News', icon: News, color: '#FBBC05' },
  { id: '5', name: 'Learning', icon: Learning, color: '#EA4335' },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: `${category.color}15` }]}
              >
                <IconComponent size={32} color={category.color} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  categoryCard: {
    width: '45%',
    margin: '2.5%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});