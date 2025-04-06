import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FireExtinguisher } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LESSONS = [
  {
    id: '1',
    title: 'Basics 1',
    description: 'Learn the basics of Spanish',
    progress: 0.6,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    title: 'Phrases',
    description: 'Common Spanish phrases',
    progress: 0.3,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    title: 'Food',
    description: 'Learn food vocabulary',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop&q=60',
  },
];

export default function LearnScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Spanish Course</Text>
          <View style={styles.streakContainer}>
            <FireExtinguisher size={24} color="#FF9600" />
            <Text style={styles.streakText}>5 day streak!</Text>
          </View>
        </View>

        <View style={styles.lessonGrid}>
          {LESSONS.map((lesson) => (
            <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
              <Image source={{ uri: lesson.image }} style={styles.lessonImage} />
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${lesson.progress * 100}%` }]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#1CB0F6',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E5',
    padding: 8,
    borderRadius: 20,
  },
  streakText: {
    marginLeft: 8,
    fontFamily: 'Nunito-Bold',
    color: '#FF9600',
  },
  lessonGrid: {
    padding: 20,
  },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  lessonImage: {
    width: '100%',
    height: 150,
  },
  lessonContent: {
    padding: 16,
  },
  lessonTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginBottom: 4,
    color: '#333',
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#666',
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