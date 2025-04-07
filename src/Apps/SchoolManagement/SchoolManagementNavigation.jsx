import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Users, Calendar, BookOpen, Settings } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import Schedule from './screens/Schedule';
import Students from './screens/Students';
import Courses from './screens/CoursesScreen';
import Settings1 from './screens/Settings';

const Tab = createBottomTabNavigator();

export default function SchoolManagementNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          color: '#111827',
          fontSize: 18,
          fontWeight: '600',
        },
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
        name="Students"
        component={Students}
        options={{
          title: 'Students',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings1}
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
