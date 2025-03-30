import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Heart, X } from 'lucide-react-native';

export default function DiscoverScreen() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const users = [
    {
      id: 1,
      name: 'Sophia, 25',
      bio: isRTL
        ? 'مصممة أزياء، عاشقة للموضة والسفر'
        : 'Fashion designer, fashion enthusiast, and travel lover',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: 2,
      name: 'Emma, 30',
      bio: isRTL
        ? 'طبيبة، مهتمة بالصحة واللياقة البدنية'
        : 'Doctor, passionate about health and fitness',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybHN8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 3,
      name: 'Olivia, 27',
      bio: isRTL
        ? 'مديرة تسويق، مبدعة في استراتيجيات النمو'
        : 'Marketing manager, creative in growth strategies',
      image: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybHN8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 4,
      name: 'Ava, 29',
      bio: isRTL
        ? 'مهندسة معمارية، أحب العمل على مشاريع مبتكرة'
        : 'Architect, love working on innovative projects',
      image: 'https://images.unsplash.com/photo-1600600423621-70c9f4416ae9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmxzfGVufDB8fDB8fHww',
    },
    {
      id: 5,
      name: 'Isabella, 24',
      bio: isRTL
        ? 'مستشارة مالية، شغوفة بمساعدة الآخرين في تحسين وضعهم المالي'
        : 'Financial consultant, passionate about helping others improve their financial situation',
      image: 'https://images.unsplash.com/photo-1553860214-87b92d6c1e22?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGdpcmxzfGVufDB8fDB8fHww',
    },
    {
      id: 6,
      name: 'Charlotte, 31',
      bio: isRTL
        ? 'صحفية، مولعة بالقضايا الاجتماعية والإنسانية'
        : 'Journalist, passionate about social and humanitarian issues',
      image: 'https://images.unsplash.com/photo-1627067227573-07bc616f46ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdpcmxzfGVufDB8fDB8fHww',
    },
    {
      id: 7,
      name: 'Mia, 26',
      bio: isRTL
        ? 'طاهية محترفة، أحب تجربة الوصفات الجديدة'
        : 'Professional chef, love trying new recipes',
      image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGdpcmxzfGVufDB8fDB8fHww',
    },
    // Add more users here if needed
  ];

  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const acceptUser = () => {
    // Handle user acceptance (e.g., add to accepted list)
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const rejectUser = () => {
    // Handle user rejection (e.g., add to rejected list)
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const currentUser = users[currentUserIndex];

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
      {currentUser && (
        <View style={styles.card}>
          <Image
            source={{ uri: currentUser.image }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.bio}>{currentUser.bio}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FF4B6E' }]}
              onPress={acceptUser}
            >
              <Heart size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#666' }]}
              onPress={rejectUser}
            >
              <X size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
