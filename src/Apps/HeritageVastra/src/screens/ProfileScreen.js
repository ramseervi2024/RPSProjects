import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { ShoppingBag, Heart, Settings, LogOut, ChevronRight } from 'lucide-react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="My Profile" showCart={false} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>Vikram Singh</Text>
                    <Text style={styles.email}>vikram.singh@example.com</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>05</Text>
                        <Text style={styles.statLabel}>Wishlist</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>02</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <ShoppingBag size={20} color="#C59D5F" />
                            <Text style={styles.menuText}>My Orders</Text>
                        </View>
                        <ChevronRight size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <Heart size={20} color="#C59D5F" />
                            <Text style={styles.menuText}>Wishlist</Text>
                        </View>
                        <ChevronRight size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <Settings size={20} color="#C59D5F" />
                            <Text style={styles.menuText}>Settings</Text>
                        </View>
                        <ChevronRight size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
                        <View style={styles.menuLeft}>
                            <LogOut size={20} color="#EF4444" />
                            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
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
        backgroundColor: '#0F172A',
    },
    scrollContent: {
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#C59D5F',
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E5E7EB',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#111827',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#C59D5F',
    },
    statLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4,
    },
    verticalLine: {
        width: 1,
        backgroundColor: '#1F2937',
    },
    menuContainer: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1F2937',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuText: {
        fontSize: 16,
        color: '#E5E7EB',
        fontWeight: '500',
    },
    logoutButton: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#EF4444',
    },
});

export default ProfileScreen;
