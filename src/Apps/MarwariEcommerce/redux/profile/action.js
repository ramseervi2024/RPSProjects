import {
  HOME_FEED_SUCCESS,
  CATEGORIES_LIST,
  PRODUCTS_LIST,
  PRODUCT_DETAIL,
  PROFILE_DETAILS,
  ORDER_LIST,
  ORDER_DETAILS,
  NOTIFICATIONS,
  DASHBOARD,
  TRANSACTION_LIST,
} from '../constants';
import { CatalogAPI, OrderAPI, ProfileAPI } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHomeFeed = () => async (dispatch) => {
  try {
    const data = await CatalogAPI.getHomeFeed();
    dispatch({ type: HOME_FEED_SUCCESS, payload: data });
    return { success: true, data };
  } catch (error) {
    console.warn('Home Feed API error:', error?.message);
    return { success: false, error: error?.message };
  }
};

export const getCategoryList = () => async (dispatch) => {
  try {
    const data = await CatalogAPI.getCategories();
    const categories = Array.isArray(data) ? data : data?.categories || [];
    dispatch({ type: CATEGORIES_LIST, payload: categories });
    return { success: true, data: categories };
  } catch (error) {
    console.warn('Categories API error:', error?.message);
    return { success: false, error: error?.message };
  }
};

export const getProductsList = (params = {}) => async (dispatch) => {
  try {
    const data = await CatalogAPI.getProducts(params);
    const products = Array.isArray(data) ? data : data?.products || [];
    dispatch({ type: PRODUCTS_LIST, payload: products });
    return { success: true, data: products };
  } catch (error) {
    console.warn('Products API error:', error?.message);
    return { success: false, error: error?.message };
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    const data = await CatalogAPI.getProductDetail(id);
    dispatch({ type: PRODUCT_DETAIL, payload: data });
    return { success: true, data };
  } catch (error) {
    console.warn('Product Detail API error:', error?.message);
    return { success: false, error: error?.message };
  }
};

export const getProfileDetails = () => async (dispatch, getState) => {
  try {
    const authUser = getState()?.auth?.user;
    if (authUser) {
      dispatch({ type: PROFILE_DETAILS, payload: authUser });
      return { success: true, data: authUser };
    }

    const userStr = await AsyncStorage.getItem('marwari_user');
    if (userStr) {
      const parsed = JSON.parse(userStr);
      dispatch({ type: PROFILE_DETAILS, payload: parsed });
      return { success: true, data: parsed };
    }

    // Attempt to query users list from backend
    const users = await ProfileAPI.getProfile();
    if (Array.isArray(users) && users.length > 0) {
      const match = users.find((u) => u.email === authUser?.email) || users[0];
      dispatch({ type: PROFILE_DETAILS, payload: match });
      return { success: true, data: match };
    }

    dispatch({ type: PROFILE_DETAILS, payload: null });
    return { success: true, data: null };
  } catch (error) {
    dispatch({ type: PROFILE_DETAILS, payload: null });
    return { success: false, error: error?.message };
  }
};

export const updateProfileDetails = (updatedData) => async (dispatch, getState) => {
  try {
    const current = getState()?.profile?.profiledetails || {};
    const merged = { ...current, ...updatedData };
    await AsyncStorage.setItem('marwari_user', JSON.stringify(merged));
    dispatch({ type: PROFILE_DETAILS, payload: merged });
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token: await AsyncStorage.getItem('user_token'), user: merged } });
    await ProfileAPI.updateProfile(updatedData);
    return { success: true, data: merged };
  } catch (error) {
    dispatch({ type: PROFILE_DETAILS, payload: updatedData });
    return { success: true, data: updatedData };
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  try {
    const data = await OrderAPI.getOrderHistory();
    const currentUserEmail = getState()?.auth?.user?.email;
    let orders = [];
    if (Array.isArray(data)) {
      orders = data;
    } else if (data && typeof data === 'object') {
      orders = Array.isArray(data.orders) ? data.orders : [data];
    }

    // Filter by user email if available
    if (currentUserEmail && orders.length > 0) {
      const filtered = orders.filter(
        (o) => !o.userEmail || o.userEmail.toLowerCase() === currentUserEmail.toLowerCase()
      );
      if (filtered.length > 0) {
        orders = filtered;
      }
    }

    const existingOrders = getState()?.profile?.orderlists || [];
    
    // Merge API orders with existing local orders to prevent wipes during simulation
    const mergedOrders = [...existingOrders];
    orders.forEach((apiOrder) => {
      if (!mergedOrders.find((o) => String(o.id) === String(apiOrder.id))) {
        mergedOrders.push(apiOrder);
      }
    });

    dispatch({ type: ORDER_LIST, payload: mergedOrders });
    return { success: true, data: mergedOrders };
  } catch (error) {
    // DO NOT clear order list if API fails
    // dispatch({ type: ORDER_LIST, payload: [] });
    return { success: false, error: error?.message };
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    const data = await OrderAPI.getOrderDetail(orderId);
    dispatch({ type: ORDER_DETAILS, payload: data });
    return { success: true, data };
  } catch (error) {
    const existingOrders = getState()?.profile?.orderlists || [];
    const match = existingOrders.find((o) => String(o.id) === String(orderId));
    if (match) {
      dispatch({ type: ORDER_DETAILS, payload: match });
      return { success: true, data: match };
    }
    return { success: false, error: error?.message };
  }
};

export const getNotifications = () => async (dispatch) => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'Shipment Dispatched via BlueDart',
      message: 'Your order has departed from Jodhpur Palace Hub.',
      date: '2 hours ago',
      category: 'Orders',
      type: 'order',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Royal Festive Privilege: ROYAL500',
      message: 'Use coupon ROYAL500 at checkout to receive ₹500 discount on silver jewellery and sarees.',
      date: '1 day ago',
      category: 'Privilege',
      type: 'discount',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Authenticity Guarantee Certified',
      message: 'Your purchased handicraft has been issued verified GI artisan provenance.',
      date: '3 days ago',
      category: 'Heritage',
      type: 'certificate',
      read: true,
    },
  ];
  dispatch({ type: NOTIFICATIONS, payload: notifications });
  return { success: true, data: notifications };
};

export const getTransactionList = () => async (dispatch, getState) => {
  const orders = getState()?.profile?.orderlists || [];
  const transactions = orders.map((o, idx) => ({
    id: `TXN-${o.id || idx}`,
    order_id: o.id || `ORD-${idx}`,
    amount: o.total || 7109,
    status: o.status === 'Cancelled' ? 'failed' : 'completed',
    date: o.date ? new Date(o.date).toLocaleDateString() : '06 Oct 2026',
    method: 'Razorpay UPI',
  }));
  dispatch({ type: TRANSACTION_LIST, payload: transactions });
  return { success: true, data: transactions };
};

// Compatibility Stubs
export const getDashboard = () => async (dispatch) => dispatch(getHomeFeed());
export const getServiceList = () => async (dispatch) => dispatch(getCategoryList());
export const getSipLists = () => async () => ({ success: true, data: [] });