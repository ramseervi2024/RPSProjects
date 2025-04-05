import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';

const CATEGORIES = [
  {
    id: 1,
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop',
    subCategories: ['Men', 'Women', 'Kids', 'Accessories']
  },
  {
    id: 2,
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
    subCategories: ['Mobiles', 'Laptops', 'TV', 'Audio']
  },
  {
    id: 3,
    name: 'Home',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300&h=200&fit=crop',
    subCategories: ['Kitchen', 'Furniture', 'Decor', 'Lighting']
  },
  {
    id: 4,
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=200&fit=crop',
    subCategories: ['Makeup', 'Skincare', 'Haircare', 'Fragrances']
  },
];

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      {CATEGORIES.map((category) => (
        <Pressable key={category.id} style={styles.categoryCard}>
          <Image source={{ uri: category.image }} style={styles.categoryImage} />
          <View style={styles.categoryContent}>
            <Text style={styles.categoryName}>{category.name}</Text>
            <View style={styles.subCategories}>
              {category.subCategories.map((subCategory, index) => (
                <Text key={index} style={styles.subCategory}>{subCategory}</Text>
              ))}
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
    padding: 12,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: 150,
  },
  categoryContent: {
    padding: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subCategory: {
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
    color: '#666',
  },
});