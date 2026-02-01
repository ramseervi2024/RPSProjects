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
        backgroundColor: '#FFFFFF',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
    activeContainer: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    text: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '600',
    },
    activeText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default CategoryPill;
