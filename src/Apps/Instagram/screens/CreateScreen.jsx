import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ScrollView } from 'react-native';
import { Camera as CameraIcon, Image as ImageIcon, Aperture, Repeat2, Slash as Flash } from 'lucide-react-native';
// import { CameraView, CameraType } from 'expo-camera';

const filters = [
  { id: '1', name: 'Normal' },
  { id: '2', name: 'Clarendon' },
  { id: '3', name: 'Gingham' },
  { id: '4', name: 'Moon' },
  { id: '5', name: 'Lark' },
  { id: '6', name: 'Reyes' },
];

export default function CreateScreen() {
  const [permission, requestPermission] = Platform.select({
    web: [true, () => {}],
    default: '',
    // default: CameraView.useCameraPermissions(),
  });

  const [type, setType] = useState('back');
  const [selectedFilter, setSelectedFilter] = useState('1');
  const [flashMode, setFlashMode] = useState('off');
  const cameraRef = useRef(null);

  // if (!permission) {
  //   return <View />;
  // }

  // if (!permission.granted && Platform.OS !== 'web') {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.text}>We need your permission to show the camera</Text>
  //       <TouchableOpacity style={styles.button} onPress={requestPermission}>
  //         <Text style={styles.buttonText}>Grant Permission</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  function toggleCameraType() {
    setType(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlash() {
    setFlashMode(current => (current === 'on' ? 'off' : 'on'));
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={styles.placeholder}>
          <Text style={styles.text}>Camera not available on web</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <CameraIcon size={24} color="#000" />
              <Text style={styles.actionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <ImageIcon size={24} color="#000" />
              <Text style={styles.actionText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.topControls}>
              <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
                <Flash size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.galleryPreview}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&h=100&fit=crop',
                  }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.captureButton}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
                <Repeat2 size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterOption,
                    selectedFilter === filter.id && styles.selectedFilter,
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}>
                  <Text style={[
                    styles.filterText,
                    selectedFilter === filter.id && styles.selectedFilterText,
                  ]}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* <CameraView style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.topControls}>
              <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
                <Flash size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.galleryPreview}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&h=100&fit=crop',
                  }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.captureButton}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
                <Repeat2 size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterOption,
                    selectedFilter === filter.id && styles.selectedFilter,
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}>
                  <Text style={[
                    styles.filterText,
                    selectedFilter === filter.id && styles.selectedFilterText,
                  ]}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </CameraView> */}
        </>
      )}
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
  topControls: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  galleryPreview: {
    width: 44,
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  filters: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  selectedFilter: {
    backgroundColor: '#fff',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  selectedFilterText: {
    color: '#000',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    color: '#fff',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 20,
    borderRadius: 10,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});