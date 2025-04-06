import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Award, Calendar, Clock } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60' }}
              style={styles.profileImage}
            />
            <Text style={styles.username}>Sarah Johnson</Text>
            <Text style={styles.email}>sarah.j@example.com</Text>
          </View>
          <Settings style={styles.settingsIcon} size={24} color="#666" />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Award size={24} color="#FF9600" />
            <Text style={styles.statValue}>2,500</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statItem}>
            <Calendar size={24} color="#1CB0F6" />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={24} color="#58CC02" />
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={styles.achievementItem}>
                <Award size={32} color="#DDD" />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Course</Text>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Spanish</Text>
            <Text style={styles.courseProgress}>Level 5 - Intermediate</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    marginTop: 4,
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 20,
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  courseProgress: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    marginTop: 4,
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 2,
  },
});