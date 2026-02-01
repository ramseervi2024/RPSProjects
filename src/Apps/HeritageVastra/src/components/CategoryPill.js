import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryPill = ({ title, isActive, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, isActive && styles.activeContainer]}
            onPress={onPress}
        >
            <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#C59D5F', // Gold border
        marginRight: 8,
    },
    activeContainer: {
        backgroundColor: '#C59D5F',
    },
    text: {
        fontSize: 14,
        color: '#C59D5F',
        fontWeight: '600',
    },
    activeText: {
        color: '#0F172A', // Dark text on gold background
    },
});

export default CategoryPill;
