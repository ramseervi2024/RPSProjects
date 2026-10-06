import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE = 'https://wealthhackers.in/wp-json/user/api/v1';
export const API_KEY = '0qgru2HjXqdkLQovwIzouU6l3E4F1xUb';
export const RAZORPAY_KEY_ID = 'rzp_live_TTf3oHWPQhd4kr';
export const RAZORPAY_KEY_SECRET = 'LPJOQn9LXHkqfJiFybFqiYwD';

/**
 * Universal API Client compliant with WealthHackers API Specification v1
 */
export const apiClient = async (endpoint, options = {}) => {
  const token = (await AsyncStorage.getItem('wh_token')) || (await AsyncStorage.getItem('auth_token'));
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.requiresApiKey ? { 'X-API-KEY': API_KEY } : {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error(data.message || data.data?.message || 'API request failed');
  }
  return data;
};

// ─── Convenience Endpoint Helpers ─────────────────────────────────────────────
export const sendLoginOtp = (email) =>
  apiClient('/send_login_otp', {
    method: 'POST',
    requiresApiKey: true,
    body: JSON.stringify({ email }),
  });

export const verifyLoginOtp = (email, otp) =>
  apiClient('/verify_login_otp', {
    method: 'POST',
    requiresApiKey: true,
    body: JSON.stringify({ email, otp }),
  });

export const getDashboard = () => apiClient('/dashboard');
export const getProfile = () => apiClient('/profile');
export const getServices = () => apiClient('/services');
export const getCart = () => apiClient('/cart');
export const addToCart = (item) =>
  apiClient('/cart/add', { method: 'POST', body: JSON.stringify(item) });
export const updateCartQty = (id, platform, qty) =>
  apiClient('/cart/add', { method: 'POST', body: JSON.stringify({ id, platform, qty }) });
export const removeFromCart = (id, platform) =>
  apiClient('/cart/remove', { method: 'POST', body: JSON.stringify({ id, platform }) });
export const clearCart = () => apiClient('/cart/clear', { method: 'POST' });
export const syncCart = (cart_items) =>
  apiClient('/cart/sync', { method: 'POST', body: JSON.stringify({ cart_items }) });
export const createRazorpayOrder = (amount) =>
  apiClient('/orders/create_razorpay_order', { method: 'POST', body: JSON.stringify({ amount }) });
export const placeOrderWithPayment = (payload) =>
  apiClient('/orders/place_with_payment', { method: 'POST', body: JSON.stringify(payload) });
export const getOrders = () => apiClient('/orders');
export const getOrderDetails = (orderId) => apiClient(`/orders/${orderId}`);
export const getTransactions = () => apiClient('/transactions');
export const getSips = () => apiClient('/sips');
export const getNotifications = () => apiClient('/notifications');
