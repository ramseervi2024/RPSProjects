import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShoppingCart, Chrome as Home, Grid2x2 as Grid, User } from 'lucide-react-native';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import MapAnimation from './screens/MapAnimation';
import WavesAnimation from './screens/WavesAnimation';
import ParticlesAnimation from './screens/ParticlesAnimation';
import MorphingAnimation from './screens/MorphingAnimation';
import LiquidAnimation from './screens/LiquidAnimation';
import GalaxyAnimation from './screens/GalaxyAnimation';

const Tab = createBottomTabNavigator();

export default function OrderStatusNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF9900',
        tabBarInactiveTintColor: '#111111',
        headerShown:false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Grid size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="MapAnimation"
        component={MapAnimation}
        options={{
          title: 'MapAnimation',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="WavesAnimation"
        component={WavesAnimation}
        options={{
          title: 'WavesAnimation',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ParticlesAnimation"
        component={ParticlesAnimation}
        options={{
          title: 'ParticlesAnimation',
          tabBarIcon: ({ color, size }) => (
            <Grid size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MorphingAnimation"
        component={MorphingAnimation}
        options={{
          title: 'MorphingAnimation',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LiquidAnimation"
        component={LiquidAnimation}
        options={{
          title: 'LiquidAnimation',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="GalaxyAnimation"
        component={GalaxyAnimation}
        options={{
          title: 'GalaxyAnimation',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
