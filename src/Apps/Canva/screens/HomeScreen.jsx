import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Plus } from 'lucide-react-native';

const templates = [
  {
    id: '1',
    title: 'Instagram Post',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
    dimensions: '1080 x 1080',
  },
  {
    id: '2',
    title: 'Facebook Cover',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    dimensions: '820 x 312',
  },
  {
    id: '3',
    title: 'Presentation',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
    dimensions: '1920 x 1080',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create a design</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Custom Size</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Popular designs</Text>
      
      <View style={styles.templateGrid}>
        {templates.map((template) => (
          <TouchableOpacity key={template.id} style={styles.templateCard}>
            <Image
              source={{ uri: template.image }}
              style={styles.templateImage}
            />
            <View style={styles.templateInfo}>
              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.templateDimensions}>{template.dimensions}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#7c3aed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  templateGrid: {
    padding: 20,
    gap: 20,
  },
  templateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  templateImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#f1f5f9',
  },
  templateInfo: {
    padding: 16,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  templateDimensions: {
    fontSize: 14,
    color: '#64748b',
  },
});