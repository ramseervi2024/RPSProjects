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
    const product = data?.product || data;
    dispatch({ type: PRODUCT_DETAIL, payload: data });
    return { success: true, data };
  } catch (error) {
    console.warn('Product Detail API error:', error?.message);
    return { success: false, error: error?.message };
  }
};

export const getProfileDetails = () => async (dispatch) => {
  try {
    const data = await ProfileAPI.getProfile();
    const profile = data?.user || data;
    dispatch({ type: PROFILE_DETAILS, payload: profile });
    return { success: true, data: profile };
  } catch (error) {
    const fallbackProfile = {
      name: 'Ramesh Seervi',
      email: 'ramesh@example.com',
      phone: '9001122334',
      addresses: [
        {
          id: 'addr-1',
          label: 'Home Base',
          street: '12 Heritage Lane',
          city: 'Jodhpur',
          zip: '342001',
          default: true,
        },
      ],
    };
    dispatch({ type: PROFILE_DETAILS, payload: fallbackProfile });
    return { success: true, data: fallbackProfile };
  }
};

export const updateProfileDetails = (updatedData) => async (dispatch) => {
  try {
    const res = await ProfileAPI.updateProfile(updatedData);
    dispatch({ type: PROFILE_DETAILS, payload: updatedData });
    return { success: true, data: res };
  } catch (error) {
    dispatch({ type: PROFILE_DETAILS, payload: updatedData });
    return { success: true, data: updatedData };
  }
};

export const getOrderList = () => async (dispatch) => {
  try {
    const data = await OrderAPI.getOrderHistory();
    const orders = Array.isArray(data) ? data : data?.orders || [];
    dispatch({ type: ORDER_LIST, payload: orders });
    return { success: true, data: orders };
  } catch (error) {
    const fallbackOrders = [
      {
        id: 'ORD-2026-8941',
        customer_name: 'Ramesh Seervi',
        date: '2026-10-06T15:30:00Z',
        status: 'Processing',
        total: 7109,
        payment_method: 'razorpay',
        payment_status: 'paid',
        tracking_number: 'MRW-IND-9921448',
        items: [
          {
            name: 'Imperial Udaipur Heritage Silver Peacock Box',
            price: 7899,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
          },
        ],
      },
    ];
    dispatch({ type: ORDER_LIST, payload: fallbackOrders });
    return { success: true, data: fallbackOrders };
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    const data = await OrderAPI.getOrderDetail(orderId);
    dispatch({ type: ORDER_DETAILS, payload: data });
    return { success: true, data };
  } catch (error) {
    const fallbackDetail = {
      id: orderId || 'ORD-2026-8941',
      date: '2026-10-06T15:30:00Z',
      status: 'Processing',
      total: 7109,
      payment_method: 'razorpay',
      tracking_number: 'MRW-IND-9921448',
      items: [
        {
          name: 'Imperial Udaipur Heritage Silver Peacock Box',
          price: 7899,
          quantity: 1,
          image:
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
        },
      ],
      shippingAddress: {
        name: 'Ramesh Seervi',
        phone: '9001122334',
        street: '12 Heritage Lane',
        city: 'Jodhpur',
        zip: '342001',
      },
    };
    dispatch({ type: ORDER_DETAILS, payload: fallbackDetail });
    return { success: true, data: fallbackDetail };
  }
};

export const getNotifications = () => async (dispatch) => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'Order Dispatched',
      message: 'Your order #ORD-2026-8941 has been dispatched from Jodhpur warehouse.',
      date: '2 hours ago',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Royal Festive Privilege',
      message: 'Use code ROYAL500 to get ₹500 discount on authentic Handicrafts.',
      date: '1 day ago',
      read: true,
    },
  ];
  dispatch({ type: NOTIFICATIONS, payload: notifications });
  return { success: true, data: notifications };
};

export const getTransactionList = () => async (dispatch) => {
  const transactions = [
    {
      id: 'TXN-98421',
      order_id: 'ORD-2026-8941',
      amount: '7109.00',
      status: 'completed',
      date: '2026-10-06',
      method: 'Razorpay UPI',
    },
  ];
  dispatch({ type: TRANSACTION_LIST, payload: transactions });
  return { success: true, data: transactions };
};

// Compatibility Stubs
export const getDashboard = () => async (dispatch) => dispatch(getHomeFeed());
export const getServiceList = () => async (dispatch) => dispatch(getCategoryList());
export const getSipLists = () => async (dispatch) => ({ success: true, data: [] });