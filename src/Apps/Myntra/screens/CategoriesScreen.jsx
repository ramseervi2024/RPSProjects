import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  {
    id: 1,
    name: "Men's Fashion",
    subcategories: ['T-Shirts', 'Shirts', 'Jeans', 'Shoes'],
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80',
  },
  {
    id: 2,
    name: "Women's Fashion",
    subcategories: ['Dresses', 'Tops', 'Ethnic Wear', 'Accessories'],
    image: 'https://images.unsplash.com/photo-1618244972963-dbad0c4abf18?w=500&q=80',
  },
  {
    id: 3,
    name: "Kids' Fashion",
    subcategories: ['Boys Clothing', 'Girls Clothing', 'Infants', 'Toys'],
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80',
  },
  {
    id: 4,
    name: 'Beauty',
    subcategories: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80',
  },
];

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Categories</Text>
        </View>

        {CATEGORIES.map((category) => (
          <Pressable key={category.id} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <View style={styles.subcategoriesContainer}>
              {category.subcategories.map((subcategory, index) => (
                <Pressable key={index} style={styles.subcategoryItem}>
                  <Text style={styles.subcategoryText}>{subcategory}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#282C3F',
  },
  categorySection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#282C3F',
  },
  subcategoriesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  subcategoryItem: {
    paddingVertical: 10,
  },
  subcategoryText: {
    fontSize: 16,
    color: '#7E818C',
  },
});