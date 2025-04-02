import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Grid2x2 as Grid, Bookmark, Settings } from 'lucide-react-native';

const posts = [
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1682687221038-404670d5f335?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1682687982183-c2937a74df55?w=300&h=300&fit=crop',
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / numColumns;

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>johndoe</Text>
        <TouchableOpacity>
          <Settings size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.profile}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
          }}
          style={styles.profileImage}
        />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>54</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>834</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>162</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bio}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bioText}>📸 Photography enthusiast</Text>
        <Text style={styles.bioText}>🌍 Travel lover</Text>
        <Text style={styles.bioText}>🎨 Digital creator</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Grid size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Bookmark size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {posts.map((post, index) => (
          <Image key={index} source={{ uri: post }} style={styles.gridImage} />
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
  username: {
    fontSize: 16,
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
  },
  editButton: {
    margin: 16,
    marginTop: 0,
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
  gridImage: {
    width: tileSize,
    height: tileSize,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
});