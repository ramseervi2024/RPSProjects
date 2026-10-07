import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://rpsdigitalworld.store/wp-json/wp-ecommerce/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Automatic Bearer Token Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token =
        (await AsyncStorage.getItem('user_token')) ||
        (await AsyncStorage.getItem('marwari_token')) ||
        (await AsyncStorage.getItem('auth_token'));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Error reading token from storage:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Automatic Response Interceptor for Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 unauthorized
      try {
        await AsyncStorage.multiRemove(['user_token', 'marwari_token', 'auth_token']);
      } catch (_) {}
    }
    return Promise.reject(error);
  }
);

// ─── 1. Authentication APIs ──────────────────────────────────────────────────
export const AuthAPI = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  sendOTP: async (phone) => {
    const response = await apiClient.post('/auth/send-otp', { phone });
    return response.data;
  },
  verifyOTP: async (phone, otp) => {
    const response = await apiClient.post('/auth/verify-otp', { phone, otp });
    return response.data;
  },
};

// ─── 2. Catalog & Home APIs ──────────────────────────────────────────────────
export const CatalogAPI = {
  getHomeFeed: async () => {
    const response = await apiClient.get('/home');
    return response.data;
  },
  getProducts: async (params = {}) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },
  getProductDetail: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },
};

// ─── 3. Cart Management APIs ─────────────────────────────────────────────────
export const CartAPI = {
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },
  addItem: async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart/items', { productId, quantity });
    return response.data;
  },
  updateQuantity: async (itemId, quantity) => {
    const response = await apiClient.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },
  removeItem: async (itemId) => {
    const response = await apiClient.delete(`/cart/items/${itemId}`);
    return response.data;
  },
};

// ─── 4. Orders & Checkout APIs ───────────────────────────────────────────────
export const OrderAPI = {
  placeOrder: async (orderPayload) => {
    const response = await apiClient.post('/orders', orderPayload);
    return response.data;
  },
  getOrderHistory: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },
  getOrderDetail: async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },
};

// ─── 5. Customer Profile APIs ────────────────────────────────────────────────
export const ProfileAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/me');
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await apiClient.put('/me', data);
    return response.data;
  },
};

// ─── 6. Media Upload API ─────────────────────────────────────────────────────
export const MediaAPI = {
  uploadMedia: async (formData) => {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default apiClient;
