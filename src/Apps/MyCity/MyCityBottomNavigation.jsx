import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LandPlot, Video, Tractor, Newspaper, ChartCandlestick } from 'lucide-react-native'; // Import icons from lucide-react-native
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
            <LandPlot size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Videos"
        component={EventsScreen}
        options={{
          title: 'Videos',
          tabBarIcon: ({ color, size }) => (
            <Video size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={LocalNewScreen}
        options={{
          title: 'News',
          tabBarIcon: ({ color, size }) => (
            <Newspaper size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="agriculture"
        component={CommunityScreen}
        options={{
          title: 'Agriculture',
          tabBarIcon: ({ color, size }) => (
            <Tractor size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={DirectoryScreen}
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => (
            <ChartCandlestick size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
