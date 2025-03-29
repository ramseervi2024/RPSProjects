import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Sun, Cloud, Droplets, Thermometer } from 'lucide-react-native';

const seasons = [
  {
    id: 1,
    name: 'Winter (October - March)',
    image: 'https://images.unsplash.com/photo-1598264294394-ba29cf557627',
    description: 'Best time to visit Rajasthan. Pleasant weather with temperatures ranging from 8°C to 28°C.',
    activities: ['Desert Camping', 'City Tours', 'Heritage Walks'],
    temperature: '8°C - 28°C',
    recommendation: 'Highly Recommended',
    tips: ['Pack warm clothes for evenings', 'Book accommodations in advance'],
  },
  {
    id: 2,
    name: 'Summer (April - June)',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    description: 'Hot and dry weather. Good time for budget travelers as rates are lower.',
    activities: ['Early Morning Sightseeing', 'Indoor Activities', 'Museum Visits'],
    temperature: '25°C - 45°C',
    recommendation: 'Not Recommended',
    tips: ['Carry sunscreen and water', 'Avoid afternoon activities'],
  },
  {
    id: 3,
    name: 'Monsoon (July - September)',
    image: 'https://images.unsplash.com/photo-1623677375459-4302b76763c7',
    description: 'Moderate rainfall with humid weather. Beautiful green landscapes.',
    activities: ['Photography', 'Lake Visits', 'Cultural Events'],
    temperature: '20°C - 35°C',
    recommendation: 'Moderately Recommended',
    tips: ['Carry rain gear', 'Check weather forecasts'],
  },
];

export default function BestTimeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Time to Visit</Text>
        <Text style={styles.subtitle}>Seasonal guide for your Rajasthan trip</Text>
      </View>

      {seasons.map(season => (
        <View key={season.id} style={styles.seasonCard}>
          <Image
            source={{ uri: season.image }}
            style={styles.seasonImage}
          />
          <View style={styles.seasonInfo}>
            <Text style={styles.seasonName}>{season.name}</Text>
            <View style={styles.recommendationBadge}>
              <Text style={styles.recommendationText}>{season.recommendation}</Text>
            </View>
            
            <View style={styles.weatherInfo}>
              <Thermometer size={20} color="#E63946" />
              <Text style={styles.temperatureText}>{season.temperature}</Text>
            </View>

            <Text style={styles.seasonDescription}>{season.description}</Text>

            <Text style={styles.sectionTitle}>Best Activities:</Text>
            <View style={styles.activitiesList}>
              {season.activities.map((activity, index) => (
                <View key={index} style={styles.activityBadge}>
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Travel Tips:</Text>
            <View style={styles.tipsList}>
              {season.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View style={styles.tipDot} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
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
    backgroundColor: '#457B9D',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  seasonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  seasonImage: {
    width: '100%',
    height: 200,
  },
  seasonInfo: {
    padding: 15,
  },
  seasonName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D3557',
  },
  recommendationBadge: {
    backgroundColor: '#F1FAEE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  recommendationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1D3557',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  temperatureText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#E63946',
    marginLeft: 8,
  },
  seasonDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 22,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D3557',
    marginTop: 16,
    marginBottom: 8,
  },
  activitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityBadge: {
    backgroundColor: '#A8DADC',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  activityText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1D3557',
  },
  tipsList: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E63946',
    marginRight: 8,
  },
  tipText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});