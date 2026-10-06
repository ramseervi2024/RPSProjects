import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Home, TrendingUp, LayoutGrid, ShoppingBag, User } from 'lucide-react-native';
import { COLORS } from '../theme/theme';
import { fontFamilies, fontSizes } from '../constants/fonts';

import HomeScreen from '../screens/HomeScreen';
import SIPScreen from '../screens/SIPScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Dashboard', label: 'Home', Icon: Home },
  { name: 'SIP', label: 'SIP', Icon: TrendingUp },
  { name: 'Categories', label: 'Categories', Icon: LayoutGrid },
  { name: 'Services', label: 'All Services', Icon: ShoppingBag, hasBadge: true },
  { name: 'Profile', label: 'Profile', Icon: User },
];

function CustomBottomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const isIos = Platform.OS === 'ios';
  const bottomInset = isIos ? Math.max(insets.bottom, 12) : Math.max(insets.bottom, 10);
  const cartItems = useSelector((s) => s.cart?.items) || [];
  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);

  const barContainerStyle = useMemo(
    () => [
      styles.bottomBarWrapper,
      {
        paddingBottom: bottomInset,
        height: 60 + bottomInset,
      },
    ],
    [bottomInset]
  );

  return (
    <View style={barContainerStyle}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabMeta = TABS.find((t) => t.name === route.name) || {};

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = tabMeta.Icon || Home;
        const iconColor = isFocused ? COLORS.primary : '#64748B';
        // State B badge support: show 8 if active (per spec State B) or live cart count
        const showBadge = tabMeta.hasBadge && (isFocused || cartCount > 0);
        const badgeValue = cartCount > 0 ? cartCount : 8;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabNode}
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={tabMeta.label}
          >
            {/* Active Pill indicator behind icon per official spec */}
            <View style={[styles.iconPill, isFocused && styles.iconPillActive]}>
              <IconComponent color={iconColor} size={21} strokeWidth={isFocused ? 2.2 : 1.8} />

              {/* Service badge (State B) */}
              {showBadge && (
                <View style={styles.nodeBadge}>
                  <Text style={styles.nodeBadgeText}>{badgeValue}</Text>
                </View>
              )}

              {/* Plans notification dot (State A - Home active) */}
              {tabMeta.hasDot && state.index === 0 && (
                <View style={styles.nodeDot} />
              )}
            </View>

            <Text
              style={[
                styles.tabLabel,
                isFocused ? styles.activeLabel : styles.inactiveLabel,
              ]}
            >
              {tabMeta.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const renderCustomTabBar = (props) => <CustomBottomTabBar {...props} />;

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={renderCustomTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="SIP" component={SIPScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBarWrapper: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'visible',
    position: 'relative',
  },
  tabNode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 3,
  },
  iconPill: {
    width: 44,
    height: 32,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  iconPillActive: {
    backgroundColor: '#E6F4F1',
  },
  tabLabel: {
    fontSize: fontSizes.size10,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  activeLabel: {
    fontFamily: fontFamilies.bold,
    color: '#0F766E',
  },
  inactiveLabel: {
    fontFamily: fontFamilies.medium,
    color: '#64748B',
  },
  centerTabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  centerDockButtonWrap: {
    width: 56,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerDockButton: {
    position: 'absolute',
    top: -20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  centerDockButtonActive: {
    backgroundColor: '#0D9488',
    transform: [{ scale: 1.04 }],
  },
  centerLabel: {
    fontFamily: fontFamilies.extraBold,
    color: '#0F766E',
  },
  nodeBadge: {
    position: 'absolute',
    top: -2,
    right: 2,
    minWidth: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  nodeBadgeText: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
    fontSize: fontSizes.size9,
  },
  nodeDot: {
    position: 'absolute',
    top: 2,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});
