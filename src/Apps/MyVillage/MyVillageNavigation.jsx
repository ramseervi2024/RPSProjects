import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Search, MessageSquare, Castle, Slack,MapPin } from 'lucide-react-native'; // Import icons from lucide-react-native
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
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      tabBarActiveTintColor: '#FF4785',
      tabBarInactiveTintColor: '#94A3B8',
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
        name="Social"
        component={DirectoryScreen}
        options={{
          title: 'Social',
          tabBarIcon: ({ color, size }) => (
            <Slack size={size} color={color} />
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
          title: 'Top Places',
          tabBarIcon: ({ color, size }) => (
            <Castle size={size} color={color} />
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
     
    </Tab.Navigator>
  );
}
