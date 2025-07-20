import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { CheckCircle } from 'lucide-react-native';

export default function OrderPlacedSuccess() {
  return (
    <View style={styles.container}>
      <CheckCircle size={80} color="#10B981" />
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>Your order has been successfully placed.</Text>
      <ConfettiCannon count={100} origin={{x: 200, y: -10}} fadeOut />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 8,
  },
});
