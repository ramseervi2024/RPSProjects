import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bookmark, Trash2 } from 'lucide-react-native';

export default function BookmarksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        <Text style={styles.subtitle}>Your saved articles</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.bookmarkCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000' }}
              style={styles.bookmarkImage}
            />
            <View style={styles.bookmarkContent}>
              <View style={styles.bookmarkHeader}>
                <Text style={styles.bookmarkCategory}>Technology</Text>
                <TouchableOpacity>
                  <Trash2 size={20} color="#ff3b30" />
                </TouchableOpacity>
              </View>
              <Text style={styles.bookmarkTitle}>
                The Evolution of Artificial Intelligence in Modern Society
              </Text>
              <Text style={styles.bookmarkExcerpt}>
                Exploring how AI is reshaping various industries and our daily lives...
              </Text>
              <View style={styles.bookmarkFooter}>
                <Text style={styles.bookmarkDate}>Saved on Mar 15, 2025</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Empty state */}
      {false && (
        <View style={styles.emptyState}>
          <Bookmark size={48} color="#cccccc" />
          <Text style={styles.emptyStateTitle}>No bookmarks yet</Text>
          <Text style={styles.emptyStateText}>
            Start saving articles by tapping the bookmark icon while reading
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  bookmarkCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bookmarkImage: {
    width: '100%',
    height: 200,
  },
  bookmarkContent: {
    padding: 16,
  },
  bookmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookmarkCategory: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#007aff',
  },
  bookmarkTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  bookmarkExcerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  bookmarkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookmarkDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});