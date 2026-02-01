import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Camera, Image as ImageIcon, Calendar, List, MessageCircle } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import PhotographersScreen from '../screens/PhotographersScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ChatScreen from '../screens/ChatScreen';
import { PortfolioScreen, BookingLandingScreen } from '../screens/TabPlaceholders';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0F172A',
                    borderTopColor: '#1F2937',
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#FFD700',
                tabBarInactiveTintColor: '#9CA3AF',
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
                    tabBarIcon: ({ color }) => <Home color={color} size={24} />
                }}
            />
            <Tab.Screen
                name="Photographers"
                component={PhotographersScreen}
                options={{
                    tabBarIcon: ({ color }) => <Camera color={color} size={24} />
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={PortfolioScreen}
                options={{
                    tabBarIcon: ({ color }) => <ImageIcon color={color} size={24} />
                }}
            />
            <Tab.Screen
                name="BookTab"
                component={BookingLandingScreen}
                options={{
                    title: 'Book Now',
                    tabBarIcon: ({ color }) => <Calendar color={color} size={24} />
                }}
            />
            <Tab.Screen
                name="My Bookings"
                component={MyBookingsScreen}
                options={{
                    tabBarIcon: ({ color }) => <List color={color} size={24} />
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color }) => <MessageCircle color={color} size={24} />
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
