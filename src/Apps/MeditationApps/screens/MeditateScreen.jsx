import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import { useState } from 'react';

export default function MeditateScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Morning Calm</Text>
          <Text style={styles.subtitle}>10:00</Text>
        </View>

        <View style={styles.visualizer}>
          <View style={styles.waveform} />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <SkipBack size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={32} color="#1E1E2A" />
            ) : (
              <Play size={32} color="#1E1E2A" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <SkipForward size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2A',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7B0FF',
  },
  visualizer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2A2A36',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    padding: 16,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#A7B0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});