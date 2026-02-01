import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, Dimensions } from 'react-native';
import Header from '../components/Header';
import DestinationCard from '../components/DestinationCard';
import SafariCard from '../components/SafariCard';
import HotelCard from '../components/HotelCard';
import { destinations } from '../data/destinations';
import { safaris } from '../data/safaris';
import { hotels } from '../data/hotels';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const renderBanner = () => (
        <View style={styles.bannerContainer}>
            <FlatList
                data={[
                    'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776',
                    'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1887',
                    'https://images.unsplash.com/photo-1598605272254-e6a730628434?q=80&w=1770'
                ]}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.bannerImage} resizeMode="cover" />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome to Rajasthan</Text>
                <Text style={styles.subText}>The Land of Kings</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="DesertYatra" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderBanner()}

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Destinations</Text>
                    <Text style={styles.seeAll} onPress={() => navigation.navigate('Destinations')}>See All</Text>
                </View>
                <FlatList
                    data={destinations}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 16 }}
                    renderItem={({ item }) => (
                        <DestinationCard
                            item={item}
                            onPress={() => navigation.navigate('DestinationDetail', { item })}
                        />
                    )}
                    keyExtractor={item => item.id}
                />

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Popular Safaris</Text>
                    <Text style={styles.seeAll} onPress={() => navigation.navigate('Safaris')}>See All</Text>
                </View>
                <FlatList
                    data={safaris}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 16 }}
                    renderItem={({ item }) => (
                        <SafariCard
                            item={item}
                            onPress={() => navigation.navigate('SafariDetail', { item })}
                            width={200} // Override width for horizontal list
                        />
                    )}
                    keyExtractor={item => item.id}
                />

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended Hotels</Text>
                    <Text style={styles.seeAll} onPress={() => navigation.navigate('Hotels')}>See All</Text>
                </View>
                {hotels.slice(0, 3).map(hotel => (
                    <HotelCard
                        key={hotel.id}
                        item={hotel}
                        onPress={() => navigation.navigate('HotelDetail', { item: hotel })}
                    />
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bannerContainer: {
        width: width,
        aspectRatio: 1.6, // Approx 16:10 ratio
        marginBottom: 20,
        position: 'relative',
    },
    bannerImage: {
        width: width,
        height: '100%',
    },
    welcomeContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    welcomeText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subText: {
        color: '#FFC107',
        fontSize: 18,
        fontWeight: '600',
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: 14,
        color: '#DAA520',
        fontWeight: '600',
    },
});

export default HomeScreen;
