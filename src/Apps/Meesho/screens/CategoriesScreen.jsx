import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  {
    id: 1,
    name: 'Women Ethnic',
    image: 'https://images.unsplash.com/photo-1583391733956-6c74c9e3e1b4?w=500',
    subCategories: ['Sarees', 'Kurtis', 'Lehengas', 'Gowns', 'Ethnic Dresses']
  },
  {
    id: 2,
    name: 'Women Western',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500',
    subCategories: ['Tops', 'Dresses', 'Jeans', 'Shorts', 'Skirts']
  },
  {
    id: 3,
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500',
    subCategories: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets']
  },
  {
    id: 4,
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500',
    subCategories: ['Boys Clothing', 'Girls Clothing', 'Baby Clothing', 'Footwear', 'Accessories']
  },
];

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Categories</Text>
        </View>

        {CATEGORIES.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <TouchableOpacity style={styles.categoryHeader}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.subCategoriesCount}>
                  {category.subCategories.length} Categories
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.subCategoriesList}>
              {category.subCategories.map((subCategory, index) => (
                <TouchableOpacity key={index} style={styles.subCategoryItem}>
                  <Text style={styles.subCategoryText}>{subCategory}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#E83E8C',
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  categorySection: {
    marginBottom: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#f0f0f0',
  },
  categoryHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryInfo: {
    marginLeft: 16,
    flex: 1,
  },
  categoryName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  subCategoriesCount: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  subCategoriesList: {
    paddingHorizontal: 16,
  },
  subCategoryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subCategoryText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#333333',
  },
});