import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamilies, fontSizes } from '../constants/fonts';

const TABS = [
  { id: 'sip', label: 'SIP', screen: 'SIPPortfolios', bottomTab: 'SIP' },
  { id: 'categories', label: 'Categories', screen: 'Categories', bottomTab: 'Categories' },
  { id: 'services', label: 'All Services', screen: 'Services', bottomTab: 'Services' },
];

export default function DirectoryTopTabs({ activeTab = 'sip' }) {
  const navigation = useNavigation();

  const handlePress = (tab) => {
    if (tab.id === activeTab) return;
    try {
      // First try bottom tab navigation name
      navigation.navigate(tab.bottomTab || tab.screen);
    } catch {
      navigation.navigate(tab.screen);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.segmentWrap}>
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => handlePress(tab)}
              activeOpacity={0.8}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  tabButtonActive: {
    backgroundColor: '#0F766E',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontFamily: fontFamilies.interMedium,
    fontSize: fontSizes.bodySmall, // ~13px
    color: '#64748B',
    fontWeight: '600',
  },
  tabTextActive: {
    fontFamily: fontFamilies.interSemiBold,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
