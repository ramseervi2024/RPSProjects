import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const DreamShotsStudioNavigation = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <StackNavigator />
        </SafeAreaView>
    );
};

export default DreamShotsStudioNavigation;
