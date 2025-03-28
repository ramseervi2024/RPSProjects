import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Settings, CreditCard as Edit2, Globe } from 'lucide-react-native';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
    },
    name: {
      fontSize: 24,
      fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
      marginBottom: 8,
    },
    location: {
      fontSize: 16,
      color: '#666',
      fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
      marginBottom: 12,
      textAlign: isRTL ? 'right' : 'left',
    },
    sectionContent: {
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
      fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
      textAlign: isRTL ? 'right' : 'left',
    },
    button: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    buttonText: {
      marginLeft: isRTL ? 0 : 12,
      marginRight: isRTL ? 12 : 0,
      fontSize: 16,
      fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
    },
  });

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Sarah Anderson</Text>
        <View style={styles.location}>
          <Globe size={16} color="#666" />
          <Text style={[styles.buttonText, { color: '#666' }]}>
            New York, USA
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.about')}</Text>
        <Text style={styles.sectionContent}>
          {isRTL
            ? 'مصممة جرافيك مبدعة، أحب السفر واكتشاف أماكن جديدة. أبحث عن شخص يشاركني شغفي بالحياة والمغامرة.'
            : 'Creative graphic designer who loves traveling and discovering new places. Looking for someone to share my passion for life and adventure.'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Edit2 size={20} color="#666" />
        <Text style={styles.buttonText}>{t('profile.editProfile')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Settings size={20} color="#666" />
        <Text style={styles.buttonText}>{t('profile.settings')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
        <Globe size={20} color="#666" />
        <Text style={styles.buttonText}>{t('profile.language')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}