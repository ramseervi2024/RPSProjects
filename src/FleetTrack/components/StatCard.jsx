import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.surface, '#1e293b']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
                        <Icon color={color} size={20} strokeWidth={2.5} />
                    </View>
                    <View style={[styles.glow, { backgroundColor: color }]} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={[styles.accent, { backgroundColor: color }]} />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: 120,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ffffff08',
        marginBottom: 12,
    },
    gradient: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    glow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 60,
        height: 60,
        borderRadius: 30,
        opacity: 0.1,
    },
    content: {
        marginTop: 8,
    },
    value: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -1,
    },
    title: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    accent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        opacity: 0.5,
    },
});

export default StatCard;
