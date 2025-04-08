import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, User, ShoppingBag, Search } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function AppleCompanyNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f1f1',
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#FF3B30',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tab.Screen
        component={HomeScreen}
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        component={NotificationsScreen}
        name="Store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tab.Screen
        component={SearchScreen}
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      
      <Tab.Screen
        component={ProfileScreen}
        name="profile"
        options={{
          title: 'User',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
