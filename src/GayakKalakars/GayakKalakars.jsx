import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  Home,
  Layers,
  Calendar as CalendarIcon,
  CheckSquare,
  User,
} from 'lucide-react-native';

// Theme & Data
import { COLORS } from './theme';

// Tabs
import HomeTab from './tabs/HomeTab';
import EventsTab from './tabs/EventsTab';
import CalendarTab from './tabs/CalendarTab';
import BookedTab from './tabs/BookedTab';
import ProfileTab from './tabs/ProfileTab';

// Details
import ArtistDetails from './details/ArtistDetails';
import EventDetails from './details/EventDetails';
import BookingDetails from './details/BookingDetails';
import AllArtists from './details/AllArtists';

export default function GayakKalakars() {
  const [activeTab, setActiveTab] = useState('Home');
  const [navigationStack, setNavigationStack] = useState([]); // { type: 'artist' | 'event' | 'booking', data: any }
  const [searchQuery, setSearchQuery] = useState('');

  const [bookedEvents, setBookedEvents] = useState([
    {
      id: 'b1',
      artist: 'Prakash Mali',
      event: 'Bhajan Sandhya',
      date: '15th March 2026',
      status: 'Confirmed',
      amountPaid: '₹50,000',
      venue: 'Ramesh Palace, Jodhpur'
    }
  ]);

  // Navigation Helpers
  const pushToStack = (type, data) => {
    setNavigationStack([...navigationStack, { type, data }]);
  };

  const popFromStack = () => {
    const newStack = [...navigationStack];
    newStack.pop();
    setNavigationStack(newStack);
  };

  const renderTabIcon = (name, Icon, label) => {
    const isActive = activeTab === name && navigationStack.length === 0;
    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => {
          setActiveTab(name);
          setNavigationStack([]); // Clear stack when switching tabs
        }}
      >
        <Icon size={24} color={isActive ? COLORS.accentRed : COLORS.textSecondary} />
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const currentScreen = navigationStack[navigationStack.length - 1];

  const renderContent = () => {
    if (currentScreen) {
      switch (currentScreen.type) {
        case 'artist':
          return <ArtistDetails artist={currentScreen.data} onBack={popFromStack} />;
        case 'event':
          return <EventDetails event={currentScreen.data} onBack={popFromStack} />;
        case 'booking':
          return <BookingDetails booking={currentScreen.data} onBack={popFromStack} />;
        case 'all_artists':
          return (
            <AllArtists
              onSelectArtist={(artist) => pushToStack('artist', artist)}
              onBack={popFromStack}
            />
          );
        default:
          return null;
      }
    }

    switch (activeTab) {
      case 'Home':
        return (
          <HomeTab
            onSelectArtist={(artist) => pushToStack('artist', artist)}
            onSelectEvent={(event) => pushToStack('event', event)}
            onViewAllEvents={() => setActiveTab('Events')}
            onViewAllArtists={() => pushToStack('all_artists')}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'Events':
        return (
          <EventsTab onSelectEvent={(event) => pushToStack('event', event)} />
        );
      case 'Calendar':
        return <CalendarTab />;
      case 'Booked':
        return (
          <BookedTab
            bookedEvents={bookedEvents}
            onSelectBooking={(booking) => pushToStack('booking', booking)}
          />
        );
      case 'Profile':
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Persistent Bottom Tabs - Hidden when viewing details */}
      {navigationStack.length === 0 && (
        <View style={styles.tabBar}>
          {renderTabIcon('Home', Home, 'Home')}
          {renderTabIcon('Events', Layers, 'Events')}
          {renderTabIcon('Calendar', CalendarIcon, 'Calendar')}
          {renderTabIcon('Booked', CheckSquare, 'Booked')}
          {renderTabIcon('Profile', User, 'Profile')}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  activeTabLabel: {
    color: COLORS.accentRed,
    fontWeight: 'bold',
  },
});