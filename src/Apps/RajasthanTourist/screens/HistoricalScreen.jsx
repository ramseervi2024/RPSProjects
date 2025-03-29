import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const historicalPlaces = [
  {
    id: 1,
    name: 'Chittorgarh Fort',
    location: 'Chittorgarh',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    description: 'Largest fort complex in India, symbol of Rajput valor',
    period: '7th Century',
    significance: 'UNESCO World Heritage Site',
  },
  {
    id: 2,
    name: 'Junagarh Fort',
    location: 'Bikaner',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    description: 'Unique fort never conquered in battle',
    period: '16th Century',
    significance: 'Architectural Marvel',
  },
  {
    id: 3,
    name: 'Kumbhalgarh Fort',
    location: 'Rajsamand',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    description: 'Second longest wall after Great Wall of China',
    period: '15th Century',
    significance: 'UNESCO World Heritage Site',
  },
  {
    id: 4,
    name: 'Ranthambore Fort',
    location: 'Sawai Madhopur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    description: 'Ancient fort within tiger reserve',
    period: '8th Century',
    significance: 'Historical & Natural Heritage',
  }
];

export default function HistoricalScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historical Forts</Text>
        <Text style={styles.subtitle}>Discover the rich heritage of Rajasthan</Text>
      </View>

      <View style={styles.placesContainer}>
        {historicalPlaces.map(place => (
          <TouchableOpacity key={place.id} style={styles.placeCard}>
            <Image
              source={{ uri: place.image }}
              style={styles.placeImage}
            />
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeLocation}>{place.location}</Text>
              <View style={styles.periodContainer}>
                <Text style={styles.periodLabel}>Period:</Text>
                <Text style={styles.periodText}>{place.period}</Text>
              </View>
              <Text style={styles.significance}>{place.significance}</Text>
              <Text style={styles.placeDescription}>{place.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
    backgroundColor: '#1D3557',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#A8DADC',
    marginTop: 4,
  },
  placesContainer: {
    padding: 20,
  },
  placeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  placeImage:{
    width: '100%',
    height: 200,
  },
  placeInfo: {
    padding: 15,
  },
  placeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D3557',
  },
  placeLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  periodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  periodLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1D3557',
  },
  periodText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  significance: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#E63946',
    marginTop: 8,
  },
  placeDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});