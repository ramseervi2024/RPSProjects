import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AllAppNavigations from './src/NavigationStacks/AllAppNavigations'
import { PortfolioDirectory } from './src/PersonalPortfolio/PersonalPortfolio'
import PokeSwipe from './src/PokeSwipe/PokeSwipe'
import GayakKalakars from './src/GayakKalakars/GayakKalakars'
import DynamicPoster from './src/Apps/DynamicPoster/DynamicPoster'
import Test from './src/Test'

export default function App() {
  return (
    // <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
    <NavigationContainer>
      {/* <GayakKalakars /> */}
      <DynamicPoster />
      {/* <Test /> */}
    </NavigationContainer>
    // </SafeAreaView>
  )
}