import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapPin, Search, Settings } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import { StyleSheet } from 'react-native';
import SettingsScreen from './screens/SettingsScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function GoogleMapsNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#64748b',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        backgroundColor: '#ffffff',
        height: 70,
        paddingBottom: 8,
        paddingTop: 8,
      },
      headerShown: false,
    }}>
    <Tab.Screen
      name="index"
      component={HomeScreen}
      options={{
        title: 'Map',
        tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
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
      name="settings"
      component={SettingsScreen}
      options={{
        title: 'Settings',
        tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
      }}
    />
    </Tab.Navigator>
  );
}