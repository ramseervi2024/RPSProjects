import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Download } from 'lucide-react-native';

export default function DownloadsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Downloads</Text>
      
      <View style={styles.emptyState}>
        <Download size={48} color="#666" />
        <Text style={styles.emptyTitle}>No downloads yet</Text>
        <Text style={styles.emptyText}>
          Movies and TV shows that you download{'\n'}will appear here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});