import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

const PriceCard = ({ cropName, todayPrice, yesterdayPrice, market }) => {
    const isUp = todayPrice >= yesterdayPrice;
    const difference = Math.abs(todayPrice - yesterdayPrice);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.cropName}>{cropName}</Text>
                <Text style={styles.market}>{market}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{todayPrice}/Q</Text>
                <View style={[styles.trendBadge, isUp ? styles.trendUp : styles.trendDown]}>
                    {isUp ? <TrendingUp size={14} color="#16A34A" /> : <TrendingDown size={14} color="#EF4444" />}
                    <Text style={[styles.trendText, isUp ? styles.textUp : styles.textDown]}>
                        ₹{difference}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    cropName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    market: {
        color: '#9CA3AF',
        fontSize: 14,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        color: '#16A34A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    trendUp: {
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
    },
    trendDown: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    trendText: {
        marginLeft: 4,
        fontWeight: '600',
        fontSize: 14,
    },
    textUp: {
        color: '#16A34A',
    },
    textDown: {
        color: '#EF4444',
    },
});

export default PriceCard;
