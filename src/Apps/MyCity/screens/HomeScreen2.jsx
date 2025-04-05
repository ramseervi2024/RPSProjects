import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';



export default function HomeScreen2() {
  const [location, setLocation] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800' }}
          style={styles.cityImage}
        />
        <View style={styles.headerContent}>
          <Text style={styles.cityName}>{'Sojat City'}</Text>
          <Text style={styles.pincode}>PIN: {'306104'}</Text>
        </View>
      </View>

      <View style={styles.quickLinks}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.grid}>
          {['Emergency', 'Transport', 'Tourism', 'Education'].map((item) => (
            <View key={item} style={styles.gridItem}>
              <Text style={styles.gridItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.highlights}>
        <Text style={styles.sectionTitle}>City Highlights</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsScroll}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.highlightCard}>
              <Image
                source={{ uri: `https://images.unsplash.com/photo-${item}?w=400` }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightTitle}>Featured Place {item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    position: 'relative',
    height: 200,
  },
  cityImage: {
    width: '100%',
    height: 200,
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cityName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  pincode: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 4,
  },
  quickLinks: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1C1C1E',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  highlights: {
    padding: 20,
  },
  highlightsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  highlightCard: {
    width: 250,
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightImage: {
    width: '100%',
    height: 150,
  },
  highlightTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1C1C1E',
    padding: 12,
  },
});