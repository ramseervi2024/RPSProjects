import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Play, RotateCcw } from 'lucide-react-native';

interface AnimationControlsProps {
  onReplay: () => void;
  isPlaying: boolean;
}

export default function AnimationControls({ onReplay, isPlaying }: AnimationControlsProps) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity 
        style={[styles.button, isPlaying && styles.buttonDisabled]} 
        onPress={onReplay}
        disabled={isPlaying}
      >
        {isPlaying ? (
          <Play size={20} color="#ffffff" />
        ) : (
          <RotateCcw size={20} color="#ffffff" />
        )}
        <Text style={styles.buttonText}>
          {isPlaying ? 'Playing...' : 'Replay'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#6b7280',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});