import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { ArrowLeft, Navigation, MapPin, User, Clock, AlertCircle, ChevronRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const TripDetails = ({ route, navigation }) => {
    const { trip } = route.params;

    const mapStyle = [
        { "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#94a3b8" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#0f172a" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#334155" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] }
    ];

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trip Details</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: trip.origin.latitude,
                            longitude: trip.origin.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        customMapStyle={mapStyle}
                    >
                        <Marker coordinate={trip.origin} title="Origin">
                            <View style={styles.markerCircle}>
                                <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
                            </View>
                        </Marker>
                        <Marker coordinate={trip.destination} title="Destination">
                            <View style={styles.markerCircle}>
                                <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
                            </View>
                        </Marker>
                        <Polyline
                            coordinates={trip.route}
                            strokeColor={COLORS.primary}
                            strokeWidth={4}
                            lineDashPattern={[0]}
                        />
                    </MapView>
                    <LinearGradient
                        colors={['transparent', COLORS.background]}
                        style={styles.mapOverlay}
                    />
                </View>

                <View style={styles.content}>
                    <View style={styles.statusRow}>
                        <View style={[styles.statusBadge, { backgroundColor: trip.status === 'Moving' ? COLORS.success + '20' : COLORS.warning + '20' }]}>
                            <View style={[styles.statusPulse, { backgroundColor: trip.status === 'Moving' ? COLORS.success : COLORS.warning }]} />
                            <Text style={[styles.statusText, { color: trip.status === 'Moving' ? COLORS.success : COLORS.warning }]}>{trip.status}</Text>
                        </View>
                        <Text style={styles.timeTag}>{trip.time}</Text>
                    </View>

                    <Text style={styles.routeTitle}>{trip.origin.name} → {trip.destination.name}</Text>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconBox}>
                                <User size={20} color={COLORS.primary} />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Driver</Text>
                                <Text style={styles.infoValue}>{trip.driver}</Text>
                            </View>
                        </View>
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconBox}>
                                <Clock size={20} color={COLORS.secondary} />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>ETA</Text>
                                <Text style={styles.infoValue}>24 mins</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.timelineContainer}>
                        <Text style={styles.sectionTitle}>Journey Timeline</Text>

                        <View style={styles.timelineItem}>
                            <View style={styles.timelineLine} />
                            <View style={[styles.timelineDot, { backgroundColor: COLORS.success }]} />
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelinePlace}>{trip.origin.name}</Text>
                                <Text style={styles.timelineTime}>Started at 08:30 AM</Text>
                            </View>
                        </View>

                        <View style={styles.timelineItem}>
                            <View style={styles.timelineLine} />
                            <View style={[styles.timelineDot, { backgroundColor: COLORS.primary, shadowColor: COLORS.primary, shadowOpacity: 0.5, shadowRadius: 5 }]} />
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelinePlace}>Currently in Transit</Text>
                                <Text style={styles.timelineTime}>Moving at 45 km/h</Text>
                            </View>
                        </View>

                        <View style={[styles.timelineItem, { marginBottom: 0 }]}>
                            <View style={[styles.timelineDot, { backgroundColor: COLORS.textSecondary + '40' }]} />
                            <View style={styles.timelineContent}>
                                <Text style={[styles.timelinePlace, { color: COLORS.textSecondary }]}>{trip.destination.name}</Text>
                                <Text style={styles.timelineTime}>Expected by 11:45 AM</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.actionBtn}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.actionBtnGradient}
                        >
                            <Navigation size={20} color="white" style={{ marginRight: 10 }} />
                            <Text style={styles.actionBtnText}>Live Navigation</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
    },
    placeholder: {
        width: 40,
    },
    container: {
        flex: 1,
    },
    mapContainer: {
        height: 280,
        width: '100%',
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    markerCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        elevation: 5,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    content: {
        padding: 20, // Standardized padding
        marginTop: -16,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        gap: 6,
    },
    statusPulse: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    timeTag: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '500',
    },
    routeTitle: {
        color: COLORS.text,
        fontSize: 22, // Adjusted for balance
        fontWeight: '800',
        marginBottom: 20,
    },
    infoGrid: {
        flexDirection: 'row',
        gap: 12, // Standardized gap
        marginBottom: 24,
    },
    infoCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    infoIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#ffffff05',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoLabel: {
        color: COLORS.textSecondary,
        fontSize: 10,
        fontWeight: '600',
    },
    infoValue: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: '700',
        marginTop: 1,
    },
    timelineContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 20,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timelineLine: {
        position: 'absolute',
        left: 4.5,
        top: 10,
        bottom: -24,
        width: 1,
        backgroundColor: '#ffffff10',
    },
    timelineDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        marginTop: 5,
        zIndex: 1,
    },
    timelineContent: {
        flex: 1,
        marginLeft: 16,
    },
    timelinePlace: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '700',
    },
    timelineTime: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    actionBtn: {
        borderRadius: 16,
        overflow: 'hidden',
        height: 52,
    },
    actionBtnGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
});

export default TripDetails;
