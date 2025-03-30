import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const router = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop' }}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Powering the Future</Text>
          <Text style={styles.headerSubtitle}>Explore renewable energy solutions</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Featured Energy Sources</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/energy-sources')}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&auto=format&fit=crop' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Solar Power</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/energy-sources')}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&auto=format&fit=crop' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Wind Energy</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/energy-sources')}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1481923387198-050ac1a2d81b?w=800&auto=format&fit=crop' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Hydropower</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>70%</Text>
              <Text style={styles.statLabel}>Carbon Reduction</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>85M</Text>
              <Text style={styles.statLabel}>Homes Powered</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>$50B</Text>
              <Text style={styles.statLabel}>Investment</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  cardScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    width: 200,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    padding: 12,
  },
  statsContainer: {
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});