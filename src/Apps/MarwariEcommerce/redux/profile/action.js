import { SIP_LISTS, SERVICE_LIST, PROFILE_DETAILS, ORDER_LIST, TRANSACTION_LIST, ORDER_DETAILS, NOTIFICATIONS, DASHBOARD, CATEGORIES_LIST } from '../constants';
import { axiosInstance } from '../api/api';
import axios from 'axios';

export const getCategoryList = () => async (dispatch) => {
    try {
        let categories = [];
        try {
            // First attempt: Super Panel public categories API
            const res = await axios.get("https://super-panel.wealthhackers.in/super-panel/api-service-categories.php", {
                timeout: 8000,
            });
            if (res?.data?.data && Array.isArray(res.data.data)) {
                categories = res.data.data;
            }
        } catch (e) {
            console.warn("Categories external fetch error, trying backend route:", e?.message);
        }

        if (categories.length === 0) {
            try {
                const response = await axiosInstance.get("categories");
                categories = Array.isArray(response?.data)
                    ? response.data
                    : (response?.data?.data || response?.data?.response || []);
            } catch (err) {
                console.warn("Backend categories fetch error:", err?.message);
            }
        }

        dispatch({ type: CATEGORIES_LIST, payload: categories });
        return { success: true, data: categories };
    } catch (error) {
        console.error("Categories API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getSipLists = () => async (dispatch) => {
    try {
        let sipData = [];
        try {
            const response = await axiosInstance.get("sips");
            sipData = Array.isArray(response?.data)
                ? response.data
                : (response?.data?.response || response?.data?.data || []);
        } catch (e) {
            console.warn("User api /sips failed, trying public endpoint:", e?.message);
        }

        if (sipData.length === 0) {
            try {
                const pubRes = await axios.get("https://wealthhackers.in/wp-json/api/v1/sips", { timeout: 8000 });
                if (Array.isArray(pubRes?.data)) {
                    sipData = pubRes.data;
                }
            } catch (err) {
                console.warn("Public sips fetch error:", err?.message);
            }
        }

        dispatch({ type: SIP_LISTS, payload: sipData });
        return { success: true, data: sipData };
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("SIP API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getServiceList = (data) => async (dispatch) => {
    try {
        let services = [];
        const response = await axiosInstance.get("services");
        if (Array.isArray(response?.data)) {
            services = response.data;
        } else if (Array.isArray(response?.data?.data)) {
            services = response.data.data;
        } else if (Array.isArray(response?.data?.response)) {
            services = response.data.response;
        } else if (response?.data?.data && typeof response.data.data === 'object') {
            services = Object.values(response.data.data);
        }

        dispatch({ type: SERVICE_LIST, payload: services });
        return { success: true, data: services };
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getProfileDetails = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("profile");
        if (response?.status) {
            dispatch({ type: PROFILE_DETAILS, payload: response?.data?.response || response?.data?.data });
        } else {
        }
        return response?.data
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getOrderList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("orders");
        if (response?.status) {
            dispatch({ type: ORDER_LIST, payload: response?.data?.response || response?.data?.data });
        } else {
        }
        return response?.data
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getTransactionList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("transactions");
        if (response?.status) {
            dispatch({ type: TRANSACTION_LIST, payload: response?.data?.response || response?.data?.data });
        } else {
        }
        return response?.data
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`orders/${orderId}`);
        if (response?.status) {
            dispatch({ type: ORDER_DETAILS, payload: response?.data?.response || response?.data?.data });
        } else {
        }
        return response?.data
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getNotifications = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("notifications");
        if (response?.status) {
            dispatch({ type: NOTIFICATIONS, payload: response?.data?.response || response?.data?.data });
        } else {
        }
        return response?.data
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const getDashboard = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("dashboard");
        if (response?.status) {
            dispatch({ type: DASHBOARD, payload: response?.data?.response || response?.data?.data });
        } else {
        }
        return response?.data
    } catch (error) {
        if (error?.response?.status === 401) {
            dispatch({ type: 'LOGOUT' });
        }
        console.error("API Error:", error?.message || error);
        return { success: false, error: error?.message || "Something went wrong" };
    }
};

export const updateProfileDetails = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("profile/update", data).catch(() =>
            axiosInstance.post("profile", data)
        );
        if (response?.status) {
            dispatch({ type: PROFILE_DETAILS, payload: response?.data?.response || response?.data?.data || data });
        } else {
            dispatch({ type: PROFILE_DETAILS, payload: data });
        }
        return response?.data || { success: true };
    } catch (error) {
        dispatch({ type: PROFILE_DETAILS, payload: data });
        return { success: true };
    }
};