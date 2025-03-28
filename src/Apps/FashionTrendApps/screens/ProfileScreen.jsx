import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Settings, Camera, Share2, Bell, CircleHelp as HelpCircle } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileOption = ({ icon, title }) => (
  <Pressable style={styles.optionButton}>
    <View style={styles.optionIcon}>{icon}</View>
    <Text style={styles.optionText}>{title}</Text>
  </Pressable>
);

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FF4785', '#FF7DAB']}
        style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Sarah Johnson</Text>
          <Text style={styles.bio}>Fashion Enthusiast | Style Curator</Text>
        </View>
      </LinearGradient>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Styles</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2.3K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>891</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.options}>
        <ProfileOption
          icon={<Camera size={24} color="#1E293B" />}
          title="Style Analysis"
        />
        <ProfileOption
          icon={<Share2 size={24} color="#1E293B" />}
          title="Share Profile"
        />
        <ProfileOption
          icon={<Bell size={24} color="#1E293B" />}
          title="Notifications"
        />
        <ProfileOption
          icon={<Settings size={24} color="#1E293B" />}
          title="Settings"
        />
        <ProfileOption
          icon={<HelpCircle size={24} color="#1E293B" />}
          title="Help & Support"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    // padding: 24,
    // paddingTop: 60,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    paddingTop:100,
    paddingBottom:50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
  },
  bio: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 16,
    marginTop: -24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
  options: {
    padding: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  optionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
});