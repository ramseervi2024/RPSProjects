import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const DreamShotsStudioNavigation = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <StackNavigator />
        </SafeAreaView>
    );
};

export default DreamShotsStudioNavigation;
