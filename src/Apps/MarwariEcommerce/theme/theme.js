import { Platform, StyleSheet, StatusBar } from 'react-native';
import { fontFamilies, fontSizes, globalFontStyles, getFont } from '../constants/fonts';

export { fontFamilies, fontSizes, globalFontStyles, getFont };

/**
 * WealthHackers Global Design System Theme
 * Clean, Human-Friendly Typography & Premium Fintech Aesthetic
 */

// ─── 1. COLOR TOKENS ──────────────────────────────────────────────────────────
export const COLORS = {
  // Surfaces & Backgrounds
  background: '#F8FAFC',        // Slate 50: Soft, clean, easy on eyes
  backgroundAlt: '#F1F5F9',     // Slate 100: Container backgrounds, subtle dividers
  surface: '#FFFFFF',           // Pure White: Cards, modals, bottom sheets
  surfaceSecondary: '#F8FAFC',  // Input fields, disabled containers

  // Primary Brand Identity (Emerald Teal)
  primary: '#0F766E',           // Teal 700: Primary actions, active tabs, main accents
  primaryDark: '#115E59',       // Teal 800: Pressed state, deep emphasis
  primaryLight: '#CCFBF1',      // Teal 100: Active background highlights
  primaryFaded: '#F0FDFA',      // Teal 50: Super light tint for cards/badges
  mint: '#E6F4F1',              // Soft mint circle badge background
  mintLight: '#F0FDFA',         // Light mint container background
  mintBorder: '#CCFBF1',        // Soft mint border

  // Accent & Visual Analytics
  accent: '#0284C7',            // Sky 600: Invested amounts, charts, informative highlights
  accentLight: '#E0F2FE',       // Sky 100: Secondary icon backgrounds
  wealthGreen: '#10B981',       // Emerald 500: Wealth gained, returns
  lossRed: '#EF4444',           // Red 500: Negative performance, errors
  warningAmber: '#F59E0B',      // Amber 500: Alerts, warnings, badges
  purpleAccent: '#8B5CF6',      // Violet 500: Premium services, SIP cards

  // Semantic Status
  success: '#059669',           // Completed orders, positive returns
  successBg: '#ECFDF5',
  warning: '#D97706',           // Pending, in-review, alerts
  warningBg: '#FFFBEB',
  error: '#DC2626',             // Failed transactions, deletions, errors
  errorBg: '#FEF2F2',

  // Text Hierarchy
  textPrimary: '#0F172A',       // Slate 900: High-contrast primary headers, amounts
  textSecondary: '#475569',     // Slate 600: Standard body text, descriptions
  textMuted: '#64748B',         // Slate 500: Metadata, timestamps, captions
  textPlaceholder: '#94A3B8',   // Slate 400: Input placeholders, inactive icons
  textInverted: '#FFFFFF',      // Pure White: Text on primary / dark backgrounds

  // Borders & Dividers
  border: '#E2E8F0',            // Slate 200: 1px card borders, hairline dividers
  borderLight: '#F1F5F9',       // Slate 100: Row separators
  borderFocused: '#0F766E',     // Active input border
};

// ─── 2. TYPOGRAPHY ENGINE (USER-FRIENDLY, COMPACT SCALE) ──────────────────────
// Strictly uses Inter font family & standardized scale from fonts.jsx
const FONT_FAMILY = fontFamilies;

export const TYPOGRAPHY = {
  family: fontFamilies,
  sizes: fontSizes,
  ...globalFontStyles,

  // Display & Hero Financial Amounts (~32px, Bold)
  display: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size32,
    lineHeight: fontSizes.size32 * 1.15,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  amountLarge: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size32,
    lineHeight: fontSizes.size32 * 1.1,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },

  // Primary Page Headings (~24px, Bold)
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size24,
    lineHeight: fontSizes.size24 * 1.25,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },

  // Section Headings (~20px, Bold)
  h2: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size20,
    lineHeight: fontSizes.size20 * 1.25,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },

  // Sub-headings (~17px, SemiBold)
  h3: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size17,
    lineHeight: fontSizes.size17 * 1.3,
    color: COLORS.textPrimary,
  },

  // Action / Card Titles (~16px, SemiBold)
  actionTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size16,
    lineHeight: fontSizes.size16 * 1.25,
    color: COLORS.textPrimary,
  },

  // Important Card Values (~22px, Bold)
  cardValue: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size22,
    lineHeight: fontSizes.size22 * 1.15,
    color: COLORS.textPrimary,
  },

  // Secondary Text / Card Labels (~13px, Medium / Regular)
  cardTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size13,
    lineHeight: fontSizes.size13 * 1.3,
    color: COLORS.textPrimary,
  },
  actionSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size13,
    lineHeight: fontSizes.size13 * 1.3,
    color: COLORS.textSecondary,
  },
  link: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    lineHeight: fontSizes.size13 * 1.3,
    color: COLORS.primary,
  },

  // Normal Body Text (~14px, Regular / Medium / SemiBold)
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.45,
    color: COLORS.textSecondary,
  },
  bodyMedium: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.4,
    color: COLORS.textPrimary,
  },
  bodyBold: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.35,
    color: COLORS.textPrimary,
  },

  // Small Body (~12px, Regular)
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    lineHeight: fontSizes.size12 * 1.4,
    color: COLORS.textMuted,
  },

  // Navigation (~12px, Medium / SemiBold)
  navigation: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    lineHeight: fontSizes.size12 * 1.2,
    color: COLORS.textSecondary,
  },
  navigationActive: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    lineHeight: fontSizes.size12 * 1.2,
    color: COLORS.primary,
  },

  // Captions / Supporting Text (~11px, Medium / Regular)
  caption: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    lineHeight: fontSizes.size11 * 1.35,
    color: COLORS.textMuted,
  },

  // Badges (~10px, Bold)
  badge: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    lineHeight: fontSizes.size10 * 1.2,
    letterSpacing: 0.3,
  },

  // Numeric helpers
  numericLarge: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size32,
    lineHeight: fontSizes.size32 * 1.1,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  numericMedium: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size22,
    lineHeight: fontSizes.size22 * 1.15,
    color: COLORS.primary,
  },

  // Buttons (~14px, SemiBold)
  button: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.2,
    color: COLORS.textInverted,
  },
};

