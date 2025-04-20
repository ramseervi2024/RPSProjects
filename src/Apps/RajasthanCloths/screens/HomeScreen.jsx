import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react-native';
import CategoryCard from './components/CategoryCard';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Categories for Marwari Wedding Dresses with unique items for each section
  const Allcategories = [
    { id: 1, title: 'Luxurious Wedding Dresses', imageUrl: 'https://api.a0.dev/assets/image?text=Luxurious%20Wedding%20Dresses%20with%20gold%20embroidery&aspect=4:5' },
    { id: 2, title: 'Groom Wedding Sherwanis', imageUrl: 'https://api.a0.dev/assets/image?text=Wedding%20Sherwani%20with%20intricate%20embroidery&aspect=4:5' },
    { id: 3, title: 'Traditional Marwari Festive Wear', imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Marwari%20Ethnic%20Wear%20for%20Festivals&aspect=4:5' },
    { id: 4, title: 'Fusion Ethnic Wear', imageUrl: 'https://api.a0.dev/assets/image?text=Fusion%20Ethnic%20Wear%20with%20modern%20touches&aspect=4:5' },
    { id: 5, title: 'Sarees for Weddings', imageUrl: 'https://api.a0.dev/assets/image?text=Beautiful%20Wedding%20Sarees%20with%20embroidery&aspect=4:5' },
  ];

  const WeddingCollectionategories = [
    { id: 1, title: 'Exclusive Bridal Lehenga', imageUrl: 'https://api.a0.dev/assets/image?text=Bridal%20Lehenga%20with%20gold%20work&aspect=4:5' },
    { id: 2, title: 'Dulhan Accessories', imageUrl: 'https://api.a0.dev/assets/image?text=Bridal%20Jewelry%20Set&aspect=4:5' },
    { id: 3, title: 'Lehengas for Weddings', imageUrl: 'https://api.a0.dev/assets/image?text=Elegant%20Lehenga%20for%20Bride&aspect=4:5' },
    { id: 4, title: 'Bridal Dupattas', imageUrl: 'https://api.a0.dev/assets/image?text=Bridal%20Dupatta%20with%20work&aspect=4:5' },
    { id: 5, title: 'Bridal Footwear', imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Bridal%20Footwear%20for%20Weddings&aspect=4:5' },
  ];

  const DulhanWear = [
    { id: 1, title: 'Bride’s Wedding Lehenga', imageUrl: 'https://api.a0.dev/assets/image?text=Bride%20Lehenga%20in%20Gold%20and%20Red&aspect=4:5' },
    { id: 2, title: 'Bridal Saree Collection', imageUrl: 'https://api.a0.dev/assets/image?text=Luxury%20Bridal%20Sarees%20with%20Embroidery&aspect=4:5' },
    { id: 3, title: 'Wedding Blouse Designs', imageUrl: 'https://api.a0.dev/assets/image?text=Wedding%20Blouse%20Designs%20in%20Contemporary%20Style&aspect=4:5' },
    { id: 4, title: 'Bridal Choli Designs', imageUrl: 'https://api.a0.dev/assets/image?text=Bridal%20Choli%20in%20Red%20and%20Gold&aspect=4:5' },
    { id: 5, title: 'Bridal Gowns', imageUrl: 'https://api.a0.dev/assets/image?text=Stunning%20Bridal%20Gown%20with%20Intricate%20Designs&aspect=4:5' },
  ];

  const DulhaWear = [
    { id: 1, title: 'Wedding Sherwani for Groom', imageUrl: 'https://api.a0.dev/assets/image?text=Luxurious%20Wedding%20Sherwani%20for%20Groom&aspect=4:5' },
    { id: 2, title: 'Groom’s Turban Collection', imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Turban%20for%20Groom&aspect=4:5' },
    { id: 3, title: 'Designer Kurta for Groom', imageUrl: 'https://api.a0.dev/assets/image?text=Designer%20Kurta%20for%20Wedding%20Groom&aspect=4:5' },
    { id: 4, title: 'Groom’s Wedding Footwear', imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Footwear%20for%20Groom&aspect=4:5' },
    { id: 5, title: 'Groom Accessories', imageUrl: 'https://api.a0.dev/assets/image?text=Groom%20Accessories%20like%20Neckpieces%20and%20Rings&aspect=4:5' },
  ];

  const TraditionalMarwari = [
    { id: 1, title: 'Traditional Marwari Kurta', imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Marwari%20Kurta%20in%20Red%20and%20Gold&aspect=4:5' },
    { id: 2, title: 'Marwari Wedding Dupatta', imageUrl: 'https://api.a0.dev/assets/image?text=Marwari%20Wedding%20Dupatta%20with%20work&aspect=4:5' },
    { id: 3, title: 'Marwari Bridal Jewelry', imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Marwari%20Jewelry%20for%20Bride&aspect=4:5' },
    { id: 4, title: 'Marwari Festive Sarees', imageUrl: 'https://api.a0.dev/assets/image?text=Marwari%20Saree%20Collection%20for%20Festivals&aspect=4:5' },
    { id: 5, title: 'Marwari Wedding Shawls', imageUrl: 'https://api.a0.dev/assets/image?text=Traditional%20Marwari%20Wedding%20Shawls%20for%20Groom%20and%20Bride&aspect=4:5' },
  ];

  // Function to render category sections
  const renderCategorySection = (categoryList, sectionTitle) => (
    <>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categoryList.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            imageUrl={category.imageUrl}
            onPress={() => {}}
            label={true}
          />
        ))}
      </ScrollView>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marwari Dresses</Text>
        <View style={styles.headerIcons}>
          <Search size={24} color="#333" style={styles.icon} />
          <ShoppingCart size={24} color="#333" style={styles.icon} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {renderCategorySection(Allcategories, 'Wedding Dress Collections')}
        {renderCategorySection(WeddingCollectionategories, 'Exclusive Bridal Lehengas')}
        {renderCategorySection(DulhanWear, 'Bridal Accessories & Jewelry')}
        {renderCategorySection(DulhaWear, 'Groom’s Wedding Essentials')}
        {renderCategorySection(TraditionalMarwari, 'Traditional Marwari Festive Wear')}
        {renderCategorySection(Allcategories, 'Fusion & Contemporary Ethnic Wear')}
        {renderCategorySection(WeddingCollectionategories, 'Groom’s Luxury Sherwanis')}
        {renderCategorySection(DulhanWear, 'Festive Saree Collections')}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  categoryContainer: {
    paddingLeft: 8,
  },
});
