import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import VerificationSuccessScreen from '../screens/VerificationSuccessScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import AppNavigator from './AppNavigator';
import { initializeAuth } from '../redux/auth/action';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, isGuest, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#831843" />
      </View>
    );
  }

  const isAccessAllowed = isAuthenticated || isGuest;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#0F172A',
        headerShadowVisible: false,
      }}
    >
      {!isAccessAllowed ? (
        // Auth Stack: Login / Register / OTP / Welcome
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          <Stack.Screen name="VerificationSuccess" component={VerificationSuccessScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </>
      ) : (
        // Main Store App Stack
        <>
          <Stack.Screen name="Main" component={AppNavigator} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});
