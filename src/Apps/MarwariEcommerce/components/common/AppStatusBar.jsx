/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'react-native';

export default function AppStatusBar({
  backgroundColor = 'transparent',
  barStyle = 'dark-content',
}) {
  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      translucent
    />
  );
}
