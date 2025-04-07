import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';


const TRENDING_PERFUMES = [
  {
    id: '1',
    name: 'Libre',
    brand: 'Yves Saint Laurent',
    image: 'https://images.unsplash.com/photo-1595425964272-5437c8a18827?w=800',
    description: 'A bold floral fragrance with lavender essence and orange blossom.',
    price: '$120',
  },
  {
    id: '2',
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
    description: 'An innovative olfactory creation with tuberose and cocoa.',
    price: '$98',
  },
];

export default function DiscoverScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
          {TRENDING_PERFUMES.map((perfume) => (
            <TouchableOpacity key={perfume.id} style={styles.trendingCard}>
              <Image source={{ uri: perfume.image }} style={styles.trendingImage} />
              <View style={styles.trendingInfo}>
                <Text style={styles.perfumeName}>{perfume.name}</Text>
                <Text style={styles.perfumeBrand}>{perfume.brand}</Text>
                <Text style={styles.perfumeDescription} numberOfLines={2}>
                  {perfume.description}
                </Text>
                <Text style={styles.perfumePrice}>{perfume.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <View style={styles.categoriesGrid}>
          {['Floral', 'Woody', 'Fresh', 'Oriental'].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  trendingScroll: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  trendingCard: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  trendingImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  trendingInfo: {
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
    marginBottom: 8,
  },
  perfumeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  perfumePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9B4F96',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  categoryCard: {
    width: '50%',
    padding: 8,
  },
  categoryText: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});