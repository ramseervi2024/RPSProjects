import { View, Text } from 'react-native'
import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import RoboticsMachineryandIoTNavigation from './RoboticsMachineryandIoTNavigation'

export default function RobotsMain() {
  return (
    <ThemeProvider>
        <RoboticsMachineryandIoTNavigation/>
    </ThemeProvider>
  )
}