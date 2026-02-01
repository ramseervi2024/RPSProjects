import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import WeatherCard from '../components/WeatherCard';
import { weatherData } from '../data/weather';
import { Sun, Cloud, CloudRain } from 'lucide-react-native';

const WeatherScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Weather Forecast" />
            <ScrollView style={styles.content}>
                <WeatherCard data={weatherData} />

                <Text style={styles.sectionTitle}>5-Day Forecast</Text>
                <View style={styles.forecastList}>
                    {weatherData.forecast.map((item, index) => (
                        <View key={index} style={styles.forecastItem}>
                            <Text style={styles.day}>{item.day}</Text>
                            <View style={styles.icon}>
                                {item.icon === 'sun' ? <Sun size={24} color="#FACC15" /> :
                                    item.icon === 'cloud' ? <Cloud size={24} color="#9CA3AF" /> :
                                        <CloudRain size={24} color="#3B82F6" />}
                            </View>
                            <Text style={styles.temp}>{item.temp}°C</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.alertBox}>
                    <Text style={styles.alertTitle}>Weather Alert</Text>
                    <Text style={styles.alertDesc}>Light rain expected on Wednesday. Secure harvested crops.</Text>
                </View>
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
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    forecastList: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    forecastItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#374151',
    },
    day: {
        color: '#FFFFFF',
        fontSize: 16,
        width: 60,
    },
    icon: {
        alignItems: 'center',
        width: 40
    },
    temp: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        width: 50,
        textAlign: 'right'
    },
    alertBox: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: '#EF4444',
        padding: 16,
        borderRadius: 12
    },
    alertTitle: {
        color: '#EF4444',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4
    },
    alertDesc: {
        color: '#FECACA',
        fontSize: 14
    }
});

export default WeatherScreen;
