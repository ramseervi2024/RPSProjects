import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Cat as Categories, ShoppingCart, User, BadgeIndianRupee } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import DeliveryDetailsScreen from './screens/DeliveryDetailsScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import PaymentScreen from './screens/PaymentScreen';

const Tab = createBottomTabNavigator();

export default function ProductDetailsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          title: 'Reviews',
          tabBarIcon: ({ color, size }) => (
            <Categories size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Delivery"
        component={DeliveryDetailsScreen}
        options={{
          title: 'Delivery',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: 'Payment',
          tabBarIcon: ({ color, size }) => (
            <BadgeIndianRupee size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
