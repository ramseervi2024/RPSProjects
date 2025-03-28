import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const matches = [
  {
    id: '1',
    name: 'Sarah',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Hey, how are you?',
  },
  {
    id: '2',
    name: 'Emily',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Nice to meet you!',
  },
];

export default function MatchesScreen() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 60,
    },
    title: {
      fontSize: 28,
      fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
      marginBottom: 20,
      paddingHorizontal: 20,
      textAlign: isRTL ? 'right' : 'left',
    },
    matchItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      alignItems: 'center',
    },
    photo: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: isRTL ? 0 : 15,
      marginLeft: isRTL ? 15 : 0,
    },
    matchInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
      textAlign: isRTL ? 'right' : 'left',
    },
    message: {
      color: '#666',
      marginTop: 4,
      fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
      textAlign: isRTL ? 'right' : 'left',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('tabs.matches')}</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.matchItem}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <View style={styles.matchInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}