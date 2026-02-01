import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';

const Header = ({ title, showMenu = true }) => {
    return (
        <View style={styles.container}>
            {showMenu ? (
                <TouchableOpacity>
                    <Menu color="#333" size={24} />
                </TouchableOpacity>
            ) : (
                <View style={{ width: 24 }} />
            )}

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity>
                <Bell color="#333" size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D4AF37', // Gold/Amber
        letterSpacing: 1,
    },
});

export default Header;
