import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { UserCircle, Settings, LogOut, ChevronRight } from 'lucide-react-native';
import SafariCard from '../components/SafariCard';
import { safaris } from '../data/safaris';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="My Profile" />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587' }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>Rahul Sharma</Text>
                    <Text style={styles.userEmail}>rahul.sharma@example.com</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Trips</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>4</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>1.5k</Text>
                        <Text style={styles.statLabel}>Points</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Previous Bookings</Text>
                <View>
                    {safaris.slice(0, 2).map(item => (
                        <View key={item.id} style={styles.bookingCard}>
                            <Image source={{ uri: item.imageUrl }} style={styles.bookingImage} />
                            <View style={styles.bookingInfo}>
                                <Text style={styles.bookingTitle}>{item.name}</Text>
                                <Text style={styles.bookingDate}>12 Jan 2024 • Paid</Text>
                                <TouchableOpacity>
                                    <Text style={styles.viewTicket}>View Ticket</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={styles.settingsList}>
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <UserCircle color="#666" size={20} />
                            <Text style={styles.settingText}>Edit Profile</Text>
                        </View>
                        <ChevronRight color="#ccc" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Settings color="#666" size={20} />
                            <Text style={styles.settingText}>Preferences</Text>
                        </View>
                        <ChevronRight color="#ccc" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <LogOut color="#FF5252" size={20} />
                            <Text style={[styles.settingText, { color: '#FF5252' }]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#DAA520',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#888',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 20,
        marginBottom: 12,
    },
    bookingCard: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        padding: 10,
    },
    bookingImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    bookingInfo: {
        marginLeft: 12,
        justifyContent: 'center',
    },
    bookingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    bookingDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    viewTicket: {
        fontSize: 14,
        color: '#DAA520',
        fontWeight: 'bold',
    },
    settingsList: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
});

export default ProfileScreen;
