import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_QTY_OPTIMISTIC,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  CHECKOUT_ORDER_REQUEST,
  CHECKOUT_ORDER_SUCCESS,
  CHECKOUT_ORDER_FAILURE,
  CHECKOUT_INIT_REQUEST,
  CHECKOUT_INIT_SUCCESS,
  CHECKOUT_INIT_FAILURE,
} from './constants';
import { axiosInstance } from '../api/api';

/**
 * Fetch cart from backend
 * @param {boolean} silent If true, avoids clearing/reloading UI if cart already exists
 */
export const fetchCart = (silent = false) => async (dispatch) => {
  if (!silent) {
    dispatch({ type: GET_CART_REQUEST });
  }
  try {
    const response = await axiosInstance.get('cart');
    const items = response?.data?.data || response?.data?.response || [];
    dispatch({ type: GET_CART_SUCCESS, payload: Array.isArray(items) ? items : [] });
    return { success: true, data: items };
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }
    dispatch({ type: GET_CART_FAILURE, payload: error?.message });
    return { success: false, error: error?.message || 'Failed to fetch cart' };
  }
};

/**
 * Optimistic Add to Cart - updates Redux in 0ms and syncs with server in background
 */
export const addToCart = (item) => async (dispatch) => {
  // 1. Instantly update Redux state (0ms latency, eliminates UI lag)
  dispatch({ type: ADD_TO_CART_REQUEST, payload: item });

  try {
    const response = await axiosInstance.post('cart/add', item);
    const items = response?.data?.data || response?.data?.response || [];
    if (Array.isArray(items) && items.length > 0) {
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: items });
    }
    return { success: true, data: items, message: response?.data?.message };
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }
    console.warn('addToCart background error:', error?.message);
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error?.message });
    return { success: false, error: error?.message || 'Failed to add item to cart' };
  }
};

/**
 * Optimistic Update Quantity - updates quantity immediately in 0ms
 */
export const updateCartQty = (id, platform, delta) => async (dispatch) => {
  // 1. Instantly update quantity in Redux
  dispatch({
    type: UPDATE_CART_QTY_OPTIMISTIC,
    payload: { id, platform, delta },
  });

  try {
    const response = await axiosInstance.post('cart/add', { id, platform, qty: delta });
    const items = response?.data?.data || response?.data?.response || [];
    if (Array.isArray(items) && items.length > 0) {
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: items });
    }
    return { success: true, data: items };
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }
    console.warn('updateCartQty background error:', error?.message);
    return { success: false, error: error?.message };
  }
};

/**
 * Optimistic Remove Item - removes immediately in 0ms
 */
export const removeFromCart = (id, platform) => async (dispatch) => {
  // 1. Instantly remove from Redux
  dispatch({ type: REMOVE_FROM_CART_REQUEST, payload: { id, platform } });

  try {
    const response = await axiosInstance.post('cart/remove', { id, platform });
    const items = response?.data?.data || response?.data?.response || [];
    if (Array.isArray(items)) {
      dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: items });
    }
    return { success: true, data: items, message: response?.data?.message };
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }
    dispatch({ type: REMOVE_FROM_CART_FAILURE, payload: error?.message });
    return { success: false, error: error?.message || 'Failed to remove item' };
  }
};

/**
 * Optimistic Clear Cart - clears immediately in 0ms
 */
export const clearCart = () => async (dispatch) => {
  // 1. Instantly empty Redux
  dispatch({ type: CLEAR_CART_REQUEST });
  dispatch({ type: CLEAR_CART_SUCCESS });

  try {
    const response = await axiosInstance.post('cart/clear');
    return { success: true, message: response?.data?.message };
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }
    dispatch({ type: CLEAR_CART_FAILURE, payload: error?.message });
    return { success: false, error: error?.message || 'Failed to clear cart' };
  }
};

export const createRazorpayOrder = (amount) => async (dispatch) => {
  dispatch({ type: CHECKOUT_INIT_REQUEST });
  try {
    const response = await axiosInstance.post('orders/create_razorpay_order', { amount });
    dispatch({ type: CHECKOUT_INIT_SUCCESS, payload: response?.data });
    return response?.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }
    const errMsg = error?.response?.data?.message || error?.message || 'Failed to create payment order';
    dispatch({ type: CHECKOUT_INIT_FAILURE, payload: errMsg });
    return { success: false, error: errMsg };
  }
};

export const placeOrderWithPayment = (payload) => async (dispatch) => {
  dispatch({ type: CHECKOUT_ORDER_REQUEST });
  try {
    const response = await axiosInstance.post('orders/place_with_payment', payload);
    if (response?.data?.success) {
      dispatch({ type: CHECKOUT_ORDER_SUCCESS, payload: response?.data });
      dispatch({ type: CLEAR_CART_SUCCESS });
    } else {
      dispatch({ type: CHECKOUT_ORDER_FAILURE, payload: response?.data?.message });
    }
    return response?.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }
    dispatch({ type: CHECKOUT_ORDER_FAILURE, payload: error?.message });
    return { success: false, error: error?.message || 'Order placement failed' };
  }
};
