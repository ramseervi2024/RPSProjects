import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import useFleetStore from '../store/useFleetStore';
import { Truck, Navigation, Info } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const FleetMap = () => {
    const { vehicles } = useFleetStore();
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const initialRegion = {
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 20,
        longitudeDelta: 20,
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                    customMapStyle={mapStyle}
                >
                    {vehicles.map((v) => (
                        <Marker
                            key={v.id}
                            coordinate={v.lastLocation}
                            onPress={() => setSelectedVehicle(v)}
                        >
                            <View style={[styles.markerContainer, { borderColor: v.status === 'Active' ? COLORS.success : COLORS.warning }]}>
                                <Truck size={16} color={v.status === 'Active' ? COLORS.success : COLORS.warning} />
                            </View>
                        </Marker>
                    ))}
                </MapView>

                {selectedVehicle && (
                    <View style={styles.detailsCard}>
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setSelectedVehicle(null)}
                        >
                            <Text style={styles.closeText}>×</Text>
                        </TouchableOpacity>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconBox, { backgroundColor: selectedVehicle.status === 'Active' ? COLORS.success + '20' : COLORS.warning + '20' }]}>
                                <Truck color={selectedVehicle.status === 'Active' ? COLORS.success : COLORS.warning} size={24} />
                            </View>
                            <View style={styles.headerInfo}>
                                <Text style={styles.plate}>{selectedVehicle.plate}</Text>
                                <Text style={styles.model}>{selectedVehicle.model}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: selectedVehicle.status === 'Active' ? COLORS.success : COLORS.warning }]}>
                                <Text style={styles.statusText}>{selectedVehicle.status}</Text>
                            </View>
                        </View>

                        <View style={styles.cardActions}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Navigation size={18} color="white" />
                                <Text style={styles.btnText}>Track Live</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.surfaceLight }]}>
                                <Info size={18} color="white" />
                                <Text style={styles.btnText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.floatingHeader}>
                    <Text style={styles.headerTitle}>Live Fleet Tracking</Text>
                    <Text style={styles.headerSub}>{vehicles.length} Units Online</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#94a3b8" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#0f172a" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#334155" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] }
];

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    floatingHeader: {
        position: 'absolute',
        top: 20,
        left: SPACING.md,
        right: SPACING.md,
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: '#ffffff10',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSub: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    detailsCard: {
        position: 'absolute',
        bottom: 20,
        left: SPACING.md,
        right: SPACING.md,
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: '#ffffff10',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 5,
        padding: 5,
        zIndex: 1,
    },
    closeText: {
        color: COLORS.textSecondary,
        fontSize: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerInfo: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    plate: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    model: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    cardActions: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    actionBtn: {
        flex: 1,
        height: 44,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    btnText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default FleetMap;
