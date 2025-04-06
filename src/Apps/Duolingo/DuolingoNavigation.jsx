import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Trophy, Siren as Fire, Book, User } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import StoriesScreen from './screens/StoriesScreen';
import PracticeScreen from './screens/PracticeScreen';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function DuolingoNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#58CC02',
        tabBarInactiveTintColor: '#777',
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="leaderboard"
        component={LeaderboardScreen}
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="practice"
        component={PracticeScreen}
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, size }) => <Fire size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="stories"
        component={StoriesScreen}
        options={{
          title: 'Stories',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    height: 60,
    paddingBottom: 5,
  },
  tabLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
  },
});