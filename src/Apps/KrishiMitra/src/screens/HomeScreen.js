import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import WeatherCard from '../components/WeatherCard';
import PriceCard from '../components/PriceCard';
import { weatherData } from '../data/weather';
import { mandiPrices } from '../data/mandiPrices';
import { ChevronRight, TrendingUp, CloudRain, Leaf, GraduationCap, AlertTriangle } from 'lucide-react-native';

const QuickLink = ({ title, icon, onPress, color }) => (
    <TouchableOpacity style={styles.quickLink} onPress={onPress}>
        <View style={[styles.iconBox, { backgroundColor: color }]}>
            {icon}
        </View>
        <Text style={styles.quickLinkText}>{title}</Text>
    </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="KrishiMitra" />
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <View style={styles.weatherBanner}>
                        <View style={styles.weatherInfo}>
                            <Text style={styles.greeting}>Namaste Farmer 🙏</Text>
                            <Text style={styles.date}>{new Date().toDateString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.alertButton} onPress={() => navigation.navigate('Weather')}>
                            <AlertTriangle size={20} color="#FFFFFF" />
                            <Text style={styles.alertText}>Weather Alert</Text>
                        </TouchableOpacity>
                    </View>
                    <WeatherCard data={weatherData} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickLinks}>
                        <QuickLink
                            title="Check Prices"
                            icon={<TrendingUp size={24} color="#FFFFFF" />}
                            color="#16A34A"
                            onPress={() => navigation.navigate('Prices')}
                        />
                        <QuickLink
                            title="Weather"
                            icon={<CloudRain size={24} color="#FFFFFF" />}
                            color="#3B82F6"
                            onPress={() => navigation.navigate('Weather')}
                        />
                        <QuickLink
                            title="Buy Seeds"
                            icon={<Leaf size={24} color="#FFFFFF" />}
                            color="#FACC15"
                            onPress={() => navigation.navigate('Seeds')}
                        />
                        <QuickLink
                            title="Ask Expert"
                            icon={<GraduationCap size={24} color="#FFFFFF" />}
                            color="#A855F7"
                            onPress={() => navigation.navigate('Experts')}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Today's Mandi Prices</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Prices')}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {mandiPrices.slice(0, 3).map((item) => (
                        <PriceCard key={item.id} {...item} />
                    ))}
                </View>
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
    section: {
        marginBottom: 24,
    },
    weatherBanner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    greeting: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    date: {
        color: '#9CA3AF',
        fontSize: 14
    },
    alertButton: {
        flexDirection: 'row',
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
        gap: 6
    },
    alertText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    seeAll: {
        color: '#16A34A',
        fontSize: 14,
        fontWeight: '600',
    },
    quickLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickLink: {
        alignItems: 'center',
        width: '23%',
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickLinkText: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default HomeScreen;
