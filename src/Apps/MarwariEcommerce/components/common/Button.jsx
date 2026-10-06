import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS, RADII } from '../../theme/theme';
import { fontFamilies, fontSizes } from '../../constants/fonts';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  fullWidth = true,
  style,
  textStyle,
  accessibilityLabel,
}) {
  const getContainerStyle = () => {
    const base = [
      styles.base,
      styles[size],
      fullWidth && styles.fullWidth,
    ];

    switch (variant) {
      case 'secondary':
        base.push(styles.secondary);
        break;
      case 'outline':
        base.push(styles.outline);
        break;
      case 'tertiary':
        base.push(styles.tertiary);
        break;
      case 'danger':
        base.push(styles.danger);
        break;
      case 'primary':
      default:
        base.push(styles.primary);
        if (!disabled && !loading) {
          base.push(styles.primaryShadow);
        }
        break;
    }

    if (disabled || loading) {
      base.push(styles.disabled);
    }

    if (style) {
      base.push(style);
    }

    return base;
  };

  const getTextStyle = () => {
    const base = [styles.baseText, styles[`${size}Text`]];

    switch (variant) {
      case 'secondary':
        base.push(styles.secondaryText);
        break;
      case 'outline':
        base.push(styles.outlineText);
        break;
      case 'tertiary':
        base.push(styles.tertiaryText);
        break;
      case 'danger':
        base.push(styles.dangerText);
        break;
      case 'primary':
      default:
        base.push(styles.primaryText);
        break;
    }

    if (disabled) {
      base.push(styles.disabledText);
    }

    if (textStyle) {
      base.push(textStyle);
    }

    return base;
  };

  const getSpinnerColor = () => {
    if (variant === 'outline' || variant === 'tertiary') {
      return COLORS.primary;
    }
    return COLORS.textInverted;
  };

  const getIconColor = () => {
    if (disabled) return COLORS.textPlaceholder;
    if (variant === 'outline' || variant === 'tertiary') return COLORS.primary;
    if (variant === 'secondary') return COLORS.textPrimary;
    return COLORS.textInverted;
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
    >
      {loading ? (
        <ActivityIndicator color={getSpinnerColor()} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {Icon && iconPosition === 'left' && (
            <Icon size={18} color={getIconColor()} strokeWidth={2.2} style={styles.iconLeft} />
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {Icon && iconPosition === 'right' && (
            <Icon size={18} color={getIconColor()} strokeWidth={2.2} style={styles.iconRight} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADII.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Sizing
  sm: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: RADII.sm,
  },
  md: {
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  lg: {
    height: 56,
    paddingHorizontal: 24,
    borderRadius: 16,
  },

  // Variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  primaryShadow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  secondary: {
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  tertiary: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  disabled: {
    opacity: 0.6,
  },

  // Typography
  baseText: {
    fontFamily: fontFamilies.semiBold,
  },
  smText: {
    fontSize: fontSizes.size12,
  },
  mdText: {
    fontSize: fontSizes.size14,
  },
  lgText: {
    fontSize: fontSizes.size15,
  },
  primaryText: {
    color: COLORS.textInverted,
  },
  secondaryText: {
    color: COLORS.textPrimary,
  },
  outlineText: {
    color: COLORS.primary,
  },
  tertiaryText: {
    color: COLORS.primary,
  },
  dangerText: {
    color: COLORS.textInverted,
  },
  disabledText: {
    color: COLORS.textPlaceholder,
  },

  // Icons
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
