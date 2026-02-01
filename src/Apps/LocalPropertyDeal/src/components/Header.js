import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, MapPin } from 'lucide-react-native';

const Header = ({ title = 'LocalPropertyDeal', location = 'Pali, Rajasthan', showLocation = true }) => {
    return (
        <View style={styles.container}>
            <View>
                {showLocation && (
                    <View style={styles.locationRow}>
                        <MapPin size={14} color="#666" />
                        <Text style={styles.locationText}>{location}</Text>
                    </View>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>

            <TouchableOpacity style={styles.iconButton}>
                <Bell size={24} color="#333" />
                <View style={styles.badge} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20, // Adjust for status bar if needed
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        fontWeight: '500',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    iconButton: {
        padding: 8,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF3B30',
    },
});

export default Header;
