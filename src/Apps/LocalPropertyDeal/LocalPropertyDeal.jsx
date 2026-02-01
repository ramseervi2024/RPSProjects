import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';

const LocalPropertyDeal = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StackNavigator />
        </SafeAreaView>
    );
};

export default LocalPropertyDeal;
