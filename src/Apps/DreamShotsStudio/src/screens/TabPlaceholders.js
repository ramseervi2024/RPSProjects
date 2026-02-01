import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

export const PortfolioScreen = () => (
    <View style={styles.container}>
        <Header title="Portfolio" />
        <View style={styles.center}>
            <Text style={styles.text}>Featured Portfolios Gallery</Text>
            <Text style={styles.subtext}>(Coming Soon)</Text>
        </View>
    </View>
);

export const BookingLandingScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Header title="Book a Session" />
        <View style={styles.center}>
            <Text style={styles.text}>Ready to capture the moment?</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Photographers')}
            >
                <Text style={styles.buttonText}>Find a Photographer</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtext: {
        color: '#4B5563',
        marginTop: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#000000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
