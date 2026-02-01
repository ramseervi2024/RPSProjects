import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, ShoppingCart } from 'lucide-react-native';

const Header = ({ title, showMenu = true, showCart = true, onMenuPress, onCartPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {showMenu && (
                    <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
                        <Menu color="#C59D5F" size={24} />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.rightContainer}>
                {showCart && (
                    <TouchableOpacity onPress={onCartPress} style={styles.iconButton}>
                        <ShoppingCart color="#C59D5F" size={24} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#0F172A',
        borderBottomWidth: 1,
        borderBottomColor: '#1F2937',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#C59D5F',
        marginLeft: 12,
        fontFamily: 'serif', // Trying to get a more "Royal" feel with serif if available
    },
    iconButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#111827',
    },
});

export default Header;
