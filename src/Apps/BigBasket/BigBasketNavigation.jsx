import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Search, ShoppingCart, Heart, User } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function BigBasketNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        height: 80,
        paddingBottom: 8,
      },
      tabBarActiveTintColor: '#16a34a',
      tabBarInactiveTintColor: '#64748b',
      tabBarLabelStyle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
      },
    }}>
    <Tab.Screen
      name="index"
        component={HomeScreen}
        options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="search"
        component={SearchScreen}
        options={{
        title: 'Search',
        tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="cart"
        component={CartScreen}
        options={{
        title: 'Cart',
        tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="favorites"
        component={FavoritesScreen}
        options={{
        title: 'Favorites',
        tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="profile"
        component={ProfileScreen}
        options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
      }}
    />
    </Tab.Navigator>
  );
}
