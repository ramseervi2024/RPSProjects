import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ScaleButton } from '../components/ScaleButton';
import { RotationButton } from '../components/RotationButton';
import { SlideButton } from '../components/SlideButton';
import { BounceButton } from '../components/BounceButton';
import { PulseButton } from '../components/PulseButton';

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Animated Buttons</Text>
          <Text style={styles.subtitle}>Tap each button to see different animations</Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <ScaleButton />
          </View>
          
          <View style={styles.buttonRow}>
            <RotationButton />
          </View>
          
          <View style={styles.buttonRow}>
            <SlideButton />
          </View>
          
          <View style={styles.buttonRow}>
            <BounceButton />
          </View>
          
          <View style={styles.buttonRow}>
            <PulseButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    flex: 1,
    gap: 24,
  },
  buttonRow: {
    alignItems: 'center',
  },
});