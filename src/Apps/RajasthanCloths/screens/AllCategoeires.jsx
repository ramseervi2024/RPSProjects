import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const categories = [
  { 
    id: 1, 
    name: 'Wedding Collection', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Luxurious%20Wedding%20Dresses%20with%20gold%20embroidery&aspect=4:5', 
    color: '#E53935' 
  },
  { 
    id: 2, 
    name: 'Dulhan (Bride) Wear', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Bridal%20Lehenga%20with%20gold%20work&aspect=4:5', 
    color: '#1E88E5' 
  },
  { 
    id: 3, 
    name: 'Dulha (Groom) Wear', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Wedding%20Sherwani%20with%20intricate%20embroidery&aspect=4:5', 
    color: '#43A047' 
  },
  { 
    id: 4, 
    name: 'Traditional Marwari Wear', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Marwari%20Ethnic%20Wear%20for%20Festivals&aspect=4:5', 
    color: '#FB8C00' 
  },
  { 
    id: 5, 
    name: 'Fashion Ethnic Wear', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Fusion%20Ethnic%20Wear%20with%20modern%20touches&aspect=4:5', 
    color: '#EC407A' 
  },
  { 
    id: 6, 
    name: 'Lehenga Choli', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Luxurious%20Lehenga%20Choli%20with%20golden%20embroidery&aspect=4:5', 
    color: '#7CB342' 
  },
  { 
    id: 7, 
    name: 'Sherwani for Men', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Elegant%20Sherwani%20with%20intricate%20details&aspect=4:5', 
    color: '#8E24AA' 
  },
  { 
    id: 8, 
    name: 'Kids Wedding Wear', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Kids%20Wedding%20Wear%20with%20embroidered%20details&aspect=4:5', 
    color: '#D81B60' 
  },
  { 
    id: 9, 
    name: 'Bridal Collection', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Bridal%20Collection%20with%20luxury%20embroidery&aspect=4:5', 
    color: '#F57C00' 
  },
  { 
    id: 10, 
    name: 'Wedding Accessories', 
    imageUrl: 'https://api.a0.dev/assets/image?text=Wedding%20Accessories%20for%20your%20special%20day&aspect=4:5', 
    color: '#1976D2' 
  },
];

export default function AllCategories() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wedding Dress Categories</Text>
        <Text style={styles.headerSubtitle}>Explore our elegant collection</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {categories.map((category) => {
            return (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={styles.iconContainer}>
                  <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            );
          })}
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
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: '100%',
    height: 220,  // Increased height for better visibility
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});
