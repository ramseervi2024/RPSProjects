import { SEND_OTP, VERIFY_OTP, LOGIN_SUCCESS, LOGOUT, INITIALIZE_AUTH } from './constants';
import { AuthAPI } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeAuth = () => async (dispatch) => {
    try {
        const isLoggedOut = await AsyncStorage.getItem('user_logged_out');
        const token =
            (await AsyncStorage.getItem('user_token')) ||
            (await AsyncStorage.getItem('marwari_token'));
        const userStr = await AsyncStorage.getItem('marwari_user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (token && !isLoggedOut) {
            dispatch({ type: INITIALIZE_AUTH, payload: { token, user } });
        } else {
            dispatch({ type: INITIALIZE_AUTH, payload: { token: null, user: null } });
        }
    } catch (error) {
        console.error("Auth Init Error:", error);
        dispatch({ type: INITIALIZE_AUTH, payload: { token: null, user: null } });
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await AuthAPI.login(credentials);
        if (response?.token || response?.success) {
            const token = response.token;
            const user = response.user || { email: credentials.email, name: 'Royal Patron' };
            await AsyncStorage.removeItem('user_logged_out');
            await AsyncStorage.setItem('user_token', token);
            await AsyncStorage.setItem('marwari_token', token);
            await AsyncStorage.setItem('marwari_user', JSON.stringify(user));
            dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
            return { success: true, data: response };
        }
        return { success: false, error: response?.message || 'Login failed' };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Login failed';
        return { success: false, error: message };
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const response = await AuthAPI.register(userData);
        if (response?.token || response?.success) {
            const token = response.token;
            const user = response.user || { name: userData.name, email: userData.email, phone: userData.phone };
            await AsyncStorage.removeItem('user_logged_out');
            await AsyncStorage.setItem('user_token', token);
            await AsyncStorage.setItem('marwari_token', token);
            await AsyncStorage.setItem('marwari_user', JSON.stringify(user));
            dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
            return { success: true, data: response };
        }
        return { success: false, error: response?.message || 'Registration failed' };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Registration failed';
        return { success: false, error: message };
    }
};

export const sendLoginOtp = (phone) => async (dispatch) => {
    try {
        const response = await AuthAPI.sendOTP(phone);
        if (response?.success) {
            dispatch({ type: SEND_OTP, payload: response });
            return { success: true, data: response };
        }
        return { success: false, error: response?.message || 'Failed to send OTP' };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Failed to send OTP';
        return { success: false, error: message };
    }
};

export const verifyLoginOtp = (phone, otp) => async (dispatch) => {
    try {
        const response = await AuthAPI.verifyOTP(phone, otp);
        if (response?.token || response?.success) {
            const token = response.token || 'demo-jwt-token-marwari';
            const user = response.user || { phone, name: `Royal Guest ${phone.slice(-4)}` };
            await AsyncStorage.removeItem('user_logged_out');
            await AsyncStorage.setItem('user_token', token);
            await AsyncStorage.setItem('marwari_token', token);
            await AsyncStorage.setItem('marwari_user', JSON.stringify(user));
            dispatch({ type: VERIFY_OTP, payload: { token, user } });
            return { success: true, data: response };
        }
        return { success: false, error: response?.message || 'Invalid OTP code' };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Verification failed';
        return { success: false, error: message };
    }
};

export const logout = () => async (dispatch) => {
    try {
        await AsyncStorage.multiRemove(['user_token', 'marwari_token', 'marwari_user']);
        await AsyncStorage.setItem('user_logged_out', 'true');
        dispatch({ type: LOGOUT });
        return { success: true };
    } catch (error) {
        dispatch({ type: LOGOUT });
        return { success: true };
    }
};

export const logoutAction = logout;
