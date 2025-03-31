import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageCircle, Camera, Phone, Settings } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import { StyleSheet } from 'react-native';
import CameraScreen from './screens/CameraScreen';
import CallsScreen from './screens/CallsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function WhatsAppNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
      },
      tabBarActiveTintColor: '#128C7E',
      tabBarInactiveTintColor: '#666',
      headerStyle: {
        backgroundColor: '#128C7E',
      },
      headerTintColor: '#fff',
    }}>
      <Tab.Screen
        name="Chats"
        component={HomeScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: 'Camera',
          tabBarIcon: ({ color, size }) => (
            <Camera size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          title: 'Calls',
          tabBarIcon: ({ color, size }) => (
            <Phone size={size} color={color} />
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
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});