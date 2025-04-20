import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const categories = [
  {
    id: 1,
    name: 'Wedding Collection',
    imageUrl: 'https://images.unsplash.com/photo-1617288991572-9e8755a88209?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI0fHx8ZW58MHx8fHx8',
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
    imageUrl: 'https://images.unsplash.com/photo-1627913755902-dddc0b4c8c63?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    color: '#FB8C00'
  },
  {
    id: 5,
    name: 'Fashion Ethnic Wear',
    imageUrl: 'https://images.unsplash.com/photo-1654764746225-e63f5e90facd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8',
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
    imageUrl: 'https://images.unsplash.com/photo-1654764746221-7bc58ef4dbad?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8',
    color: '#F57C00'
  },
  {
    id: 10,
    name: 'Wedding Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1617633150878-7df1d12a9a57?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8',
    color: '#1976D2'
  },
];

export default function AllCategories() {
  const navigation = useNavigation()
  const navigatetoproduct = (category) => {
    navigation.navigate('AllProductList', { type: category?.name })
  }
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
              <TouchableOpacity key={category.id} style={styles.categoryCard} onPress={() => { navigatetoproduct(category) }}>
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
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
    paddingTop: 0,
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
    borderWidth:0.4,
    borderColor:'gray'
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
