import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedButton,
            ]}
            onPress={() => onSelectSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.selectedText,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeText: {
    fontSize: 14,
    color: '#000',
  },
  selectedText: {
    color: 'white',
  },
});
