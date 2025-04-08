import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Cpu, Zap, Brain } from 'lucide-react-native';

export default function TechnologyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Innovation at Scale</Text>
          <Text style={styles.heroSubtitle}>Pushing the boundaries of technology</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Cpu size={40} color="#76B900" />
          <Text style={styles.cardTitle}>GPU Architecture</Text>
          <Text style={styles.cardDescription}>
            Revolutionary GPU designs that power gaming, AI, and professional visualization
          </Text>
        </View>

        <View style={styles.card}>
          <Brain size={40} color="#76B900" />
          <Text style={styles.cardTitle}>AI & Deep Learning</Text>
          <Text style={styles.cardDescription}>
            Advanced AI solutions for training and inference across industries
          </Text>
        </View>

        <View style={styles.card}>
          <Zap size={40} color="#76B900" />
          <Text style={styles.cardTitle}>Ray Tracing</Text>
          <Text style={styles.cardDescription}>
            Real-time ray tracing technology for photorealistic graphics
          </Text>
        </View>
      </View>

      <View style={styles.timeline}>
        <Text style={styles.timelineTitle}>Innovation Timeline</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>2023</Text>
              <Text style={styles.timelineEvent}>Launch of Next-Gen AI Platform</Text>
              <Text style={styles.timelineDescription}>
                Revolutionizing AI computing with unprecedented performance
              </Text>
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
    backgroundColor: '#FFFFFF',
  },
  hero: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#000000',
    marginTop: 12,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  timeline: {
    padding: 20,
  },
  timelineTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#76B900',
    marginTop: 6,
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDate: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#76B900',
    marginBottom: 4,
  },
  timelineEvent: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  timelineDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
  },
});