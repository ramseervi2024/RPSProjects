import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Image } from 'lucide-react-native';

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Post</Text>
      </View>
      
      <View style={styles.content}>
        <Pressable style={styles.uploadButton}>
          <Image size={32} color="#666" />
          <Text style={styles.uploadText}>Upload Photo</Text>
        </Pressable>
        
        <TextInput
          style={styles.caption}
          placeholder="Write a caption..."
          multiline
          maxLength={2200}
        />
        
        <Pressable style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  content: {
    padding: 16,
  },
  uploadButton: {
    height: 200,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_600SemiBold',
  },
  caption: {
    height: 100,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  shareButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});