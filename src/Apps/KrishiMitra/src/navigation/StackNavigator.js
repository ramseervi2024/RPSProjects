import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import SeedDetailScreen from '../screens/SeedDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            <Stack.Screen name="SeedDetail" component={SeedDetailScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
