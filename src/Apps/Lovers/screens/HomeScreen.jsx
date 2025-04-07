import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, X } from 'lucide-react-native';

const profiles = [
  {
    id: '1',
    name: 'Sarah, 28',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Adventure seeker & coffee enthusiast ☕️',
    distance: '2 miles away'
  },
  {
    id: '2',
    name: 'Michael, 31',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Photographer 📸 | Dog lover 🐕',
    distance: '5 miles away'
  }
];

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.card}>
            <Image
              source={{ uri: `${profile.image}?w=800` }}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.distance}>{profile.distance}</Text>
              </View>
              <Text style={styles.bio}>{profile.bio}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={[styles.button, styles.noButton]}>
                  <X size={24} color="#FF4B6E" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.likeButton]}>
                  <Heart size={24} color="#fff" fill="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1F2937',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 400,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
  },
  bio: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF4B6E',
  },
  likeButton: {
    backgroundColor: '#FF4B6E',
  },
});