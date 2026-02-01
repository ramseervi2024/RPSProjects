import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';

const Header = ({ title, showNotification = true }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showNotification && (
                <TouchableOpacity style={styles.iconButton}>
                    <Bell color="#000000" size={24} />
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
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    iconButton: {
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
    },
});

export default Header;
