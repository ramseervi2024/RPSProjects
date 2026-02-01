import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TrendingUp as Trending, User, Search, Heart } from 'lucide-react-native';
import { Book, Compass, FlaskRound as Flask, Map } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import { StyleSheet } from 'react-native';
import APIsScreen from './screens/APIsScreen';
import RoadmapsScreen from './screens/RoadmapsScreen';
import CoursesScreen from './screens/CoursesScreen';

const Tab = createBottomTabNavigator();

export default function BazaarHubNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#1a1a1a',
        borderTopColor: '#333',
      },
      tabBarActiveTintColor: '#60a5fa',
      tabBarInactiveTintColor: '#888',
      headerStyle: {
        backgroundColor: '#1a1a1a',
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
      },
    }}>
      <Tab.Screen
        name="AI Fields"
        component={HomeScreen}
        options={{
          title: 'AI Fields',
          tabBarIcon: ({ color, size }) => (
            <Trending size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="APIs"
        component={APIsScreen}
        options={{
          title: 'APIs',
          tabBarIcon: ({ color, size }) => (
            <Book size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Roadmaps"
        component={RoadmapsScreen}
        options={{
          title: 'Roadmaps',
          tabBarIcon: ({ color, size }) => (
            <Map size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <Compass size={size} color={color} />
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