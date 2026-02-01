import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Shirt, Heart, User, ShoppingCart, UserCircle } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import TraditionalWearScreen from '../screens/TraditionalWearScreen';
import WeddingCollectionScreen from '../screens/WeddingCollectionScreen';
import ArtisansScreen from '../screens/ArtisansScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0F172A',
                    borderTopColor: '#1F2937',
                    paddingBottom: 5,
                    height: 60,
                },
                tabBarActiveTintColor: '#C59D5F',
                tabBarInactiveTintColor: '#6B7280',
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
                name="Traditional"
                component={TraditionalWearScreen}
                options={{
                    tabBarLabel: 'Wear',
                    tabBarIcon: ({ color, size }) => <Shirt color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Wedding"
                component={WeddingCollectionScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Artisans"
                component={ArtisansScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
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
