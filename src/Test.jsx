import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function MemoryLeakExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(prev => prev + 1);
    }, 1);

    // No cleanup
  }, []);
  const leakedData = [];

useEffect(() => {
  const timer = setInterval(() => {
    leakedData.push(
      new Array(100000).fill('memory leak')
    );
  }, 100);

  // no cleanup
}, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text>{count}</Text>
    </View>
  );
}