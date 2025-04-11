import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, Bell, Cast, X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YouTube from 'react-native-youtube-iframe';


const videos = [
  {
    "id": "1",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdg94m69dzhT3LYDdjzqrnLgb14JHaSAPew&s",
    "title": "Sojat Mela 2025 || 🎡सोजत का प्रसिद्ध मेला",
    "channel": "Sojat Tourism Official",
    "views": "150K views",
    "timestamp": "1 month ago",
    "avatar": "https://images.unsplash.com/photo-1547723224-babfe5ccbc15?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhamFzdGhhbiUyMG9sZCUyMGd1eXN8ZW58MHx8MHx8fDA%3D",
    "url": "https://www.youtube.com/watch?v=lQxxRmcLZsc"
  },
  {
    "id": "2",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt4cb9Fr4UmGMKRiYBCnHLgE7lIqTPfmEadg&s",
    "title": "15 Best Places To Visit In Sojat Rajasthan | Sojat Tourist Places | Sojat - Rajasthan Tourism",
    "channel": "History of Sojat",
    "views": "200K views",
    "timestamp": "3 weeks ago",
    "avatar": "https://images.unsplash.com/photo-1657179127488-a258bf1eff99?q=80&w=3376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "url": "https://www.youtube.com/watch?v=xDsKsbvGjBc"
  },
  {
    "id": "3",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNddSsTeF80_IK3jAAY5VYwhMqyPffl905gw&s",
    "title": "Sojat ki paramparik gair |सोजत की पारंपरिक गैर| #गैर #sojat #happyholi #holi #pali",
    "channel": "Explore Sojat",
    "views": "180K views",
    "timestamp": "2 weeks ago",
    "avatar": "https://plus.unsplash.com/premium_photo-1718570256549-702fc900db10?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "url": "https://www.youtube.com/watch?v=EZZbp7Hujqs&t=20s"
  },
  {
    "id": "4",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACPNNIKY6130Z0t7aXc_roZ5dAX59yrgCVA&s",
    "title": "मेहंदी नगरी सोजत सिटी कि सूप्रसिद गैर नृत्य।#geir#sojat ri ger#ger dans",
    "channel": "Indian Culture Vlogs",
    "views": "300K views",
    "timestamp": "1 month ago",
    "avatar": "https://plus.unsplash.com/premium_photo-1718570263415-bfed3d1414bd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4fHx8ZW58MHx8fHx8",
    "url": "https://www.youtube.com/watch?v=vgXehKeG0Qk&t=8s"
  },
  {
    "id": "5",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNd1Rjp1UsRSpgPn-E0Xk7YRfrwcYAvC3VhA&s",
    "title": "Sojat City: Hidden Gems of Rajasthan",
    "channel": "Amazing India",
    "views": "250K views",
    "timestamp": "1 month ago",
    "avatar": "https://images.unsplash.com/photo-1657179127488-a258bf1eff99?q=80&w=3376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "url": "https://www.youtube.com/watch?v=7JXw32kpx04"
  },
  {
    "id": "6",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ23s9Gop-G584f7q1iVgJb17avo_DfAt0rSw&s",
    "title": "Sojat: A Blend of Modernity and Tradition",
    "channel": "Rajasthan Vibes",
    "views": "120K views",
    "timestamp": "1 week ago",
    "avatar": "https://images.unsplash.com/photo-1547723224-babfe5ccbc15?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhamFzdGhhbiUyMG9sZCUyMGd1eXN8ZW58MHx8MHx8fDA%3D",
    "url": "https://www.youtube.com/watch?v=XeY4FE6IQ58"
  },
  {
    "id": "7",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TYDkMMr03ooMzJ4tP0uShK_8XyVj1-m-lg&s",
    "title": "The Crafts of Sojat: Making Mehndi Art",
    "channel": "Indian Craftsmanship",
    "views": "230K views",
    "timestamp": "1 month ago",
    "avatar": "https://plus.unsplash.com/premium_photo-1718570262641-54c3ea3142e9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8",
    "url": "https://www.youtube.com/watch?v=aZ8gMjYPgA8"
  },
  {
    "id": "8",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTDuAoQx9JVSBtKzZIzYWP9sfuNL8eMMgn-w&s",
    "title": "Top 10 Places to Visit in Sojat City",
    "channel": "Travel Rajasthan",
    "views": "180K views",
    "timestamp": "2 weeks ago",
    "avatar": "https://plus.unsplash.com/premium_photo-1718570263415-bfed3d1414bd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4fHx8ZW58MHx8fHx8",
    "url": "https://www.youtube.com/watch?v=0Ug6f6vW1HU"
  },
  {
    "id": "9",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWk30CD1J8d3D4dNxYOPxLULGbbne-DTyOg&s",
    "title": "Sojat City Local Market Tour",
    "channel": "Sojat Life",
    "views": "90K views",
    "timestamp": "3 weeks ago",
    "avatar": "https://images.unsplash.com/photo-1547723224-babfe5ccbc15?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhamFzdGhhbiUyMG9sZCUyMGd1eXN8ZW58MHx8MHx8fDA%3D",
    "url": "https://www.youtube.com/watch?v=IWyfAq5QsW8"
  },
  {
    "id": "10",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILMosHGwZf172yXGt118r6o39y8eEwdnJwg&s",
    "title": "Sojat City: The Heart of Rajasthan",
    "channel": "Incredible India",
    "views": "350K views",
    "timestamp": "2 weeks ago",
    "avatar": "https://plus.unsplash.com/premium_photo-1718570263415-bfed3d1414bd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4fHx8ZW58MHx8fHx8",
    "url": "https://www.youtube.com/watch?v=sk_URqzX5aQ"
  }
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const youtubeRef = useRef(null);

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleVideoSelect = (url) => {
    const videoId = extractVideoId(url);
    setSelectedVideoId(videoId);
    setPlaying(true);
  };

  const closeVideo = () => {
    setPlaying(false);
    setSelectedVideoId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Top Videos</Text>
        <View style={styles.headerIcons}>
          <Cast style={styles.icon} size={24} color="#000" />
          <Bell style={styles.icon} size={24} color="#000" />
          <Search style={styles.icon} size={24} color="#000" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search All Videos"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {videos.map((video) => {
          const currentVideoId = extractVideoId(video.url);
          const isPlaying = selectedVideoId == currentVideoId && playing;

          return (
            <View key={video.id}>
              {isPlaying ? (
                <View style={styles.videoPlayerContainer}>
                  <YouTube
                    ref={youtubeRef}
                    videoId={selectedVideoId}
                    height={220}
                    play={playing}
                    onChangeState={(event) => {
                      if (event.state == 'ended') {
                        closeVideo();
                      }
                    }}
                    webViewStyle={styles.videoPlayer}
                    playerParams={{
                      controls: 0, // Hides the player controls
                      modestbranding: 1, // Hides the YouTube logo
                      rel: 0, // Prevents showing related videos after the video ends
                      showinfo: 0, // Hides video info (title, uploader)
                      autoplay: 1, // Starts the video automatically
                      fs: 0, // Disables fullscreen button
                      cc_load_policy: 0, // Disables captions/subtitles
                      iv_load_policy: 3, // Disables annotations
                    }}
                  />
                  <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
                    <X size={24} color="#fff" />
                  </TouchableOpacity>

                  {/* Video info while playing */}
                  <View style={styles.videoInfo}>
                    <Image
                      source={{ uri: video.avatar }}
                      style={styles.avatar}
                    />
                    <View style={styles.videoDetails}>
                      <Text style={styles.videoTitle}>{video.title}</Text>
                      <Text style={styles.channelName}>{video.channel}</Text>
                      <Text style={styles.videoMeta}>{video.views} • {video.timestamp}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.videoCard}
                  onPress={() => handleVideoSelect(video.url)}
                >
                  {/* Only show the thumbnail when the video is not playing */}
                  <Image
                    source={{ uri: video.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.videoInfo}>
                    <Image
                      source={{ uri: video.avatar }}
                      style={styles.avatar}
                    />
                    <View style={styles.videoDetails}>
                      <Text style={styles.videoTitle}>{video.title}</Text>
                      <Text style={styles.channelName}>{video.channel}</Text>
                      <Text style={styles.videoMeta}>{video.views} • {video.timestamp}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:60
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  videoCard: {
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  videoInfo: {
    flexDirection: 'row',
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  channelName: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 2,
  },
  videoMeta: {
    fontSize: 14,
    color: '#606060',
  },
  videoPlayerContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  videoPlayer: {
    alignSelf: 'stretch',
    height: 220,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
});
