import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BarChart, CloudRain, Leaf, GraduationCap, UserCircle } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import CropPricesScreen from '../screens/CropPricesScreen';
import WeatherScreen from '../screens/WeatherScreen';
import SeedsMarketScreen from '../screens/SeedsMarketScreen';
import ExpertAdviceScreen from '../screens/ExpertAdviceScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#111827',
                    borderTopColor: '#374151',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#16A34A',
                tabBarInactiveTintColor: '#9CA3AF',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Prices"
                component={CropPricesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <BarChart color={color} size={size} />,
                    tabBarLabel: 'Prices',
                }}
            />
            <Tab.Screen
                name="Weather"
                component={WeatherScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <CloudRain color={color} size={size} />,
                    tabBarLabel: 'Weather',
                }}
            />
            <Tab.Screen
                name="Seeds"
                component={SeedsMarketScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Leaf color={color} size={size} />,
                    tabBarLabel: 'Seeds',
                }}
            />
            <Tab.Screen
                name="Experts"
                component={ExpertAdviceScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <GraduationCap color={color} size={size} />,
                    tabBarLabel: 'Experts',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <UserCircle color={color} size={size} />,
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
