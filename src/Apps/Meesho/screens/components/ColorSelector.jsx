import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ColorSelector({ colors, selectedColor, onSelectColor }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Color</Text>
      <View style={styles.colorContainer}>
        {colors.map((color) => (
          <Pressable
            key={color.code}
            style={styles.colorWrapper}
            onPress={() => onSelectColor(color.code)}
          >
            <View
              style={[
                styles.colorButton,
                { backgroundColor: color.code },
                selectedColor === color.code && styles.selectedColor,
              ]}
            />
            <Text style={styles.colorName}>{color.name}</Text>
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
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  colorWrapper: {
    alignItems: 'center',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  colorName: {
    fontSize: 12,
    color: '#666',
  },
});
