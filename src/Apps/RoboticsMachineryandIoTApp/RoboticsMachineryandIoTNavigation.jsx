import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Settings, Activity, Notebook as Robot } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import {  useTheme } from './context/ThemeContext';
import Machines from './screens/Machines';
import Monitoring from './screens/Monitoring';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function RoboticsMachineryandIoTNavigation() {
  const { theme } = useTheme();
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.secondary,
          headerStyle: {
            backgroundColor: theme.surface,
          },
          headerTintColor: theme.text,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Machines"
          component={Machines}
          options={{
            title: 'Machines',
            tabBarIcon: ({ color, size }) => (
              <Robot size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Monitoring"
          component={Monitoring}
          options={{
            title: 'Monitoring',
            tabBarIcon: ({ color, size }) => (
              <Activity size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}
