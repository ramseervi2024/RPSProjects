import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AllAppNavigations from './src/NavigationStacks/AllAppNavigations'
import PokeSwipe from './src/PokeSwipe/PokeSwipe'
import GayakKalakars from './src/GayakKalakars/GayakKalakars'

export default function App() {
  return (
    // <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <NavigationContainer>
        <GayakKalakars />
      </NavigationContainer>
    // </SafeAreaView>
  )
}