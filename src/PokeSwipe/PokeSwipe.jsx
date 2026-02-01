import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import SwipeScreen from './screens/SwipeScreen';
import LikedScreen from './screens/LikedScreen';
import { Heart, Sun, Moon, ArrowLeft } from 'lucide-react-native';
import { light, dark } from './theme/colors';

export default function PokeSwipe() {
  const [screen, setScreen] = useState('welcome'); // welcome | swipe | liked
  const [liked, setLiked] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? dark : light;

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop:60 }}>
      {/* HEADER */}
      {screen !== 'welcome' && (
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            backgroundColor: theme.bg,
          }}
        >
          {/* BACK BUTTON */}
          {screen === 'liked' ? (
            <TouchableOpacity onPress={() => setScreen('swipe')}>
              <ArrowLeft size={26} color={theme.text} />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {/* ACTIONS */}
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {/* LIKED LIST */}
            <TouchableOpacity onPress={() => setScreen('liked')}>
              <Heart size={26} color={theme.like} />
            </TouchableOpacity>

            {/* DARK MODE */}
            <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <Sun size={26} color={theme.text} />
              ) : (
                <Moon size={26} color={theme.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SCREENS */}
      {screen === 'welcome' && (
        <WelcomeScreen
          theme={theme}
          onStart={() => setScreen('swipe')}
        />
      )}

      {screen === 'swipe' && (
        <SwipeScreen
          theme={theme}
          onLiked={(pokemon) =>
            setLiked(prev => [...prev, pokemon])
          }
        />
      )}

      {screen === 'liked' && (
        <LikedScreen theme={theme} liked={liked} />
      )}
    </View>
  );
}
