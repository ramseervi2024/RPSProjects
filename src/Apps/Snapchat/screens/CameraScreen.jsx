import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Platform, Text, ScrollView } from 'react-native';
import { Camera as CameraIcon, Aperture, Camera as FlipCamera, Image as ImageIcon, Sparkles } from 'lucide-react-native';

const FILTERS = [
  { id: 'normal', name: 'Normal' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'warm', name: 'Warm' },
  { id: 'cool', name: 'Cool' },
];

export default function CameraScreen() {
  const [type, setType] = useState('back');
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState('off');
  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [lastPhoto, setLastPhoto] = useState(null);
  const cameraRef = useRef(null);

  // useEffect(() => {
  //   requestPermission();
  // }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      
      // Apply selected filter
      let manipulatedImage = photo;
      if (selectedFilter !== 'normal') {
        const operations = [];
        switch (selectedFilter) {
          case 'vintage':
            operations.push({ saturate: -0.5 }, { contrast: 1.2 });
            break;
          case 'warm':
            operations.push({ warmth: 0.5 });
            break;
          case 'cool':
            operations.push({ warmth: -0.5 });
            break;
        }
        
        // manipulatedImage = await ImageManipulator.manipulateAsync(
        //   photo.uri,
        //   operations,
        //   { compress: 0.8, format: 'jpeg' }
        // );
      }
      
      setLastPhoto(manipulatedImage.uri);
    } catch (error) {
      console.error('Failed to take picture:', error);
    }
  };

  // if (!permission?.granted) {
  //   return (
  //     <View style={styles.permissionContainer}>
  //       <Text style={styles.permissionText}>We need camera permission to continue</Text>
  //       <TouchableOpacity 
  //         style={styles.permissionButton} 
  //         // onPress={() => requestPermission()}
  //         >
  //         <Text style={styles.permissionButtonText}>Grant Permission</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View 
        ref={cameraRef}
        style={styles.camera} 
        type={type}
        flashMode={flash}
      >
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity 
            style={styles.flashButton}
            onPress={() => setFlash(flash === 'on' ? 'off' : 'on')}>
            <Text style={[styles.flashText, flash === 'on' && styles.flashActive]}>⚡</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Selector */}
        <ScrollView
          horizontal 
          style={styles.filterContainer}
          showsHorizontalScrollIndicator={false}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter.id)}>
              <Text style={styles.filterText}>{filter.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Controls */}
        <View style={styles.buttonContainer}>
          {lastPhoto ? (
            <TouchableOpacity 
              style={styles.thumbnailContainer}
              onPress={() => {}}>
              <Image source={{ uri: lastPhoto }} style={styles.thumbnail} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button}>
              <ImageIcon color="#fff" size={28} />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={takePicture}>
            <Aperture color="#fff" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setType(type === 'back' ? 'front' : 'back')}>
            <FlipCamera color="#fff" size={28} />
          </TouchableOpacity>
        </View>

        {/* Effects Button */}
        <TouchableOpacity style={styles.effectsButton}>
          <Sparkles color="#fff" size={24} />
          <Text style={styles.effectsText}>Effects</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  permissionButton: {
    backgroundColor: '#fffc00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  permissionButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  topControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashText: {
    fontSize: 20,
    color: '#666',
  },
  flashActive: {
    color: '#fffc00',
  },
  filterContainer: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: '#fffc00',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  effectsButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  effectsText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
});