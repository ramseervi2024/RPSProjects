import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BusinessList from './BusinessShowcase/BusinessList';
import BusinessDetails from './BusinessShowcase/BusinessDetails';
import Wishlist from './BusinessShowcase/Wishlist';

const Stack = createStackNavigator();

export default function BazaarHubNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="BusinessList"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F9FAFB' }
      }}
    >
      <Stack.Screen name="BusinessList" component={BusinessList} />
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
    </Stack.Navigator>
  );
}
