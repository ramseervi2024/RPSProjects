import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Leaf, Calendar, Droplet, ShoppingBasket } from 'lucide-react-native';

const categories = [
  {
    id: 1,
    title: 'Organic Techniques',
    icon: <Leaf size={24} color="#2E7D32" />,
    description: 'Traditional farming methods of Rajasthan',
    image: 'https://api.a0.dev/assets/image?text=traditional%20rajasthani%20farmer%20in%20organic%20farm%20field&aspect=16:9'
  },
  {
    id: 2,
    title: 'Crop Calendar',
    icon: <Calendar size={24} color="#2E7D32" />,
    description: 'Seasonal guide for organic farming',
    image: 'https://api.a0.dev/assets/image?text=rajasthan%20agriculture%20seasonal%20crops%20calendar&aspect=16:9'
  },
  {
    id: 3,
    title: 'Water Management',
    icon: <Droplet size={24} color="#2E7D32" />,
    description: 'Desert agriculture water conservation',
    image: 'https://api.a0.dev/assets/image?text=water%20conservation%20techniques%20in%20rajasthan%20desert%20farming&aspect=16:9'
  },
  {
    id: 4,
    title: 'Local Markets',
    icon: <ShoppingBasket size={24} color="#2E7D32" />,
    description: 'Connect with organic buyers',
    image: 'https://api.a0.dev/assets/image?text=rajasthani%20organic%20farmers%20market%20colorful&aspect=16:9'
  }
];

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Organic Farming</Text>
          <Text style={styles.headerSubtitle}>राजस्थान में जैविक खेती</Text>
        </View>

        <View style={styles.featuredContainer}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=beautiful%20organic%20farm%20in%20rajasthan%20countryside%20sustainable&aspect=16:9' }}
            style={styles.featuredImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Sustainable Farming Practices</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryCard}
              onPress={() => navigation.navigate(category.title.replace(/\s+/g, ''))}
            >
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <View style={styles.categoryContent}>
                <View style={styles.iconContainer}>
                  {category.icon}
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#E8F5E9',
    marginTop: 5,
  },
  featuredContainer: {
    margin: 15,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    padding: 15,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryImage: {
    width: '100%',
    height: 150,
  },
  categoryContent: {
    padding: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  categoryDescription: {
    color: '#666',
    fontSize: 14,
  },
});