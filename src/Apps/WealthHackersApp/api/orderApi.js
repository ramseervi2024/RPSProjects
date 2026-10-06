import { apiClient } from './apiClient';

// 1. Create Razorpay order on server
export const createRazorpayOrder = async (amount) => {
  return await apiClient('/orders/create_razorpay_order', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  });
};

// 2. Place order with verified payment signature
export const placeOrderWithPayment = async (paymentData, cartItems) => {
  return await apiClient('/orders/place_with_payment', {
    method: 'POST',
    body: JSON.stringify({
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_signature: paymentData.razorpay_signature,
      cart_items: cartItems,
    }),
  });
};

// 3. Fetch orders list
export const getOrders = async () => {
  return await apiClient('/orders');
};
