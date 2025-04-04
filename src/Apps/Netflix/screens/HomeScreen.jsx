import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Play, Info } from 'lucide-react-native';

const FEATURED_IMAGE = 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200';

const MovieRow = ({ title, movies }) => (
  <View style={styles.movieRow}>
    <Text style={styles.rowTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {movies.map((movie, index) => (
        <Image key={index} source={{ uri: movie }} style={styles.thumbnail} />
      ))}
    </ScrollView>
  </View>
);

export default function HomeScreen() {
  const trendingMovies = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=169',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=169',
    'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=169',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=169',
  ];

  const continueWatching = [
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&h=169',
    'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=300&h=169',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=169',
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&h=169',
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.featuredContainer}>
        <Image source={{ uri: FEATURED_IMAGE }} style={styles.featuredImage} />
        <LinearGradient
          colors={['transparent', '#000']}
          style={styles.gradient}
        />
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>Stranger Things</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Play color="black" size={24} />
              <Text style={styles.buttonText}>Play</Text>
            </View>
            <View style={[styles.button, styles.infoButton]}>
              <Info color="white" size={24} />
              <Text style={[styles.buttonText, styles.infoButtonText]}>More Info</Text>
            </View>
          </View>
        </View>
      </View>

      <MovieRow title="Trending Now" movies={trendingMovies} />
      <MovieRow title="Continue Watching" movies={continueWatching} />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  featuredContainer: {
    height: 500,
    width: '100%',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 8,
  },
  infoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  infoButtonText: {
    color: '#fff',
  },
  movieRow: {
    marginTop: 20,
    paddingLeft: 10,
  },
  rowTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
  },
  thumbnail: {
    width: width * 0.4,
    height: (width * 0.4) * 9/16,
    borderRadius: 4,
    marginRight: 10,
  },
});