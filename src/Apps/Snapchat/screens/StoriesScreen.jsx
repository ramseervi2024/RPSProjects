import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Plus, X } from 'lucide-react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;



const STORIES = [
  {
    id: '1',
    name: 'Your Story',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    hasStory: false,
  },
  {
    id: '2',
    name: 'John',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    hasStory: true,
    stories: [
      {
        id: '1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
        timestamp: Date.now() - 3600000,
        viewed: false,
      },
      {
        id: '2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
        timestamp: Date.now() - 7200000,
        viewed: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    hasStory: true,
    stories: [
      {
        id: '1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        timestamp: Date.now() - 1800000,
        viewed: false,
      },
    ],
  },
];

export default function StoriesScreen() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progressValue] = useState(new Animated.Value(0));
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (selectedStory && selectedStory.stories) {
      progressValue.setValue(0);
      Animated.timing(progressValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          if (currentStoryIndex < (selectedStory.stories?.length || 0) - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
          } else {
            setIsModalVisible(false);
            setSelectedStory(null);
            setCurrentStoryIndex(0);
          }
        }
      });
    }
  }, [selectedStory, currentStoryIndex]);

  const openStory = (story) => {
    setSelectedStory(story);
    setCurrentStoryIndex(0);
    setIsModalVisible(true);
  };

  const closeStory = () => {
    setIsModalVisible(false);
    setSelectedStory(null);
    setCurrentStoryIndex(0);
  };

  const formatTimestamp = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1h ago';
    return `${hours}h ago`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a1a']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Stories</Text>
      </View>

      <ScrollView>
        <View style={styles.storiesContainer}>
          {STORIES.map((story) => (
            <TouchableOpacity 
              key={story.id} 
              style={styles.storyItem}
              onPress={() => story.hasStory ? openStory(story) : null}>
              <View style={[styles.avatarContainer, story.hasStory && styles.hasStory]}>
                <Image source={{ uri: story.avatar }} style={styles.avatar} />
                {!story.hasStory && (
                  <View style={styles.addButton}>
                    <Plus color="#000" size={20} />
                  </View>
                )}
              </View>
              <Text style={styles.storyName}>{story.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          {selectedStory?.stories && (
            <>
              <View style={styles.progressContainer}>
                {selectedStory.stories.map((_, index) => (
                  <View key={index} style={styles.progressBar}>
                    <Animated.View
                      style={[
                        styles.progress,
                        {
                          width: progressValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          }),
                          opacity: currentStoryIndex === index ? 1 : 
                                 currentStoryIndex > index ? 1 : 0.5,
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>

              <View style={styles.storyHeader}>
                <Image 
                  source={{ uri: selectedStory.avatar }} 
                  style={styles.storyAvatar} 
                />
                <Text style={styles.storyUsername}>{selectedStory.name}</Text>
                <Text style={styles.storyTime}>
                  {formatTimestamp(selectedStory.stories[currentStoryIndex].timestamp)}
                </Text>
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={closeStory}>
                  <X color="#fff" size={24} />
                </TouchableOpacity>
              </View>

              <Image
                source={{ uri: selectedStory.stories[currentStoryIndex].url }}
                style={styles.storyImage}
              />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },
  storiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  storyItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 2,
    backgroundColor: '#333',
    position: 'relative',
  },
  hasStory: {
    backgroundColor: '#fffc00',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 33,
  },
  addButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#fffc00',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  storyName: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
  },
  progress: {
    height: '100%',
    backgroundColor: '#fff',
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 15,
  },
  storyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  storyUsername: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  storyTime: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 10,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  storyImage: {
    width: WINDOW_WIDTH,
    height: '100%',
    resizeMode: 'cover',
  },
});