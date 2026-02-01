import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react-native';

const WeatherCard = ({ data }) => {
    const getIcon = (condition) => {
        switch (condition) {
            case 'Sunny': return <Sun size={48} color="#FACC15" />;
            case 'Cloudy': return <Cloud size={48} color="#9CA3AF" />;
            case 'Rainy': return <CloudRain size={48} color="#3B82F6" />;
            default: return <Sun size={48} color="#FACC15" />;
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.mainInfo}>
                <View>
                    <Text style={styles.city}>{data.city}</Text>
                    <Text style={styles.temp}>{data.temperature}°C</Text>
                    <Text style={styles.condition}>{data.condition}</Text>
                </View>
                {getIcon(data.condition)}
            </View>
            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Droplets size={16} color="#3B82F6" />
                    <Text style={styles.detailText}>{data.humidity}% Humidity</Text>
                </View>
                <View style={styles.detailItem}>
                    <Wind size={16} color="#9CA3AF" />
                    <Text style={styles.detailText}>{data.rainChance}% Rain Chance</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    mainInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    city: {
        color: '#9CA3AF',
        fontSize: 16,
        marginBottom: 4,
    },
    temp: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 'bold',
    },
    condition: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#374151',
        paddingTop: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        color: '#D1D5DB',
        marginLeft: 6,
    },
});

export default WeatherCard;
