import { VERIFY_OTP, LOGOUT, INITIALIZE_AUTH } from './constants';

const initialState = {
    token: null,
    isAuthenticated: false,
    user_id: null,
    loading: true, // Used for app startup checks
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_AUTH:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: !!action.payload.token,
                loading: false,
            };
        case VERIFY_OTP:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user_id: action.payload.user_id,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user_id: null,
            };
        default:
            return state;
    }
};
