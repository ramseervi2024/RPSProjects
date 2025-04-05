import { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Search, Settings, Ghost } from 'lucide-react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;


const FRIENDS = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      lastUpdated: '2 min ago',
      place: 'Central Park',
    },
    status: 'active',
    emoji: '🎮',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      lastUpdated: '5 min ago',
      place: 'Times Square',
    },
    status: 'active',
    emoji: '🎵',
  },
];

export default function MapScreen() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const slideAnim = useRef(new Animated.Value(WINDOW_WIDTH)).current;
  const [showGhostMode, setShowGhostMode] = useState(false);

  useEffect(() => {
    if (selectedFriend) {
      Animated.spring(slideAnim, {
        toValue:  0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: WINDOW_WIDTH,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedFriend]);

  const toggleGhostMode = () => {
    setShowGhostMode(!showGhostMode);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a1a']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Search color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Snap Map</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Settings color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Ghost Mode Toggle */}
      <TouchableOpacity 
        style={[styles.ghostMode, showGhostMode && styles.ghostModeActive]}
        onPress={toggleGhostMode}>
        <Ghost color={showGhostMode ? '#000' : '#fff'} size={20} />
        <Text style={[styles.ghostModeText, showGhostMode && styles.ghostModeTextActive]}>
          Ghost Mode {showGhostMode ? 'On' : 'Off'}
        </Text>
      </TouchableOpacity>

      {/* Friends List */}
      <View style={styles.friendsList}>
        {FRIENDS.map(friend => (
          <TouchableOpacity
            key={friend.id}
            style={styles.friendItem}
            onPress={() => setSelectedFriend(friend)}>
            <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
            <View style={[styles.statusDot, 
              friend.status === 'active' && styles.statusActive,
              friend.status === 'idle' && styles.statusIdle
            ]} />
            {friend.emoji && (
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>{friend.emoji}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Friend Details Slide-up */}
      <Animated.View 
        style={[
          styles.friendDetails,
          { transform: [{ translateX: slideAnim }] }
        ]}>
        {selectedFriend && (
          <>
            <View style={styles.friendHeader}>
              <Image 
                source={{ uri: selectedFriend.avatar }} 
                style={styles.detailsAvatar} 
              />
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{selectedFriend.name}</Text>
                <Text style={styles.locationText}>
                  {selectedFriend.location.place}
                </Text>
                <Text style={styles.lastSeen}>
                  Last updated {selectedFriend.location.lastUpdated}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedFriend(null)}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostMode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    left: 20,
  },
  ghostModeActive: {
    backgroundColor: '#fffc00',
  },
  ghostModeText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  ghostModeTextActive: {
    color: '#000',
  },
  friendsList: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 180 : 160,
    right: 20,
  },
  friendItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    position: 'relative',
  },
  friendAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#666',
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: '#000',
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusIdle: {
    backgroundColor: '#FFC107',
  },
  emojiContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 12,
  },
  friendDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 200,
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  lastSeen: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
});