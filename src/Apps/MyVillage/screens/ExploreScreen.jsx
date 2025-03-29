import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';

const EXPLORE_POSTS = [
  {
    id: '1',
    image: require('../Images/maingate.jpeg'),
  },
  {
    id: '2',
    image: require('../Images/talab.jpeg'),
  },
  {
    id: '3',
    image: require('../Images/image.png'),
  },
  {
    id: '4',
    image: require('../Images/vokalmata.jpg'),
  },
  {
    id: '11',
    image: require('../Images/temple.jpg'),
  },
  {
    id: '12',
    image: require('../Images/bhesh.jpeg'),
  },
  {
    id: '12',
    image: require('../Images/school.png'),
  },
  {
    id: '13',
    image: require('../Images/valo.png'),
  },
  {
    id: '14',
    image: require('../Images/narayanmaharaj.png'),
  },
  {
    id: '21',
    image: require('../Images/mahendi.jpeg'),

  },
  {
    id: '22',
    image: require('../Images/gehu.jpeg'),

  },
  {
    id: '23',
    image: require('../Images/khet.jpeg'),

  },
  {
    id: '24',
    image: require('../Images/map.png'),

  },
  {
    id: '122',
    image: require('../Images/bakaris.jpeg'),

  },
  {
    id: '123',
    image: require('../Images/bakari.jpeg'),

  },
  {
    id: '124',
    image: require('../Images/bhed.jpeg'),

  },
  {
    id: '125',
    image: require('../Images/anicat.jpeg'),

  },
  {
    id: '125',
    image: require('../Images/om.jpeg'),
  },

  {
    id: '125',
    image: require('../Images/tractor.jpeg'),
  },
  {
    id: '125',
    image: require('../Images/talab.jpg'),
  },
  {
    id: '125',
    image: require('../Images/jcb.jpeg'),
  },
  {
    id: '125',
    image: require('../Images/jcb2.jpeg'),
  },
  {
    id: '125',
    image: require('../Images/om2.jpeg'),
  },
  {
    id: '125',
    image: require('../Images/suar.jpeg'),
  },
  {
    id: '125',
    image: require('../Images/khetmahdi.jpeg'),
  },
  {
    id: '125',
    image: require('../Images/kakadi.jpeg'),
  },
  {
    id: '125',
    image: require('../Images/tarbandani.jpeg'),
  },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      <FlatList
        data={EXPLORE_POSTS}
        renderItem={({ item }) => (
          <Pressable style={styles.gridItem}>
            <FastImage source={item?.image} style={styles.gridImage} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  gridItem: {
    flex: 1 / 3,   // Ensure 3 columns in the grid
    aspectRatio: 1, // Ensures square aspect ratio for images
    padding: 1,    // Small padding between images
  },
  gridImage: {
    flex: 1,  // Makes the image take the full space of its container
    borderRadius: 8,  // Optional: add border radius to make the images look smoother
  },
});
