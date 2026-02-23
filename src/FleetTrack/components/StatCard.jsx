import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const StatCard = ({ title, value, icon: Icon, color, trend, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <LinearGradient
                colors={[COLORS.surface, '#1e293b']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
                        <Icon color={color} size={20} strokeWidth={2.5} />
                    </View>
                    {trend && (
                        <View style={styles.trendRow}>
                            <Text style={[styles.trendText, { color: trend.startsWith('+') ? COLORS.success : COLORS.danger }]}>
                                {trend}
                            </Text>
                        </View>
                    )}
                    <View style={[styles.glow, { backgroundColor: color }]} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={[styles.accent, { backgroundColor: color }]} />
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: 105, // Slightly reduced height for better density
        borderRadius: 20, // More subtle radius
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ffffff08',
        marginBottom: 8, // Reduced margin
    },
    gradient: {
        flex: 1,
        padding: 14, // Unified internal padding
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    glow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 50,
        height: 50,
        borderRadius: 25,
        opacity: 0.08,
    },
    content: {
        marginTop: 4,
    },
    value: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    title: {
        color: COLORS.textSecondary,
        fontSize: 10,
        fontWeight: '700',
        marginTop: 1,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    accent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        opacity: 0.4,
    },
    trendRow: {
        backgroundColor: '#ffffff08',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    trendText: {
        fontSize: 10,
        fontWeight: '800',
    },
});

export default StatCard;
