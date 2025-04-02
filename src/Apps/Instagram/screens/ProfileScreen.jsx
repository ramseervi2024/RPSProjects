import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Grid2x2 as Grid, Bookmark, Settings, Link as LinkIcon } from 'lucide-react-native';

const posts = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop',
    likes: 1234,
    comments: 56,
  },
  {
    id: '2',
    type: 'carousel',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
    likes: 892,
    comments: 43,
  },
  {
    id: '3',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=600&fit=crop',
    likes: 2345,
    comments: 123,
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&h=600&fit=crop',
    likes: 765,
    comments: 32,
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1682687221038-404670d5f335?w=600&h=600&fit=crop',
    likes: 543,
    comments: 21,
  },
  {
    id: '6',
    type: 'carousel',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop',
    likes: 1567,
    comments: 89,
  },
];

const highlights = [
  {
    id: '1',
    name: 'Travel',
    cover: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Food',
    cover: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'Nature',
    cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&h=150&fit=crop',
  },
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / numColumns;

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>emily.travels</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>Travel Creator</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Settings size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.profile}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
          }}
          style={styles.profileImage}
        />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>248</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12.4k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>1,021</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bio}>
        <Text style={styles.name}>Emily Thompson</Text>
        <Text style={styles.bioText}>📸 Travel Photographer & Content Creator</Text>
        <Text style={styles.bioText}>🌍 Currently exploring: Southeast Asia</Text>
        <Text style={styles.bioText}>✈️ Next stop: Japan 🇯🇵</Text>
        <View style={styles.link}>
          <LinkIcon size={16} color="#0095F6" />
          <Text style={styles.linkText}>www.emilytravels.com</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.highlights}>
        <TouchableOpacity style={styles.highlight}>
          <View style={styles.highlightAdd}>
            <Text style={styles.highlightAddText}>+</Text>
          </View>
          <Text style={styles.highlightText}>New</Text>
        </TouchableOpacity>
        {highlights.map((highlight) => (
          <TouchableOpacity key={highlight.id} style={styles.highlight}>
            <Image source={{ uri: highlight.cover }} style={styles.highlightCover} />
            <Text style={styles.highlightText}>{highlight.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Grid size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Bookmark size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.gridItem}>
            <Image source={{ uri: post.url }} style={styles.gridImage} />
            {post.type === 'video' && (
              <View style={styles.videoIndicator} />
            )}
            {post.type === 'carousel' && (
              <View style={styles.carouselIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
    marginTop: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginRight: 8,
  },
  categoryTag: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#0095F6',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  profile: {
    flexDirection: 'row',
    padding: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E8E',
    fontFamily: 'Inter_400Regular',
  },
  bio: {
    padding: 16,
    paddingTop: 0,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  linkText: {
    marginLeft: 4,
    color: '#0095F6',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  editButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  shareButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  highlights: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  highlight: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  highlightAdd: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightAddText: {
    fontSize: 24,
    color: '#000',
  },
  highlightCover: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  highlightText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    position: 'relative',
  },
  gridImage: {
    width: tileSize,
    height: tileSize,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  carouselIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});