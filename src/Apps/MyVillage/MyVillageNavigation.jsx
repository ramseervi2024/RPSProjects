import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Search, MessageSquare, Store, Users,MapPin } from 'lucide-react-native'; // Import icons from lucide-react-native
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import CommunityScreen from './screens/CommunityScreen';
import DirectoryScreen from './screens/DirectoryScreen';
import WelcomePage from './screens/WelcomePage';
import SecondWelcomePage from './screens/SecondWelcomePage';
import ExploreScreen from './screens/ExploreScreen';

const Tab = createBottomTabNavigator();

export default function MyVillageNavigation() {
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
        // component={WelcomePage}
        component={SecondWelcomePage}
        // component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => (
            <Store size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MapPin"
        component={CommunityScreen}
        options={{
          title: 'Area Map',
          tabBarIcon: ({ color, size }) => (
            <MapPin size={size} color={color} />
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
