import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react-native';

const profile = {
  name: 'John Doe',
  handle: '@johndoe',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
  banner: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&h=400&fit=crop',
  bio: 'Software Engineer | React Native Developer | Coffee Enthusiast',
  location: 'San Francisco, CA',
  website: 'johndoe.dev',
  joinDate: 'Joined March 2020',
  stats: {
    following: '234',
    followers: '1,234',
  },
};

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: profile.banner }} style={styles.banner} />
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.handle}>{profile.handle}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin size={16} color="#536471" />
            <Text style={styles.detailText}>{profile.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <LinkIcon size={16} color="#536471" />
            <Text style={[styles.detailText, styles.link]}>{profile.website}</Text>
          </View>
          <View style={styles.detailItem}>
            <Calendar size={16} color="#536471" />
            <Text style={styles.detailText}>{profile.joinDate}</Text>
          </View>
        </View>
        <View style={styles.stats}>
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: 150,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: -40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#536471',
  },
  editButtonText: {
    fontWeight: 'bold',
    color: '#0F1419',
  },
  profileInfo: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  handle: {
    fontSize: 16,
    color: '#536471',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  details: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#536471',
  },
  link: {
    color: '#1DA1F2',
  },
  stats: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    marginRight: 20,
  },
  statNumber: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  statLabel: {
    color: '#536471',
  },
});