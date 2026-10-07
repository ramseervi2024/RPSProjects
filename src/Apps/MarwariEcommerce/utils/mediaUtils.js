/**
 * Media and asset resolution utilities for Mārwāri E-Commerce mobile app.
 * High-resolution authentic Rajasthani heritage craft image fallbacks.
 */

export const HERITAGE_CATEGORY_IMAGES = {
  'royal-apparel':
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  'handicrafts':
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
  'silver-jewellery':
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
  'marwari-mojari':
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
  'food-spices':
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
  'home-decor':
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
  'art-collectibles':
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
};

const DEFAULT_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
];

export const resolveMediaUrl = (url, fallbackIndex = 0) => {
  if (url && typeof url === 'string') {
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
  }
  return DEFAULT_FALLBACK_IMAGES[fallbackIndex % DEFAULT_FALLBACK_IMAGES.length];
};

export const getCategoryTheme = (index = 0) => {
  const PALETTES = [
    { bg: '#FDF2F8', text: '#831843', border: '#FCE7F3' },
    { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' },
    { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
    { bg: '#E0F2FE', text: '#0284C7', border: '#BAE6FD' },
  ];
  return PALETTES[index % PALETTES.length];
};

export const getCategoryImageUrl = (category, index = 0) => {
  if (category?.image) return category.image;
  return resolveMediaUrl(null, index);
};

export const getProductImageUrl = (product, index = 0) => {
  if (product?.image) return product.image;
  return resolveMediaUrl(null, index);
};

// Compatibility Stubs
export const getServiceImageUrl = getCategoryImageUrl;
export const getSipImageUrl = getProductImageUrl;
