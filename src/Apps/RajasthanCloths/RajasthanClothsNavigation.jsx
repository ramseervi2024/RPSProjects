import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, ShoppingCart, User, Grid } from 'lucide-react-native';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import SearchScreen from './screens/SearchScreen';
import AllCategoeires from './screens/AllCategoeires';

const Tab = createBottomTabNavigator();

export default function RajasthanClothsNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        height: 70,
        paddingBottom: 8,
      },
      tabBarActiveTintColor: '#E83E8C',
      tabBarInactiveTintColor: '#666666',
      headerShown: false,
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
      name="categories"
        component={AllCategoeires}
        options={{
        title: 'Categories',
        tabBarIcon: ({ color, size }) => <Grid size={size} color={color} />,
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
