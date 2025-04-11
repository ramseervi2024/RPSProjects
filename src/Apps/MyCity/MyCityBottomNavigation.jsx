import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Calendar, MessageSquare, Store, Users } from 'lucide-react-native'; // Import icons from lucide-react-native
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import CommunityScreen from './screens/CommunityScreen';
import DirectoryScreen from './screens/DirectoryScreen';
import NewsScreen from './screens/NewsScreen';
import PlacesScreen from './screens/PlacesScreen';
import ServicesScreen from './screens/ServicesScreen';
import WeatherScreen from './screens/WeatherScreen';
import LocalNewScreen from './screens/LocalNewScreen';

const Tab = createBottomTabNavigator();

export default function MyCityBottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
        },
        tabBarActiveTintColor: '#166534',
        tabBarInactiveTintColor: '#64748b',
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
        name="Events"
        component={EventsScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={LocalNewScreen}
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => (
            <Store size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{
          title: 'Directory',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
