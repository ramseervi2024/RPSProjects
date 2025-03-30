import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Star, Shield, Award } from 'lucide-react-native';

const BUYERS = [
  {
    id: '1',
    name: 'राजेश कुमार',
    type: 'व्यापारी',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    lastMessage: 'गेहूं का रेट क्या है?',
    time: '10:30 AM',
    rating: 4.8,
    verified: true,
    premium: true,
    trades: 150,
  },
  {
    id: '2',
    name: 'अनिल अग्रवाल',
    type: 'मिल मालिक',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    lastMessage: 'कल मिल पर आ जाओ',
    time: 'कल',
    rating: 4.5,
    verified: true,
    premium: false,
    trades: 80,
  },
  {
    id: '3',
    name: 'प्रीति शर्मा',
    type: 'व्यापारी',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    lastMessage: 'सरसों की क्वालिटी कैसी है?',
    time: 'कल',
    rating: 4.9,
    verified: true,
    premium: true,
    trades: 200,
  },
];

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>संदेश</Text>
      </View>

      <FlatList
        data={BUYERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              {item.premium && (
                <View style={styles.premiumBadge}>
                  <Star size={12} color="#FFD700" />
                </View>
              )}
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.nameContainer}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.verified && (
                    <Shield size={16} color="#4CAF50" style={styles.verifiedIcon} />
                  )}
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.message} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <View style={styles.tradesContainer}>
                  <Award size={14} color="#4CAF50" />
                  <Text style={styles.tradesText}>{item.trades} लेन-देन</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#212121',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  premiumBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
    elevation: 2,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  type: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#212121',
    marginLeft: 4,
  },
  tradesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradesText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
});