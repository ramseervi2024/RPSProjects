import { OrderAPI } from '../services/api';

export const placeOrder = async (orderPayload) => {
  return await OrderAPI.placeOrder(orderPayload);
};

export const getOrders = async () => {
  return await OrderAPI.getOrderHistory();
};

export const getOrderDetail = async (orderId) => {
  return await OrderAPI.getOrderDetail(orderId);
};

export default {
  placeOrder,
  getOrders,
  getOrderDetail,
};
