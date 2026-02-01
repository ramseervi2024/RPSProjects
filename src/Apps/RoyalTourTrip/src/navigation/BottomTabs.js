import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Map, Tent, Hotel, Calendar, UserCircle } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import DestinationsScreen from '../screens/DestinationsScreen';
import SafariBookingScreen from '../screens/SafariBookingScreen';
import HotelsScreen from '../screens/HotelsScreen';
import TripPlannerScreen from '../screens/TripPlannerScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    elevation: 10,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#DAA520',
                tabBarInactiveTintColor: '#999',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Destinations"
                component={DestinationsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Safaris"
                component={SafariBookingScreen}
                options={{
                    tabBarLabel: 'Safaris',
                    tabBarIcon: ({ color, size }) => <Tent color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Hotels"
                component={HotelsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Hotel color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Plan"
                component={TripPlannerScreen}
                options={{
                    tabBarLabel: 'Plan Trip',
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <UserCircle color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
