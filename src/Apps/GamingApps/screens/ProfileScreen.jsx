import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, Trophy, Star, Clock } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.level}>Level 42</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#94a1b2" />
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Trophy size={24} color="#7f5af0" />
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>
        <View style={styles.statItem}>
          <Star size={24} color="#7f5af0" />
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={24} color="#7f5af0" />
          <Text style={styles.statValue}>250h</Text>
          <Text style={styles.statLabel}>Played</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        {['Master Strategist', 'Speed Demon', 'Puzzle Expert'].map((achievement) => (
          <View key={achievement} style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Trophy size={24} color="#7f5af0" />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement}</Text>
              <Text style={styles.achievementDesc}>Completed all levels with 3 stars</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2c2d31',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#fffffe',
    marginBottom: 4,
  },
  level: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#7f5af0',
  },
  settingsButton: {
    padding: 8,
  },
  stats: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#2c2d31',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#fffffe',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94a1b2',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#fffffe',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#2c2d31',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    gap: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#1a1b1e',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fffffe',
    marginBottom: 4,
  },
  achievementDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94a1b2',
  },
});