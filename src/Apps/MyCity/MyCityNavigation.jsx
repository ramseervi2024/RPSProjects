import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyCityBottomNavigation from './MyCityBottomNavigation';
import CityOverviewScreen from './screens/CityOverviewScreen';
import LocalAttractionsScreen from './screens/LocalAttractionsScreen';
import EmergencyServicesScreen from './screens/EmergencyServicesScreen';
import WeatherScreen from './screens/WeatherScreen';
import NewsEventsScreen from './screens/NewsEventsScreen';
import TransportScreen from './screens/TransportScreen';
import BusinessDirectoryScreen from './screens/BusinessDirectoryScreen';
export default function MyCityNavigation() {

  const MyCityApp = createStackNavigator();
  return (
    <MyCityApp.Navigator initialRouteName="MyCityBottomNavigation">
      <MyCityApp.Screen name="MyCityBottomNavigation" component={MyCityBottomNavigation} options={{ headerShown: false }} />
      <MyCityApp.Screen name="CityOverview" component={CityOverviewScreen} options={{ headerShown: false }} />
      <MyCityApp.Screen name="LocalAttractions" component={LocalAttractionsScreen} options={{ headerShown: false }} />
      <MyCityApp.Screen name="EmergencyServices" component={EmergencyServicesScreen} options={{ headerShown: false }} />
      <MyCityApp.Screen name="WeatherScreen" component={WeatherScreen} options={{ headerShown: false }} />
      <MyCityApp.Screen name="NewsEventsScreen" component={NewsEventsScreen} options={{ headerShown: false }} />
      <MyCityApp.Screen name="TransportScreen" component={TransportScreen} options={{ headerShown: false }} />
      {/* <MyCityApp.Screen name="TransportScreen" component={TransportScreen} options={{ headerShown: false }} /> */}
      <MyCityApp.Screen name="BusinessDirectoryScreen" component={BusinessDirectoryScreen} options={{ headerShown: false }} />
    </MyCityApp.Navigator>
  )
}