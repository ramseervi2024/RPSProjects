import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import SafariDetailScreen from '../screens/SafariDetailScreen';
import HotelDetailScreen from '../screens/HotelDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
            <Stack.Screen name="SafariDetail" component={SafariDetailScreen} />
            <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
