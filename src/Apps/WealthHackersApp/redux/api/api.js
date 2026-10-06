// api.js
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GOOGLE_MAP_API_KEY = 'AIzaSyArluS7z3hjMd9LxhoUxLFsZI2XCjZJRpg';
export const X_API_KEY = '0qgru2HjXqdkLQovwIzouU6l3E4F1xUb';
export const RAZORPAY_KEY_ID = 'rzp_live_TTf3oHWPQhd4kr';
export const RAZORPAY_KEY_SECRET = 'LPJOQn9LXHkqfJiFybFqiYwD';

// Configuration for API URL
const HOST = "https://wealthhackers.in/wp-json/user/api/v1/";

// Create an Axios instance with default configuration
export const axiosInstance = axios.create({
    baseURL: HOST,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
        crossDomain: "true",
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // Read the token from AsyncStorage (support both wh_token and auth_token)
        const token = (await AsyncStorage.getItem('wh_token')) || (await AsyncStorage.getItem('auth_token'));
        
        // For pre-login endpoints, do NOT send stale Authorization Bearer token as it conflicts with X-API-KEY validation
        const isAuthEndpoint = config.url && (
            config.url.includes('send_login_otp') || 
            config.url.includes('verify_login_otp')
        );

        if (token && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        config.headers['X-API-KEY'] = X_API_KEY;
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);