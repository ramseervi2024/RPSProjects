import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import RajasthanClothsNavigation from './RajasthanClothsNavigation';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import AllProductList from './screens/AllProductList';
import DeliveryDetailsScreen from './screens/DeliveryDetailsScreen';
export default function RajasthanClothsMainNavigation() {

  const MyCityApp = createStackNavigator();
  return (
    <MyCityApp.Navigator initialRouteName="RajasthanClothsNavigation">
      <MyCityApp.Screen name="RajasthanClothsNavigation" component={RajasthanClothsNavigation} options={{ headerShown: false }} />
      <MyCityApp.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ headerShown: false }} />
      <MyCityApp.Screen name="AllProductList" component={AllProductList} options={{ headerShown: false }} />
      <MyCityApp.Screen name="DeliveryDetailsScreen" component={DeliveryDetailsScreen} options={{ headerShown: false }} />
      </MyCityApp.Navigator>
  )
}