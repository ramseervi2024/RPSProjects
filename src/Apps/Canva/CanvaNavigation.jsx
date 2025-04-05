import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutGrid as Layout, Chrome as Home, Image as ImageIcon, User } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import TemplatesScreen from './screens/TemplatesScreen';
import ProjectsScreen from './screens/ProjectsScreen';

const Tab = createBottomTabNavigator();

export default function CanvaNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
      },
      tabBarActiveTintColor: '#7c3aed',
      tabBarInactiveTintColor: '#64748b',
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTitleStyle: {
        color: '#1e293b',
        fontSize: 18,
        fontWeight: '600',
      },
    }}>
    <Tab.Screen
      name="index"
      component={HomeScreen}
      options={{
        title: 'Home',
        tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="templates"
      component={TemplatesScreen}
      options={{
        title: 'Templates',
        tabBarIcon: ({ size, color }) => <Layout size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="projects"
      component={ProjectsScreen}
      options={{
        title: 'Projects',
        tabBarIcon: ({ size, color }) => <ImageIcon size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
      }}
    />
     
    </Tab.Navigator>
  );
}
