import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Camera, Map, MessageSquare, Users as Users2 } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import { StyleSheet, View } from 'react-native';
import StoriesScreen from './screens/StoriesScreen';
import ChatScreen from './screens/ChatScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import CameraScreen from './screens/CameraScreen';

const Tab = createBottomTabNavigator();

export default function SnapchatNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#000',
        borderTopWidth: 0,
        height: Platform.OS === 'ios' ? 85 : 60,
        paddingBottom: Platform.OS === 'ios' ? 30 : 10,
      },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#666',
    }}>
    <Tab.Screen
      name="index"
        component={HomeScreen}
        options={{
        title: 'Map',
        tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="chat"
        component={ChatScreen}
        options={{
        title: 'Chat',
        tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="camera"
        component={CameraScreen}
        options={{
        title: 'Camera',
        tabBarIcon: ({ color, size }) => <Camera size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="stories"
        component={StoriesScreen}
        options={{
        title: 'Stories',
        tabBarIcon: ({ color, size }) => <Users2 size={size} color={color} />,
      }}
    />
      <Tab.Screen
        name="Chat Details"
        component={ChatDetailScreen}
        options={{
          title: 'Chat Details',
          tabBarIcon: ({ color, size }) => (
            <Users2 size={size} color={color} />
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