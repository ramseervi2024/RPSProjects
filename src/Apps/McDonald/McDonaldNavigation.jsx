import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Menu, MapPin, ShoppingBag, User } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { StyleSheet } from 'react-native';
import OrdersScreen from './screens/OrdersScreen';
import LocationsScreen from './screens/LocationsScreen';
import MenuScreen from './screens/MenuScreen';

const Tab = createBottomTabNavigator();

export default function McDonaldNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#DA291C',
      tabBarInactiveTintColor: '#666666',
      tabBarLabelStyle: styles.tabBarLabel,
    }}>
    <Tab.Screen
      name="index"
        component={HomeScreen}
        options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="menu"
        component={MenuScreen}
        options={{
        title: 'Menu',
        tabBarIcon: ({ color, size }) => <Menu size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="locations"
        component={LocationsScreen}
        options={{
        title: 'Locations',
        tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="orders"
        component={OrdersScreen}
        options={{
        title: 'Orders',
        tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
      }}
    />
    

    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 70,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});