import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Wrench, Calendar, ClipboardList, MapPin, Headphones } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import BookNowScreen from '../screens/BookNowScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import LiveTrackingScreen from '../screens/LiveTrackingScreen';
import SupportScreen from '../screens/SupportScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#0284c7', // Blue accent
                tabBarInactiveTintColor: '#94a3b8',
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
                name="Services"
                component={ServicesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Wrench color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="BookNow"
                component={BookNowScreen}
                options={{
                    tabBarLabel: 'Book Now',
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="MyOrders"
                component={MyOrdersScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Tracking"
                component={LiveTrackingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Support"
                component={SupportScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Headphones color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
