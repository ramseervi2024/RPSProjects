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
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
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
        width: 44,
    },
    container: {
        flex: 1,
    },
    mapContainer: {
        height: 300,
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
        height: 80,
    },
    markerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        elevation: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    content: {
        padding: SPACING.md,
        marginTop: -20,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        gap: 8,
    },
    statusPulse: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    timeTag: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    routeTitle: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 24,
    },
    infoGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    infoCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    infoIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#ffffff05',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoLabel: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '600',
    },
    infoValue: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
        marginTop: 2,
    },
    timelineContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 24,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    timelineLine: {
        position: 'absolute',
        left: 4,
        top: 10,
        bottom: -32,
        width: 1,
        backgroundColor: '#ffffff10',
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 6,
        zIndex: 1,
    },
    timelineContent: {
        flex: 1,
        marginLeft: 20,
    },
    timelinePlace: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
    },
    timelineTime: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    actionBtn: {
        borderRadius: 18,
        overflow: 'hidden',
        height: 56,
    },
    actionBtnGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default TripDetails;
