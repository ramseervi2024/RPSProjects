import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Heart, X } from 'lucide-react-native';

export default function DiscoverScreen() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 20,
      margin: 20,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    image: {
      width: '100%',
      height: 400,
    },
    info: {
      padding: 20,
    },
    name: {
      fontSize: 24,
      fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
      textAlign: isRTL ? 'right' : 'left',
    },
    bio: {
      fontSize: 16,
      color: '#666',
      marginTop: 8,
      fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
      textAlign: isRTL ? 'right' : 'left',
    },
    actions: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    actionButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>Sarah, 28</Text>
          <Text style={styles.bio}>
            {isRTL
              ? 'مصممة جرافيك، عاشقة للفن والسفر'
              : 'Graphic designer, art enthusiast, and travel lover'}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#FF4B6E' }]}
          >
            <Heart size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#666' }]}
          >
            <X size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}