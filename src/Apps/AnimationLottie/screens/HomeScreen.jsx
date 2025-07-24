import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Coplesconfetti from '../components/Coplesconfetti.json';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        source={Coplesconfetti}
        autoPlay
        loop
        style={styles.confetti}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confetti: {
    width: 300,
    height: 300,
    position: 'absolute',
    zIndex: -1, // This makes it appear behind other content
  },
});