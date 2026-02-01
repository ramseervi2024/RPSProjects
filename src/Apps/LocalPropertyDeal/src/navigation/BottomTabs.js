import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Building, Key, PlusCircle, List, MessageCircle } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import BuyScreen from '../screens/BuyScreen';
import RentScreen from '../screens/RentScreen';
import SellScreen from '../screens/SellScreen';
import MyListingsScreen from '../screens/MyListingsScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
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
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Buy"
                component={BuyScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Building color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Rent"
                component={RentScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Key color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Sell"
                component={SellScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="My Listings"
                component={MyListingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <List color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
