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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#111827',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#374151',
    },
    activeContainer: {
        backgroundColor: '#FFD700',
        borderColor: '#FFD700',
    },
    text: {
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: '600',
    },
    activeText: {
        color: '#0F172A',
        fontWeight: 'bold',
    },
});

export default CategoryPill;
