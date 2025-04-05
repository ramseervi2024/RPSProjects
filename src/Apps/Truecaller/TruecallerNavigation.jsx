import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Phone, Users as Users2, Shield, Menu } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import BlockingScreen from './screens/BlockingScreen';
import ContactsScreen from './screens/ContactsScreen';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TruecallerNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0066FF',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: 'Recent',
          tabBarIcon: ({ color, size }) => <Phone size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="contacts"
        component={ContactsScreen}
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => <Users2 size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="blocking"
        component={BlockingScreen}
        options={{
          title: 'Blocking',
          tabBarIcon: ({ color, size }) => <Shield size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => <Menu size={size} color={color} />,
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
    height: 80,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
});