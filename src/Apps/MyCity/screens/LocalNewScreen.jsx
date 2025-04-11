import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import { Flame, Newspaper, Briefcase, Drum } from 'lucide-react-native';
import NewsCard from './NewsCard';

export default function LocalNewScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('flame'); // Default to trending

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // News data for each category
  const newsData = {
    flame: [
      {
        id: 1,
        imageUrl: "https://api.a0.dev/assets/image?text=jaipur%20city%20palace%20crowd&aspect=16:9",
        title: "जयपुर में पर्यटकों की भीड़",
        description: "गर्मी की छुट्टियों में जयपुर के ऐतिहासिक स्थलों पर पर्यटकों की भारी भीड़",
        category: "ट्रेंडिंग",
        time: "1 घंटे पहले"
      },
      {
        id: 2,
        imageUrl: "https://api.a0.dev/assets/image?text=rajasthan%20heatwave&aspect=16:9",
        title: "राजस्थान में भीषण गर्मी",
        description: "राज्य के कई हिस्सों में तापमान 45°C को पार, प्रशासन ने एडवाइजरी जारी की",
        category: "ट्रेंडिंग",
        time: "3 घंटे पहले"
      }
    ],
    newspaper: [
      {
        id: 3,
        imageUrl: "https://api.a0.dev/assets/image?text=rajasthan%20assembly&aspect=16:9",
        title: "विधानसभा में महत्वपूर्ण बिल पारित",
        description: "राजस्थान विधानसभा ने शिक्षा और स्वास्थ्य से जुड़े तीन महत्वपूर्ण बिल पारित किए",
        category: "राज्य",
        time: "5 घंटे पहले"
      },
      {
        id: 4,
        imageUrl: "https://api.a0.dev/assets/image?text=rajasthan%20police&aspect=16:9",
        title: "पुलिस विभाग में बड़ा फेरबदल",
        description: "राजस्थान पुलिस में 50 IPS अधिकारियों का तबादला, नए एसपी नियुक्त",
        category: "राज्य",
        time: "1 दिन पहले"
      }
    ],
    briefcase: [
      {
        id: 5,
        imageUrl: "https://api.a0.dev/assets/image?text=rajasthan%20business%20summit&aspect=16:9",
        title: "उद्योग सम्मेलन में 500 करोड़ के एमओयू",
        description: "जयपुर में आयोजित उद्योग सम्मेलन में कई कंपनियों ने राजस्थान में निवेश का ऐलान किया",
        category: "व्यापार",
        time: "2 दिन पहले"
      },
      {
        id: 6,
        imageUrl: "https://api.a0.dev/assets/image?text=rajasthan%20handicrafts%20export&aspect=16:9",
        title: "हस्तशिल्प निर्यात में वृद्धि",
        description: "राजस्थान के हस्तशिल्प उत्पादों का निर्यात पिछले वर्ष की तुलना में 20% बढ़ा",
        category: "व्यापार",
        time: "3 दिन पहले"
      }
    ],
    cricket: [
      {
        id: 7,
        imageUrl: "https://api.a0.dev/assets/image?text=rajasthan%20royals%20cricket&aspect=16:9",
        title: "राजस्थान रॉयल्स ने जीता मैच",
        description: "आईपीएल में राजस्थान रॉयल्स ने मुंबई इंडियंस को 5 विकेट से हराया",
        category: "खेल",
        time: "4 घंटे पहले"
      },
      {
        id: 8,
        imageUrl: "https://api.a0.dev/assets/image?text=rajasthan%20kabaddi&aspect=16:9",
        title: "पिंक पैंथर्स ने जीता प्रो कबड्डी लीग",
        description: "प्रो कबड्डी लीग के फाइनल में राजस्थान पिंक पैंथर्स ने बेंगलुरु को हराया",
        category: "खेल",
        time: "1 दिन पहले"
      }
    ]
  };

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
          <CategoryButton
            icon="flame"
            label="ट्रेंडिंग"
            isActive={activeCategory === 'flame'}
            onPress={() => setActiveCategory('flame')}
          />
          <CategoryButton
            icon="newspaper"
            label="राज्य"
            isActive={activeCategory === 'newspaper'}
            onPress={() => setActiveCategory('newspaper')}
          />
          <CategoryButton
            icon="briefcase"
            label="व्यापार"
            isActive={activeCategory === 'briefcase'}
            onPress={() => setActiveCategory('briefcase')}
          />
          <CategoryButton
            icon="cricket"
            label="खेल"
            isActive={activeCategory === 'cricket'}
            onPress={() => setActiveCategory('cricket')}
          />
        </View>

        <Text style={styles.sectionTitle}>
          {activeCategory === 'flame' && 'ट्रेंडिंग समाचार'}
          {activeCategory === 'newspaper' && 'राज्य समाचार'}
          {activeCategory === 'briefcase' && 'व्यापार समाचार'}
          {activeCategory === 'cricket' && 'खेल समाचार'}
        </Text>

        {newsData[activeCategory].map((news) => (
          <NewsCard
            key={news.id}
            imageUrl={news.imageUrl}
            title={news.title}
            description={news.description}
            category={news.category}
            time={news.time}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function CategoryButton({ icon, label, isActive, onPress }) {
  const IconComponent = {
    flame: Flame,
    newspaper: Newspaper,
    briefcase: Briefcase,
    cricket: Drum,
  }[icon];

  return (
    <TouchableOpacity
      style={[styles.categoryButton, isActive && styles.activeCategory]}
      onPress={onPress}
    >
      <IconComponent
        size={24}
        color={isActive ? '#D24D4D' : '#666'}
      />
      <Text style={[styles.categoryLabel, isActive && styles.activeCategoryLabel]}>
        {label}
      </Text>
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
    paddingTop: Platform.OS == 'android' ? 20 : 60

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
    padding: 8,
  },
  activeCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#D24D4D',
  },
  categoryLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  activeCategoryLabel: {
    color: '#D24D4D',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: '#333',
  },
});