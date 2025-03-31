import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
// import { Video } from 'expo-av';
import Video, {VideoRef} from 'react-native-video';

import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const VIDEOS = [
  {
    id: '11',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    caption: 'Beautiful nature 🌸',
    likes: '756K',
    comments: '2,150',
    shares: '1,200',
    user: {
      username: '@naturelover',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
  },
  {
    id: '12',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-with-smartphone-40832-large.mp4',
    caption: 'Just a normal day 😊',
    likes: '231K',
    comments: '1,100',
    shares: '450',
    user: {
      username: '@sarah_smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
  },
  {
    id: '1',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'Big Buck Bunny 🐇',
    likes: '500K',
    comments: '1,200',
    shares: '800',
    user: {
      username: '@bunnylover',
      avatar: 'https://images.unsplash.com/photo-1513186491-b3d15b31d26f',
    },
  },
  {
    id: '2',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    caption: 'Elephants Dream 🐘',
    likes: '650K',
    comments: '1,500',
    shares: '1,000',
    user: {
      username: '@elephantfan',
      avatar: 'https://images.unsplash.com/photo-1541451253-9c92a8a9147d',
    },
  },
  {
    id: '3',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    caption: 'Bigger Blazes 🔥',
    likes: '400K',
    comments: '800',
    shares: '600',
    user: {
      username: '@fireenthusiast',
      avatar: 'https://images.unsplash.com/photo-1607112102375-bf244a13113e',
    },
  },
  {
    id: '4',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    caption: 'Big Escapes 🏃‍♂️',
    likes: '700K',
    comments: '2,000',
    shares: '1,300',
    user: {
      username: '@adventureseeker',
      avatar: 'https://images.unsplash.com/photo-1605725484440-b8506432c9b0',
    },
  },
  {
    id: '5',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    caption: 'For Bigger Fun 🎉',
    likes: '800K',
    comments: '2,500',
    shares: '2,000',
    user: {
      username: '@funlovers',
      avatar: 'https://images.unsplash.com/photo-1586944702549-1458c7ffb56b',
    },
  },
  {
    id: '6',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    caption: 'Joyrides 🚗💨',
    likes: '750K',
    comments: '1,800',
    shares: '1,500',
    user: {
      username: '@carenthusiast',
      avatar: 'https://images.unsplash.com/photo-1592915109687-786e98c1bc3e',
    },
  },
  {
    id: '7',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    caption: 'Bigger Meltdowns 😱',
    likes: '450K',
    comments: '1,100',
    shares: '900',
    user: {
      username: '@emergencyresponse',
      avatar: 'https://images.unsplash.com/photo-1598910146923-d118e7c8c19c',
    },
  },
  {
    id: '8',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    caption: 'Sintel 🐉',
    likes: '1M',
    comments: '3,000',
    shares: '2,500',
    user: {
      username: '@dragonlover',
      avatar: 'https://images.unsplash.com/photo-1553555292-d929d70f6c2e',
    },
  },
  {
    id: '9',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    caption: 'Subaru Outback 🚙',
    likes: '600K',
    comments: '2,200',
    shares: '1,800',
    user: {
      username: '@offroadadventurer',
      avatar: 'https://images.unsplash.com/photo-1603985722653-600c31cd377b',
    },
  },
  {
    id: '10',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    caption: 'Tears of Steel 🦾',
    likes: '900K',
    comments: '2,800',
    shares: '2,200',
    user: {
      username: '@cyberpunkfan',
      avatar: 'https://images.unsplash.com/photo-1600106900619-b5047fead057',
    },
  },
  {
    id: '11',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    caption: 'Going on a Bull Run 🐂',
    likes: '550K',
    comments: '1,700',
    shares: '1,300',
    user: {
      username: '@bullrunfan',
      avatar: 'https://images.unsplash.com/photo-1599500052227-d9e3a9b057d1',
    },
  },
  {
    id: '12',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    caption: 'What Car Can You Get For A Grand? 🚗💰',
    likes: '1.2M',
    comments: '4,500',
    shares: '3,600',
    user: {
      username: '@carenthusiast101',
      avatar: 'https://images.unsplash.com/photo-1585059714206-7fdc3aeb8c8a',
    },
  },
];


function VideoItem({ item }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: item.uri }}
        resizeMode="cover"
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      
      <View style={styles.overlay}>
        <View style={styles.rightControls}>
          <View style={styles.controlItem}>
            <Heart color="#fff" size={35} />
            <Text style={styles.controlText}>{item.likes}</Text>
          </View>
          <View style={styles.controlItem}>
            <MessageCircle color="#fff" size={35} />
            <Text style={styles.controlText}>{item.comments}</Text>
          </View>
          <View style={styles.controlItem}>
            <Share2 color="#fff" size={35} />
            <Text style={styles.controlText}>{item.shares}</Text>
          </View>
        </View>
        
        <View style={styles.bottomSection}>
          <View>
            <Text style={styles.username}>{item.user.username}</Text>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={VIDEOS}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn} style={styles.videoContainer}>
            <VideoItem item={item} />
          </Animated.View>
        )}
        pagingEnabled
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={WINDOW_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    height: WINDOW_HEIGHT,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  rightControls: {
    position: 'absolute',
    right: 20,
    bottom: 100,
  },
  controlItem: {
    alignItems: 'center',
    marginBottom: 24,
  },
  controlText: {
    color: '#fff',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  bottomSection: {
    marginBottom: 50,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});