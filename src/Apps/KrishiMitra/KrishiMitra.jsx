import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KrishiMitra() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <StackNavigator />
        </SafeAreaView>
    );
}
