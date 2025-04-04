import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Search, MapPin, Phone, User } from 'lucide-react-native';

import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import NearMeScreen from './screens/NearMeScreen';
import ServicesScreen from './screens/ServicesScreen';

const Tab = createBottomTabNavigator();

export default function JustdialNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E53935',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          borderTopColor: '#E0E0E0',
        },
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
        name="search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="near-me"
        component={NearMeScreen}
        options={{
          title: 'Near Me',
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="services"
        component={ServicesScreen}
        options={{
          title: 'Services',
          tabBarIcon: ({ color, size }) => <Phone size={size} color={color} />,
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
