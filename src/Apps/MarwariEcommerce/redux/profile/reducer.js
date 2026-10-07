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

const initialState = {
  homeFeed: null,
  categories: [],
  products: [],
  productDetail: null,
  profiledetails: {},
  orderlists: [],
  transactionlists: [],
  orderdetails: {},
  notifications: [],
  dashboard: {},
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState;
    case HOME_FEED_SUCCESS:
      return {
        ...state,
        homeFeed: action.payload,
        categories: action.payload?.categories || state.categories,
        products: action.payload?.featured_products || state.products,
      };
    case CATEGORIES_LIST:
      return { ...state, categories: action.payload };
    case PRODUCTS_LIST:
      return { ...state, products: action.payload };
    case PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    case PROFILE_DETAILS:
      return { ...state, profiledetails: action.payload };
    case ORDER_LIST:
      return { ...state, orderlists: action.payload };
    case TRANSACTION_LIST:
      return { ...state, transactionlists: action.payload };
    case ORDER_DETAILS:
      return { ...state, orderdetails: action.payload };
    case NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case DASHBOARD:
      return { ...state, dashboard: action.payload };
    default:
      return state;
  }
};

export default profile;