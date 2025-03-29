import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Grid2x2 as Grid, List } from 'lucide-react-native';
import { useState } from 'react';

export default function TouristPlacesScreen() {
  const [viewMode, setViewMode] = useState('grid');

  const touristPlaces = [
    {
      name: 'Om Ashram, Jadan',
      category: 'Cultural Site',
      image: 'https://lh3.googleusercontent.com/p/AF1QipMJ1i3io1eGuyuUPyXionCyL6Yq9z-yADptxeQu=s1360-w1360-h1020',
    },
    {
      name: 'Sardar Samand Fort',
      category: 'Historical Site',
      image: 'https://sardarsamand.jodhanaheritage.com/images/4.jpg',
    },
    {
      name: 'Jawai Dam',
      category: 'Nature',
      image: 'https://images.unsplash.com/photo-1499883614574-22631ce07525?q=80&w=3628&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Ranakpur Jain Temple',
      category: 'Religious Site',
      image: 'https://images.unsplash.com/photo-1597078804310-7dfe09d55fdc?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Kumbhalgarh Fort',
      category: 'Historical Site',
      image: 'https://plus.unsplash.com/premium_photo-1697730385162-fa617cfd46d8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nimbo Ka Nath',
      category: 'Religious Site',
      image: 'https://plus.unsplash.com/premium_photo-1691031429427-97978a028467?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nadol Ashapura Mataji Temple',
      category: 'Religious Site',
      image: 'https://images.unsplash.com/photo-1593739594181-dcd2709bc51d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UGFyc2h1cmFtJTIwTWFoYWRldiUyMG1hbmRpcnxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      name: 'Om Banna Dham',
      category: 'Cultural Site',
      image: 'https://www.mapsofindia.com/ci-moi-images/my-india/2014/04/om-bana-temple.jpg',
    },
    {
      name: 'Mehrangarh Fort',
      category: 'Historical Site',
      image: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVocmFuZ2FyaCUyMEZvcnQlMkN8ZW58MHx8MHx8fDA%3D',
    },
    {
      name: 'Shri Aai Mata Temple',
      category: 'Religious Site',
      image: 'https://lh3.googleusercontent.com/gps-cs-s/AB5caB_pO3unB4xnJGUiTQK50s511KfXxjdK4ItavGiGA4ZJCFTwvyEhzmgk60BGhdttxQPYmaykRdd_cpY8FF-5golmSCVgPi1qB0jXwBU8g5Tp096_4vDj9L6S_TjI3tN0J5csWQ=s1360-w1360-h1020',
    },
    {
      name: 'Parshuram Mahadev Temple',
      category: 'Religious Site',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7-A8CY3BoU3u-gDw_upK3G4_BZs7HzFfjA&s',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tourist Places</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'grid' && styles.toggleButtonActive]}
            onPress={() => setViewMode('grid')}>
            <Grid size={20} color={viewMode === 'grid' ? '#007AFF' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}>
            <List size={20} color={viewMode === 'list' ? '#007AFF' : '#666'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {touristPlaces.map((place, index) => (
            <TouchableOpacity
              key={index}
              style={viewMode === 'grid' ? styles.gridCard : styles.listCard}>
              <Image 
                source={{ uri: place.image }} 
                style={viewMode === 'grid' ? styles.gridImage : styles.listImage}
                resizeMode="cover"
              />
              <View style={viewMode === 'grid' ? styles.gridInfo : styles.listInfo}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeCategory}>{place.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingVertical: 5,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  listContainer: {
    gap: 16,
  },
  gridCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  gridImage: {
    width: '100%',
    height: 150,
  },
  listImage: {
    width: 120,
    height: 120,
  },
  gridInfo: {
    padding: 12,
  },
  listInfo: {
    flex: 1,
    padding: 16,
  },
  placeName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  placeCategory: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
});