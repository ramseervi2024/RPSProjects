import { View, Text } from 'react-native'
import React from 'react'
import AllApps from './src/AllApps'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AllAppNavigations from './src/NavigationStacks/AllAppNavigations'

export default function App() {
  return (
    // <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <NavigationContainer>
        <AllAppNavigations />
      </NavigationContainer>
    // </SafeAreaView>
  )
}