/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppStatusBar({
  backgroundColor = '#FFFFFF',
  barStyle = 'dark-content',
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={barStyle}
        translucent
      />
      {insets.top > 0 && (
        <View style={{ height: insets.top, backgroundColor, width: '100%' }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
