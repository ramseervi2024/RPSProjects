import {
  VERIFY_OTP,
  LOGIN_SUCCESS,
  LOGOUT,
  INITIALIZE_AUTH,
  CONTINUE_AS_GUEST,
} from './constants';

const initialState = {
  token: null,
  isAuthenticated: false,
  isGuest: false,
  user: null,
  user_id: null,
  loading: true,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_AUTH:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
        isGuest: !!action.payload.isGuest,
        user: action.payload.user || null,
        user_id: action.payload.user?.id || action.payload.user_id,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case VERIFY_OTP:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isGuest: false,
        user: action.payload.user || null,
        user_id: action.payload.user?.id || action.payload.user_id,
        loading: false,
      };
    case CONTINUE_AS_GUEST:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isGuest: true,
        user: null,
        user_id: null,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isGuest: false,
        user: null,
        user_id: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default auth;
