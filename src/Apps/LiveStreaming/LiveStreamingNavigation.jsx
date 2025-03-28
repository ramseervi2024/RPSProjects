import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Search, ShoppingCart, User } from 'lucide-react-native'; // Import icons from lucide-react-native
import HomeScreen from './screens/HomeScreen';
import FollowingScreen from './screens/FollowingScreen';
import { StyleSheet } from 'react-native';
import { Chrome as Home, Tv as Tv2, Users, Radio, CircleUser as UserCircle } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function LiveStreamingNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF3B30',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: styles.tabBarLabel,
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
        name="Following"
        component={FollowingScreen}
        options={{
          title: 'Following',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1C1C1E',
    borderTopColor: '#2C2C2E',
    height: 85,
    paddingBottom: 30,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
});