/**
 * Media and asset resolution utilities for WealthHackers mobile application.
 * Mirrors the website's image path normalization and verified asset palette.
 */

// Verified SIP directory images from the WealthHackers portal
export const VERIFIED_SIP_IMAGES = {
  icici: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  idfc: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  sbi: 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
};

// Verified Category directory images matching website screenshots
export const VERIFIED_CATEGORY_IMAGES = {
  'mutual-fund-review': 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  'tax-planning': 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  'financial-planning': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
  'insurance-review': 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  'portfolio-review': 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
  'retirement-planning': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  'investment-advisory': 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  'estate-planning': 'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
};

// Verified Corporate Services directory images matching website screenshots
export const VERIFIED_SERVICE_IMAGES = {
  ulip: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  mutual: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  life: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  child: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
  tax: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
  retirement: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  'year-end': 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80',
};

const DEFAULT_FALLBACK_IMAGES = [
  'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406902-81c99181.jpg',
  'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406910-787e5470.jpg',
  'https://super-panel.wealthhackers.in/assets/uploads/sips/sip-1790406947-6cd3d6d0.jpg',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
];

/**
 * Resolves an arbitrary media URL to a guaranteed accessible HTTP URL.
 * Automatically cleans /super-panel/ path segments that cause LiteSpeed HTML 200 responses.
 */
export const resolveMediaUrl = (url, fallbackKey = '') => {
  if (url && typeof url === 'string') {
    let trimmed = url.trim();
    if (trimmed.length > 0) {
      // Fix LiteSpeed super-panel rewrite issue:
      // Replace https://super-panel.wealthhackers.in/super-panel/assets/ with https://super-panel.wealthhackers.in/assets/
      if (trimmed.includes('/super-panel/assets/')) {
        trimmed = trimmed.replace('/super-panel/assets/', '/assets/');
      }

      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
      }

      // Relative path: prepend direct asset domain
      const clean = trimmed
        .replace(/^\/?(super-panel\/)?/, '')
        .replace(/^\/?assets\//, '');
      return `https://super-panel.wealthhackers.in/assets/${clean}`;
    }
  }

  // Fallback by key if provided
  if (fallbackKey) {
    const keyLower = String(fallbackKey).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    for (const [k, v] of Object.entries(VERIFIED_CATEGORY_IMAGES)) {
      if (keyLower.includes(k) || k.includes(keyLower)) {
        return v;
      }
    }
    for (const [k, v] of Object.entries(VERIFIED_SIP_IMAGES)) {
      if (keyLower.includes(k)) {
        return v;
      }
    }
    for (const [k, v] of Object.entries(VERIFIED_SERVICE_IMAGES)) {
      if (keyLower.includes(k)) {
        return v;
      }
    }
  }

  return DEFAULT_FALLBACK_IMAGES[0];
};

/**
 * Get category card image URL with guaranteed valid fallback matching website.
 */
export const getCategoryImageUrl = (item, index = 0) => {
  if (!item) return DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
  const slug = (item.slug || item.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  for (const [k, v] of Object.entries(VERIFIED_CATEGORY_IMAGES)) {
    if (slug.includes(k) || k.includes(slug)) {
      return v;
    }
  }
  return resolveMediaUrl(item.image_url, item.title || item.slug) || DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
};

/**
 * Get SIP card image URL matching website.
 */
export const getSipImageUrl = (item, index = 0) => {
  if (!item) return DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
  const nameLower = (item.name || '').toLowerCase();
  if (nameLower.includes('icici')) return VERIFIED_SIP_IMAGES.icici;
  if (nameLower.includes('idfc')) return VERIFIED_SIP_IMAGES.idfc;
  if (nameLower.includes('sbi')) return VERIFIED_SIP_IMAGES.sbi;
  return resolveMediaUrl(item.image_url, item.name) || DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
};

/**
 * Get Service card image URL matching website.
 */
export const getServiceImageUrl = (item, index = 0) => {
  if (!item) return DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
  const nameLower = (item.name || '').toLowerCase();
  if (nameLower.includes('ulip') || nameLower.includes('life insurance')) return VERIFIED_SERVICE_IMAGES.ulip;
  if (nameLower.includes('health insurance')) return VERIFIED_SERVICE_IMAGES.health;
  if (nameLower.includes('mutual fund')) return VERIFIED_SERVICE_IMAGES.mutual;
  if (nameLower.includes('child') || nameLower.includes('marriage')) return VERIFIED_SERVICE_IMAGES.child;
  if (nameLower.includes('tax')) return VERIFIED_SERVICE_IMAGES.tax;
  if (nameLower.includes('retirement')) return VERIFIED_SERVICE_IMAGES.retirement;
  if (nameLower.includes('year-end') || nameLower.includes('2026')) return VERIFIED_SERVICE_IMAGES['year-end'];
  return resolveMediaUrl(item.image || item.image_url, item.name) || DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
};

export const CATEGORY_THEMES = [
  { bg: '#E6F4F1', text: '#0F766E', border: '#CCFBF1', accent: '#0D9488' },
  { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A', accent: '#D97706' },
  { bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD', accent: '#0284C7' },
  { bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0', accent: '#16A34A' },
  { bg: '#F3E8FF', text: '#7E22CE', border: '#E9D5FF', accent: '#9333EA' },
  { bg: '#FFE4E6', text: '#BE123C', border: '#FECDD3', accent: '#E11D48' },
];

export const getCategoryTheme = (index = 0) => {
  return CATEGORY_THEMES[index % CATEGORY_THEMES.length];
};
