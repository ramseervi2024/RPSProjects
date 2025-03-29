import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import { SafeAreaView } from 'react-native-safe-area-context';

const EXPLORE_POSTS = [
  {
    id: '100',
    image: require('../Images/maingate.jpeg'),
  },
  {
    id: '1',
    image: require('../Images/images.jpeg'),
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
    id: '13',
    image: require('../Images/school.png'),
  },
  {
    id: '14',
    image: require('../Images/valo.png'),
  },
  {
    id: '15',
    image: require('../Images/narayanmaharaj.png'),
  },
  {
    id: '16',
    image: require('../Images/mahendi.jpeg'),
  },
  {
    id: '17',
    image: require('../Images/gehu.jpeg'),
  },
  {
    id: '18',
    image: require('../Images/jcb2.jpeg'),
  },
  {
    id: '19',
    image: require('../Images/map.png'),
  },
  {
    id: '20',
    image: require('../Images/bakaris.jpeg'),
  },
  {
    id: '21',
    image: require('../Images/bakari.jpeg'),
  },
  {
    id: '2',
    image: require('../Images/talab1.jpeg'),
  },
  {
    id: '22',
    image: require('../Images/bhed.jpeg'),
  },
  {
    id: '23',
    image: require('../Images/anicat.jpeg'),
  },
  {
    id: '24',
    image: require('../Images/om.jpeg'),
  },
  {
    id: '25',
    image: require('../Images/tractor.jpeg'),
  },
  {
    id: '26',
    image: require('../Images/talab.jpg'),
  },
  {
    id: '27',
    image: require('../Images/jcb.jpeg'),
  },
  {
    id: '28',
    image: require('../Images/khet.jpeg'),
  },
  {
    id: '29',
    image: require('../Images/om2.jpeg'),
  },
  {
    id: '30',
    image: require('../Images/suar.jpeg'),
  },
  {
    id: '31',
    image: require('../Images/khetmahdi.jpeg'),
  },
  {
    id: '32',
    image: require('../Images/kakadi.jpeg'),
  },
  {
    id: '33',
    image: require('../Images/tarbandani.jpeg'),
  },
];


export default function ExploreScreen() {
  const [visible, setVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore the Beauty of Surayata Village</Text>
        {/* <Text style={styles.headerSubtitle}>A visual journey through rural life</Text> */}
      </View>
      <FlatList
        data={EXPLORE_POSTS}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.gridItem}
            onPress={() => openImageViewer(index)}
          >
            <FastImage
              source={item.image}
              style={styles.gridImage}
              resizeMode={FastImage.resizeMode.cover}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            >
              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
              )}
            </FastImage>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <ImageView
        images={EXPLORE_POSTS.map(post => post.image)}
        imageIndex={currentImageIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        presentationStyle="overFullScreen"
        backgroundColor="rgba(0,0,0,0.9)"
        swipeToCloseEnabled
        doubleTapToZoomEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  header: {
    // paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  gridItem: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius:5
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
});