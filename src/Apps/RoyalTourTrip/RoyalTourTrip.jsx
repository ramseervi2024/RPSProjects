import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';

const RoyalTourTrip = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <StackNavigator />
        </SafeAreaView>
    );
};

export default RoyalTourTrip;
