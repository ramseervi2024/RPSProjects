import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dumbbell, Chrome as Home, User, Calendar, Trophy } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import { Platform } from 'react-native';
import ProgressScreen from './screens/ProgressScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import ScheduleScreen from './screens/ScheduleScreen';

const Tab = createBottomTabNavigator();

export default function SportsFitnessNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#1a1b1e',
        borderTopWidth: 0,
        height: Platform.OS === 'ios' ? 85 : 65,
        paddingBottom: Platform.OS === 'ios' ? 25 : 10,
        paddingTop: 10,
      },
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: '#71717a',
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
        name="Workouts"
        component={WorkoutsScreen}
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size }) => (
            <Dumbbell size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
