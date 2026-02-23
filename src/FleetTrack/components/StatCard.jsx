import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.surface, COLORS.surfaceLight]}
                style={styles.gradient}
            >
                <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
                    <Icon color={color} size={22} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.value}>{value}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 6,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ffffff08',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    gradient: {
        padding: 16,
        height: 110,
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: 8,
    },
    title: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 4,
    },
    value: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
});

export default StatCard;
