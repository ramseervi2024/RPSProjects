import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Settings, BookOpen, AlignCenterVertical as Certificate, Heart } from 'lucide-react-native';

const profileData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
  bio: "Passionate learner | Software Developer",
  achievements: [
    { id: 1, title: "30 Day Streak", icon: "🔥" },
    { id: 2, title: "Course Creator", icon: "📚" },
    { id: 3, title: "Quick Learner", icon: "🚀" },
  ]
};

const menuItems = [
  { id: 1, title: "My Courses", icon: BookOpen },
  { id: 2, title: "Certificates", icon: Certificate },
  { id: 3, title: "Saved Courses", icon: Heart },
  { id: 4, title: "Settings", icon: Settings },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsContainer}>
          {profileData.achievements.map(achievement => (
            <View key={achievement.id} style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map(item => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <item.icon size={24} color="#6366f1" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  bio: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  achievementsSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 16,
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#1e293b',
    textAlign: 'center',
  },
  menuSection: {
    padding: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  menuText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
});