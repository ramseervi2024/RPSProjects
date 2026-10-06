// src/redux/reducers/index.js
import { combineReducers } from "redux";
import { profile } from "./profile/reducer";
import { auth } from "./auth/reducer";
import { cart } from "./cart/reducer";

const rootReducer = combineReducers({
    profile: profile,
    auth: auth,
    cart: cart,
});

export default rootReducer;