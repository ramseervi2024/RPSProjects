import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Header from '../components/Header';
import { MapPin, Navigation } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const LiveTrackingScreen = () => {
    const [driverPosition, setDriverPosition] = useState(0);

    // Mock animation loop
    useEffect(() => {
        const interval = setInterval(() => {
            setDriverPosition((prev) => (prev + 1) % 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Header title="Live Tracking" />

            {/* Fake Map area */}
            <View style={styles.mapContainer}>
                <View style={styles.mapBackground}>
                    {/* Grid lines to look like a map */}
                    <View style={styles.gridLineHorizontal} />
                    <View style={[styles.gridLineHorizontal, { top: '30%' }]} />
                    <View style={[styles.gridLineHorizontal, { top: '60%' }]} />
                    <View style={styles.gridLineVertical} />
                    <View style={[styles.gridLineVertical, { left: '30%' }]} />
                    <View style={[styles.gridLineVertical, { left: '60%' }]} />
                </View>

                {/* User Pin */}
                <View style={styles.userPin}>
                    <View style={styles.pinCircle}>
                        <MapPin color="#fff" size={20} fill="#ef4444" />
                    </View>
                    <View style={styles.pinPulse} />
                </View>

                {/* Driver Pin (Moving) */}
                <View
                    style={[
                        styles.driverPin,
                        {
                            top: `${20 + (driverPosition * 0.4)}%`,
                            left: `${20 + (driverPosition * 0.4)}%`
                        }
                    ]}
                >
                    <Navigation color="#0284c7" size={24} fill="#0284c7" style={{ transform: [{ rotate: '45deg' }] }} />
                </View>
            </View>

            <View style={styles.statusCard}>
                <View style={styles.driverInfo}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' }}
                        style={styles.driverImage}
                    />
                    <View>
                        <Text style={styles.driverName}>John Doe</Text>
                        <Text style={styles.driverStatus}>Arriving in 5 mins</Text>
                    </View>
                </View>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '80%' }]} />
                    </View>
                    <Text style={styles.statusText}>On the way</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapContainer: {
        flex: 1,
        backgroundColor: '#e2e8f0', // Map background color
        position: 'relative',
        overflow: 'hidden',
    },
    mapBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    gridLineHorizontal: {
        position: 'absolute',
        width: '100%',
        height: 10,
        backgroundColor: '#cbd5e1',
        top: '10%',
    },
    gridLineVertical: {
        position: 'absolute',
        height: '100%',
        width: 10,
        backgroundColor: '#cbd5e1',
        left: '10%',
    },
    userPin: {
        position: 'absolute',
        top: '60%',
        left: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pinCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ef4444',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        borderWidth: 2,
        borderColor: '#fff',
    },
    pinPulse: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        zIndex: 1,
    },
    driverPin: {
        position: 'absolute',
        zIndex: 3,
    },
    statusCard: {
        position: 'absolute',
        bottom: 30,
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    driverImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    driverName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    driverStatus: {
        fontSize: 14,
        color: '#0284c7',
        fontWeight: '600',
    },
    progressContainer: {
        marginTop: 8,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#f1f5f9',
        borderRadius: 3,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#22c55e',
        borderRadius: 3,
    },
    statusText: {
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
});

export default LiveTrackingScreen;
