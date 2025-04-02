import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';

const DEALS = [
  {
    id: '1',
    title: 'Echo Dot (5th Gen)',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1668020667506-5b5f0a16f7c4?w=800&auto=format&fit=crop&q=60',
    discount: 50,
  },
  {
    id: '2',
    title: 'Kindle Paperwhite',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=60',
    discount: 35,
  },
  {
    id: '3',
    title: 'Fire TV Stick 4K',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1540655037529-dec987208707?w=800&auto=format&fit=crop&q=60',
    discount: 40,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#111111" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Amazon"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&auto=format&fit=crop&q=60' }}
        style={styles.banner}
      />

      <Text style={styles.sectionTitle}>Today's Deals</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsContainer}>
        {DEALS.map((deal) => (
          <TouchableOpacity key={deal.id} style={styles.dealCard}>
            <Image source={{ uri: deal.image }} style={styles.dealImage} />
            <View style={styles.dealBadge}>
              <Text style={styles.dealBadgeText}>Up to {deal.discount}% off</Text>
            </View>
            <Text style={styles.dealTitle}>{deal.title}</Text>
            <Text style={styles.dealPrice}>${deal.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEBD69',
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  dealsContainer: {
    paddingHorizontal: 10,
  },
  dealCard: {
    width: 180,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dealImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dealBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#CC0C39',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dealBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dealTitle: {
    fontSize: 14,
    fontWeight: '600',
    margin: 10,
  },
  dealPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B12704',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});