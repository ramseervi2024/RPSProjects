import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageCircle, Camera, Phone, Settings } from 'lucide-react-native';
import { Chrome as Home, Search, SquarePlus as PlusSquare, Heart, User } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import { StyleSheet, View } from 'react-native';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import InboxScreen from './screens/InboxScreen';
import CreateScreen from './screens/CreateScreen';

const Tab = createBottomTabNavigator();

export default function TikTokNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#888',
      tabBarShowLabel: false,
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="create"
        component={CreateScreen}
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.createButton}>
              <PlusSquare color="#000" size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    elevation: 0,
    height: 50,
    paddingBottom: 5,
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
});