import { VERIFY_OTP, LOGIN_SUCCESS, LOGOUT, INITIALIZE_AUTH } from './constants';

const initialState = {
    token: null,
    isAuthenticated: false,
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
                user: action.payload.user || state.user,
                user_id: action.payload.user?.id || action.payload.user_id,
                loading: false,
            };
        case LOGIN_SUCCESS:
        case VERIFY_OTP:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user || null,
                user_id: action.payload.user?.id || action.payload.user_id,
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                user_id: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default auth;
