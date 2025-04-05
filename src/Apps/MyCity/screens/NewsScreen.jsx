import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
// import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

const mockNews = [
  {
    id: '1',
    title: 'New Park Opening This Weekend',
    description: 'Central Park expansion project completed ahead of schedule',
    image: 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=400',
    date: '2025-01-15',
  },
  {
    id: '2',
    title: 'Local Festival Announces Lineup',
    description: 'Annual cultural festival returns with exciting performances',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    date: '2025-01-14',
  },
  // Add more mock news items as needed
];

export default function NewsScreen() {
//   const [fontsLoaded] = useFonts({
//     'Inter-Regular': Inter_400Regular,
//     'Inter-SemiBold': Inter_600SemiBold,
//   });

//   if (!fontsLoaded) {
//     return null;
//   }

  return (
    <View style={styles.container}>
      <FlatList
        data={mockNews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
    marginBottom: 8,
  },
  newsDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 8,
  },
  newsDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
});