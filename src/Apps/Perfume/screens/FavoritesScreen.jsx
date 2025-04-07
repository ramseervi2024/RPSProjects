import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';


const FAVORITE_PERFUMES = [
  {
    id: '1',
    name: 'Miss Dior',
    brand: 'Dior',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    notes: ['Rose', 'Bergamot', 'Patchouli'],
  },
  {
    id: '2',
    name: 'Light Blue',
    brand: 'Dolce & Gabbana',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
    notes: ['Citrus', 'Apple', 'Cedar'],
  },
];

export default function FavoritesScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {FAVORITE_PERFUMES.map((perfume) => (
        <TouchableOpacity key={perfume.id} style={styles.perfumeCard}>
          <Image source={{ uri: perfume.image }} style={styles.perfumeImage} />
          <View style={styles.perfumeInfo}>
            <View style={styles.header}>
              <View>
                <Text style={styles.perfumeName}>{perfume.name}</Text>
                <Text style={styles.perfumeBrand}>{perfume.brand}</Text>
              </View>
              <TouchableOpacity style={styles.heartButton}>
                <Heart size={24} color="#9B4F96" fill="#9B4F96" />
              </TouchableOpacity>
            </View>
            <View style={styles.notesContainer}>
              {perfume.notes.map((note, index) => (
                <View key={note} style={styles.noteTag}>
                  <Text style={styles.noteText}>{note}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  perfumeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  perfumeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  perfumeInfo: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  perfumeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  perfumeBrand: {
    fontSize: 14,
    color: '#666',
  },
  heartButton: {
    padding: 8,
    marginTop: -8,
    marginRight: -8,
  },
  notesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  noteTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
  },
});