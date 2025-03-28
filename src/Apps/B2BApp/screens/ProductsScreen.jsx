import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Grid2x2 as Grid, List } from 'lucide-react-native';
import { useState } from 'react';

export default function ProductsScreen() {
  const [viewMode, setViewMode] = useState([])

  const products = [
    {
      name: 'Enterprise CRM Suite',
      category: 'Software',
      price: '$1,999/mo',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop',
    },
    {
      name: 'Smart Factory System',
      category: 'Hardware',
      price: '$15,000',
      image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=300&h=300&fit=crop',
    },
    {
      name: 'Cloud Security Package',
      category: 'Services',
      price: '$799/mo',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=300&fit=crop',
    },
    {
      name: 'Data Analytics Platform',
      category: 'Software',
      price: '$2,499/mo',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'grid' && styles.toggleButtonActive]}
            onPress={() => setViewMode('grid')}>
            <Grid size={20} color={viewMode === 'grid' ? '#007AFF' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}>
            <List size={20} color={viewMode === 'list' ? '#007AFF' : '#666'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {products.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={viewMode === 'grid' ? styles.gridCard : styles.listCard}>
              <Image source={{ uri: product.image }} style={viewMode === 'grid' ? styles.gridImage : styles.listImage} />
              <View style={viewMode === 'grid' ? styles.gridInfo : styles.listInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  listContainer: {
    gap: 16,
  },
  gridCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  gridImage: {
    width: '100%',
    height: 150,
  },
  listImage: {
    width: 120,
    height: 120,
  },
  gridInfo: {
    padding: 12,
  },
  listInfo: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productCategory: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#34C759',
  },
});