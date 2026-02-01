import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';

const Header = ({ title, showNotification = true }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showNotification && (
                <TouchableOpacity style={styles.iconButton}>
                    <Bell color="#FFD700" size={24} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#0F172A',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F3F4F6',
    },
    iconButton: {
        padding: 8,
        backgroundColor: '#1F2937',
        borderRadius: 12,
    },
});

export default Header;
