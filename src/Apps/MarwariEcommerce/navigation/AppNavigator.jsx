import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Home, LayoutGrid, ShoppingBag, Package, User } from 'lucide-react-native';
import { COLORS } from '../theme/theme';
import { fontFamilies, fontSizes } from '../constants/fonts';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Dashboard', label: 'Home', Icon: Home },
  { name: 'Categories', label: 'Collections', Icon: LayoutGrid },
  { name: 'Cart', label: 'Royal Bag', Icon: ShoppingBag, hasBadge: true },
  { name: 'Orders', label: 'Orders', Icon: Package },
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
        const iconColor = isFocused ? '#831843' : '#64748B';
        const showBadge = tabMeta.hasBadge && cartCount > 0;

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
            {/* Active Pill indicator behind icon */}
            <View style={[styles.iconPill, isFocused && styles.iconPillActive]}>
              <IconComponent
                color={iconColor}
                size={21}
                strokeWidth={isFocused ? 2.4 : 1.8}
              />

              {/* Shopping Bag Badge */}
              {showBadge && (
                <View style={styles.nodeBadge}>
                  <Text style={styles.nodeBadgeText}>{cartCount}</Text>
                </View>
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
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
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
    backgroundColor: '#FDF2F8',
  },
  tabLabel: {
    fontSize: fontSizes.size10,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  activeLabel: {
    fontFamily: fontFamilies.bold,
    color: '#831843',
    fontWeight: '700',
  },
  inactiveLabel: {
    fontFamily: fontFamilies.medium,
    color: '#64748B',
  },
  nodeBadge: {
    position: 'absolute',
    top: -3,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#831843',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  nodeBadgeText: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
