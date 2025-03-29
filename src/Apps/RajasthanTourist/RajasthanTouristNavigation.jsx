import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Castle, Trophy, Calendar, User } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import HistoricalScreen from './screens/HistoricalScreen';
import TopPlacesScreen from './screens/TopPlacesScreen';
import BestTimeScreen from './screens/BestTimeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function RajasthanTouristNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="historical"
        component={HistoricalScreen}
        options={{
          title: 'Historical',
          tabBarIcon: ({ color, size }) => (
            <Castle size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TopPlaces"
        component={TopPlacesScreen}
        options={{
          title: 'Top Places',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} />
          ),
        }}

      />
      <Tab.Screen
        name="BestTime"
        component={BestTimeScreen}
        options={{
          title: 'Best Time',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
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
    </Tab.Navigator>
  );
}
