import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Plus, Search } from 'lucide-react-native';

const SAMPLE_PERFUMES = [
  {
    id: '1',
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    usageLevel: 75,
  },
  {
    id: '2',
    name: 'Bleu de Chanel',
    brand: 'CHANEL',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
    usageLevel: 90,
  },
  {
    id: '3',
    name: 'Jadore',
    brand: 'Dior',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
    usageLevel: 45,
  },
];

export default function CollectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [perfumes] = useState(SAMPLE_PERFUMES);

  const filteredPerfumes = perfumes.filter(
    (perfume) =>
      perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your collection..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {filteredPerfumes.map((perfume) => (
            <TouchableOpacity key={perfume.id} style={styles.perfumeCard}>
              <Image source={{ uri: perfume.image }} style={styles.perfumeImage} />
              <View style={styles.perfumeInfo}>
                <Text style={styles.perfumeName}>{perfume.name}</Text>
                <Text style={styles.perfumeBrand}>{perfume.brand}</Text>
                <View style={styles.usageBar}>
                  <View style={[styles.usageFill, { width: `${perfume.usageLevel}%` }]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    padding: 8,
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
  perfumeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  perfumeBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  usageBar: {
    height: 4,
    backgroundColor: '#f1f1f1',
    borderRadius: 2,
  },
  usageFill: {
    height: '100%',
    backgroundColor: '#9B4F96',
    borderRadius: 2,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9B4F96',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});