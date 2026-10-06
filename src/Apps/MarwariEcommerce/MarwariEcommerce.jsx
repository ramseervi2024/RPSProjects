import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import ToastContainer from './components/common/Toast';
import { Provider } from 'react-redux';
import store from './redux/store';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();

function MarwariEcommerce() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider >
                <Provider store={store}>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                    <ToastContainer />
                </Provider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

export default MarwariEcommerce;
