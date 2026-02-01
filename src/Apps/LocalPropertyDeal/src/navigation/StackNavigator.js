import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import PropertyDetailScreen from '../screens/PropertyDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabs} />
            <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
