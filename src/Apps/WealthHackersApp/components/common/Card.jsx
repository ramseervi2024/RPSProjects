import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/theme';

export default function Card({
  children,
  onPress,
  variant = 'default',
  style,
  activeOpacity = 0.85,
  ...props
}) {
  const containerStyles = [
    styles.card,
    variant === 'tinted' && styles.tinted,
    variant === 'elevated' && styles.elevated,
    variant === 'outline' && styles.outline,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={onPress}
        activeOpacity={activeOpacity}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  tinted: {
    backgroundColor: COLORS.mintLight,
    borderColor: COLORS.mintBorder,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});
