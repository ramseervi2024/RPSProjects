import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=1920' }}
          style={styles.headerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>About NVIDIA</Text>
          <Text style={styles.subtitle}>Pioneering Accelerated Computing</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          NVIDIA's invention of the GPU in 1999 sparked the growth of the PC gaming market, redefined modern computer graphics, and revolutionized parallel computing. More recently, GPU deep learning ignited modern AI — the next era of computing.
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1993</Text>
            <Text style={styles.statLabel}>Founded</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>20k+</Text>
            <Text style={styles.statLabel}>Employees</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Leadership</Text>
        <View style={styles.leadershipCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500' }}
            style={styles.leaderImage}
          />
          <View style={styles.leaderInfo}>
            <Text style={styles.leaderName}>Jensen Huang</Text>
            <Text style={styles.leaderRole}>Founder and CEO</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.valuesList}>
          {[
            'Innovation',
            'Intellectual Honesty',
            'Speed and Agility',
            'Excellence and Determination',
            'One Team',
          ].map((value, index) => (
            <View key={index} style={styles.valueItem}>
              <Text style={styles.valueText}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
    marginTop: 24,
  },
  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#76B900',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
  },
  leadershipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 24,
  },
  leaderImage: {
    width: '100%',
    height: 200,
  },
  leaderInfo: {
    padding: 16,
  },
  leaderName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 4,
  },
  leaderRole: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
  },
  valuesList: {
    gap: 12,
  },
  valueItem: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#76B900',
  },
  valueText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#333333',
  },
});