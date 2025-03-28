import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Search } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function DiscoverScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Find your next fashion inspiration</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search trends, styles, outfits..."
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {['Summer', 'Casual', 'Formal', 'Street Style', 'Vintage'].map((category) => (
            <LinearGradient
              key={category}
              colors={['#FF4785', '#FF7DAB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.categoryCard}>
              <Text style={styles.categoryText}>{category}</Text>
            </LinearGradient>
          ))}
        </ScrollView>
      </View>

      <View style={styles.aiSection}>
        <Text style={styles.sectionTitle}>AI Style Analysis</Text>
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>Upload your photo</Text>
          <Text style={styles.aiDescription}>
            Get personalized style recommendations based on your preferences and body type
          </Text>
        </View>
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
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  categoriesContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
  },
  categoryCard: {
    // paddingHorizontal: 20,
    // paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    elevation: 4,
    shadowColor: '#FF4785',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // width: '100%',
    margin:10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign:'center',
    padding:10,
  },
  aiSection: {
    padding: 24,
  },
  aiCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});