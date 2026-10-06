import { SIP_LISTS, SERVICE_LIST, PROFILE_DETAILS, ORDER_LIST, TRANSACTION_LIST, ORDER_DETAILS, NOTIFICATIONS, DASHBOARD, CATEGORIES_LIST } from '../constants';
const initialState = {
    siplists: [],
    profiledetails: {},
    servicelists: {},
    orderlists: [],
    transactionlists: [],
    orderdetails: {},
    notifications: [],
    dashboard: {},
    categories: [],
};
export const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return initialState;
        case SIP_LISTS:
            return { ...state, siplists: action.payload };
        case CATEGORIES_LIST:
            return { ...state, categories: action.payload };
        case PROFILE_DETAILS:
            return { ...state, profiledetails: action.payload };
        case SERVICE_LIST:
            return { ...state, servicelists: action.payload };
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