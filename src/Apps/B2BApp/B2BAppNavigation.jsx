import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Search, ShoppingCart,  User } from 'lucide-react-native'; // Import icons from lucide-react-native
import { Chrome as Home, Building2, ShoppingBag, MessageSquare, User } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import CompaniesScreen from './screens/CompaniesScreen';
import ProductsScreen from './screens/ProductsScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Tab = createBottomTabNavigator();

export default function B2BAppNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
      },
      tabBarLabelStyle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
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
        name="Companies"
        component={CompaniesScreen}
        options={{
          title: 'Companies',
          tabBarIcon: ({ color, size }) => (
            <Building2 size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
       {/* <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Register',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
