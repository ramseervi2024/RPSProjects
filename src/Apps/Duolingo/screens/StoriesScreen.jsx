import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORIES = [
  {
    id: '1',
    title: 'A Day in Madrid',
    difficulty: 'Beginner',
    duration: '5 min',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    title: 'The Lost Recipe',
    difficulty: 'Intermediate',
    duration: '8 min',
    image: 'https://images.unsplash.com/photo-1495461199391-8c39ab674295?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    title: 'Festival Time',
    difficulty: 'Beginner',
    duration: '6 min',
    image: 'https://images.unsplash.com/photo-1551972873-b7e8754e8e26?w=800&auto=format&fit=crop&q=60',
  },
];

export default function StoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stories</Text>
        <Text style={styles.subtitle}>Learn through immersive stories</Text>
      </View>

      <FlatList
        data={STORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.storyCard}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <View style={styles.storyContent}>
              <Text style={styles.storyTitle}>{item.title}</Text>
              <View style={styles.storyMeta}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.difficulty}</Text>
                </View>
                <Text style={styles.duration}>{item.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    marginTop: 4,
  },
  storyCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  storyImage: {
    width: '100%',
    height: 200,
  },
  storyContent: {
    padding: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#E5F6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  badgeText: {
    color: '#1CB0F6',
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
  },
  duration: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
});