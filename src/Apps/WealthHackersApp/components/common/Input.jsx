import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { X } from 'lucide-react-native';
import { COLORS } from '../../theme/theme';
import { fontFamilies, fontSizes } from '../../constants/fonts';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  icon: Icon,
  clearable = true,
  error,
  editable = true,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  style,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
          !editable && styles.inputWrapperDisabled,
        ]}
      >
        {Icon && (
          <Icon
            size={18}
            color={error ? COLORS.error : isFocused ? COLORS.primary : COLORS.textPlaceholder}
            strokeWidth={2}
            style={styles.icon}
          />
        )}

        <TextInput
          style={[styles.textInput, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textPlaceholder}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {clearable && Boolean(value) && editable && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.clearBtn}
            accessibilityLabel="Clear text"
          >
            <X size={16} color={COLORS.textPlaceholder} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: COLORS.textMuted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.mintLight,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
    backgroundColor: '#FEF2F2',
  },
  inputWrapperDisabled: {
    backgroundColor: COLORS.backgroundAlt,
    opacity: 0.7,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size14,
    color: COLORS.textPrimary,
    padding: 0,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  errorText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: COLORS.error,
    marginTop: 4,
  },
});
