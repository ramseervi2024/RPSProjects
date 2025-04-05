import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Search } from 'lucide-react-native';

const categories = [
  'All',
  'Social Media',
  'Marketing',
  'Personal',
  'Business',
  'Education',
];

const templates = [
  {
    id: '1',
    title: 'Modern Business Presentation',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1664575198308-3959904fa430',
  },
  {
    id: '2',
    title: 'Social Media Bundle',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
  },
  {
    id: '3',
    title: 'Wedding Invitation',
    category: 'Personal',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf',
  },
];

export default function TemplatesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <Text style={styles.searchPlaceholder}>Search templates</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              index == 0 && styles.activeCategory,
            ]}>
            <Text
              style={[
                styles.categoryText,
                index == 0 && styles.activeCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.templatesContainer}>
        {templates.map((template) => (
          <TouchableOpacity key={template.id} style={styles.templateCard}>
            <Image
              source={{ uri: template.image }}
              style={styles.templateImage}
            />
            <View style={styles.templateInfo}>
              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.templateCategory}>{template.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  searchPlaceholder: {
    color: '#64748b',
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryChip: {
    paddingHorizontal: 16,
    // paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    height:40,
    marginBottom:20
  },
  activeCategory: {
    backgroundColor: '#7c3aed',
  },
  categoryText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
    padding:10
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  templatesContainer: {
    padding: 16,
  },
  templateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  templateImage: {
    width: '100%',
    height: 200,
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
  templateCategory: {
    fontSize: 14,
    color: '#64748b',
  },
});