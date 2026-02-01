import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import PhotographerDetailsScreen from '../screens/PhotographerDetailsScreen';
import BookNowScreen from '../screens/BookNowScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="PhotographerDetails" component={PhotographerDetailsScreen} />
            <Stack.Screen name="BookNow" component={BookNowScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
