import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import PriceCard from '../components/PriceCard';
import { mandiPrices } from '../data/mandiPrices';

const CropPricesScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Market Prices" />
            <ScrollView style={styles.content}>
                <Text style={styles.subtitle}>Daily Mandi Rates - Pali District</Text>
                {mandiPrices.map((item) => (
                    <PriceCard key={item.id} {...item} />
                ))}
                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    content: {
        padding: 16,
    },
    subtitle: {
        color: '#9CA3AF',
        marginBottom: 16,
        fontSize: 14
    }
});

export default CropPricesScreen;
