import { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { Repeat2, Camera as CameraIcon, Image as ImageIcon } from 'lucide-react-native';

export default function CameraScreen() {
  const [type, setType] = useState('back');
  const cameraRef = useRef(null);

  const toggleCameraType = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };

  return (
    <View style={styles.container}>
      <View 
        ref={cameraRef}
        style={styles.camera} 
        type={type}
      >
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
            <Repeat2 size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.galleryButton}>
            <ImageIcon size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          <View style={{ width: 44 }} /> 
        </View>
      </View>
      {/* <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        type={type}
      >
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
            <Repeat2 size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.galleryButton}>
            <ImageIcon size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          <View style={{ width: 44 }} />
        </View>
      </CameraView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Platform.OS === 'ios' ? 50 : 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 3,
  },
  captureButtonInner: {
    flex: 1,
    borderRadius: 37,
    backgroundColor: '#fff',
  },
});