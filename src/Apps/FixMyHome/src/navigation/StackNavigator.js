import React from 'react';
import BottomTabs from './BottomTabs';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import BookNowScreen from '../screens/BookNowScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MyOrdersScreen from '../screens/MyOrdersScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
            {/* BookNow is also in tabs, but we might want to push it from detail screen too */}
            <Stack.Screen name="BookNowStack" component={BookNowScreen} />
            <Stack.Screen name="BookNow" component={BookNowScreen} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
            </Stack.Navigator>
    );
};

export default StackNavigator;
