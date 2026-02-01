import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryPill = ({ label, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#F2F2F7',
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedContainer: {
        backgroundColor: '#007AFF', // Blue accent
        borderColor: '#0066CC',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    selectedLabel: {
        color: '#fff',
    },
});

export default CategoryPill;
