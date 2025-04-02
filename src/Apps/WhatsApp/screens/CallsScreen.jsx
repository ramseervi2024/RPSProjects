import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone, Link } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

const CALLS = [
  {
    id: '1',
    name: 'Mom',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: 'incoming',
    duration: '5:23',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
  },
  {
    id: '2',
    name: 'John Smith',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: 'outgoing',
    duration: '2:45',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: 'missed',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '4',
    name: 'Tech Support',
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    type: 'incoming',
    duration: '15:07',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
  },
];

export default function CallsScreen() {
  const renderCallIcon = (type) => {
    const props = { size: 16, strokeWidth: 2 };
    
    switch (type) {
      case 'incoming':
        return <PhoneIncoming {...props} color="#4CAF50" />;
      case 'outgoing':
        return <PhoneOutgoing {...props} color="#2196F3" />;
      case 'missed':
        return <PhoneMissed {...props} color="#F44336" />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.callItem} activeOpacity={0.7}>
      <Image
        source={{ uri: `${item.avatar}?w=100` }}
        style={styles.avatar}
      />
      <View style={styles.callInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.callDetails}>
          {renderCallIcon(item.type)}
          <Text style={[
            styles.callType,
            { color: item.type === 'missed' ? '#F44336' : '#666' }
          ]}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            {item.duration && ` • ${item.duration}`}
          </Text>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {formatDistanceToNow(item.time, { addSuffix: true })}
        </Text>
        <TouchableOpacity style={styles.callButton}>
          <Phone size={20} color="#128C7E" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createLink}>
        <Link size={20} color="#128C7E" />
        <Text style={styles.createLinkText}>Create call link</Text>
      </TouchableOpacity>
      
      <View style={styles.recentContainer}>
        <Text style={styles.recentText}>Recent</Text>
      </View>

      <FlatList
        data={CALLS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.fab}>
        <Phone size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  createLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  createLinkText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#128C7E',
  },
  recentContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  recentText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 8,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6f7f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'ios' ? 40 : 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});