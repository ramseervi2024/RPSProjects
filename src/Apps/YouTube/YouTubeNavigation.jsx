import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Compass, SquarePlay as PlaySquare, User } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import { StyleSheet, View } from 'react-native';
import ProfileScreen from './screens/ProfileScreen';
import ExploreScreen from './screens/ExploreScreen';
import LibraryScreen from './screens/LibraryScreen';

const Tab = createBottomTabNavigator();

export default function YouTubeNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
      },
      tabBarActiveTintColor: '#ff0000',
      tabBarInactiveTintColor: '#606060',
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
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Compass size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.createButton}>
              <PlaySquare color="#000" size={size} />
            </View>
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