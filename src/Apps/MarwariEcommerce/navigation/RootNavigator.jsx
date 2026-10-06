import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import VerificationSuccessScreen from '../screens/VerificationSuccessScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import SIPScreen from '../screens/SIPScreen';
import ContactAdvisorScreen from '../screens/ContactAdvisorScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import OrdersScreen from '../screens/OrdersScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ServicesScreen from '../screens/ServicesScreen';
import AppNavigator from './AppNavigator';
import { initializeAuth } from '../redux/auth/action';
import { COLORS, TYPOGRAPHY } from '../theme/theme';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: COLORS.surface },
        headerTitleStyle: { ...TYPOGRAPHY.h3 },
        headerTintColor: COLORS.textPrimary,
        headerShadowVisible: false,
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          <Stack.Screen name="VerificationSuccess" component={VerificationSuccessScreen} />
        </>
      ) : (
        // Main Stack
        <>
          <Stack.Screen name="Main" component={AppNavigator} />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentHistory"
            component={PaymentHistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SIPPortfolios"
            component={SIPScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ContactAdvisor"
            component={ContactAdvisorScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Calculate"
            component={CalculatorScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Orders"
            component={OrdersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Services"
            component={ServicesScreen}
            options={{ headerShown: false }}
          />
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
    backgroundColor: COLORS.background,
  },
});
