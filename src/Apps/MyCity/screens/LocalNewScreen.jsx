import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { Flame, Newspaper, Briefcase, Drum } from 'lucide-react-native';
// import { View } from 'react-native-safe-area-context';
import NewsCard from './NewsCard';

export default function LocalNewScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://api.a0.dev/assets/image?text=rajasthan%20traditional%20art%20pattern%20minimalist&aspect=4:1' }}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>राजस्थान समाचार</Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.categories}>
          <CategoryButton icon="flame" label="ट्रेंडिंग" />
          <CategoryButton icon="newspaper" label="राज्य" />
          <CategoryButton icon="briefcase" label="व्यापार" />
          <CategoryButton icon="cricket" label="खेल" />
        </View>

        <Text style={styles.sectionTitle}>प्रमुख समाचार</Text>
        
        <NewsCard
          imageUrl="https://api.a0.dev/assets/image?text=jaipur%20city%20palace%20beautiful%20architecture&aspect=16:9"
          title="जयपुर के सिटी पैलेस में नई प्रदर्शनी का उद्घाटन"
          description="राजस्थान की कला और संस्कृति को प्रदर्शित करती नई प्रदर्शनी का आयोजन"
          category="संस्कृति"
        />

        <NewsCard
          imageUrl="https://api.a0.dev/assets/image?text=rajasthan%20desert%20festival%20celebration&aspect=16:9"
          title="मरुस्थल महोत्सव 2025 की तैयारियां शुरू"
          description="जैसलमेर में होने वाले वार्षिक मरुस्थल महोत्सव की तैयारियां पूरे जोर-शोर से चल रही हैं"
          category="उत्सव"
        />

        <NewsCard
          imageUrl="https://api.a0.dev/assets/image?text=modern%20rajasthan%20tech%20hub%20building&aspect=16:9"
          title="राजस्थान में नया टेक हब"
          description="जयपुर में स्टार्टअप्स के लिए नए टेक हब का निर्माण कार्य प्रारंभ"
          category="टेक्नोलॉजी"
        />
      </ScrollView>
    </View>
  );
}

function CategoryButton({ icon, label }) {
  const IconComponent = {
    flame: Flame,
    newspaper: Newspaper,
    briefcase: Briefcase,
    cricket: Drum,
  }[icon];

  return (
    <TouchableOpacity style={styles.categoryButton}>
      <IconComponent size={24} color="#D24D4D" />
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingTop:60
  },
  headerImage: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D24D4D',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  categoryButton: {
    alignItems: 'center',
  },
  categoryLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: '#333',
  },
});