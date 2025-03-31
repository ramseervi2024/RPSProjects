import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Grid2x2 as Grid, Settings } from 'lucide-react-native';

const PROFILE_DATA = {
  username: '@johndoe',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  stats: {
    following: '1,234',
    followers: '4,567',
    likes: '123.4K',
  },
  bio: 'Creating awesome content 🎥\nFollow for daily videos!',
};

const VIDEOS = [
  { id: '1', thumbnail: 'https://images.unsplash.com/photo-1682687220742-aba19a74b2d6' },
  { id: '2', thumbnail: 'https://images.unsplash.com/photo-1682687220198-88e9bdea9931' },
  { id: '3', thumbnail: 'https://images.unsplash.com/photo-1682687220063-4742bd7c98d6' },
  { id: '4', thumbnail: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae' },
  { id: '5', thumbnail: 'https://images.unsplash.com/photo-1682687220509-61b8a906ca19' },
  { id: '6', thumbnail: 'https://images.unsplash.com/photo-1682687220795-796d3f6b8ddd' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{PROFILE_DATA.username}</Text>
        <TouchableOpacity>
          <Settings color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.profile}>
        <Image source={{ uri: PROFILE_DATA.avatar }} style={styles.avatar} />
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE_DATA.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE_DATA.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE_DATA.stats.likes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        <Text style={styles.bio}>{PROFILE_DATA.bio}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.tabBar}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Grid color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.videos}>
          {VIDEOS.map(video => (
            <TouchableOpacity key={video.id} style={styles.videoThumbnail}>
              <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
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
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  profile: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  bio: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  editButton: {
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  videos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  videoThumbnail: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  thumbnail: {
    flex: 1,
    backgroundColor: '#222',
  },
});