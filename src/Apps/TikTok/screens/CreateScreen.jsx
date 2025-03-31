import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
import { Camera as FlipCamera, Video, Music2 } from 'lucide-react-native';
const Camera=''
export default function CreateScreen() {
//   const [permission, requestPermission] = Camera?.useCameraPermissions();
  const [type, setType] = useState(Camera?.Constants?.Type?.back);
  const cameraRef = useRef(null);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.permissionText}>We need your permission to show the camera</Text>
//         <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
//           <Text style={styles.permissionButtonText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

  const toggleCameraType = () => {
    setType(current => (
      current === Camera?.Constants.Type.back
        ? Camera?.Constants.Type.front
        : Camera?.Constants.Type.back
    ));
  };

  return (
    <View style={styles.container}>
      {/* <Camera style={styles.camera} type={type} ref={cameraRef}> */}
      <View style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.controls}>
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
              <FlipCamera color="#fff" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.sideButton}>
              <Music2 color="#fff" size={24} />
              <Text style={styles.buttonText}>Add Sound</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recordButton}>
              <View style={styles.recordButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sideButton}>
              <Video color="#fff" size={24} />
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 25,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  sideButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff2b55',
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  permissionButton: {
    backgroundColor: '#ff2b55',
    padding: 15,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
});