import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const menuCategories = [
  {
    id: '1',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1080&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Chicken',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1080&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1080&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1080&auto=format&fit=crop',
  },
];

export default function MenuScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <Text style={styles.headerSubtitle}>Choose from our delicious range</Text>
      </View>

      <View style={styles.categoriesGrid}>
        {menuCategories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryName}>{category.name}</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#333333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
  },
  categoriesGrid: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  categoryName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});