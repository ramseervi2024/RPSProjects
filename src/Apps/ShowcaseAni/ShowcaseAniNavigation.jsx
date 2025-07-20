import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import APIsScreen from './screens/APIsScreen';
import RoadmapsScreen from './screens/RoadmapsScreen';
import CoursesScreen from './screens/CoursesScreen';
import SlidingScreen from './screens/SlidingScreen';
import ElasticScreen from './screens/ElasticScreen';
import Rotating3DElement from './screens/Rotating3DElement';
import OrbitingElement from './screens/OrbitingElement';
import FlameParticle from './screens/FlameParticle';
import GeometricShape from './screens/GeometricShape';

import {
  Chrome as Home,
  Play,
  Sparkles,
  Layers,
  Waves,
  Zap,
  RotateCw,
  Orbit,
  Flame,
  Hexagon,
} from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function ShowcaseAniNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#16213e',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarShowLabel:false

      }}
    >
      <Tab.Screen
        name="AI Fields"
        component={HomeScreen}
        options={{
          title: 'Fade Scale',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Sliding"
        component={SlidingScreen}
        options={{
          title: 'Sliding',
          tabBarIcon: ({ color, size }) => <Play size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Particles"
        component={APIsScreen}
        options={{
          title: 'Particles',
          tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Morphing"
        component={RoadmapsScreen}
        options={{
          title: 'Morphing',
          tabBarIcon: ({ color, size }) => <Layers size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Liquid"
        component={CoursesScreen}
        options={{
          title: 'Liquid',
          tabBarIcon: ({ color, size }) => <Waves size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Elastic"
        component={ElasticScreen}
        options={{
          title: 'Elastic',
          tabBarIcon: ({ color, size }) => <Zap size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="3D Rotate"
        component={Rotating3DElement}
        options={{
          title: '3D Rotate',
          tabBarIcon: ({ color, size }) => <RotateCw size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Orbital"
        component={OrbitingElement}
        options={{
          title: 'Orbital',
          tabBarIcon: ({ color, size }) => <Orbit size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Fire"
        component={FlameParticle}
        options={{
          title: 'Fire',
          tabBarIcon: ({ color, size }) => <Flame size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Geometric"
        component={GeometricShape}
        options={{
          title: 'Geometric',
          tabBarIcon: ({ color, size }) => <Hexagon size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
