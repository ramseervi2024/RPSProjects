import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Camera as CameraIcon, Image as ImageIcon } from 'lucide-react-native';
// import { CameraView, CameraType } from 'expo-camera';

export default function CreateScreen() {
//   const [permission, requestPermission] = Platform.select({
//     web: [true, () => {}],
//     default: CameraView.useCameraPermissions(),
//   });

  const [type, setType] = useState('back');
//   const cameraRef = useRef(null);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted && Platform.OS !== 'web') {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>We need your permission to show the camera</Text>
//         <TouchableOpacity style={styles.button} onPress={requestPermission}>
//           <Text style={styles.buttonText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

  function toggleCameraType() {
    setType(current => (current === 'back' ? 'front' : 'back'));
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
        // <CameraView style={styles.camera} type={type} ref={cameraRef}>
        //   <View style={styles.buttonContainer}>
        //     <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
        //       <Text style={styles.buttonText}>Flip Camera</Text>
        //     </TouchableOpacity>
        //   </View>
        // </CameraView>
         <View style={styles.camera} >
         <View style={styles.buttonContainer}>
           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
             <Text style={styles.buttonText}>Flip Camera</Text>
           </TouchableOpacity>
         </View>
       </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
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