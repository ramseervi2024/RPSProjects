import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Layers, Cpu, Users, Settings } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import { StyleSheet } from 'react-native';
import CameraScreen from './screens/CameraScreen';
import CallsScreen from './screens/CallsScreen';
import SettingsScreen from './screens/SettingsScreen';
import CommunitiesScreen from './screens/CommunitiesScreen';

const Tab = createBottomTabNavigator();

export default function NVIDIANavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: true,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#76B900',
      tabBarInactiveTintColor: '#666666',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
    }}>
      <Tab.Screen
        name="Chats"
        component={HomeScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={CommunitiesScreen}
        options={{
          title: 'Products',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Layers size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Technology"
        component={CameraScreen}
        options={{
          title: 'Technology',
          tabBarIcon: ({ color, size }) => (
            <Cpu size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={CallsScreen}
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
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
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E5E5',
    height: 60,
  },
  header: {
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
});