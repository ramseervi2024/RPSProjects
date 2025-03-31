import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { Eclipse as Flip, Camera as CameraIcon } from 'lucide-react-native';

export default function CameraScreen() {
  const [type, setType] = useState('back');

  const toggleCameraType = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      {/* <CameraView style={styles.camera} type={type}> */}
      <View style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Flip size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton}>
            <CameraIcon size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
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
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});