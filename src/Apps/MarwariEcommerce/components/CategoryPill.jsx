import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CategoryPill({ item, isSelected = false, onPress }) {
  if (!item) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress && onPress(item)}
    >
      <View style={[styles.imageWrapper, isSelected && styles.selectedWrapper]}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text
        style={[styles.name, isSelected && styles.selectedName]}
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 78,
    marginHorizontal: 5,
  },
  imageWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
    padding: 2,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedWrapper: {
    borderColor: '#831843',
    borderWidth: 2.5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 14,
  },
  selectedName: {
    color: '#831843',
    fontWeight: '700',
  },
});
