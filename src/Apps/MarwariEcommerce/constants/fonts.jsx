import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/*
|--------------------------------------------------------------------------
| RESPONSIVE FONT SYSTEM
|--------------------------------------------------------------------------
|
| Base design width: 375px
|
| We use MODERATE scaling instead of full scaling.
| This prevents fonts from becoming too large on wider phones.
|
*/

const BASE_WIDTH = 375;

const widthScale = SCREEN_WIDTH / BASE_WIDTH;

/**
 * Moderate scaling
 *
 * factor = 0.35
 *
 * Example:
 * 14px on 375 width
 * 430 width -> around 16px instead of 16.03+
 *
 * This keeps the UI visually consistent.
 */
const moderateScale = (size, factor = 0.35) => {
  const scaled = size + (size * widthScale - size) * factor;

  return Math.round(
    PixelRatio.roundToNearestPixel(scaled),
  );
};

/*
|--------------------------------------------------------------------------
| NORMALIZE
|--------------------------------------------------------------------------
|
| Use this for all application font sizes.
|
*/

const normalize = (size) => {
  return moderateScale(size, 0.35);
};

/*
|--------------------------------------------------------------------------
| FONT SIZES
|--------------------------------------------------------------------------
|
| Designed specifically for:
| - Financial dashboard
| - Mobile app
| - React Native
| - iOS + Android
| - Inter font
|
*/

export const fontSizes = {
  /*
  |--------------------------------------------------------------------------
  | Extra Small
  |--------------------------------------------------------------------------
  */

  size8: normalize(8),
  size9: normalize(9),
  size10: normalize(10),
  size11: normalize(11),
  size12: normalize(12),

  /*
  |--------------------------------------------------------------------------
  | Small / Body
  |--------------------------------------------------------------------------
  */

  size13: normalize(13),
  size14: normalize(14),
  size15: normalize(15),

  /*
  |--------------------------------------------------------------------------
  | Medium
  |--------------------------------------------------------------------------
  */

  size16: normalize(16),
  size17: normalize(17),
  size18: normalize(18),

  /*
  |--------------------------------------------------------------------------
  | Headings
  |--------------------------------------------------------------------------
  */

  size19: normalize(19),
  size20: normalize(20),
  size21: normalize(21),
  size22: normalize(22),
  size23: normalize(23),
  size24: normalize(24),

  /*
  |--------------------------------------------------------------------------
  | Large
  |--------------------------------------------------------------------------
  */

  size26: normalize(26),
  size28: normalize(28),
  size30: normalize(30),
  size32: normalize(32),

  /*
  |--------------------------------------------------------------------------
  | Special Display Sizes
  |--------------------------------------------------------------------------
  */

  size34: normalize(34),
  size36: normalize(36),
};

/*
|--------------------------------------------------------------------------
| INTER FONT FAMILY
|--------------------------------------------------------------------------
*/

export const fontFamilies = {
  thin: 'Inter-Thin',
  extraLight: 'Inter-ExtraLight',
  light: 'Inter-Light',
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  extraBold: 'Inter-ExtraBold',
  black: 'Inter-Black',
};

/*
|--------------------------------------------------------------------------
| PLATFORM FONT FAMILY
|--------------------------------------------------------------------------
*/

export const platformFontFamilies = Platform.select({
  ios: fontFamilies,
  android: fontFamilies,
  default: fontFamilies,
});

/*
|--------------------------------------------------------------------------
| FONT COLORS
|--------------------------------------------------------------------------
*/

export const fontColor = {
  WHITE: '#FFFFFF',

  GRAISHVIOLET: '#F3F0F7',

  CHINESEBLACK: '#161616',

  CERISERED: '#DB3171',

  THEME: '#8D2641',

  BLACK: '#000000',

  DARKGRAY: '#333333',

  GRAY: '#666666',

  LIGHTGRAY: '#999999',

  BORDER: '#E5E5E5',

  TRANSPARENT: 'transparent',
};

/*
|--------------------------------------------------------------------------
| GET FONT FAMILY
|--------------------------------------------------------------------------
*/

export const getFontFamily = (weight = 'regular') => {
  if (fontFamilies[weight]) {
    return fontFamilies[weight];
  }

  switch (String(weight).toLowerCase()) {
    case '100':
    case 'thin':
      return fontFamilies.thin;

    case '200':
    case 'extralight':
    case 'extra-light':
      return fontFamilies.extraLight;

    case '300':
    case 'light':
      return fontFamilies.light;

    case '500':
    case 'medium':
      return fontFamilies.medium;

    case '600':
    case 'semibold':
    case 'semi-bold':
      return fontFamilies.semiBold;

    case '700':
    case 'bold':
      return fontFamilies.bold;

    case '800':
    case 'extrabold':
    case 'extra-bold':
      return fontFamilies.extraBold;

    case '900':
    case 'black':
      return fontFamilies.black;

    case '400':
    case 'regular':
    default:
      return fontFamilies.regular;
  }
};

/*
|--------------------------------------------------------------------------
| GET FONT
|--------------------------------------------------------------------------
*/

