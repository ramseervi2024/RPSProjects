import { Platform, StyleSheet, StatusBar } from 'react-native';
import { fontFamilies, fontSizes, globalFontStyles, getFont } from '../constants/fonts';

export { fontFamilies, fontSizes, globalFontStyles, getFont };

/**
 * Mārwāri E-Commerce Global Design System Theme
 * Combines Royal Rajasthani Heritage with modern, high-converting e-commerce UX
 * Guided by MOBILE_DESIGN_GUIDE.md
 */

// ─── 1. COLOR TOKENS ──────────────────────────────────────────────────────────
export const COLORS = {
  // Primary (Royal Maroon)
  primary: '#831843',           // Maroon 800: Primary CTAs, active highlights, badges, price labels
  primaryDark: '#991B1B',       // Red 800: Pressed state, deep emphasis
  primaryLight: '#FCE7F3',      // Pink 100: Soft active background highlights
  primaryFaded: '#FDF2F8',      // Pink 50: Card tint for badges

  // Secondary (Heritage Amber)
  secondary: '#B45309',         // Amber 700: Secondary accents, star ratings, category highlights
  secondaryLight: '#D97706',    // Amber 600: Hover / focused accents
  secondaryBg: '#FEF3C7',       // Amber 100: Light badge background

  // Royal Gold Accent
  gold: '#FEF08A',              // Gold 200: Notice banners, royal crests, VIP/Artisan tags
  goldDark: '#F59E0B',          // Amber 500: Star ratings, gold highlights
  goldBg: '#FFFBEB',

  // Auth Brand Teal (per spec reference)
  authTeal: '#077B9F',          // Deep Teal: Fullscreen Auth background & form buttons
  authTealDark: '#056482',      // Deep Teal Dark
  authTealLight: '#E0F2FE',     // Light Teal

  // Surfaces & Backgrounds
  background: '#F8FAFC',        // Slate 50: App screen canvas background
  backgroundAlt: '#F1F5F9',     // Slate 100: Container backgrounds, subtle dividers
  surface: '#FFFFFF',           // Pure White: Elevated cards, bottom sheets, navigation bar
  surfaceSecondary: '#F8FAFC',  // Input fields, disabled containers

  // Semantic Status
  success: '#059669',           // Emerald 600: Order completed, in-stock badges, applied coupons
  successBg: '#ECFDF5',
  warning: '#D97706',           // Amber 600: Pending, in-review, alerts
  warningBg: '#FFFBEB',
  error: '#DC2626',             // Red 600: Error states, delete action, out-of-stock tags
  errorBg: '#FEF2F2',

  // Text Hierarchy
  textPrimary: '#0F172A',       // Slate 900: Product titles, section headings, prices
  textSecondary: '#64748B',     // Slate 500: Subtitles, specifications, meta info
  textMuted: '#94A3B8',         // Slate 400: Metadata, timestamps, captions
  textPlaceholder: '#CBD5E1',   // Slate 300: Input placeholders
  textInverted: '#FFFFFF',      // Pure White: Text on primary / dark backgrounds

  // Borders & Dividers
  border: '#E2E8F0',            // Slate 200: 1px card borders, hairline dividers
  borderLight: '#F1F5F9',       // Slate 100: Row separators
  borderFocused: '#831843',     // Active input border
};

// ─── 2. TYPOGRAPHY HIERARCHY ──────────────────────────────────────────────────
export const TYPOGRAPHY = {
  family: fontFamilies,
  sizes: fontSizes,
  ...globalFontStyles,

  heroDisplay: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    lineHeight: 34,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  bodyLarge: {
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  bodyRegular: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  caption: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.textMuted,
  },
};

// ─── 3. SPACING & RADII (8pt Grid) ───────────────────────────────────────────
export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  screenPadding: 16,
};

export const RADII = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
};

export const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    ...SHADOWS.card,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADII,
  SHADOWS,
  GLOBAL_STYLES,
};
