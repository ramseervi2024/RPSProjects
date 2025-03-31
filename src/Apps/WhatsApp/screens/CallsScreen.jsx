import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react-native';

const CALLS = [
  {
    id: '1',
    name: 'Mom',
    time: '10 minutes ago',
    type: 'incoming',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
  },
  {
    id: '2',
    name: 'John Smith',
    time: '2 hours ago',
    type: 'outgoing',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    time: 'Yesterday, 8:30 PM',
    type: 'missed',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
];

export default function CallsScreen() {
  const renderCallIcon = (type) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming size={16} color="#128C7E" />;
      case 'outgoing':
        return <PhoneOutgoing size={16} color="#128C7E" />;
      case 'missed':
        return <PhoneMissed size={16} color="#FF3B30" />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.callItem}>
      <Image
        source={{ uri: `${item.avatar}?w=100` }}
        style={styles.avatar}
      />
      <View style={styles.callInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.callDetails}>
          {renderCallIcon(item.type)}
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CALLS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  callItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  callInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});