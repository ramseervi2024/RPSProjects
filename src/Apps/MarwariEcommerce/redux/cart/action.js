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
} from './constants';
import { CartAPI, OrderAPI } from '../../services/api';

/**
 * Fetch cart from backend
 */
export const fetchCart = (silent = false) => async (dispatch) => {
  if (!silent) {
    dispatch({ type: GET_CART_REQUEST });
  }
  try {
    const response = await CartAPI.getCart();
    let items = [];
    if (Array.isArray(response)) {
      items = response;
    } else if (Array.isArray(response?.items)) {
      items = response.items.map((it) => ({
        id: it.product?.id || it.productId || it.id,
        name: it.product?.name || it.name,
        price: it.product?.price || it.price,
        image: it.product?.image || it.image,
        qty: it.quantity || it.qty || 1,
      }));
    }
    dispatch({ type: GET_CART_SUCCESS, payload: items });
    return { success: true, data: items };
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error?.message });
    return { success: false, error: error?.message || 'Failed to fetch cart' };
  }
};

/**
 * Optimistic Add to Cart - updates Redux in 0ms and syncs with server in background
 */
export const addToCart = (product, quantity = 1) => async (dispatch) => {
  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    qty: quantity,
    _optimisticAt: Date.now(),
  };

  // 1. Instantly update Redux state (0ms latency)
  dispatch({ type: ADD_TO_CART_REQUEST, payload: item });

  try {
    const res = await CartAPI.addItem(product.id, quantity);
    return { success: true, data: res };
  } catch (error) {
    // Keep local optimistic cart even if unauthenticated / offline
    return { success: true, localOnly: true };
  }
};

/**
 * Optimistic Update Quantity - updates quantity immediately in 0ms
 */
export const updateCartQty = (id, delta) => async (dispatch, getState) => {
  // 1. Instantly update quantity in Redux
  dispatch({
    type: UPDATE_CART_QTY_OPTIMISTIC,
    payload: { id, delta },
  });

  const cartItems = getState()?.cart?.items || [];
  const currentItem = cartItems.find((it) => String(it.id) === String(id));
  const newQty = (currentItem?.qty || 1) + delta;

  try {
    if (newQty > 0) {
      await CartAPI.updateQuantity(id, newQty);
    } else {
      await CartAPI.removeItem(id);
    }
    return { success: true };
  } catch (error) {
    return { success: true, localOnly: true };
  }
};

/**
 * Optimistic Remove Item - removes immediately in 0ms
 */
export const removeFromCart = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART_REQUEST, payload: { id } });

  try {
    await CartAPI.removeItem(id);
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: { id } });
    return { success: true };
  } catch (error) {
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: { id } });
    return { success: true, localOnly: true };
  }
};

/**
 * Clear Cart
 */
export const clearCart = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });
  dispatch({ type: CLEAR_CART_SUCCESS });
  return { success: true };
};

/**
 * Place Order via Swagger API
 */
export const placeOrderWithPayment = (orderPayload) => async (dispatch) => {
  dispatch({ type: CHECKOUT_ORDER_REQUEST });
  try {
    const response = await OrderAPI.placeOrder(orderPayload);
    dispatch({ type: CHECKOUT_ORDER_SUCCESS, payload: response });
    dispatch({ type: CLEAR_CART_SUCCESS });
    return { success: true, data: response };
  } catch (error) {
    dispatch({ type: CHECKOUT_ORDER_FAILURE, payload: error?.message });
    return { success: false, error: error?.message || 'Order placement failed' };
  }
};

export const createRazorpayOrder = async (amount) => {
  return { success: true, order_id: `rzp_order_${Date.now()}` };
};
