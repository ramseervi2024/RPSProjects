import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Hash, Users, MessageSquare, Search, Menu } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SearchScreen from './screens/SearchScreen';
import MessagesScreen from './screens/MessagesScreen';
import FriendsScreen from './screens/FriendsScreen';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function DiscordNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#8e9297',
      tabBarShowLabel: false,
    }}>
    <Tab.Screen
      name="index"
        component={HomeScreen}
        options={{
        tabBarIcon: ({ color, size }) => (
          <Hash size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="friends"
        component={FriendsScreen}
        options={{
        tabBarIcon: ({ color, size }) => (
          <Users size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="messages"
        component={MessagesScreen}
        options={{
        tabBarIcon: ({ color, size }) => (
          <MessageSquare size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="search"
        component={SearchScreen}
        options={{
        tabBarIcon: ({ color, size }) => (
          <Search size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="settings"
        component={SettingsScreen}
        options={{
        tabBarIcon: ({ color, size }) => (
          <Menu size={size} color={color} />
        ),
      }}
    />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#202225',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: 10,
  },
});