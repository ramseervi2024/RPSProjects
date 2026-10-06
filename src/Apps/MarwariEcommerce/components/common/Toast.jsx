import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../../constants/fonts';

let toastListener = null;

/**
 * Global Toast Trigger Functions
 * Callable from any component, API client, Redux action, or callback
 *
 * Usage:
 *   showToast.success('Required', 'Please enter your email address.');
 *   showToast.error('Network Error', 'Could not reach server.');
 *   showToast.info('Updated', 'Profile settings saved.');
 *   showToast.warning('Notice', 'Session expiring soon.');
 *   showToast({ type: 'success', title: '...', message: '...' });
 *   showToast.hide();
 */
export const showToast = (options) => {
  if (!options) return;
  const normalized = typeof options === 'string' ? { message: options } : options;
  if (toastListener) {
    toastListener(normalized);
  }
};

showToast.success = (titleOrMsg, message, options = {}) => {
  const hasTwo = typeof message === 'string';
  showToast({
    type: 'success',
    title: hasTwo ? titleOrMsg : 'Success',
    message: hasTwo ? message : titleOrMsg,
    ...options,
  });
};

showToast.error = (titleOrMsg, message, options = {}) => {
  const hasTwo = typeof message === 'string';
  showToast({
    type: 'error',
    title: hasTwo ? titleOrMsg : 'Error',
    message: hasTwo ? message : titleOrMsg,
    ...options,
  });
};

showToast.info = (titleOrMsg, message, options = {}) => {
  const hasTwo = typeof message === 'string';
  showToast({
    type: 'info',
    title: hasTwo ? titleOrMsg : 'Information',
    message: hasTwo ? message : titleOrMsg,
    ...options,
  });
};

showToast.warning = (titleOrMsg, message, options = {}) => {
  const hasTwo = typeof message === 'string';
  showToast({
    type: 'warning',
    title: hasTwo ? titleOrMsg : 'Attention',
    message: hasTwo ? message : titleOrMsg,
    ...options,
  });
};

showToast.hide = () => {
  if (toastListener) {
    toastListener({ hide: true });
  }
};

export const Toast = showToast;

const TOAST_THEMES = {
  success: {
    icon: CheckCircle2,
    iconColor: '#0F766E', // Emerald/Teal brand
    badgeBg: '#E6F4F1',
    borderColor: '#99F6E4',
    accentColor: '#0F766E',
  },
  error: {
    icon: AlertCircle,
    iconColor: '#E11D48', // Coral rose/crimson
    badgeBg: '#FFE4E6',
    borderColor: '#FECDD3',
    accentColor: '#E11D48',
  },
  info: {
    icon: Info,
    iconColor: '#0284C7', // Sky blue
    badgeBg: '#E0F2FE',
    borderColor: '#BAE6FD',
    accentColor: '#0284C7',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: '#D97706', // Amber gold
    badgeBg: '#FEF3C7',
    borderColor: '#FDE68A',
    accentColor: '#D97706',
  },
};

/**
 * ToastContainer Component
 * Mount once at root in App.jsx inside SafeAreaProvider
 */
export default function ToastContainer() {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState(null);

  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(1)).current;
  const dismissTimer = useRef(null);

  const hideToast = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToast(null);
    });
  }, [translateY, opacity]);

  const show = useCallback(
    (config) => {
      if (config.hide) {
        hideToast();
        return;
      }

      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }

      const duration = config.duration || 3500;
      setToast(config);

      translateY.setValue(-120);
      opacity.setValue(0);
      progress.setValue(1);

      // Spring down from top
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Progress bar animation
      Animated.timing(progress, {
        toValue: 0,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      dismissTimer.current = setTimeout(() => {
        hideToast();
      }, duration);
    },
    [translateY, opacity, progress, hideToast]
  );

  useEffect(() => {
    toastListener = show;
    return () => {
      toastListener = null;
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }
    };
  }, [show]);

  // Swipe up gesture handler to flick away toast
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy < -5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -20 || gestureState.vy < -0.5) {
          hideToast();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 7,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!toast) return null;

  const type = toast.type || 'info';
  const theme = TOAST_THEMES[type] || TOAST_THEMES.info;
  const IconComponent = theme.icon;

  const topOffset = Math.max(insets?.top || 0, Platform.OS === 'ios' ? 36 : 24) + (Platform.OS === 'ios' ? 10 : 16);

  return (
    <View pointerEvents="box-none" style={styles.outerOverlay}>
      <Animated.View
        style={[
          styles.animatedWrapper,
          {
            top: topOffset,
            opacity,
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={0.96}
          onPress={() => {
            if (typeof toast.onPress === 'function') {
              toast.onPress();
            }
            hideToast();
          }}
          style={[styles.toastCard, { borderColor: theme.borderColor }]}
        >
          {/* Left Vertical Brand Accent Line */}
          <View style={[styles.leftAccentBar, { backgroundColor: theme.accentColor }]} />

          {/* Left Icon Pill */}
          <View style={[styles.iconBox, { backgroundColor: theme.badgeBg }]}>
            <IconComponent size={20} color={theme.iconColor} strokeWidth={2.4} />
          </View>

          {/* Text Information */}
          <View style={styles.textContainer}>
            {!!toast.title && (
              <Text style={styles.titleText} numberOfLines={1}>
                {toast.title}
              </Text>
            )}
            {!!toast.message && (
              <Text style={styles.messageText} numberOfLines={2}>
                {toast.message}
              </Text>
            )}
          </View>

          {/* Close Dismiss Button */}
          <TouchableOpacity
            onPress={hideToast}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.closeBtn}
            accessibilityLabel="Close notification"
          >
            <X size={16} color="#94A3B8" strokeWidth={2.4} />
          </TouchableOpacity>

          {/* Animated Auto-dismiss Progress Line */}
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  backgroundColor: theme.accentColor,
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    elevation: 99999,
  },
  animatedWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 99999,
    elevation: 99999,
  },
  toastCard: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 10,
    overflow: 'hidden',
  },
  leftAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  titleText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  messageText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#475569',
    lineHeight: 17,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2.5,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  progressBar: {
    height: '100%',
  },
});