// ─── 3. SPACING SYSTEM (STRICT 8PT / 4PT GRID) ─────────────────────────────────
export const SPACING = {
  xs: 4,     // Subtle padding, icon gaps
  sm: 8,     // Inner card gaps, badge padding
  md: 12,    // Row padding, list item gaps
  lg: 16,    // Screen horizontal padding, standard card padding
  xl: 20,    // Card inner spacious padding, section margins
  xxl: 24,   // Between screen sections
  xxxl: 32,  // Hero section spacing, empty state spacing
};

// ─── 4. BORDER RADII ──────────────────────────────────────────────────────────
export const RADII = {
  xs: 4,
  sm: 8,     // Buttons, text inputs, stepper controls
  md: 12,    // Standard cards, service items, cart rows
  lg: 16,    // Modal cards, bottom sheet top corners
  full: 999, // Circular badges, pills, floating action buttons
};

// ─── 5. SHADOWS & ELEVATION (SUBTLE, REFINED FINTECH ELEVATION) ───────────────
export const SHADOWS = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2, // Android
  },
  cardHover: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  floating: {
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  bottomBar: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 6,
  }
};

// ─── 6. POWERFUL UNBREAKABLE GLOBAL STYLES FOR EACH PAGE ─────────────────────
export const GLOBAL_STYLES = StyleSheet.create({
  // Screen Container: Enforces identical background & structure
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },

  // Screen Header Standard (Compact, elegant)
  screenHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + SPACING.sm : SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  screenTitle: {
    ...TYPOGRAPHY.h1,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    marginTop: 2,
  },

  // Standard Card: All screen cards MUST use this blueprint
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },

  // Button Rules: Strict 48px touch targets, refined font weights
  primaryBtn: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: RADII.sm,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.card,
  },
  primaryBtnText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fontSizes.size14,
    color: COLORS.textInverted,
    letterSpacing: 0.2,
  },
  secondaryBtn: {
    height: 48,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: RADII.sm,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  secondaryBtnText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fontSizes.size14,
    color: COLORS.textPrimary,
  },
  outlineBtn: {
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: RADII.sm,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  outlineBtnText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fontSizes.size14,
    color: COLORS.primary,
  },
  compactBtn: {
    height: 36,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADII.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactBtnText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fontSizes.size12,
    color: COLORS.textInverted,
  },

  // Input Field Rules (Clean borders, 46px height, friendly labels)
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fontSizes.size12,
    color: COLORS.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  inputField: {
    height: 46,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.sm,
    paddingHorizontal: SPACING.md,
    fontFamily: FONT_FAMILY.regular,
    fontSize: fontSizes.size14,
    color: COLORS.textPrimary,
  },
  inputFieldFocused: {
    borderColor: COLORS.borderFocused,
    backgroundColor: COLORS.surface,
  },

  // Status Pills & Badges (Standardized across Orders, Transactions, Profile)
  statusPill: {
    height: 24,
    paddingHorizontal: SPACING.sm + 2,
    borderRadius: RADII.full,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  pillCompleted: {
    backgroundColor: COLORS.successBg,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  pillCompletedText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.success,
  },
  pillPending: {
    backgroundColor: COLORS.warningBg,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pillPendingText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.warning,
  },
  pillFailed: {
    backgroundColor: COLORS.errorBg,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  pillFailedText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.error,
  },

  // Empty State Rule (Used on Orders, Cart, Notifications)
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxxl,
    backgroundColor: COLORS.background,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h2,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    color: COLORS.textMuted,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  }
});
