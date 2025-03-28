import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Lightbulb, Thermometer } from 'lucide-react-native';

export default function RoomsScreen() {
  const { t } = useTranslation();

  const rooms = [
    {
      id: 'livingRoom',
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&auto=format&fit=crop&q=80',
      devices: 5,
      temp: '22°C',
    },
    {
      id: 'bedroom',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=80',
      devices: 3,
      temp: '20°C',
    },
    {
      id: 'kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&auto=format&fit=crop&q=80',
      devices: 4,
      temp: '23°C',
    },
    {
      id: 'bathroom',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&auto=format&fit=crop&q=80',
      devices: 2,
      temp: '24°C',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {rooms.map((room) => (
        <TouchableOpacity key={room.id} style={styles.roomCard}>
          <Image source={{ uri: room.image }} style={styles.roomImage} />
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{t(`rooms.${room.id}`)}</Text>
            <View style={styles.roomStats}>
              <View style={styles.stat}>
                <Lightbulb size={16} color="#666666" />
                <Text style={styles.statText}>{room.devices} devices</Text>
              </View>
              <View style={styles.stat}>
                <Thermometer size={16} color="#666666" />
                <Text style={styles.statText}>{room.temp}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomImage: {
    width: '100%',
    height: 160,
  },
  roomInfo: {
    padding: 16,
  },
  roomName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  roomStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
});