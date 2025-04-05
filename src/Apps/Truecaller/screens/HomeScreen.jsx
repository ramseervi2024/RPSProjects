import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react-native';

const RECENT_CALLS = [
  {
    id: '1',
    name: 'John Doe',
    number: '+1 234 567 8900',
    type: 'incoming',
    time: '10:30 AM',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Jane Smith',
    number: '+1 234 567 8901',
    type: 'outgoing',
    time: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Unknown',
    number: '+1 234 567 8902',
    type: 'missed',
    time: 'Yesterday',
    spam: true,
  },
];

export default function RecentScreen() {
  const renderCallIcon = (type) => {
    const props = { size: 16, color: type === 'missed' ? '#FF3B30' : '#666666' };
    switch (type) {
      case 'incoming':
        return <PhoneIncoming {...props} />;
      case 'outgoing':
        return <PhoneOutgoing {...props} />;
      case 'missed':
        return <PhoneMissed {...props} />;
      default:
        return <Phone {...props} />;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.callItem}>
      <View style={styles.avatarContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.callInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          {item.spam && <Text style={styles.spamTag}>Spam</Text>}
        </View>
        <View style={styles.callDetails}>
          {renderCallIcon(item.type)}
          <Text style={styles.number}>{item.number}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Phone size={20} color="#0066FF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent</Text>
      </View>
      <FlatList
        data={RECENT_CALLS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  list: {
    padding: 16,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholderAvatar: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: '#666666',
    fontFamily: 'Inter_600SemiBold',
  },
  callInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginRight: 8,
  },
  spamTag: {
    fontSize: 12,
    color: '#FF3B30',
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    fontFamily: 'Inter_600SemiBold',
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  number: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
    fontFamily: 'Inter_400Regular',
  },
  time: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 'auto',
    fontFamily: 'Inter_400Regular',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});