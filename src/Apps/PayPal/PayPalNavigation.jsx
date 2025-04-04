import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chrome as Home, Send, Wallet, User } from 'lucide-react-native';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import { StyleSheet } from 'react-native';
import SendScreen from './screens/SendScreen';
import WalletScreen from './screens/WalletScreen';

const Tab = createBottomTabNavigator();

export default function PayPalNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0070BA',
        tabBarInactiveTintColor: '#6C7C8C',
        tabBarLabelStyle: styles.tabLabel,
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
        name="send"
        component={SendScreen}
        options={{
          title: 'Send',
          tabBarIcon: ({ color, size }) => <Send size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
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
    borderTopColor: '#E8E8E8',
    height: 80,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
});