import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Calendar, Users, ClipboardList, Settings } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import Appointments from './screens/Appointments';
import Patients from './screens/Patients';
import Records from './screens/Records';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function HospitalityManagementNavigation() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e7eb',
          },
          tabBarActiveTintColor: '#0891b2',
          tabBarInactiveTintColor: '#6b7280',
          headerShown: false,
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
          name="Appointments"
          component={Appointments}
          options={{
            title: 'Appointments',
            tabBarIcon: ({ color, size }) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Patients"
          component={Patients}
          options={{
            title: 'Patients',
            tabBarIcon: ({ color, size }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Records"
          component={Records}
          options={{
            title: 'Records',
            tabBarIcon: ({ color, size }) => (
              <ClipboardList size={size} color={color} />
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