export const getFont = (
  weight = 'regular',
  size = fontSizes.size14,
  color,
) => ({
  fontFamily: getFontFamily(weight),
  fontSize: size,

  ...(color ? { color } : {}),
});

/*
|--------------------------------------------------------------------------
| GLOBAL FONT STYLES
|--------------------------------------------------------------------------
|
| Recommended typography for your Mārwāri E-Commerce UI.
|
*/

export const globalFontStyles = {

  /*
  |--------------------------------------------------------------------------
  | Main Page Heading
  |--------------------------------------------------------------------------
  |
  | Example:
  | Good Morning, Ramesh
  |
  */

  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size24,
    lineHeight: fontSizes.size24 * 1.2,
  },

  /*
  |--------------------------------------------------------------------------
  | Section Heading
  |--------------------------------------------------------------------------
  |
  | Example:
  | Quick Actions
  | Service Categories
  |
  */

  h2: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size20,
    lineHeight: fontSizes.size20 * 1.25,
  },

  /*
  |--------------------------------------------------------------------------
  | Sub Heading
  |--------------------------------------------------------------------------
  */

  h3: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size17,
    lineHeight: fontSizes.size17 * 1.3,
  },

  /*
  |--------------------------------------------------------------------------
  | Body
  |--------------------------------------------------------------------------
  */

  body: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.45,
  },

  /*
  |--------------------------------------------------------------------------
  | Body Medium
  |--------------------------------------------------------------------------
  */

  bodyMedium: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.4,
  },

  /*
  |--------------------------------------------------------------------------
  | Body Bold
  |--------------------------------------------------------------------------
  */

  bodyBold: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.35,
  },

  /*
  |--------------------------------------------------------------------------
  | Small Body
  |--------------------------------------------------------------------------
  */

  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    lineHeight: fontSizes.size12 * 1.4,
  },

  /*
  |--------------------------------------------------------------------------
  | Caption
  |--------------------------------------------------------------------------
  */

  caption: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    lineHeight: fontSizes.size11 * 1.35,
  },

  /*
  |--------------------------------------------------------------------------
  | Badge
  |--------------------------------------------------------------------------
  */

  badge: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    lineHeight: fontSizes.size10 * 1.2,
  },

  /*
  |--------------------------------------------------------------------------
  | Buttons
  |--------------------------------------------------------------------------
  */

  button: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.2,
  },

  buttonBold: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.2,
  },

  /*
  |--------------------------------------------------------------------------
  | Input
  |--------------------------------------------------------------------------
  */

  input: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.4,
  },

  /*
  |--------------------------------------------------------------------------
  | Input Label
  |--------------------------------------------------------------------------
  */

  inputLabel: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    lineHeight: fontSizes.size12 * 1.3,
  },

  /*
  |--------------------------------------------------------------------------
  | Navigation
  |--------------------------------------------------------------------------
  */

  navigation: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    lineHeight: fontSizes.size12 * 1.2,
  },

  navigationActive: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    lineHeight: fontSizes.size12 * 1.2,
  },

  /*
  |--------------------------------------------------------------------------
  | Card Title
  |--------------------------------------------------------------------------
  */

  cardTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size13,
    lineHeight: fontSizes.size13 * 1.3,
  },

  /*
  |--------------------------------------------------------------------------
  | Card Value
  |--------------------------------------------------------------------------
  */

  cardValue: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size22,
    lineHeight: fontSizes.size22 * 1.15,
  },

  /*
  |--------------------------------------------------------------------------
  | Large Financial Value
  |--------------------------------------------------------------------------
  |
  | Example:
  | ₹33,000
  |
  */

  amountLarge: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size32,
    lineHeight: fontSizes.size32 * 1.1,
  },

  /*
  |--------------------------------------------------------------------------
  | Financial Label
  |--------------------------------------------------------------------------
  */

  amountLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size14,
    lineHeight: fontSizes.size14 * 1.3,
  },

  /*
  |--------------------------------------------------------------------------
  | Quick Action Title
  |--------------------------------------------------------------------------
  */

  actionTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size16,
    lineHeight: fontSizes.size16 * 1.25,
  },

  /*
  |--------------------------------------------------------------------------
  | Quick Action Subtitle
  |--------------------------------------------------------------------------
  */

  actionSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size13,
    lineHeight: fontSizes.size13 * 1.3,
  },

  /*
  |--------------------------------------------------------------------------
  | Link
  |--------------------------------------------------------------------------
  */

  link: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    lineHeight: fontSizes.size13 * 1.3,
  },
};

/*
|--------------------------------------------------------------------------
| FONT FAMILY EXPORT
|--------------------------------------------------------------------------
*/

export const FONT_FAMILY = fontFamilies;

/*
|--------------------------------------------------------------------------
| DEFAULT EXPORT
|--------------------------------------------------------------------------
*/

const fonts = {
  fontSizes,
  fontFamilies,
  FONT_FAMILY,
  platformFontFamilies,
  fontColor,
  globalFontStyles,
  getFontFamily,
  getFont,
  normalize,
  moderateScale,
};

export default fonts;