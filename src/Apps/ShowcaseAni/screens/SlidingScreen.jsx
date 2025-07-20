import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { X, Menu, Home, User, Settings, Bell } from 'lucide-react-native';


const menuItems = [
  { id: 1, title: 'Home', icon: Home },
  { id: 2, title: 'Profile', icon: User },
  { id: 3, title: 'Settings', icon: Settings },
  { id: 4, title: 'Notifications', icon: Bell },
];

export default function DrawerSlideAnimation({ onClose }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerProgress = useSharedValue(0);

  const toggleDrawer = () => {
    const newValue = isDrawerOpen ? 0 : 1;
    drawerProgress.value = withSpring(newValue, { damping: 15, stiffness: 150 });
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClose = () => {
    drawerProgress.value = withSpring(0, { damping: 15, stiffness: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: drawerProgress.value * 0.5,
    pointerEvents: drawerProgress.value > 0 ? 'auto' : 'none',
  }));

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(drawerProgress.value, [0, 1], [-280, 0]) }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(drawerProgress.value, [0, 1], [0, 280 * 0.3]) }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.mainContent, contentStyle]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Menu size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.title}>Drawer Slide Animation</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Tap the menu button to slide in the drawer panel.
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.overlay, overlayStyle]}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={toggleDrawer} />
      </Animated.View>

      <Animated.View style={[styles.drawer, drawerStyle]}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Menu</Text>
        </View>
        
        <View style={styles.drawerContent}>
          {menuItems.map((item, index) => (
            <DrawerItem key={item.id} item={item} index={index} />
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

function DrawerItem({ item, index }) {
  const IconComponent = item.icon;
  
  return (
    <TouchableOpacity style={styles.drawerItem}>
      <IconComponent size={20} color="#6B7280" />
      <Text style={styles.drawerItemText}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  drawerHeader: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 16,
  },
});