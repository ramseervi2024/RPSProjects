import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import ProviderCard from '../components/ProviderCard';
import { services } from '../data/services';
import { providers } from '../data/providers';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const heroImages = [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    ];

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
        >
            <View style={styles.serviceIconContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.serviceIcon} />
            </View>
            <Text style={styles.serviceName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="FixMyHome" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Hero Carousel */}
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.heroCarousel}>
                    {heroImages.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={styles.heroImage} />
                    ))}
                </ScrollView>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search color="#94a3b8" size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for a service..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Services Grid */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Our Services</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Services')}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={services.slice(0, 4)} // Show first 4
                    renderItem={renderServiceItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.serviceRow}
                />

                {/* Top Providers */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Providers Near You</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.providersList}>
                    {providers.map((provider) => (
                        <View key={provider.id} style={{ width: 300, marginRight: 16 }}>
                            <ProviderCard provider={provider} onPress={() => { }} />
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    heroCarousel: {
        height: 200,
    },
    heroImage: {
        width: width,
        height: 200,
        resizeMode: 'cover',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        height: 50,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#0f172a',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    seeAll: {
        color: '#0284c7',
        fontSize: 14,
        fontWeight: '600',
    },
    serviceRow: {
        justifyContent: 'space-between', // Distribute items evenly
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    serviceItem: {
        width: (width - 48) / 2, // Correct width calculation
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    serviceIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 8,
    },
    serviceIcon: {
        width: '100%',
        height: '100%',
    },
    serviceName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0f172a',
        textAlign: 'center',
    },
    providersList: {
        paddingLeft: 16,
    },
});

export default HomeScreen;
