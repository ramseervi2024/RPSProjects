import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import { trips } from '../data/trips';
import TripCard from '../components/TripCard';
import { Search, Calendar, DollarSign } from 'lucide-react-native';

const TripPlannerScreen = () => {
    const [destination, setDestination] = useState('');
    const [days, setDays] = useState('');
    const [budget, setBudget] = useState('');

    return (
        <View style={styles.container}>
            <Header title="Plan Your Trip" />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Where do you want to go?</Text>
                    <View style={styles.inputWrapper}>
                        <Search color="#999" size={20} />
                        <TextInput
                            style={styles.input}
                            placeholder="E.g. Jaisalmer"
                            placeholderTextColor="#999"
                            value={destination}
                            onChangeText={setDestination}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.flex1, { marginRight: 8 }]}>
                            <Text style={styles.label}>Days</Text>
                            <View style={styles.inputWrapper}>
                                <Calendar color="#999" size={20} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="3"
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    value={days}
                                    onChangeText={setDays}
                                />
                            </View>
                        </View>

                        <View style={[styles.flex1, { marginLeft: 8 }]}>
                            <Text style={styles.label}>Budget (₹)</Text>
                            <View style={styles.inputWrapper}>
                                <DollarSign color="#999" size={20} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="15000"
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    value={budget}
                                    onChangeText={setBudget}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.planButton}>
                        <Text style={styles.planButtonText}>Create Plan</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Suggested Itineraries</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {trips.map(trip => (
                        <TripCard key={trip.id} item={trip} onPress={() => { }} />
                    ))}
                </ScrollView>

                <View style={styles.promoCard}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2670' }}
                        style={styles.promoImage}
                        resizeMode="cover"
                    />
                    <View style={styles.promoOverlay} />
                    <Text style={styles.promoText}>Need a custom package?</Text>
                    <TouchableOpacity style={styles.contactButton}>
                        <Text style={styles.contactButtonText}>Contact an Expert</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    formContainer: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 16,
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
    },
    flex1: {
        flex: 1,
    },
    planButton: {
        backgroundColor: '#333',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    planButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    horizontalScroll: {
        marginBottom: 30,
        // marginHorizontal: -20, // To allow scrolling edge-to-edge
        // paddingHorizontal: 20,
    },
    promoCard: {
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    promoImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    promoOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    promoText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        zIndex: 1,
    },
    contactButton: {
        backgroundColor: '#DAA520',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
        zIndex: 1,
    },
    contactButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TripPlannerScreen;
